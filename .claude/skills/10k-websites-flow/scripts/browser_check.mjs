/**
 * Real-browser verification harness. Node 22+ (built-in WebSocket, no npm install).
 *
 * WHY: you cannot ship this class of site without looking at it. Static reasoning
 * misses stacking-context bugs, blend-mode bugs, CSS override bugs and text
 * collisions every single time.
 *
 * SETUP (run these two first, from the project root):
 *   python3 -m http.server 8777 --bind 127.0.0.1 &
 *   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
 *     --remote-debugging-port=9222 --disable-gpu --hide-scrollbars \
 *     --user-data-dir=/tmp/cprof about:blank &
 *
 * USAGE
 *   node browser_check.mjs shots  <outdir> '[{"name":"s1","t":2.5}, ...]'   (t = VIDEO SECONDS)
 *   node browser_check.mjs audit  <outdir>
 *   node browser_check.mjs excl   <outdir>
 *   node browser_check.mjs fileproto <outdir> <abs path to index.html>
 *
 * ALWAYS kill the server and Chrome when done:
 *   pkill -f "remote-debugging-port=9222"; pkill -f "http.server 8777"
 */
import fs from 'node:fs';

const URL_PAGE = 'http://127.0.0.1:8777/index.html';
const MODE = process.argv[2], OUT = process.argv[3], ARG = process.argv[4];

