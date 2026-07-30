
const KGLB = 0.45359237;

const PROGRAM = {
  1:{ label:"Glutes", note:"Hip thrust dominant", ex:[
    {id:"ht", n:"Barbell / Smith hip thrust", s:4, lo:8, hi:10, rest:150, alt:["Glute drive machine","Smith machine hip thrust","Hip thrust on bench (DB)","Cable kickback","Frog pump (DB)"]},
    {id:"rdl", n:"Romanian deadlift (DB)", s:3, lo:8, hi:10, rest:120, alt:["Barbell RDL","Smith machine RDL","Loaded 45° back extension","Seated leg curl","Single-leg RDL (DB)"]},
    {id:"bss", n:"Bulgarian split squat", s:3, lo:10, hi:10, rest:90, side:"per leg", alt:["Reverse lunge (DB)","Smith machine split squat","Step-up on plyo box","Single-leg press","Static split squat (DB)"]},
    {id:"abd", n:"Seated hip abduction", s:3, lo:15, hi:20, rest:60, alt:["Standing cable abduction","Hip abduction machine","Cable cross-body abduction","Band seated abduction","Side-lying abduction"]},
    {id:"bex", n:"45° back extension", s:3, lo:12, hi:15, rest:60, bw:true, alt:["Reverse hyper","Glute-ham raise","Cable pull-through","Stability-ball back extension","Bird dog"]},
    {id:"db", n:"Dead bug", s:3, lo:10, hi:10, rest:45, bw:true, side:"per side", alt:["Hollow hold","Reverse crunch","Pallof press","Stability-ball dead bug","Bear hold"]}
  ]},
  2:{ label:"Upper", note:"Balanced push / pull", ex:[
    {id:"lpd", n:"Lat pulldown", s:3, lo:10, hi:12, rest:90, alt:["Assisted pull-up machine","Neutral-grip pulldown","Iso-lateral plate-loaded pulldown","Straight-arm pulldown","Machine pullover"]},
    {id:"bp", n:"DB bench / machine press", s:3, lo:10, hi:12, rest:90, alt:["Smith machine incline press","Plate-loaded chest press","Pec deck","Cable chest press","Push-up, feet raised"]},
    {id:"row", n:"Seated cable row", s:3, lo:10, hi:12, rest:90, alt:["Chest-supported DB row","Iso-lateral plate-loaded row","Single-arm DB row","Seated machine row","Inverted row on the Smith bar"]},
    {id:"lat", n:"DB lateral raise", s:2, lo:12, hi:15, rest:60, alt:["Cable lateral raise","Machine lateral raise","Leaning single-arm cable raise","Band lateral raise","Cable upright row"]},
    {id:"fp", n:"Face pull", s:2, lo:15, hi:15, rest:60, alt:["Reverse pec deck","Cable rear-delt row","Seated rope face pull","Band pull-apart","Bent-over DB rear-delt raise"]},
    {id:"cur", n:"Bicep curl", s:2, lo:12, hi:12, rest:45, alt:["Cable curl","Hammer curl","Preacher-curl machine","Incline DB curl","EZ-bar curl"]},
    {id:"tri", n:"Triceps pushdown", s:2, lo:12, hi:12, rest:45, alt:["Overhead cable extension","Assisted dip machine","DB skullcrusher","Single-arm cable kickback","Close-grip Smith press"]},
    {id:"pal", n:"Pallof press", s:3, lo:10, hi:10, rest:45, side:"per side", bw:true, alt:["Cable rotation","Half-kneeling cable press","Suitcase carry","Dead bug","Bird dog"]}
  ]},
  3:{ label:"Legs", note:"Quad / hamstring emphasis", ex:[
    {id:"gob", n:"Heel-elevated goblet squat", s:3, lo:8, hi:10, rest:120, alt:["Hack squat","Smith machine squat","Leg press, feet low","Landmine squat","Belt squat"]},
    {id:"lp", n:"Leg press (feet mid-high)", s:3, lo:10, hi:12, rest:120, alt:["Hack squat","Horizontal seated leg press","Bulgarian split squat","Smith machine squat","Goblet squat"]},
    {id:"slc", n:"Seated leg curl", s:3, lo:12, hi:12, rest:90, alt:["Lying leg curl","Standing single-leg curl","Cable leg curl","Stability-ball leg curl","Assisted Nordic curl"]},
    {id:"lun", n:"Walking lunge", s:2, lo:12, hi:12, rest:90, side:"per leg", alt:["Reverse lunge (DB)","Step-up on plyo box","Split squat","Smith machine lunge","Sled push"]},
    {id:"cf", n:"Standing calf raise", s:3, lo:15, hi:15, rest:60, alt:["Seated calf raise","Leg-press calf press","Smith machine calf raise","Standing calf machine","Single-leg calf raise on a step"]},
    {id:"rc", n:"Reverse crunch", s:3, lo:12, hi:12, rest:45, bw:true, alt:["Hanging knee raise","Captain's chair knee raise","Cable crunch","Ab-machine crunch","Dead bug"]}
  ]},
  4:{ label:"Glutes+", note:"Volume day plus upper", ex:[
    {id:"slht", n:"Single-leg hip thrust", s:3, lo:12, hi:15, rest:90, side:"per leg", alt:["Glute drive machine, one leg","Two-leg hip thrust","Bench single-leg bridge","Cable kickback","Frog pump (DB)"]},
    {id:"pth", n:"Cable pull-through", s:3, lo:15, hi:15, rest:60, alt:["Kettlebell swing","Hip thrust","Loaded 45° back extension","Split-stance rope pull-through","Reverse hyper"]},
    {id:"su", n:"Step-up (knee-height box)", s:3, lo:10, hi:10, rest:90, side:"per leg", alt:["Reverse lunge (DB)","Split squat","Single-leg press","Smith machine step-up","Box step-down"]},
    {id:"abd2", n:"Hip abduction", s:3, lo:20, hi:20, rest:45, alt:["Seated abduction machine","Standing cable abduction","Cable kickback machine","Band abduction","Side-lying abduction"]},
    {id:"pu", n:"Assisted pull-up / pulldown", s:3, lo:10, hi:10, rest:90, alt:["Lat pulldown","Assisted pull-up machine","Plate-loaded high row","Chest-supported row","Machine pullover"]},
    {id:"ohp", n:"DB shoulder press", s:2, lo:10, hi:12, rest:60, alt:["Machine shoulder press","Smith machine press","Landmine press","Cable shoulder press","Arnold press"]},
    {id:"sp", n:"Side plank", s:3, lo:30, hi:30, rest:45, bw:true, time:true, side:"per side", alt:["Plank","Copenhagen plank","Pallof press","Farmer carry","Bird dog"]}
  ]}
};

