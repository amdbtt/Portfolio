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

    function makeFallbackImage(w, h) {
      const g = p.createGraphics(w, h);
      g.background(20);
      g.noStroke();
      for (let i = 0; i < 80; i++) {
        g.fill(p.random(40, 220), 40);
        g.ellipse(p.random(w), p.random(h), p.random(40, 220));
      }
      g.filter(p.BLUR, 8);
      return g.get();
    }

    function processImage() {
      if (!originalImg || p.width < 2 || p.height < 2) return;
      img = originalImg.get();
      img.resize(p.width, p.height);
      img.filter(p.GRAY);
      if (CFG.invertImage) {
        img.loadPixels();
        for (let i = 0; i < img.pixels.length; i += 4) {
          img.pixels[i] = 255 - img.pixels[i];
          img.pixels[i + 1] = 255 - img.pixels[i + 1];
          img.pixels[i + 2] = 255 - img.pixels[i + 2];
        }
        img.updatePixels();
      }
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

    function generatePoints() {
      if (!img) return;
      points = [];
      const step = Math.max(3, CFG.spacing);
      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          if (p.random() > CFG.density) continue;
          points.push({
            pos: p.createVector(x, y),
            originalPos: p.createVector(x, y),
            vel: p.createVector(0, 0)
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
      if (!mirrorCtx) mirrorCtx = mirror.getContext('2d');
      if (mirror.width !== p.width || mirror.height !== p.height) {
        mirror.width = p.width;
        mirror.height = p.height;
      }
      mirrorCtx.clearRect(0, 0, mirror.width, mirror.height);
      mirrorCtx.drawImage(p.canvas, 0, 0);
    }

    function rebuild() {
      processImage();
      generatePalette();
      generatePoints();
      magnifierX = p.width / 2;
      magnifierY = p.height / 2;
      ready = !!img;
    }

    p.setup = () => {
      const { w, h } = size();
      p.createCanvas(w, h);
      lastW = w;
      lastH = h;
      p.pixelDensity(1);
      p.frameRate(COARSE ? 30 : 60);   // keep phones cool

      p.loadImage(
        IMAGE_URL,
        (loaded) => {
          originalImg = loaded;
          rebuild();
        },
        () => {
          originalImg = makeFallbackImage(Math.max(w, 640), Math.max(h, 360));
          rebuild();
        }
      );
    };

    p.windowResized = () => {
      const { w, h } = size();
      // phones fire resize when the URL bar hides/shows – ignore tiny height-only changes
      if (w === lastW && Math.abs(h - lastH) < 140) return;
      lastW = w;
      lastH = h;
      p.resizeCanvas(w, h);
      if (originalImg) rebuild();
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

      if (!ready || !img) {
        p.background(fieldBg);
        syncMirror();
        return;
      }

      p.background(fieldBg);

      magnifierX = p.lerp(magnifierX, pointerX, 0.12);
      magnifierY = p.lerp(magnifierY, pointerY, 0.12);
      applyForceField(magnifierX, magnifierY);

      img.loadPixels();
      p.noFill();

      for (const pt of points) {
        const x = pt.pos.x;
        const y = pt.pos.y;
        const d = p.dist(x, y, magnifierX, magnifierY);
        const px = p.constrain(p.floor(x), 0, img.width - 1);
        const py = p.constrain(p.floor(y), 0, img.height - 1);
        const brightness = img.pixels[(px + py * img.width) * 4];
        if (brightness === undefined) continue;

        const show = CFG.invertWireframe ? brightness < CFG.threshold : brightness > CFG.threshold;
        if (!show) continue;

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
