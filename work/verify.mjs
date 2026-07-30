// End-to-end render check without a browser: run the patched template through
// the real React + dc-runtime in jsdom and inspect what the app actually
// produces. Chromium won't launch in this sandbox (missing libXdamage, no root
// to install it), and the render pipeline here is plain DOM work, so jsdom
// exercises the part that matters — does dc-runtime turn my <img src="{{ }}">
// into a real src, in both the Focus frame and the 27-tile grid.
import fs from 'node:fs';
import { JSDOM, VirtualConsole } from 'jsdom';

const W = '/sessions/gracious-lucid-pasteur/mnt/outputs/work/';
const read = (f) => fs.readFileSync(W + f, 'utf8');

const tpl = read('template.html');
const react = read('asset_29ae5685.bin');       // react 18.3.1 umd
const reactDom = read('asset_0bdf86a5.bin');    // react-dom 18.3.1 umd
const runtime = read('asset_6ac09abf.bin');     // dc-runtime

// Swap the uuid script refs for real inline code. image-slot (0e6c4cbb) is
// dropped: nothing references it any more, and custom elements add noise.
// Function replacers, not string ones — minified React is full of `$` runs and
// String.replace would read `$&` / `$'` in them as substitution patterns and
// quietly mangle the source.
let html = tpl
  .replace(/<script src="6ac09abf-[^"]*"><\/script>/, () =>
    `<script>${react}</script><script>${reactDom}</script>` +
    `<script>window.__resources={};</script><script>${runtime}</script>`)
  .replace(/<script src="0e6c4cbb-[^"]*"><\/script>/, () => '')
  .replace(/<script src="97c6af46-[^"]*"><\/script>/, () => '');

const vc = new VirtualConsole();
const logs = [];
vc.on('jsdomError', (e) => logs.push('jsdomError: ' + e.message.slice(0, 300)));
vc.on('error', (...a) => logs.push('error: ' + a.join(' ').slice(0, 300)));
vc.on('warn', (...a) => logs.push('warn: ' + a.join(' ').slice(0, 200)));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'https://example.test/',
  virtualConsole: vc,
});

await new Promise((r) => setTimeout(r, 3000));
const { document } = dom.window;

const CDN = 'cdn.jsdelivr.net/gh/yuhonas/free-exercise-db';
const snap = (label) => {
  const imgs = [...document.querySelectorAll('.demo2 img')];
  const srcs = imgs.map((i) => i.getAttribute('src'));
  const dirs = srcs.filter(Boolean)
    .map((s) => (s.split('/exercises/')[1] || '').split('/')[0]).filter(Boolean);
  return {
    label,
    demoDivs: document.querySelectorAll('.demo2').length,
    imgs: imgs.length,
    bFrames: imgs.filter((i) => i.className === 'b').length,
    withCdnSrc: srcs.filter((s) => s && s.includes(CDN)).length,
    emptyOrMissingSrc: srcs.filter((s) => !s).length,
    unresolvedHoles: srcs.filter((s) => s && s.includes('{{')).length,
    uniqueExercises: new Set(dirs).size,
    leftoverImageSlots: document.querySelectorAll('image-slot').length,
    altSample: imgs[0]?.getAttribute('alt'),
    srcSample: srcs[0],
  };
};

// Click the leaf element whose text is exactly `label`.
async function click(label) {
  const el = [...document.querySelectorAll('*')].find(
    (e) => e.children.length === 0 &&
      e.textContent.trim().toLowerCase() === label.toLowerCase()
  );
  if (!el) return false;
  el.dispatchEvent(new dom.window.MouseEvent('click', { bubbles: true }));
  await new Promise((r) => setTimeout(r, 1200));
  return true;
}

const initial = snap('initial (Today, List layout)');

// The Focus layout is where the single demo frame lives; List mode has none.
const wentFocus = await click('Focus');
const focus = snap('Today, Focus layout');

// Settings holds the full 27-tile grid.
const wentSettings = await click('Body');
const settings = snap('Body tab, Movement demos grid');

// Does the two-frame loop have a keyframe rule to run against?
const css = [...document.querySelectorAll('style')].map((s) => s.textContent).join('\n');
const cssChecks = {
  hasDemoLoopKeyframes: /@keyframes\s+demoLoop/.test(css),
  hasBFrameAnimation: /\.demo2 img\.b\{[^}]*animation:\s*demoLoop/.test(css),
  hasReducedMotionGuard: /prefers-reduced-motion[\s\S]{0,120}\.demo2 img\.b\{animation:none/.test(css),
  hasEmptySrcGuard: /\.demo2 img\[src=""\]\{display:none\}/.test(css),
};

console.log(JSON.stringify({
  appMounted: document.body.textContent.replace(/\s+/g, ' ').trim().length > 200,
  clicks: { wentFocus, wentSettings },
  initial, focus, settings, cssChecks,
}, null, 1));
console.log('\n── console output from the page ──');
console.log(logs.length ? [...new Set(logs)].slice(0, 10).join('\n') : 'clean');