/* Form cues shown beside the demonstration frame in Focus mode. */
const CUES = {
  ht:["Ribs down, chin tucked toward the chest.","Drive through the heels, squeeze a beat at the top."],
  rdl:["Push the hips back, weights close to the legs.","Stop where the hamstrings run out — not the back."],
  bss:["Front shin vertical, back knee travels straight down.","Weight in the front heel, torso tall."],
  abd:["Sit tall, no leaning back into the pad.","Open slowly, close slower."],
  bex:["Hinge from the hips, spine stays long.","Squeeze the glutes to lift, stop level with the torso."],
  db:["Press the lower back into the floor.","Extend opposite arm and leg slowly, exhale."],
  lpd:["Chest up, pull the elbows down to the ribs.","Let the shoulder blades move; no torso swing."],
  bp:["Elbows about 45°, wrists stacked over elbows.","Lower to a stretch, press without flaring."],
  row:["Tall torso or chest against the pad.","Pull to the belly, pause, control the return."],
  lat:["Lead with the elbows, thumbs slightly down.","Stop at shoulder height, no shrug."],
  fp:["Pull to the forehead, elbows high.","Rotate out at the end, slow return."],
  cur:["Elbows pinned to the ribs.","Three counts down on every rep."],
  tri:["Upper arms still, elbows in.","Full extension, then let it rise under control."],
  pal:["Brace the ribs, press straight out.","Resist the rotation — that is the exercise."],
  gob:["Heels raised, knees track over the toes.","Sit between the hips, chest proud."],
  lp:["Feet mid-high, knees to roughly 90°.","Lower back stays flat on the pad."],
  slc:["Hips pinned, curl all the way.","Three counts on the lowering."],
  lun:["Long steps, torso tall.","Front knee over the mid-foot."],
  cf:["Full stretch at the bottom, pause at the top.","No bouncing."],
  rc:["Curl the pelvis, don't swing the legs.","Exhale as the hips lift."],
  slht:["Shoulders on the bench, one foot planted.","Hips level throughout — no side tilt."],
  pth:["Hinge, rope travels between the legs.","Finish with the glutes, not the lower back."],
  su:["Push through the top foot, no push-off below.","Step down slowly."],
  abd2:["Sit tall, slow tempo, full range.","Hold the open position for a beat."],
  pu:["Start from a dead hang, elbows to the ribs.","Lower under control."],
  ohp:["Ribs stacked over the hips.","Press slightly back, never forward."],
  sp:["Stack shoulders and hips in one line.","Push the bottom shoulder away from the ear."]
};

/* Equipment profile — an alternative is hidden when its gear isn't on the floor. */
const GEAR = [
  { k:"glutedrive", label:"Glute drive machine", match:["glute drive"] },
  { k:"smith", label:"Smith machine", match:["smith"] },
  { k:"hack", label:"Hack squat", match:["hack squat"] },
  { k:"hleg", label:"Horizontal leg press", match:["horizontal seated leg press"] },
  { k:"plate", label:"Plate-loaded iso-lateral", match:["plate-loaded","iso-lateral"] },
  { k:"pecdeck", label:"Pec deck", match:["pec deck"] },
  { k:"assist", label:"Assisted pull-up / dip", match:["assisted pull-up","assisted dip"] },
  { k:"chair", label:"Captain's chair", match:["captain's chair"] },
  { k:"landmine", label:"Landmine", match:["landmine"] },
  { k:"ball", label:"Stability balls", match:["stability-ball"] },
  { k:"belt", label:"Belt squat", match:["belt squat"] },
  { k:"hyper", label:"Reverse hyper", match:["reverse hyper"] },
  { k:"ghd", label:"Glute-ham raise", match:["glute-ham"] },
  { k:"sled", label:"Sled / turf lane", match:["sled"] }
];
/* Bloor & Yonge is a compact downtown club — the specialty pieces start off. */
const GEAR_OFF = ["belt","hyper","ghd","sled"];

const POSTURE = ["Couch stretch — 2 × 45s each side","90/90 hip lift — 3 × 5 breaths","Glute bridge, ribs down — 2 × 15"];

const mk = (w, reps) => reps.map(r => ({ w: w, r: String(r) }));
const SEED = [
  { id:"s1", date:"2026-07-13", day:"1", log:{ ht:mk("55",[10,10,9,9]), rdl:mk("20",[10,10,9]), bss:mk("8",[10,10,10]), abd:mk("40",[18,18,16]), bex:mk("",[15,15,12]), db:mk("",[10,10,10]) } },
  { id:"s2", date:"2026-07-16", day:"2", log:{ lpd:mk("32",[12,11,10]), bp:mk("14",[12,11,10]), row:mk("30",[12,12,11]), lat:mk("6",[15,14]), fp:mk("12",[15,15]), cur:mk("8",[12,12]), tri:mk("15",[12,12]), pal:mk("",[10,10,10]) } },
  { id:"s3", date:"2026-07-20", day:"3", log:{ gob:mk("20",[10,9,8]), lp:mk("80",[12,12,10]), slc:mk("30",[12,12,11]), lun:mk("10",[12,12]), cf:mk("40",[15,15,15]), rc:mk("",[12,12,12]) } },
  { id:"s4", date:"2026-07-24", day:"1", log:{ ht:mk("60",[10,10,10,10]), rdl:mk("22.5",[10,9,8]), bss:mk("10",[10,10,10]), abd:mk("45",[20,18,18]), bex:mk("",[15,15,15]), db:mk("",[10,10,10]) } }
];
const BODY = [
  { date:"2026-06-01", hip:"36.4", thigh:"", waist:"27.8", wt:"49.2" },
  { date:"2026-07-01", hip:"36.8", thigh:"22.5", waist:"27.6", wt:"49.6" },
  { date:"2026-07-28", hip:"37.1", thigh:"22.9", waist:"27.4", wt:"50.1" }
];

