/* =========================================================
   Door-only force field (vanilla p5) – rides on sliding doors
   ========================================================= */
(() => {
  'use strict';
  const host = document.getElementById('gateFx');
  const mirror = document.getElementById('gateFxMirror');
  if (!host || typeof p5 === 'undefined') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const COARSE = matchMedia('(pointer: coarse)').matches;

  const CFG = {
    hue: 42,
    saturation: 48,
    threshold: 255,
    minStroke: 2,
    maxStroke: 5,
    spacing: COARSE ? 16 : 12,   // fewer points on phones = smoother
    density: COARSE ? 1.2 : 1.6,
    invertImage: true,
    invertWireframe: true,
    magnifierRadius: 140,
    forceStrength: 12,
    friction: 0.9,
    restoreSpeed: 0.05
  };

  const IMAGE_URL = 'https://cdn.pixabay.com/photo/2024/12/13/20/29/alps-9266131_1280.jpg';

  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  addEventListener('pointermove', (e) => {
    pointerX = e.clientX;
    pointerY = e.clientY;
  }, { passive: true });

  new p5((p) => {
    let originalImg = null;
    let img = null;
    let palette = [];
    let points = [];
    let magnifierX = 0;
    let magnifierY = 0;
    let ready = false;
    let lastW = 0;
    let lastH = 0;
    let mirrorCtx = null;

    function size() {
      return {
        w: Math.max(1, window.innerWidth),
        h: Math.max(1, window.innerHeight)
      };
    }

    function processImage() {
      if (!originalImg || p.width < 2 || p.height < 2) return;
      img = originalImg.get();
      /* Keep the sample small so the first photo swap doesn't freeze the door. */
      const cap = COARSE ? 280 : 420;
      const scale = Math.min(p.width / img.width, p.height / img.height, cap / Math.max(img.width, img.height));
      img.resize(Math.max(2, Math.round(img.width * scale)), Math.max(2, Math.round(img.height * scale)));
      img.filter(p.GRAY);
      if (CFG.invertImage) {
        img.loadPixels();
        const px = img.pixels;
        for (let i = 0; i < px.length; i += 4) {
          const v = 255 - px[i];
          px[i] = px[i + 1] = px[i + 2] = v;
        }
        img.updatePixels();
      }
      img.loadPixels();
    }

    function readField() {
      const cs = getComputedStyle(document.documentElement);
      const hue = parseFloat(cs.getPropertyValue('--ff-hue'));
      const sat = parseFloat(cs.getPropertyValue('--ff-sat'));
      if (!Number.isNaN(hue)) CFG.hue = hue;
      if (!Number.isNaN(sat)) CFG.saturation = sat;
      return (cs.getPropertyValue('--ff-bg') || '#050508').trim();
    }

    function generatePalette() {
      readField();
      palette = [];
      p.push();
      p.colorMode(p.HSL);
      for (let i = 0; i < 12; i++) {
        palette.push(p.color(CFG.hue, CFG.saturation, p.map(i, 0, 11, 92, 8)));
      }
      p.pop();
    }

    /* Dots are on screen before any photo work. Brightness is stored on the point. */
    function generatePoints() {
      points = [];
      const step = Math.max(3, CFG.spacing);
      const keep = Math.min(CFG.density, 0.85);
      const useImg = !!(img && img.pixels && img.pixels.length);
      const iw = useImg ? img.width : 0;
      const ih = useImg ? img.height : 0;
      for (let y = step; y < p.height; y += step) {
        for (let x = step; x < p.width; x += step) {
          if (p.random() > keep) continue;
          let brightness = 80 + ((x * 5 + y * 3) % 140);
          if (useImg) {
            const px = Math.min(iw - 1, (x * iw / p.width) | 0);
            const py = Math.min(ih - 1, (y * ih / p.height) | 0);
            const v = img.pixels[(px + py * iw) * 4];
            if (v === undefined) continue;
            const show = CFG.invertWireframe ? v < CFG.threshold : v > CFG.threshold;
            if (!show) continue;
            brightness = v;
          }
          points.push({
            pos: p.createVector(x, y),
            originalPos: p.createVector(x, y),
            vel: p.createVector(0, 0),
            brightness
          });
        }
      }
    }

    function applyForceField(mx, my) {
      const mouse = p.createVector(mx, my);
      for (const pt of points) {
        const dir = p5.Vector.sub(pt.pos, mouse);
        const d = dir.mag();
        if (d < CFG.magnifierRadius && d > 0.001) {
          dir.normalize();
          dir.mult(CFG.forceStrength / d);
          pt.vel.add(dir);
        }
        pt.vel.mult(CFG.friction);
        pt.vel.add(p5.Vector.sub(pt.pos, pt.originalPos).mult(-CFG.restoreSpeed));
        pt.pos.add(pt.vel);
      }
    }

    function syncMirror() {
      if (!mirror || !p.canvas) return;
      const door = mirror.parentElement;
      const w = Math.max(1, door ? door.clientWidth : Math.floor(p.width / 2));
      const h = Math.max(1, door ? door.clientHeight : p.height);
      if (!mirrorCtx) mirrorCtx = mirror.getContext('2d');
      if (mirror.width !== w || mirror.height !== h) {
        mirror.width = w;
        mirror.height = h;
      }
      mirrorCtx.clearRect(0, 0, w, h);
      // Right door is only half the screen — copy the right half, no negative offset
      // (iOS drops a canvas that is shifted outside an overflow-hidden transformed door).
      mirrorCtx.drawImage(p.canvas, p.width / 2, 0, p.width / 2, p.height, 0, 0, w, h);
    }

    function rebuild() {
      if (originalImg) processImage();
      generatePalette();
      generatePoints();
      magnifierX = p.width / 2;
      magnifierY = p.height / 2;
      ready = points.length > 0;
    }

    p.setup = () => {
      const { w, h } = size();
      p.createCanvas(w, h);
      lastW = w;
      lastH = h;
      p.pixelDensity(1);
      p.frameRate(COARSE ? 30 : 60);

      /* Paint the field on the first frame. The photo only refines it later. */
      rebuild();
      p.loadImage(IMAGE_URL, (loaded) => {
        originalImg = loaded;
        rebuild();
      });
    };

    p.windowResized = () => {
      const { w, h } = size();
      // phones fire resize when the URL bar hides/shows – ignore tiny height-only changes
      if (w === lastW && Math.abs(h - lastH) < 140) return;
      lastW = w;
      lastH = h;
      p.resizeCanvas(w, h);
      rebuild();
    };

    p.draw = () => {
      const open = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--open')) || 0;
      if (open >= 0.98) {
        p.clear();
        syncMirror();
        return;
      }

      const prevHue = CFG.hue;
      const prevSat = CFG.saturation;
      const fieldBg = readField();
      if (!palette.length || prevHue !== CFG.hue || prevSat !== CFG.saturation) generatePalette();

      if (!ready) {
        p.background(fieldBg);
        syncMirror();
        return;
      }

      p.background(fieldBg);

      magnifierX = p.lerp(magnifierX, pointerX, 0.12);
      magnifierY = p.lerp(magnifierY, pointerY, 0.12);
      applyForceField(magnifierX, magnifierY);

      p.noFill();

      for (const pt of points) {
        const x = pt.pos.x;
        const y = pt.pos.y;
        const d = p.dist(x, y, magnifierX, magnifierY);
        const brightness = pt.brightness;

        const shadeIndex = p.constrain(Math.floor(p.map(brightness, 0, 255, 0, palette.length - 1)), 0, palette.length - 1);
        let strokeSize = p.map(brightness, 0, 255, CFG.minStroke, CFG.maxStroke);
        if (d < CFG.magnifierRadius) {
          strokeSize *= p.map(d, 0, CFG.magnifierRadius, 2, 1);
        }

        if (palette[shadeIndex]) {
          p.stroke(palette[shadeIndex]);
          p.strokeWeight(strokeSize);
          p.point(x, y);
        }
      }

      syncMirror();
    };
  }, host);
})();
