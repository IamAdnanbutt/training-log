"""Second pass: caption the Focus-mode demo frame.

The line under the cues still invited the user to drop their own clip, which
the baked-in demos replace. It becomes the place where an approximate demo
admits it — a stand-in picture that silently contradicts the prescription is
worse than no picture.
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


# sc-if wants a real boolean, so hand it one rather than leaning on the
# truthiness of the note string.
sub('approx-flag',
    '      focusDemoNote: DEMO_APPROX[fEx.id] || "",',
    '      focusDemoNote: DEMO_APPROX[fEx.id] || "",\n'
    '      focusDemoApprox: !!DEMO_APPROX[fEx.id],')

sub('focus-caption',
    '<div style="margin-top:auto;font-size:10.5px;line-height:1.4;'
    'color:var(--color-neutral-600)">Drop your own photo or clip on the frame '
    '— it stays with this lift.</div>',
    '<div style="margin-top:auto;display:flex;flex-direction:column;gap:4px">\n'
    '                          <sc-if value="{{ focusDemoApprox }}" hint-placeholder-val="{{ true }}">\n'
    '                            <div style="font-size:10.5px;line-height:1.4;color:var(--color-accent-700)">'
    'Demo shows a {{ focusDemoNote }}.</div>\n'
    '                          </sc-if>\n'
    '                          <div style="font-size:10px;line-height:1.35;color:var(--color-neutral-600)">'
    'Two frames — the start, then the finish of one rep.</div>\n'
    '                        </div>')

open(P, 'w', encoding='utf-8').write(t)
print('edits applied:', ', '.join(edits))
print('delta bytes:', len(t) - len(orig))
