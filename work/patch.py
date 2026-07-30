"""Patch template.html: bake a looping two-frame demo into every exercise.

template.html holds the whole page — design-system CSS, markup, and the app's
JS view model — so every edit below lands in this one file. Each sub() asserts
its anchor appears exactly the expected number of times, so a silent no-op
(anchor drifted, already patched) fails loudly instead of shipping.
"""

P = '/sessions/gracious-lucid-pasteur/mnt/outputs/work/template.html'
t = open(P, encoding='utf-8').read()
orig = t
edits = []


def sub(label, old, new, count=1):
    global t
    n = t.count(old)
    assert n == count, f'{label}: expected {count} occurrence(s), found {n}'
    t = t.replace(old, new)
    edits.append(label)


# ── 1. CSS for the two-frame loop, appended to the .duotone rules ──────────
anchor_css = """.duotone{position:relative;overflow:hidden}
.duotone::after{content:"";position:absolute;inset:0;pointer-events:none;
  background:var(--color-accent);mix-blend-mode:color}"""

sub('css', anchor_css, anchor_css + """

/* Movement demos. The exercise library ships two stills per lift — the start
   and the finish of one rep — so the "GIF" here is a two-frame loop: hold the
   start, cut to the finish, hold, cut back. Enough to read the movement path
   without shipping video into the bundle. No filter needed: .duotone::after
   blends in `color`, which already takes luminosity from the photo and hue
   from the accent, so a demo lands in the same ink as the rest of the plate. */
.demo2{position:absolute;inset:0;overflow:hidden;background:var(--color-surface)}
.demo2 img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;
  object-position:center;display:block}
.demo2 img.b{opacity:0;animation:demoLoop 2.4s ease-in-out infinite}
@keyframes demoLoop{0%,40%{opacity:0}48%,90%{opacity:1}100%{opacity:0}}
/* An exercise added to PROGRAM without a DEMO entry resolves to src="", which
   would otherwise re-request the page and paint a broken-image glyph. */
.demo2 img[src=""]{display:none}
@media (prefers-reduced-motion: reduce){
  .demo2 img.b{animation:none;opacity:0}
}""")

# ── 2. Focus-mode demo frame ──────────────────────────────────────────────
sub('focus-slot',
    '<image-slot id="{{ focusSlotId }}" shape="rect" fit="cover" '
    'placeholder="{{ focusDemoHint }}"></image-slot>',
    '<div class="demo2">'
    '<img src="{{ focusDemoA }}" alt="{{ focusName }}, start of the rep" decoding="async">'
    '<img class="b" src="{{ focusDemoB }}" alt="" decoding="async">'
    '</div>')

# ── 3. Movement-demos grid in Settings — 54 images, so load them lazily ────
sub('grid-slot',
    '<image-slot id="{{ d.id }}" shape="rect" fit="cover" '
    'placeholder="{{ d.ph }}"></image-slot>',
    '<div class="demo2">'
    '<img src="{{ d.a }}" alt="{{ d.label }}" loading="lazy" decoding="async">'
    '<img class="b" src="{{ d.b }}" alt="" loading="lazy" decoding="async">'
    '</div>')

# ── 4. That section promised a drag-and-drop that no longer applies ────────
sub('grid-copy',
    'Drop a GIF or short clip on a tile and it appears in Focus mode for that '
    'lift. Your files stay yours — nothing is shipped with the app.',
    'Every lift carries a two-frame demo — the start and the finish of one rep '
    '— looping here and beside the cues in Focus mode. Stills come from the '
    'public-domain free-exercise-db.')

# ── 5. The demo table, inserted after CUES ────────────────────────────────
cues_end = """  sp:["Stack shoulders and hips in one line.","Push the bottom shoulder away from the ear."]
};"""

sub('demo-table', cues_end, cues_end + """

/* Movement demos, keyed by exercise id. Values are folder names in
   free-exercise-db (public domain, Unlicense); every entry there stores
   exactly two stills, 0.jpg at the start of the rep and 1.jpg at the finish,
   which is what makes the two-frame loop in .demo2 possible.
   Served over jsDelivr rather than raw.githubusercontent — raw isn't intended
   for hotlinking and throttles; jsDelivr is a CDN built for it.
   Where the library had no entry for the exact lift, the closest movement
   pattern stands in; those substitutions are called out in DEMO_APPROX. */
const DEMO_CDN = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/";
const DEMO = {
  ht:"Barbell_Hip_Thrust", rdl:"Stiff-Legged_Dumbbell_Deadlift",
  bss:"Split_Squat_with_Dumbbells", abd:"Thigh_Abductor",
  bex:"Hyperextensions_Back_Extensions", db:"Dead_Bug",
  lpd:"Wide-Grip_Lat_Pulldown", bp:"Dumbbell_Bench_Press", row:"Seated_Cable_Rows",
  lat:"Side_Lateral_Raise", fp:"Face_Pull", cur:"Dumbbell_Bicep_Curl",
  tri:"Triceps_Pushdown", pal:"Pallof_Press", gob:"Goblet_Squat", lp:"Leg_Press",
  slc:"Seated_Leg_Curl", lun:"Dumbbell_Lunges", cf:"Standing_Calf_Raises",
  rc:"Reverse_Crunch", slht:"Single_Leg_Glute_Bridge", pth:"Pull_Through",
  su:"Dumbbell_Step_Ups", abd2:"Thigh_Abductor", pu:"Band_Assisted_Pull-Up",
  ohp:"Dumbbell_Shoulder_Press", sp:"Side_Bridge"
};
/* Stand-ins, not matches — the demo shows the right pattern but not the exact
   setup. Surfaced under the frame so the picture never quietly contradicts the
   prescription. */
const DEMO_APPROX = {
  bss:"flat-footed split squat — elevate the back foot",
  gob:"flat-footed goblet squat — keep your heels raised",
  slht:"floor glute bridge — shoulders go on the bench",
  rdl:"stiff-legged DB deadlift — same hinge, softer knee",
  pu:"band-assisted pull-up — machine assist is the same path"
};
const demoA = id => DEMO[id] ? DEMO_CDN + DEMO[id] + "/0.jpg" : "";
const demoB = id => DEMO[id] ? DEMO_CDN + DEMO[id] + "/1.jpg" : "";""")

# ── 6. Focus-mode view-model fields ───────────────────────────────────────
sub('focus-fields',
    """      focusSlotId: "demo-" + fEx.id,
      focusDemoHint: "Drop a photo or clip of " + this.name(fEx).toLowerCase(),""",
    """      focusSlotId: "demo-" + fEx.id,
      focusDemoA: demoA(fEx.id), focusDemoB: demoB(fEx.id),
      focusDemoNote: DEMO_APPROX[fEx.id] || "",
      focusDemoHint: "Drop a photo or clip of " + this.name(fEx).toLowerCase(),""")

# ── 7. Grid view-model fields ─────────────────────────────────────────────
sub('grid-fields',
    """        id: "demo-" + ex.id, label: ex.n, ph: "Drop a GIF\"""",
    """        id: "demo-" + ex.id, label: ex.n, ph: "No demo",
        a: demoA(ex.id), b: demoB(ex.id)""")

open(P, 'w', encoding='utf-8').write(t)
print('edits applied:', ', '.join(edits))
print('delta bytes:', len(t) - len(orig))