const THEMES = {
  industry: { label:"Steel", vars:{} },
  iron: { label:"Iron", vars:{
    "--color-bg":"#16181a", "--color-surface":"#1f2225", "--color-text":"#ece7de",
    "--color-accent":"#d1562b", "--color-divider":"rgba(236,231,222,.24)",
    "--color-accent-100":"#2a1a15", "--color-accent-200":"#33221c", "--color-accent-300":"#5f3423",
    "--color-accent-400":"#e0693c", "--color-accent-500":"#d1562b", "--color-accent-600":"#c14e26",
    "--color-accent-700":"#e97a45", "--color-accent-800":"#f2a685", "--color-accent-900":"#0d0f10",
    "--color-accent-2-100":"#2a1a15", "--color-accent-2-800":"#f2a685",
    "--color-neutral-100":"#f4f1ea", "--color-neutral-300":"#4a4d50",
    "--color-neutral-600":"#8f8c86", "--color-neutral-700":"#b0aca4",
    "--font-heading":"'Bebas Neue', sans-serif", "--font-body":"'IBM Plex Sans', sans-serif",
    "--corner-op":"0", "--r":"0"
  }},
  chalk: { label:"Chalk", vars:{
    "--color-bg":"#f5f0e7", "--color-surface":"#ebe4d7", "--color-text":"#241f1b",
    "--color-accent":"#a2543a", "--color-divider":"rgba(36,31,27,.2)",
    "--color-accent-100":"#f7ece3", "--color-accent-200":"#efdfd2", "--color-accent-300":"#dcb69f",
    "--color-accent-400":"#b9714f", "--color-accent-500":"#a2543a", "--color-accent-600":"#8f4a2f",
    "--color-accent-700":"#7c3f27", "--color-accent-800":"#4a2718", "--color-accent-900":"#2e1c13",
    "--color-accent-2-100":"#f7ece3", "--color-accent-2-800":"#4a2718",
    "--color-neutral-100":"#fbf8f2", "--color-neutral-300":"#d7cec0",
    "--color-neutral-600":"#7f7568", "--color-neutral-700":"#5e564c",
    "--font-heading":"'Newsreader', serif", "--font-body":"'Karla', sans-serif",
    "--corner-op":"0", "--r":"10px"
  }}
};

const ACCENT = "var(--color-accent)";
const LINE = "var(--color-divider)";
const MUTED = "var(--color-neutral-600)";
const PAPER = "var(--color-bg)";

class Component extends DCLogic {
  state = {
    view: "phone", tab: "today", day: "1",
    layout: null, chart: null,
    log: { ht: [{ w:"62.5", r:"10" }, { w:"62.5", r:"9" }, null, null] },
    open: "ht", focusI: 0, swap: null,
    subs: {}, posture: [0],
    sessions: SEED.slice(), body: BODY.slice(),
    unit: null, tape: "in",
    histOpen: null, filter: "all", lift: "ht",
    m: { hip:"", thigh:"", waist:"", wt:"" },
    tOn: false, tLeft: 0, toast: "", welcome: null, theme: null,
    gym: "Bloor & Yonge", gearOff: GEAR_OFF.slice()
  };

  get theme(){ return this.state.theme || (THEMES[this.props.theme] ? this.props.theme : "industry"); }

  /* the seeded draft is stored in kg like the session records — scale it once to the active unit */
  componentDidMount(){
    if (this.unit !== "lb") return;
    const log = {};
    Object.entries(this.state.log).forEach(([k, arr]) => {
      log[k] = (arr || []).map(x => x && x.w ? Object.assign({}, x, { w: String(Math.round(Number(x.w) / KGLB)) }) : x);
    });
    this.setState({ log });
  }

  componentWillUnmount(){ clearInterval(this._t); clearTimeout(this._toast); }

