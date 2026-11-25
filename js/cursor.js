/* =========================================================
   Character trail + bisque arrow/hand cursor (light + dark)
   ========================================================= */
(() => {
  'use strict';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(pointer: coarse)').matches) return;

  const CHARACTERS = ['m', 'a', '✦', '·'];
  const palette = () => {
    const cs = getComputedStyle(document.documentElement);
    const v = name => cs.getPropertyValue(name).trim();
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    return light
      ? [v('--violet'), v('--violet2'), v('--orange'), v('--blue'), v('--ink')]
      : [v('--violet'), v('--violet2'), v('--ink'), v('--blue'), v('--muted')];
  };
  let COLORS = palette();
  const FONT = '600 14px "Inter Tight", Inter, sans-serif';
  const SPAWN_GAP = 28;
  const MAX_PARTICLES = 18;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.className = 'char-cursor-layer';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  document.documentElement.classList.add('has-custom-cursor');

  const cursor = document.createElement('div');
  cursor.className = 'site-cursor';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `
    <img class="site-cursor__arrow" src="assets/cursor-arrow.svg" alt="" width="32" height="32" draggable="false">
    <img class="site-cursor__hand" src="assets/cursor-hand.svg" alt="" width="32" height="36" draggable="false">
  `;
  document.body.appendChild(cursor);

  let width = 0;
  let height = 0;
  let particles = [];
  let canvImages = [];
  let lastX = -999;
  let lastY = -999;
  let mx = 0;
  let my = 0;
  let raf = 0;

  const randSign = () => (Math.random() < 0.5 ? -1 : 1);

  class Particle {
    constructor(x, y, img) {
      this.lifeSpan = Math.floor(Math.random() * 28 + 36);
      this.initialLifeSpan = this.lifeSpan;
      this.age = 0;
      this.rotationSign = randSign();
      this.velocity = {
        x: randSign() * Math.random() * 2.2,
        y: randSign() * Math.random() * 2.2
      };
      this.position = { x, y };
      this.canv = img;
    }

    update(context) {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;
      this.age++;
      this.velocity.x += randSign() / 45;
      this.velocity.y += randSign() / 55;

      const scale = Math.max((this.lifeSpan / this.initialLifeSpan) * 1.35, 0);
      const degrees = this.rotationSign * (this.lifeSpan / 8);
      const radians = degrees * 0.0174533;

      context.save();
      context.translate(this.position.x, this.position.y);
      context.rotate(radians);
      context.globalAlpha = Math.max(this.lifeSpan / this.initialLifeSpan, 0);
      context.drawImage(
        this.canv,
        (-this.canv.width / 2) * scale,
        (-this.canv.height / 2) * scale,
        this.canv.width * scale,
        this.canv.height * scale
      );
      context.restore();
    }
  }

  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const buildGlyphs = () => {
    canvImages = [];
    CHARACTERS.forEach((char) => {
      const measure = document.createElement('canvas').getContext('2d');
      if (!measure) return;
      measure.font = FONT;
      const m = measure.measureText(char);
      const bg = document.createElement('canvas');
      const bgCtx = bg.getContext('2d');
      if (!bgCtx) return;
      const ascent = m.actualBoundingBoxAscent || 12;
      bg.width = Math.ceil(m.width + 4);
      bg.height = Math.ceil(ascent * 2.4);
      bgCtx.font = FONT;
      bgCtx.textAlign = 'center';
      bgCtx.textBaseline = 'middle';
      bgCtx.fillStyle = COLORS[Math.floor(Math.random() * COLORS.length)];
      bgCtx.fillText(char, bg.width / 2, ascent);
      canvImages.push(bg);
    });
  };

  const addParticle = (x, y) => {
    if (!canvImages.length) return;
    if (particles.length >= MAX_PARTICLES) particles.shift();
    const img = canvImages[Math.floor(Math.random() * canvImages.length)];
    particles.push(new Particle(x, y, img));
  };

  const onMove = (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    const dx = mx - lastX;
    const dy = my - lastY;
    if (dx * dx + dy * dy >= SPAWN_GAP * SPAWN_GAP) {
      lastX = mx;
      lastY = my;
      addParticle(mx, my);
    }
  };

  const onOver = (e) => {
    const t = e.target;
    const hovering = !!(t && t.closest && t.closest('a, button, .btn-cream, .btn-ghost, input, textarea, label, .theme, .burger'));
    document.documentElement.classList.toggle('cursor-hover', hovering);
  };

  const loop = () => {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) particles[i].update(ctx);
    for (let i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) particles.splice(i, 1);
    }
    raf = requestAnimationFrame(loop);
  };

  resize();
  buildGlyphs();
  new MutationObserver(() => {
    COLORS = palette();
    buildGlyphs();
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  addEventListener('mousemove', onMove, { passive: true });
  addEventListener('mouseover', onOver, { passive: true });
  addEventListener('resize', resize);
  raf = requestAnimationFrame(loop);
})();
