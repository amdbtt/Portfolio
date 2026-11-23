/* =========================================================
   Muhammad Ahmad portfolio – behaviour & animation
   ========================================================= */
(() => {
  'use strict';
  const D = window.DATA;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const rand = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = matchMedia('(pointer: coarse)').matches;
  const icon = k => `<svg viewBox="0 0 24 24">${D.icons[k] || ''}</svg>`;
  const esc = s => s.replace(/&/g, '&amp;');

  /* ---------------------------------------------------------
     Theme
  --------------------------------------------------------- */
  const root = document.documentElement;
  const setTheme = t => {
    root.setAttribute('data-theme', t);
    const m = $('meta[name="theme-color"]');
    if (m) m.content = t === 'light' ? '#F6F5F1' : '#0B0B10';
  };
  try { const saved = localStorage.getItem('theme'); if (saved) setTheme(saved); } catch (e) {}
  $('#theme').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------------------------------------------------------
     Nav
  --------------------------------------------------------- */
  const navwrap = $('#navwrap');
  $('#burger').addEventListener('click', () => navwrap.classList.toggle('open'));
  $$('#links a').forEach(a => a.addEventListener('click', () => navwrap.classList.remove('open')));
  const navLinks = $$('#links a[href^="#"]');
  const secs = navLinks.map(a => $(a.getAttribute('href'))).filter(Boolean);
  const navIO = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  secs.forEach(s => navIO.observe(s));
  addEventListener('scroll', () => { if (scrollY < 120) navLinks.forEach(a => a.classList.remove('active')); }, { passive: true });

  /* ---------------------------------------------------------
     Render data-driven sections
  --------------------------------------------------------- */
  // marquee
  const mItems = [...D.marquee, ...D.marquee].map((w, i) => `<span class="${i % 2 ? 's' : ''}">${esc(w)}</span><i>✦</i>`).join('');
  $('#mTrack').innerHTML = mItems + mItems;

  // tech strip
  const tItems = D.tech.map(([t, c]) => `<span class="${c}">${t}</span>`).join('');
  $('#tTrack').innerHTML = tItems + tItems;

  // products (store mock)
  $('#products').innerHTML = D.products.map(p => `
    <div class="prod">${p[2] ? `<i class="badge ${p[2][0] === '-' ? 'sale' : ''}">${p[2]}</i>` : ''}
      <div class="ph" data-slot="product"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg></div>
      <p>${p[0]}</p><small>${p[1]}</small></div>`).join('');

  // services
  const svcTrack = $('#svcTrack');
  svcTrack.innerHTML = D.services.map((s, i) => `
    <article class="svc-card tone-${D.tones[i % 4]}">
      <div class="svc-top"><span class="n">${String(i + 1).padStart(2, '0')}</span><span class="ibox">${icon(s.icon)}</span></div>
      <div><h3>${esc(s.t)}</h3><p>${s.d}</p>
        <a class="go" href="mailto:${D.email}?subject=${encodeURIComponent(s.t)}">${s.cta}<span class="arr"></span></a></div>
    </article>`).join('') + `
    <article class="svc-card more">
      <div class="svc-top"><span class="n">+</span><span class="ibox">${icon('spark')}</span></div>
      <div><h3>Need something else?</h3><p>Tell me what you are building and I will tell you honestly whether I am the right person for it.</p>
        <a class="go" href="mailto:${D.email}">Email me<span class="arr"></span></a></div>
    </article>`;

  // projects
  $('#projList').innerHTML = D.projects.map((p, i) => `
    <article class="proj tone-${p.tone} rv">
      <div class="txt">
        <div class="meta"><em>${String(i + 1).padStart(2, '0')}</em>${esc(p.cat)}</div>
        <h3>${p.t}</h3>
        <p class="desc">${p.d}</p>
        <ul class="b">${p.b.map(x => `<li>${x}</li>`).join('')}</ul>
        <div class="stack">${p.s.map(x => `<span>${x}</span>`).join('')}</div>
      </div>
      <div class="win">
        <div class="win-bar"><div class="dots"><i></i><i></i><i></i></div><b>${p.t}</b><span class="tg">${p.tag}</span></div>
        <div class="ph" data-slot="project-${i + 1}"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg><b>Project image here</b></div>
      </div>
    </article>`).join('');

  // timeline
  $('#tl').insertAdjacentHTML('beforeend', D.timeline.map((t, i) => {
    const card = `<div class="tl-card ${i % 2 ? 'R' : 'L'}"><span class="tag">${t.tag}</span><h3>${t.t}</h3><div class="org">${esc(t.org)}</div><p>${t.d}</p></div>`;
    const date = `<div class="tl-date ${i % 2 ? 'L' : 'R'}">${t.when}</div>`;
    return `<div class="tl-row rv ${i % 2 ? 'flip' : ''}">${i % 2 ? date : card}<span class="node"></span>${i % 2 ? card : date}</div>`;
  }).join(''));

  // skills
  $('#skGrid').innerHTML = D.skills.map((s, i) => `
    <div class="sk tone-${s.tone} rv" style="--d:${i * .07}s">
      <div class="sk-h"><span class="ibox">${icon(s.icon)}</span><h3>${esc(s.t)}</h3></div>
      ${s.items.map(([n, m]) => `<div class="row"><i>${m}</i>${n}</div>`).join('')}
    </div>`).join('');

  /* ---------------------------------------------------------
     Reveal on scroll + counters
  --------------------------------------------------------- */
  const count = (el, to, dec = 0, suffix = '') => {
    if (reduce) { el.textContent = to.toFixed(dec) + suffix; return; }
    let t0;
    const f = t => {
      t0 ??= t;
      const p = Math.min((t - t0) / 1500, 1), e = 1 - Math.pow(1 - p, 4);
      el.textContent = (to * e).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(f);
    };
    requestAnimationFrame(f);
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    if (e.target.classList.contains('stats')) $$('b[data-n]', e.target).forEach(b => count(b, +b.dataset.n, 0, b.dataset.s || ''));
    io.unobserve(e.target);
  }), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  $$('.rv').forEach(el => io.observe(el));

  /* ---------------------------------------------------------
     Hero – every letter floats, flies in, and dodges the cursor
  --------------------------------------------------------- */
  const letters = [];
  function splitLetters(el, mode) {
    const soft = mode === 'soft';
    const label = el.textContent.replace(/\s+/g, ' ').trim();
    if (el.tagName === 'H1') el.setAttribute('aria-label', label);
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
          [...part].forEach(c => {
            const ch = document.createElement('span'); ch.className = 'ch';
            const inn = document.createElement('span'); inn.className = 'in'; inn.textContent = c;
            inn.style.setProperty('--ax', rand(-1, 1) * (soft ? .012 : .035) + 'em');
            inn.style.setProperty('--ay', rand(-1, 1) * (soft ? .03 : .07) + 'em');
            inn.style.setProperty('--ar', rand(-1, 1) * (soft ? 2.2 : 6) + 'deg');
            inn.style.setProperty('--dur', rand(3.4, 6.6) + 's');
            inn.style.setProperty('--del', -rand(0, 6) + 's');
            ch.appendChild(inn); w.appendChild(ch);
            letters.push({ el: ch, soft, ox: 0, oy: 0, vx: 0, vy: 0, or: 0, rot: 0 });
          });
          frag.appendChild(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1) walk(n);
    });
    walk(el);
  }
  $$('[data-letters]').forEach(el => splitLetters(el, el.dataset.letters));

  const apply = L => {
    L.el.style.setProperty('--x', L.ox.toFixed(2) + 'px');
    L.el.style.setProperty('--y', L.oy.toFixed(2) + 'px');
    L.el.style.setProperty('--r', L.rot.toFixed(2) + 'deg');
  };

  // fly-in: letters start scattered, then settle into place
  letters.forEach((L, i) => {
    if (reduce) return;
    L.el.classList.add('enter');
    L.el.style.setProperty('--x', rand(-380, 380) + 'px');
    L.el.style.setProperty('--y', rand(-300, 300) + 'px');
    L.el.style.setProperty('--r', rand(-140, 140) + 'deg');
    L.el.style.setProperty('--o', 0);
    L.el.style.setProperty('--td', (L.soft ? 450 : 0) + i * 38 + 'ms');
  });
  const settle = () => requestAnimationFrame(() => requestAnimationFrame(() => {
    letters.forEach(L => {
      L.el.style.setProperty('--x', '0px'); L.el.style.setProperty('--y', '0px');
      L.el.style.setProperty('--r', '0deg'); L.el.style.setProperty('--o', 1);
    });
    setTimeout(() => letters.forEach(L => L.el.classList.remove('enter')), 2800);
  }));
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(settle);

  // cursor repel physics
  const hero = $('#top');
  let mx = -9999, my = -9999, heroVisible = true, running = false;
  new IntersectionObserver(es => { heroVisible = es[0].isIntersecting; if (heroVisible) loop(); }).observe(hero);

  function loop() {
    if (running || reduce || coarse) return;
    running = true;
    const tick = () => {
      if (!heroVisible) { running = false; return; }
      for (const L of letters) {
        if (L.el.classList.contains('enter')) continue;
        const R = L.soft ? 110 : 190, S = L.soft ? 26 : 78, RT = L.soft ? 10 : 26;
        const r = L.el.getBoundingClientRect();
        const cx = r.left + r.width / 2 - L.ox, cy = r.top + r.height / 2 - L.oy;
        const dx = cx - mx, dy = cy - my, d = Math.hypot(dx, dy) || 1;
        let tx = 0, ty = 0, tr = 0;
        if (d < R) { const f = (1 - d / R) ** 1.4; tx = dx / d * f * S; ty = dy / d * f * S; tr = (dx > 0 ? 1 : -1) * f * RT; }
        L.vx += (tx - L.ox) * .085; L.vy += (ty - L.oy) * .085; L.or += (tr - L.rot) * .09;
        L.vx *= .8; L.vy *= .8; L.or *= .8;
        const nx = L.ox + L.vx, ny = L.oy + L.vy, nr = L.rot + L.or;
        if (Math.abs(nx - L.ox) + Math.abs(ny - L.oy) + Math.abs(nr - L.rot) > .004 || Math.abs(nx) > .05) {
          L.ox = nx; L.oy = ny; L.rot = nr; apply(L);
        }
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if (!reduce && !coarse) {
    addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    addEventListener('pointerleave', () => { mx = my = -9999; });
    loop();
  }

  // chip parallax
  const flEls = $$('.fl');
  if (!reduce && !coarse) hero.addEventListener('pointermove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    flEls.forEach(f => { const d = +f.dataset.depth || 20; f.style.transform = `translate(${x * d * 1.6}px,${y * d * 1.6}px)`; });
  });

  /* ---------------------------------------------------------
     About – word-by-word scroll reveal
  --------------------------------------------------------- */
  const st = $('#statement');
  st.innerHTML = st.textContent.trim().split(/\s+/).map(w => `<span class="wd">${w}</span>`).join(' ');
  const words = $$('.wd', st);
  const updWords = () => {
    const r = st.getBoundingClientRect();
    const p = clamp((innerHeight * .82 - r.top) / (r.height + innerHeight * .25), 0, 1);
    const n = Math.round(p * words.length * 1.12);
    words.forEach((w, i) => w.classList.toggle('on', i < n));
  };

  /* ---------------------------------------------------------
     eCommerce flow – tabs, toast, KPIs
  --------------------------------------------------------- */
  const steps = $$('#steps .step'), views = $$('.mock .view'), toast = $('#toast');
  const prods = $$('.prod');
  let cur = 0, timer, k = 0;
  const STEP_MS = 5200;
  document.documentElement.style.setProperty('--dur', STEP_MS + 'ms');
  steps.forEach(s => s.style.setProperty('--dur', STEP_MS + 'ms'));
  function showStep(i) {
    cur = i;
    steps.forEach((s, n) => {
      s.classList.toggle('on', n === i);
      const bar = $('.bar', s); bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = '';
    });
    views.forEach((v, n) => v.classList.toggle('on', n === i));
    if (i === 1) { count($('#k1'), 312); count($('#k2'), 3.9, 1, '%'); count($('#k3'), 148); }
    clearTimeout(timer);
    timer = setTimeout(() => showStep((i + 1) % steps.length), STEP_MS);
  }
  steps.forEach((s, i) => s.addEventListener('click', () => showStep(i)));
  showStep(0);
  setInterval(() => {
    if (cur !== 0) return;
    prods.forEach(p => p.classList.remove('hit'));
    prods[k % prods.length].classList.add('hit');
    toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1700);
    k++;
  }, 2600);

  /* ---------------------------------------------------------
     Services – drag scroller, progress bar, entering tilt
  --------------------------------------------------------- */
  const bar = $('#svcBar'), cards = $$('.svc-card', svcTrack);
  const updSvc = () => {
    const max = svcTrack.scrollWidth - svcTrack.clientWidth;
    bar.style.width = (12 + 88 * (max ? svcTrack.scrollLeft / max : 0)) + '%';
    cards.forEach(c => {
      const r = c.getBoundingClientRect();
      const over = (r.left - (innerWidth - r.width * .95)) / r.width;
      if (over > 0 && !reduce) c.style.transform = `translateY(${clamp(over, 0, 1.4) * 30}px) rotate(${clamp(over, 0, 1.4) * 5}deg)`;
      else c.style.transform = '';
    });
  };
  svcTrack.addEventListener('scroll', updSvc, { passive: true });
  addEventListener('resize', updSvc);
  let down = false, sx = 0, sl = 0, moved = 0;
  svcTrack.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = 0; sx = e.clientX; sl = svcTrack.scrollLeft; svcTrack.classList.add('drag'); });
  addEventListener('pointermove', e => { if (!down) return; moved = Math.abs(e.clientX - sx); svcTrack.scrollLeft = sl - (e.clientX - sx); });
  addEventListener('pointerup', () => { down = false; svcTrack.classList.remove('drag'); });
  svcTrack.addEventListener('click', e => { if (moved > 6) { e.preventDefault(); moved = 0; } }, true);
  const stepW = () => (cards[0] ? cards[0].offsetWidth + 22 : 380);
  $('#svcNext').addEventListener('click', () => svcTrack.scrollBy({ left: stepW(), behavior: 'smooth' }));
  $('#svcPrev').addEventListener('click', () => svcTrack.scrollBy({ left: -stepW(), behavior: 'smooth' }));
  updSvc();

  /* ---------------------------------------------------------
     Project windows – 3D tilt
  --------------------------------------------------------- */
  if (!coarse && !reduce) $$('.proj').forEach(p => {
    const w = $('.win', p);
    p.addEventListener('pointermove', e => {
      const r = p.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      w.style.transform = `perspective(1100px) rotateY(${x * 8}deg) rotateX(${-y * 7}deg)`;
    });
    p.addEventListener('pointerleave', () => { w.style.transform = ''; });
  });

  /* ---------------------------------------------------------
     Timeline fill
  --------------------------------------------------------- */
  const tl = $('#tl'), tlFill = $('#tlFill');
  const updTl = () => {
    const r = tl.getBoundingClientRect();
    tlFill.style.height = clamp((innerHeight * .6 - r.top) / r.height, 0, 1) * 100 + '%';
  };

  /* ---------------------------------------------------------
     Stage scroll – fixed door open, then hero settles (no timers)
  --------------------------------------------------------- */
  const stage = $('#stage');
  const stagePin = $('#stagePin');
  const gate = $('#gate');
  const updStage = () => {
    if (!stage) return;
    if (reduce) {
      root.style.setProperty('--open', '1');
      stage.classList.add('is-open');
      navwrap.classList.add('is-revealed');
      navwrap.setAttribute('aria-hidden', 'false');
      if (gate) gate.setAttribute('aria-hidden', 'true');
      return;
    }
    const range = Math.max(stagePin ? stagePin.offsetHeight : innerHeight, 1);
    const p = clamp(scrollY / range, 0, 1);
    root.style.setProperty('--open', p.toFixed(4));
    const opened = p >= 1;
    const revealed = p >= .55;
    stage.classList.toggle('is-open', opened);
    navwrap.classList.toggle('is-revealed', revealed);
    navwrap.setAttribute('aria-hidden', p < .2 ? 'true' : 'false');
    if (gate) gate.setAttribute('aria-hidden', opened ? 'true' : 'false');
  };

  /* ---------------------------------------------------------
     Scroll loop
  --------------------------------------------------------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { updStage(); updWords(); updTl(); ticking = false; });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  updStage(); updWords(); updTl();

  /* ---------------------------------------------------------
     Copy email
  --------------------------------------------------------- */
  $('#copy').addEventListener('click', async e => {
    const label = $('span', e.currentTarget);
    try { await navigator.clipboard.writeText(D.email); label.textContent = 'Copied ✓'; }
    catch (err) { label.textContent = D.email; }
    setTimeout(() => { label.textContent = 'Copy email'; }, 1800);
  });
})();