const targets = await (await fetch('http://127.0.0.1:9222/json')).json();
const page = targets.find(t => t.type === 'page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
let id = 0; const pend = new Map(); const errs = [];
ws.onmessage = e => {
  const m = JSON.parse(e.data);
  if (m.id && pend.has(m.id)) { pend.get(m.id)(m.result || m.error); pend.delete(m.id); }
  if (m.method === 'Runtime.exceptionThrown') errs.push('EXC ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text).slice(0, 120));
  if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') errs.push('ERR ' + m.params.entry.text.slice(0, 120));
};
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = x => send('Runtime.evaluate', { expression: x, returnByValue: true }).then(r => r.result?.value ?? ('THREW ' + (r.exceptionDetails?.text || '')));
const wait = ms => new Promise(r => setTimeout(r, ms));
await new Promise(r => ws.onopen = r);
await send('Page.enable'); await send('Runtime.enable'); await send('Log.enable');

async function viewport(w, h, mobile = false, dsf = 1) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: dsf, mobile });
}
async function open(url = URL_PAGE, settle = 5000) { await send('Page.navigate', { url }); await wait(settle); }
async function shot(name, q = 78) {
  const r = await send('Page.captureScreenshot', { format: 'jpeg', quality: q, fromSurface: true });
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}/${name}.jpg`, Buffer.from(r.data, 'base64'));
}
/* Scroll to a VIDEO TIME, not a pixel. The mapping is derived from the live DOM
   so it stays correct if --pps or the duration changes. */
async function seekTo(t) {
  await ev(`(()=>{const tr=document.getElementById('track');
    const max=tr.offsetHeight-window.innerHeight;
    const d=document.getElementById('hero').duration||24;
    window.scrollTo(0, tr.offsetTop + max*(${t}/d)); })()`);
  /* 2.4s: headless Chrome needs real time to decode and COMPOSITE a seeked frame.
     Shorter waits silently screenshot frame 0 and you will believe scrubbing is broken. */
  await wait(2400);
  return await ev('+document.getElementById("hero").currentTime.toFixed(2)');
}

if (MODE === 'shots') {
  await viewport(1440, 900); await open();
  for (const s of JSON.parse(ARG)) {
    const ct = await seekTo(s.t);
    console.log(`${s.name}\trequested ${s.t}s\tvideo at ${ct}s ${Math.abs(ct - s.t) > 0.3 ? '  <-- MISMATCH, seek failed' : ''}`);
    await shot(s.name);
  }
  console.log('console:', JSON.stringify(errs.slice(0, 6)));
}

if (MODE === 'excl') {
  /* Proves scene exclusivity across the WHOLE scroll range, not at sampled scenes.
     Uses the same ramp formula the site uses, so it tests the contract, not the paint. */
  await viewport(1440, 900); await open();
  console.log(await ev(`(()=>{
    const ui=[...document.querySelectorAll('.ui > [data-start]')];
    const ty=[...document.querySelectorAll('.typelayer > [data-start]')];
    const d=document.getElementById('hero').duration||24;
    const RAMP=+(getComputedStyle(document.documentElement).getPropertyValue('--ramp')||0.25);
    let wu=0,wt=0,bad=[];
    for(let i=0;i<=600;i++){
      const t=(i/600)*d;
      const op=e=>{const a=+e.dataset.start,b=+e.dataset.end;
        return Math.max(0,Math.min(1,(t-a)/RAMP,(b-t)/RAMP));};
      const nu=ui.filter(e=>op(e)>0).length, nt=ty.filter(e=>op(e)>0).length;
      wu=Math.max(wu,nu); wt=Math.max(wt,nt);
      if(nu>1||nt>1) bad.push(+t.toFixed(2));
    }
    return JSON.stringify({maxSimultaneousUiScenes:wu,maxSimultaneousTypeScenes:wt,
      overlapTimes:bad.slice(0,6), verdict:(wu<=1&&wt<=1)?'PASS':'FAIL'});
  })()`));
}

if (MODE === 'audit') {
  const line = (k, v) => console.log(k.padEnd(34) + v);
  /* mobile */
  await viewport(390, 844, true, 2);
  await send('Emulation.setEmitTouchEventsForMouse', { enabled: true, configuration: 'mobile' });
  await open();
  line('mobile horizontal overflow', await ev('document.documentElement.scrollWidth>window.innerWidth'));
  line('mobile video hidden', await ev('getComputedStyle(document.getElementById("hero")).display'));
  line('mobile blend disabled', await ev(`getComputedStyle(document.querySelector('.ui .body')).mixBlendMode`));
  line('mobile all content visible', await ev(`[...document.querySelectorAll('.ui [data-start]')].every(e=>getComputedStyle(e).visibility==='visible')`));
  line('mobile targets under 44px', await ev(`JSON.stringify([...document.querySelectorAll('a,button,summary')].map(e=>{const b=e.getBoundingClientRect();return b.height>0&&b.height<44?(e.className||e.tagName)+':'+Math.round(b.height):null}).filter(Boolean))`));
  await shot('audit-mobile');
  await send('Emulation.setEmitTouchEventsForMouse', { enabled: false });
  /* narrow + wide desktop */
  for (const [w, h] of [[1024, 700], [1920, 1080]]) {
    await viewport(w, h); await open(URL_PAGE, 3000);
    line(`${w}x${h} horizontal overflow`, await ev('document.documentElement.scrollWidth>window.innerWidth'));
  }
  /* interaction + focus + fallback on desktop */
  await viewport(1440, 900); await open();
  const last = await ev(`(()=>{const b=[...document.querySelectorAll('.ui > [data-start]')];
     return Math.max(...b.map(e=>+e.dataset.start))+0.4})()`);
  await seekTo(last);
  line('interactive scene reached', await ev(`[...document.querySelectorAll('.ui > [data-start]')].filter(e=>getComputedStyle(e).visibility!=='hidden').map(e=>e.className).join(',')`));
  const btn = await ev(`(()=>{const b=document.querySelector('.ui [data-start] button:not([disabled])');return b?b.className:'none'})()`);
  line('first scene button', btn);
  line('hidden scenes focusable count', await ev(`(()=>{let n=0;
     document.querySelectorAll('[data-start]').forEach(h=>{ if(getComputedStyle(h).visibility!=='hidden'||h.inert) return;
       n+=h.querySelectorAll('a,button,summary,[tabindex]').length;}); return n;})()`));
  line('inert supported', await ev(`'inert' in document.createElement('div')`));
  await shot('audit-desktop-last');
  /* video-missing fallback */
  await ev(`document.getElementById('hero').src='assets/__missing__.mp4'`); await wait(1800);
  line('video error -> dead class', await ev(`document.getElementById('stage').classList.contains('dead')`));
  line('poster still displayed', await ev(`getComputedStyle(document.querySelector('.hero-still')).display`));
  line('after-stage sections alive', await ev(`document.querySelectorAll('.after section').length`));
  /* reduced motion */
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await open(URL_PAGE, 2500);
  line('reduced-motion stage position', await ev('getComputedStyle(document.querySelector(".stage")).position'));
  line('reduced-motion all visible', await ev(`[...document.querySelectorAll('.ui [data-start]')].every(e=>getComputedStyle(e).visibility==='visible')`));
  await send('Emulation.setEmulatedMedia', { features: [] });
  console.log('console errors (the __missing__ 404 is expected):', JSON.stringify(errs.slice(0, 6)));
}

if (MODE === 'fileproto') {
  await viewport(1440, 900); await open('file://' + ARG, 6500);
  console.log('file:// video readyState', await ev('document.getElementById("hero").readyState'));
  console.log('file:// duration        ', await ev('document.getElementById("hero").duration'));
  console.log('file:// display font ok ', await ev(`document.fonts.check('300 100px ' + getComputedStyle(document.querySelector('.giant')).fontFamily.split(',')[0].replace(/["']/g,''))`));
  const last = await ev(`(()=>{const b=[...document.querySelectorAll('.ui > [data-start]')];
     return Math.max(...b.map(e=>+e.dataset.start))+0.4})()`);
  await seekTo(last);
  console.log('file:// scrubbed to     ', await ev('+document.getElementById("hero").currentTime.toFixed(2)'));
  console.log('file:// console         ', JSON.stringify(errs.slice(0, 5)));
}

ws.close();
