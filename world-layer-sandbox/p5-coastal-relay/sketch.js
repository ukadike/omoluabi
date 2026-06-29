/*
 * Coastal Relay — a diegetic world-layer mood study.
 *
 * This is NOT the archival presentation layer and asserts NO canon. It paints
 * an abstract coastal dusk and a relay of light moving along the horizon — a
 * felt echo of the UMADA opening rhythm (tick, tick, tick, tick — BOOM) and of
 * Nago as a relay/signal idea. It depicts no Nago signs or glyphs, names no
 * real-world place, and makes no claim about the story.
 *
 * Accessibility is still infrastructure here:
 *  - prefers-reduced-motion paints one calm static frame and stops.
 *  - The canvas is aria-hidden; a text alternative lives in the figcaption.
 *  - A keyboard-reachable Motion toggle and Replay control are wired in HTML.
 */

let cnv;
let reduceMotion = false;
let motionOn = true;
let cycleStart = 0;
const CYCLE = 7200;        // ms for one tick-tick-tick-tick-BOOM cycle
const TICKS = [0.10, 0.22, 0.34, 0.46];   // four ticks
const BOOM = 0.60;          // the bloom
const STATIC_PHASE = 0.66;  // reduced-motion still frame: bloom mid-expansion
let grain;                  // pre-rendered painted grain overlay

function setup() {
  const host = document.getElementById('canvas-host');
  const w = Math.min(host.clientWidth || 960, 1100);
  const h = Math.round(w * 0.5625);
  cnv = createCanvas(w, h);
  cnv.parent(host);
  cnv.elt.setAttribute('aria-hidden', 'true');
  pixelDensity(Math.min(window.devicePixelRatio || 1, 2));
  noiseSeed(7);
  buildGrain();

  reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  cycleStart = millis();

  // ?phase=0..1 freezes the scene at one moment (handy for static previews).
  const frozen = parseFloat(new URLSearchParams(location.search).get('phase'));
  if (!Number.isNaN(frozen)) {
    motionOn = false;
    drawScene(Math.max(0, Math.min(1, frozen)));
    noLoop();
  } else if (reduceMotion) {
    motionOn = false;
    drawScene(STATIC_PHASE); // one still frame caught mid-bloom
    noLoop();
  }
  syncMotionButton();
}

function draw() {
  const phase = ((millis() - cycleStart) % CYCLE) / CYCLE;
  drawScene(phase);
}

function drawScene(phase) {
  paintSky();
  paintWeather(phase);
  paintSea(phase);
  paintHorizonGlow();
  paintRelay(phase);
  applyGrain();
  vignette();
}

/* --- painted layers --------------------------------------------------- */

function paintSky() {
  // dusk gradient: deep blue above, warm band near the horizon
  const horizon = height * 0.52;
  for (let y = 0; y < horizon; y++) {
    const t = y / horizon;
    const c = lerpColor(color(16, 28, 54), color(58, 86, 104), t);
    stroke(c);
    line(0, y, width, y);
  }
  // warm wash sitting on the horizon
  noStroke();
  for (let i = 0; i < 5; i++) {
    fill(232, 150, 96, 26);
    const bandH = lerp(height * 0.10, height * 0.02, i / 4);
    rect(0, horizon - bandH, width, bandH);
  }
}

function paintWeather(phase) {
  // a soft storm veil drifting across the upper sky
  noStroke();
  const drift = (noise(phase * 2.0) - 0.5) * width * 0.4;
  for (let i = 0; i < 7; i++) {
    const cx = width * (0.2 + 0.12 * i) + drift;
    const cy = height * (0.16 + 0.04 * Math.sin(i + phase * TWO_PI));
    fill(120, 134, 150, 14);
    ellipse(cx, cy, width * 0.45, height * 0.18);
  }
  // faint rain veil on the left third
  stroke(150, 165, 180, 18);
  strokeWeight(1);
  for (let i = 0; i < 60; i++) {
    const x = (noise(i * 0.3, phase) * width * 0.4);
    const y = noise(i * 0.7, phase * 1.3) * height * 0.5;
    line(x, y, x - 6, y + 22);
  }
}

function paintSea(phase) {
  const horizon = height * 0.52;
  noStroke();
  for (let y = horizon; y < height; y++) {
    const t = (y - horizon) / (height - horizon);
    const c = lerpColor(color(34, 58, 72), color(14, 26, 36), t);
    stroke(c);
    line(0, y, width, y);
  }
  // reflected warm streak + shimmer
  noStroke();
  for (let i = 0; i < 90; i++) {
    const t = i / 90;
    const y = lerp(horizon + 2, height, t);
    const shimmer = noise(t * 6, phase * 3) ;
    const x = width * 0.5 + (shimmer - 0.5) * width * 0.5 * t;
    const w = lerp(2, 26, t) * (0.6 + shimmer);
    fill(240, 168, 110, 10 + 14 * (1 - t));
    ellipse(x, y, w, lerp(1, 4, t));
  }
}