  /* ---- helpers ---- */
  get unit(){ return this.state.unit || this.props.unit || "kg"; }
  get layout(){ return this.state.layout || this.props.todayLayout || "flow"; }
  get chart(){ return this.state.chart || this.props.chartStyle || "bars"; }
  get exList(){ return PROGRAM[this.state.day].ex; }
  name(ex){ return this.state.subs[ex.id] || ex.n; }
  gearOf(name){
    const s = String(name).toLowerCase();
    const hit = GEAR.find(g => g.match.some(m => s.includes(m)));
    return hit ? hit.k : null;
  }
  hasGear(name){
    const g = this.gearOf(name);
    return !g || !this.state.gearOff.includes(g);
  }
  altsFor(ex){
    return [{ name: ex.n, orig: true }]
      .concat(ex.alt.filter(a => this.hasGear(a)).map(a => ({ name: a })));
  }
  step(){ return this.unit === "lb" ? 5 : 2.5; }
  disp(kg){
    const n = Number(kg);
    if (!isFinite(n) || !kg) return "";
    return this.unit === "lb" ? String(Math.round(n / KGLB)) : String(Math.round(n * 2) / 2);
  }
  toKg(v){
    const n = Number(v);
    if (!isFinite(n)) return 0;
    return this.unit === "lb" ? n * KGLB : n;
  }
  lastFor(day, exId){
    const ss = this.state.sessions;
    for (let i = ss.length - 1; i >= 0; i--){
      if (ss[i].day !== day) continue;
      const l = ss[i].log[exId];
      if (l && l.some(x => x && x.r)) return l;
    }
    return null;
  }
  volOf(log){
    let v = 0;
    Object.values(log || {}).forEach(sets => (sets || []).forEach(x => {
      if (x && x.w && x.r) v += Number(x.w) * Number(x.r);
    }));
    return v;
  }
  draftVolKg(){
    let v = 0;
    Object.values(this.state.log).forEach(sets => (sets || []).forEach(x => {
      if (x && x.w && x.r) v += this.toKg(x.w) * Number(x.r);
    }));
    return v;
  }
  fmtVol(kg){
    const v = this.unit === "lb" ? kg / KGLB : kg;
    return Math.round(v).toLocaleString();
  }
  rows(ex){
    const cur = this.state.log[ex.id] || [];
    const out = [];
    for (let i = 0; i < ex.s; i++) out.push(cur[i] || {});
    return out;
  }
  setVal(exId, i, k, v){
    const ex = this.exList.find(e => e.id === exId);
    const cur = (this.state.log[exId] || []).slice();
    while (cur.length < ex.s) cur.push(null);
    const row = Object.assign({}, cur[i] || {});
    row[k] = String(v).replace(/[^0-9.]/g, "");
    cur[i] = row;
    this.setState({ log: Object.assign({}, this.state.log, { [exId]: cur }) });
  }
  nudge(exId, i, k, dir){
    const ex = this.exList.find(e => e.id === exId);
    const cur = (this.state.log[exId] || [])[i] || {};
    const prev = this.lastFor(this.state.day, exId);
    const base = k === "w"
      ? (cur.w !== undefined && cur.w !== "" ? Number(cur.w) : Number(this.disp(prev && prev[i] ? prev[i].w : "") || 0))
      : (cur.r !== undefined && cur.r !== "" ? Number(cur.r) : (prev && prev[i] ? Number(prev[i].r) : ex.lo));
    const stepv = k === "w" ? this.step() : 1;
    const next = Math.max(0, (isFinite(base) ? base : 0) + dir * stepv);
    this.setVal(exId, i, k, k === "w" ? String(Math.round(next * 2) / 2) : String(Math.round(next)));
  }
  switchUnit(to){
    const from = this.unit;
    if (from === to) return;
    const conv = v => {
      const n = Number(v);
      if (!v || !isFinite(n)) return v;
      const kg = from === "lb" ? n * KGLB : n;
      const out = to === "lb" ? kg / KGLB : kg;
      return String(to === "lb" ? Math.round(out) : Math.round(out * 2) / 2);
    };
    const log = {};
    Object.entries(this.state.log).forEach(([k, arr]) => {
      log[k] = (arr || []).map(x => x ? Object.assign({}, x, { w: conv(x.w) }) : x);
    });
    const m = Object.assign({}, this.state.m, { wt: conv(this.state.m.wt) });
    this.setState({ unit: to, log, m });
    this.say("Logging in " + to);
  }

  say(msg){
    clearTimeout(this._toast);
    this.setState({ toast: msg });
    this._toast = setTimeout(() => this.setState({ toast: "" }), 2200);
  }
  rest(sec){
    clearInterval(this._t);
    this.setState({ tOn: true, tLeft: sec });
    this._t = setInterval(() => {
      const n = this.state.tLeft - 1;
      if (n <= 0){ clearInterval(this._t); this.setState({ tOn: false, tLeft: 0 }); this.say("Rest done — next set"); }
      else this.setState({ tLeft: n });
    }, 1000);
  }
  setsAhead(){
    let ahead = 0, done = 0;
    this.exList.forEach(ex => {
      const prev = this.lastFor(this.state.day, ex.id);
      (this.state.log[ex.id] || []).forEach((c, i) => {
        if (!c || !c.r) return;
        done++;
        const p = prev && prev[i] ? prev[i] : null;
        const pKg = p ? Number(p.w || 0) * Number(p.r || 0) : 0;
        const cKg = this.toKg(c.w || 0) * Number(c.r || 0);
        if (!p || cKg >= pKg || (!p.w && Number(c.r) >= Number(p.r || 0))) ahead++;
      });
    });
    return { ahead, done };
  }