function paintHorizonGlow() {
  const horizon = height * 0.52;
  noStroke();
  for (let r = 0; r < 6; r++) {
    fill(255, 214, 150, 12);
    ellipse(width * 0.5, horizon, width * (0.5 - r * 0.06), height * (0.06 - r * 0.008));
  }
  stroke(255, 226, 180, 60);
  strokeWeight(1.4);
  line(0, horizon, width, horizon);
}

function paintRelay(phase) {
  const horizon = height * 0.52;
  noStroke();
  // four travelling ticks
  for (let i = 0; i < TICKS.length; i++) {
    const start = TICKS[i];
    const life = (phase - start) / 0.16;        // 0..1 over its short life
    if (life < 0 || life > 1) continue;
    const x = lerp(width * 0.12, width * 0.5, life);
    const a = Math.sin(life * Math.PI) * 220;    // ease in/out
    glow(x, horizon, lerp(8, 20, life), color(255, 220, 150), a);
  }
  // the BOOM bloom expanding from the convergence point
  const bl = (phase - BOOM) / 0.34;
  if (bl >= 0 && bl <= 1) {
    const ease = 1 - Math.pow(1 - bl, 3);
    const radius = lerp(12, width * 1.0, ease);
    const fade = Math.pow(1 - bl, 1.3);          // hold brightness longer

    // initial white flash + a vertical light pillar at the origin
    if (bl < 0.5) {
      const flash = (0.5 - bl) / 0.5;
      glow(width * 0.5, horizon, lerp(60, 200, bl), color(255, 251, 240), 245 * flash);
      noStroke();
      fill(255, 250, 235, 150 * flash);
      ellipse(width * 0.5, horizon, lerp(26, 120, bl), height * lerp(0.5, 1.1, bl));
    }

    // bright concentric rings that arc up into the sky and down over the water
    noFill();
    for (let r = 0; r < 4; r++) {
      stroke(255, 248, 230, 255 * fade * (1 - r * 0.14));
      strokeWeight(lerp(11, 2.5, bl));
      ellipse(width * 0.5, horizon, radius * (1 + r * 0.18), radius * (0.7 + r * 0.1));
    }
    // sustained core glow on the horizon
    glow(width * 0.5, horizon, lerp(60, 150, bl), color(255, 249, 230), 220 * fade);
  }
}

function glow(x, y, r, col, a) {
  noStroke();
  for (let i = 6; i >= 1; i--) {
    col.setAlpha(a * (i === 1 ? 1 : 0.12));
    fill(col);
    ellipse(x, y, r * i * 0.5, r * i * 0.5);
  }
}

/* --- painted texture -------------------------------------------------- */

function buildGrain() {
  grain = createGraphics(width, height);
  grain.noStroke();
  for (let i = 0; i < width * height * 0.12; i++) {
    const g = random(255);
    grain.fill(g, g, g, 8);
    grain.rect(random(width), random(height), 1, 1);
  }
}

function applyGrain() {
  push();
  blendMode(OVERLAY);
  tint(255, 40);
  image(grain, 0, 0);
  pop();
}

function vignette() {
  noFill();
  for (let r = 0; r < 60; r++) {
    stroke(8, 12, 20, 2);
    strokeWeight(2);
    rect(r, r, width - r * 2, height - r * 2);
  }
}

/* --- controls --------------------------------------------------------- */

function replay() {
  cycleStart = millis();
  if (!isLooping()) {
    redraw();
    if (motionOn && !reduceMotion) loop();
  }
}

function toggleMotion() {
  if (reduceMotion) return;       // honour the OS preference; stay static
  motionOn = !motionOn;
  if (motionOn) loop(); else noLoop();
  syncMotionButton();
}

function syncMotionButton() {
  const btn = document.getElementById('motion-toggle');
  if (!btn) return;
  if (reduceMotion) {
    btn.textContent = 'Motion off (system reduced-motion)';
    btn.setAttribute('aria-pressed', 'false');
    btn.disabled = true;
  } else {
    btn.textContent = motionOn ? 'Pause motion' : 'Play motion';
    btn.setAttribute('aria-pressed', String(motionOn));
  }
}

function windowResized() {
  const host = document.getElementById('canvas-host');
  const w = Math.min(host.clientWidth || 960, 1100);
  resizeCanvas(w, Math.round(w * 0.5625));
  buildGrain();
  if (!isLooping()) drawScene(reduceMotion ? STATIC_PHASE : ((millis() - cycleStart) % CYCLE) / CYCLE);
}

window.addEventListener('DOMContentLoaded', () => {
  const r = document.getElementById('replay');
  const m = document.getElementById('motion-toggle');
  if (r) r.addEventListener('click', replay);
  if (m) m.addEventListener('click', toggleMotion);
});