  renderVals(){
    const st = this.state, u = this.unit, isDesk = st.view === "desktop";
    const on = (b) => b ? ACCENT : "transparent";
    const seg = (b) => ({ bg: b ? ACCENT : "transparent", fg: b ? PAPER : "var(--color-text)" });

    const day = st.day, P = PROGRAM[day];
    const prevSess = [...st.sessions].reverse().find(s => s.day === day);
    const prevVolKg = prevSess ? this.volOf(prevSess.log) : 0;
    const nowVolKg = this.draftVolKg();
    const { ahead, done } = this.setsAhead();
    const totalSets = this.exList.reduce((a, e) => a + e.s, 0);
    const peak = Math.max(nowVolKg, prevVolKg, 1);

    const exercises = this.exList.map((ex, xi) => {
      const prev = this.lastFor(day, ex.id);
      const cur = st.log[ex.id] || [];
      const openHere = st.open === ex.id;
      const prevW = prev && prev[0] ? this.disp(prev[0].w) : "";
      const lastText = prev
        ? (ex.bw ? "last bw × " : "last " + (prevW ? prevW + " " + u + " × " : "bw × ")) + prev.filter(x => x && x.r).map(x => x.r).join(",")
        : "no history";
      const bump = !!prev && prev.filter(x => x && x.r).length >= ex.s && prev.every(x => x && Number(x.r) >= ex.hi);
      const pips = [];
      for (let i = 0; i < ex.s; i++){
        const c = cur[i];
        const p = prev && prev[i] ? prev[i] : null;
        const good = c && c.r && (!p || Number(c.r) >= Number(p.r || 0));
        pips.push({ line: c && c.r ? (good ? "var(--color-accent-700)" : MUTED) : LINE, fill: c && c.r ? (good ? ACCENT : MUTED) : "transparent" });
      }
      const sets = openHere ? this.rows(ex).map((row, i) => {
        const p = prev && prev[i] ? prev[i] : null;
        const hasR = row.r !== undefined && row.r !== "";
        const good = hasR && (!p || Number(row.r) >= Number(p.r || 0));
        let delta = "—";
        if (hasR && p){
          const d = Number(row.r) - Number(p.r || 0);
          const dw = this.toKg(row.w || 0) - Number(p.w || 0);
          delta = (dw > 0.01 ? "+" + this.disp(String(dw)) + u + " " : "") + (d === 0 ? "=" : (d > 0 ? "+" + d : d) + "r");
        } else if (hasR) delta = "new";
        return {
          n: i + 1, w: row.w === undefined ? "" : row.w, r: row.r === undefined ? "" : row.r,
          wPlaceholder: ex.bw ? "bw" : (p && p.w ? this.disp(p.w) : "—"),
          rPlaceholder: p && p.r ? String(p.r) : String(ex.lo),
          rail: hasR ? (good ? ACCENT : MUTED) : LINE,
          wBorder: LINE, rBorder: hasR ? (good ? "var(--color-accent-600)" : LINE) : LINE,
          delta, deltaFg: good ? "var(--color-accent-700)" : MUTED,
          wSet: e => this.setVal(ex.id, i, "w", e.target.value),
          rSet: e => this.setVal(ex.id, i, "r", e.target.value),
          wUp: () => this.nudge(ex.id, i, "w", 1), wDown: () => this.nudge(ex.id, i, "w", -1),
          rUp: () => this.nudge(ex.id, i, "r", 1), rDown: () => this.nudge(ex.id, i, "r", -1)
        };
      }) : [];
      return {
        id: ex.id, name: this.name(ex), open: openHere,
        cardBg: openHere ? "color-mix(in srgb, var(--color-accent) 5%, transparent)" : "transparent",
        target: ex.s + " × " + (ex.lo === ex.hi ? ex.lo : ex.lo + "–" + ex.hi) + (ex.time ? "s" : "") + (ex.side ? " " + ex.side : ""),
        lastText, bump, bumpText: "Cleared the range — add " + this.step() + " " + u, step: this.step() + " " + u, swapped: !!st.subs[ex.id],
        pips, sets, restText: Math.floor(ex.rest / 60) + ":" + String(ex.rest % 60).padStart(2, "0"),
        toggle: () => this.setState({ open: openHere ? null : ex.id, focusI: xi, swap: null }),
        repeat: () => {
          if (!prev){ this.say("No history for this lift yet"); return; }
          const filled = prev.map(x => x ? { w: ex.bw ? "" : this.disp(x.w), r: String(x.r) } : null);
          this.setState({ log: Object.assign({}, st.log, { [ex.id]: filled }) });
          this.say("Filled from last session");
        },
        rest: () => this.rest(ex.rest),
        swap: () => this.setState({ swap: st.swap === ex.id ? null : ex.id }),
        swapOpen: st.swap === ex.id,
        swapBg: st.swap === ex.id ? ACCENT : "transparent",
        swapFg: st.swap === ex.id ? PAPER : "var(--color-text)",
        swapLine: st.swap === ex.id ? ACCENT : LINE,
        alts: this.altsFor(ex).map(a => {
          const active = this.name(ex) === a.name;
          return {
            name: a.name + (a.orig ? " · programmed" : ""),
            bg: active ? ACCENT : "transparent", fg: active ? PAPER : "var(--color-text)",
            pick: () => {
              const subs = Object.assign({}, st.subs);
              if (a.orig) delete subs[ex.id]; else subs[ex.id] = a.name;
              this.setState({ subs, swap: null });
              this.say(a.orig ? "Back to the programmed lift" : "Swapped to " + a.name);
            }
          };
        })
      };
    });

    const fEx = this.exList[Math.min(st.focusI, this.exList.length - 1)];
    const fPrev = this.lastFor(day, fEx.id);
    const fRows = this.rows(fEx);
    let fi = fRows.findIndex(r => !r || !r.r);
    if (fi < 0) fi = fRows.length - 1;
    const fRow = fRows[fi] || {};
    const fp = fPrev && fPrev[fi] ? fPrev[fi] : null;
    const fGood = fRow.r && (!fp || Number(fRow.r) >= Number(fp.r || 0));
    const fPips = fRows.map((r, i) => {
      const p = fPrev && fPrev[i] ? fPrev[i] : null;
      const g = r && r.r && (!p || Number(r.r) >= Number(p.r || 0));
      return { line: r && r.r ? "var(--color-accent-700)" : LINE, fill: r && r.r ? (g ? ACCENT : MUTED) : (i === fi ? "var(--color-neutral-300)" : "transparent") };
    });

    /* ---- progress ---- */
    const sess = st.sessions;
    const volBars = sess.map(s => {
      const kg = this.volOf(s.log);
      const maxV = Math.max.apply(null, sess.map(x => this.volOf(x.log)).concat([1]));
      return { v: this.fmtVol(kg), h: Math.max(4, Math.round(kg / maxV * 128)), label: "D" + s.day + " " + s.date.slice(8), fill: ACCENT, kg };
    });
    const maxV = Math.max.apply(null, volBars.map(b => b.kg).concat([1]));
    const pts = volBars.map((b, i) => {
      const x = volBars.length > 1 ? (i / (volBars.length - 1)) * 300 + 10 : 160;
      const y = 142 - (b.kg / maxV) * 128;
      return x.toFixed(1) + "," + y.toFixed(1);
    });

    const liftIds = [{ id:"ht", n:"Hip thrust" }, { id:"rdl", n:"RDL" }, { id:"lpd", n:"Pulldown" }, { id:"lp", n:"Leg press" }];
    const liftRows = [];
    sess.forEach(s => {
      const l = s.log[st.lift];
      if (!l) return;
      const top = l.filter(x => x && x.w).map(x => Number(x.w));
      if (!top.length) return;
      liftRows.push({ date: s.date.slice(5), kg: Math.max.apply(null, top), reps: l.filter(x => x && x.r).map(x => x.r).join(",") });
    });
    const liftMax = Math.max.apply(null, liftRows.map(r => r.kg).concat([1]));

    const A = st.body[0], B = st.body[st.body.length - 1];
    const tapeFields = [{ k:"hip", l:"hips" }, { k:"thigh", l:"thigh" }, { k:"waist", l:"waist" }, { k:"wt", l:"weight" }];

    const filters = [{ k:"all", label:"All" }].concat([1,2,3,4].map(d => ({ k:String(d), label:"Day " + d })));
    const hist = [...st.sessions].reverse().filter(s => st.filter === "all" || s.day === st.filter);

    return {
      /* theme */
      themeStyle: THEMES[this.theme].vars,
      themes: Object.keys(THEMES).map((k, i) => ({
        label: THEMES[k].label,
        bg: this.theme === k ? ACCENT : "transparent",
        fg: this.theme === k ? "var(--color-bg)" : "var(--color-text)",
        sep: i === 0 ? "transparent" : LINE,
        pick: () => this.setState({ theme: k })
      })),

      /* chrome */
      isDesk, isPhone: !isDesk,
      shellW: isDesk ? "1180px" : "390px",
      shellH: isDesk ? "760px" : "844px",
      cols: isDesk ? "1.15fr .85fr" : "1fr",
      padBottom: isDesk ? "22px" : "18px",
      pillBottom: isDesk ? "26px" : "70px",
      toastBottom: isDesk ? "26px" : "70px",
      setPhone: () => this.setState({ view: "phone" }),
      setDesk: () => this.setState({ view: "desktop" }),
      phoneBg: on(!isDesk), phoneFg: !isDesk ? PAPER : "var(--color-text)",
      deskBg: on(isDesk), deskFg: isDesk ? PAPER : "var(--color-text)",
      storeNote: "Saved on this device · " + st.sessions.length + " sessions on file",

      navItems: [["today","Today"],["progress","Progress"],["history","History"],["body","Body"]].map(([k, l]) => ({
        label: l, go: () => this.setState({ tab: k }),
        fg: st.tab === k ? "var(--color-accent-700)" : MUTED,
        bg: st.tab === k && isDesk ? "color-mix(in srgb, var(--color-accent) 9%, transparent)" : "transparent",
        bar: st.tab === k ? ACCENT : "transparent"
      })),
      tabToday: st.tab === "today", tabProgress: st.tab === "progress",
      tabHistory: st.tab === "history", tabBody: st.tab === "body",
      eyebrow: st.tab === "today" ? "Session in progress · " + st.sessions.length + " logged"
             : st.tab === "progress" ? "Twelve weeks, plotted"
             : st.tab === "history" ? "Everything on file" : "Tape, not scale",
      title: st.tab === "today" ? "Day " + day + " — " + P.label
           : st.tab === "progress" ? "Progress" : st.tab === "history" ? "Past sessions" : "Measurements",
      sessionCount: st.sessions.length,
      unitLabel: u, repLabel: PROGRAM[day].ex.some(e => e.time) ? "reps / sec" : "reps",
      stepText: this.step() + " " + u,

      /* today */
      days: [1,2,3,4].map(d => ({
        id: d, label: PROGRAM[d].label,
        bg: String(d) === day ? ACCENT : PAPER,
        fg: String(d) === day ? PAPER : "var(--color-text)",
        pick: () => this.setState({ day: String(d), open: PROGRAM[d].ex[0].id, focusI: 0, log: String(d) === day ? st.log : {}, swap: null })
      })),
      dayTag: "day " + day, dayNote: P.note,
      volNow: this.fmtVol(nowVolKg), volPrev: this.fmtVol(prevVolKg),
      volPct: Math.min(100, Math.round(nowVolKg / peak * 100)),
      prevPct: Math.min(100, Math.round(prevVolKg / peak * 100)),
      aheadText: done ? ahead + " of " + done + " sets ahead" : "nothing logged yet",
      setsDone: done, setsTotal: totalSets,
      progressNote: nowVolKg >= prevVolKg && nowVolKg > 0 ? "past last session" : prevVolKg ? this.fmtVol(prevVolKg - nowVolKg) + " " + u + " to go" : "no benchmark",
      exercises, posture: POSTURE.map((p, i) => {
        const done2 = st.posture.includes(i);
        return {
          label: p, mark: done2 ? "✓" : "", fg: done2 ? MUTED : "var(--color-text)",
          line: done2 ? ACCENT : LINE, fill: done2 ? ACCENT : "transparent",
          toggle: () => this.setState({ posture: done2 ? st.posture.filter(x => x !== i) : st.posture.concat([i]) })
        };
      }),
      isFlow: this.layout === "flow", isFocus: this.layout === "focus",
      setFlow: () => this.setState({ layout: "flow" }), setFocus: () => this.setState({ layout: "focus" }),
      flowBg: on(this.layout === "flow"), flowFg: this.layout === "flow" ? PAPER : "var(--color-text)",
      focusBg: on(this.layout === "focus"), focusFg: this.layout === "focus" ? PAPER : "var(--color-text)",

      /* focus mode */
      focusIdx: Math.min(st.focusI, this.exList.length - 1) + 1, focusCount: this.exList.length,
      focusName: this.name(fEx), focusTarget: fEx.s + " × " + (fEx.lo === fEx.hi ? fEx.lo : fEx.lo + "–" + fEx.hi) + (fEx.side ? " " + fEx.side : ""),
      focusLast: fPrev ? "last " + (fPrev[0] && fPrev[0].w ? this.disp(fPrev[0].w) + " " + u : "bw") + " × " + fPrev.filter(x => x && x.r).map(x => x.r).join(",") : "no history",
      focusPips: fPips, focusSetNo: fi + 1,
      focusW: fRow.w === undefined ? "" : fRow.w, focusR: fRow.r === undefined ? "" : fRow.r,
      focusWPh: fEx.bw ? "bw" : (fp && fp.w ? this.disp(fp.w) : "—"),
      focusRPh: fp && fp.r ? String(fp.r) : String(fEx.lo),
      focusPrevSet: fp ? (fp.w ? this.disp(fp.w) + " " + u + " × " + fp.r : "bw × " + fp.r) : "first time",
      focusDelta: fRow.r && fp ? (Number(fRow.r) - Number(fp.r || 0) >= 0 ? "+" : "") + (Number(fRow.r) - Number(fp.r || 0)) + " reps" : (fRow.r ? "logged" : "—"),
      focusDeltaFg: fGood ? "var(--color-accent-700)" : MUTED,
      focusWSet: e => this.setVal(fEx.id, fi, "w", e.target.value),
      focusRSet: e => this.setVal(fEx.id, fi, "r", e.target.value),
      focusWUp: () => this.nudge(fEx.id, fi, "w", 1), focusWDown: () => this.nudge(fEx.id, fi, "w", -1),
      focusRUp: () => this.nudge(fEx.id, fi, "r", 1), focusRDown: () => this.nudge(fEx.id, fi, "r", -1),
      focusLogLabel: fRow.r ? "Log set " + (fi + 1) + " · rest " + Math.floor(fEx.rest / 60) + ":" + String(fEx.rest % 60).padStart(2, "0") : "Log set " + (fi + 1),
      focusLog: () => {
        if (!fRow.r){ this.setVal(fEx.id, fi, "r", String(fEx.lo)); this.say("Reps set to the bottom of the range"); return; }
        this.rest(fEx.rest);
        if (fi >= fRows.length - 1 && st.focusI < this.exList.length - 1) this.setState({ focusI: st.focusI + 1 });
      },
      focusRestText: Math.floor(fEx.rest / 60) + ":" + String(fEx.rest % 60).padStart(2, "0"),
      focusRest: () => this.rest(fEx.rest),
      focusPrev: () => this.setState({ focusI: Math.max(0, st.focusI - 1), swap: null }),
      focusNext: () => this.setState({ focusI: Math.min(this.exList.length - 1, st.focusI + 1), swap: null }),
      focusSwap: () => this.setState({ swap: st.swap === fEx.id ? null : fEx.id }),
      focusSwapOpen: st.swap === fEx.id,
      focusCues: (CUES[fEx.id] || []).map((c, i) => ({ n: i + 1, text: c })),
      focusSlotId: "demo-" + fEx.id,
      focusDemoHint: "Drop a photo or clip of " + this.name(fEx).toLowerCase(),
      demoW: isDesk ? "230px" : "142px",
      focusAlts: this.altsFor(fEx).map(a => {
        const active = this.name(fEx) === a.name;
        return {
          name: a.name + (a.orig ? " · programmed" : ""),
          bg: active ? ACCENT : "transparent", fg: active ? PAPER : "var(--color-text)",
          pick: () => {
            const subs = Object.assign({}, st.subs);
            if (a.orig) delete subs[fEx.id]; else subs[fEx.id] = a.name;
            this.setState({ subs, swap: null });
          }
        };
      }),

      finish: () => {
        const log = {};
        Object.entries(st.log).forEach(([k, arr]) => {
          const kept = (arr || []).map(x => (x && x.r) ? { w: x.w ? String(this.toKg(x.w)) : "", r: x.r } : null);
          if (kept.some(Boolean)) log[k] = kept;
        });
        if (!Object.keys(log).length){ this.say("Log a set first"); return; }
        const rec = { id: "n" + Date.now(), date: "2026-07-29", day: day, log };
        this.setState({ sessions: st.sessions.concat([rec]), log: {}, open: this.exList[0].id, focusI: 0, tOn: false });
        clearInterval(this._t);
        this.say("Session saved · " + this.fmtVol(this.volOf(log)) + " " + u);
      },
      finishBg: done ? ACCENT : "transparent",
      finishFg: done ? PAPER : MUTED,
      finishLine: done ? ACCENT : LINE,

      /* progress */
      stats: [
        { v: st.sessions.length, l: "sessions" },
        { v: this.fmtVol(st.sessions.slice(-2).reduce((a, s) => a + this.volOf(s.log), 0)), l: "last 2 · " + u },
        { v: Math.round(st.sessions.reduce((a, s) => a + Object.values(s.log).reduce((b, l) => b + l.filter(Boolean).length, 0), 0) / Math.max(1, st.sessions.length)) + " sets", l: "per session" },
        { v: "+" + (Number(B.hip) - Number(A.hip)).toFixed(1) + '"', l: "hips" }
      ],
      isBars: this.chart === "bars", isLines: this.chart === "lines",
      setBars: () => this.setState({ chart: "bars" }), setLines: () => this.setState({ chart: "lines" }),
      barsBg: on(this.chart === "bars"), barsFg: this.chart === "bars" ? PAPER : "var(--color-text)",
      linesBg: on(this.chart === "lines"), linesFg: this.chart === "lines" ? PAPER : "var(--color-text)",
      volBars,
      volLine: pts.join(" "),
      volArea: pts.length ? ["10,142"].concat(pts, [(pts.length > 1 ? "310" : "160") + ",142"]).join(" ") : "",
      gridMid: "10,78 310,78",
      liftChips: liftIds.map(l => ({
        name: l.n, bg: st.lift === l.id ? ACCENT : "transparent", fg: st.lift === l.id ? PAPER : "var(--color-text)",
        pick: () => this.setState({ lift: l.id })
      })),
      liftRows: liftRows.map((r, i) => ({
        date: r.date, pct: Math.round(r.kg / liftMax * 100),
        fill: i === liftRows.length - 1 ? ACCENT : "var(--color-accent-300)",
        text: this.disp(String(r.kg)) + " " + u + " × " + r.reps
      })),
      liftNote: liftRows.length > 1
        ? "Top set up " + this.disp(String(liftRows[liftRows.length - 1].kg - liftRows[0].kg)) + " " + u + " across " + liftRows.length + " sessions."
        : "Log this lift twice and the trend appears here.",
      tapeFrom: A.date,
      tapeDeltas: tapeFields.map(f => {
        const a = Number(A[f.k]), b = Number(B[f.k]);
        const ok = isFinite(a) && isFinite(b) && A[f.k] && B[f.k];
        const d = ok ? b - a : null;
        const good = f.k === "waist" ? (d !== null && d <= 0) : (d !== null && d >= 0);
        return {
          v: d === null ? "—" : (d > 0 ? "+" : "") + d.toFixed(1),
          l: f.l + (f.k === "wt" ? " · " + u : " · " + st.tape),
          fg: good ? "var(--color-accent-700)" : "var(--color-text)",
          bar: good ? ACCENT : "var(--color-neutral-300)"
        };
      }),

      /* history */
      filters: filters.map(f => ({
        label: f.label, bg: st.filter === f.k ? ACCENT : "transparent",
        fg: st.filter === f.k ? PAPER : "var(--color-text)",
        pick: () => this.setState({ filter: f.k })
      })),
      historyEmpty: !hist.length,
      history: hist.map(s => {
        const P2 = PROGRAM[s.day];
        const perEx = P2.ex.map(ex => {
          const l = s.log[ex.id];
          if (!l) return 0;
          return l.reduce((a, x) => a + (x && x.w && x.r ? Number(x.w) * Number(x.r) : (x && x.r ? Number(x.r) : 0)), 0);
        });
        const mx = Math.max.apply(null, perEx.concat([1]));
        return {
          day: s.day, label: P2.label, date: s.date,
          vol: this.fmtVol(this.volOf(s.log)),
          sets: Object.values(s.log).reduce((a, l) => a + l.filter(Boolean).length, 0),
          spark: perEx.map(v => ({ h: Math.max(2, Math.round(v / mx * 32)), fill: v ? ACCENT : LINE })),
          open: st.histOpen === s.id,
          toggle: () => this.setState({ histOpen: st.histOpen === s.id ? null : s.id }),
          lines: P2.ex.filter(ex => s.log[ex.id]).map(ex => {
            const l = s.log[ex.id].filter(Boolean);
            const ws = [...new Set(l.map(x => x.w ? this.disp(x.w) + " " + u : "bw"))];
            return { n: ex.n, v: (ws.length === 1 ? ws[0] : "mixed") + " × " + l.map(x => x.r).join(",") };
          })
        };
      }),
      backup: () => this.say("Backup file written"),

      /* body */
      mfields: [
        { k:"hip", label:"Hips, widest · " + st.tape, ph:"37.1" },
        { k:"thigh", label:"Thigh · " + st.tape, ph:"22.9" },
        { k:"waist", label:"Waist, small · " + st.tape, ph:"27.4" },
        { k:"wt", label:"Weight · " + u, ph: this.disp("50.1") }
      ].map(f => ({
        label: f.label, ph: f.ph, v: st.m[f.k],
        set: e => this.setState({ m: Object.assign({}, st.m, { [f.k]: e.target.value.replace(/[^0-9.]/g, "") }) })
      })),
      saveBody: () => {
        const m = st.m;
        if (!m.hip && !m.thigh && !m.waist && !m.wt){ this.say("Fill in at least one number"); return; }
        this.setState({ body: st.body.concat([{ date:"2026-07-29", hip:m.hip, thigh:m.thigh, waist:m.waist, wt:m.wt }]), m:{ hip:"", thigh:"", waist:"", wt:"" } });
        this.say("Measurements saved");
      },
      bodyRows: [...st.body].reverse().map(b => ({
        date: b.date,
        text: [b.hip ? "hips " + b.hip : "", b.thigh ? "thigh " + b.thigh : "", b.waist ? "waist " + b.waist : "", b.wt ? this.disp(b.wt) + " " + u : ""].filter(Boolean).join("  ·  ")
      })),
      demoCols: isDesk ? "repeat(3,1fr)" : "repeat(2,1fr)",
      demoSlots: [1,2,3,4].reduce((acc, d) => acc.concat(PROGRAM[d].ex.map(ex => ({
        id: "demo-" + ex.id, label: ex.n, ph: "Drop a GIF"
      }))), []),
      gymName: st.gym,
      gearList: GEAR.map(g => {
        const off = st.gearOff.includes(g.k);
        return {
          label: g.label,
          bg: off ? "transparent" : ACCENT,
          fg: off ? MUTED : PAPER,
          line: off ? LINE : ACCENT,
          toggle: () => this.setState({ gearOff: off ? st.gearOff.filter(x => x !== g.k) : st.gearOff.concat([g.k]) })
        };
      }),
      gearNote: (GEAR.length - st.gearOff.length) + " of " + GEAR.length + " pieces on the floor",
      setKg: () => this.switchUnit("kg"), setLb: () => this.switchUnit("lb"),
      kgBg: on(u === "kg"), kgFg: u === "kg" ? PAPER : "var(--color-text)",
      lbBg: on(u === "lb"), lbFg: u === "lb" ? PAPER : "var(--color-text)",
      setIn: () => this.setState({ tape: "in" }), setCm: () => this.setState({ tape: "cm" }),
      inBg: on(st.tape === "in"), inFg: st.tape === "in" ? PAPER : "var(--color-text)",
      cmBg: on(st.tape === "cm"), cmFg: st.tape === "cm" ? PAPER : "var(--color-text)",

      /* overlays */
      timerOn: st.tOn, clock: Math.floor(st.tLeft / 60) + ":" + String(st.tLeft % 60).padStart(2, "0"),
      skipRest: () => { clearInterval(this._t); this.setState({ tOn: false }); },
      toastOn: !!st.toast, toast: st.toast,
      welcomeOn: st.welcome === null ? !!this.props.showWelcome : st.welcome,
      dismissWelcome: () => this.setState({ welcome: false })
    };
  }
}
