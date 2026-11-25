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
    if (m) m.content = t === 'light' ? '#FBF7EA' : '#000000';
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
  const burger = $('#burger');
  const setMenu = open => {
    navwrap.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  };
  burger.addEventListener('click', () => setMenu(!navwrap.classList.contains('open')));
  $$('#links a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  // close the mobile menu on outside tap / Escape
  document.addEventListener('click', e => {
    if (navwrap.classList.contains('open') && !e.target.closest('.nav')) setMenu(false);
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
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

  // capability cards (AI / full-stack mock)
  $('#products').innerHTML = D.products.map(p => `
    <div class="prod">${p[2] ? `<i class="badge">${p[2]}</i>` : ''}
      <div class="ph" data-slot="product"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg></div>
      <p>${p[0]}</p><small>${p[1]}</small></div>`).join('');

  // services (archived page only — skipped on main)
  const svcTrack = $('#svcTrack');
  if (svcTrack) {
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
  }

  // projects — skip highlight:true items (they live in the highlights rail)
  // sticky stack (CSS sticky + light dim — GSAP-style stacked cards)
  const projects = D.projects.filter(p => !p.highlight);
  const projList = $('#projList');
  projList.innerHTML = projects.map((p, i) => {
    const gallery = Array.isArray(p.imgs) && p.imgs.length > 1 ? p.imgs : null;
    let media;
    let crumbs = '';
    if (gallery) {
      media = gallery.map((src, gi) =>
        `<img class="gallery-slide${gi === 0 ? ' on' : ''}" src="${esc(src)}" alt="${esc(p.t)} screenshot ${gi + 1}" loading="${gi === 0 ? 'eager' : 'lazy'}" decoding="async">`
      ).join('');
      crumbs = `<div class="gallery-crumbs" hidden>
        ${gallery.map((_, gi) =>
          `<button type="button" class="gallery-crumb${gi === 0 ? ' on' : ''}" data-i="${gi}" aria-label="${esc(p.t)} image ${gi + 1} of ${gallery.length}"></button>`
        ).join('')}
      </div>`;
    } else if (p.img) {
      media = `<img src="${esc(p.img)}" alt="${esc(p.t)}" loading="lazy" decoding="async">`;
    } else {
      media = `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/></svg><b>Project image here</b>`;
    }
    const body = p.groups
      ? `<div class="groups">${p.groups.map(g => `
          <div class="grp"><h4>${esc(g.h)}</h4>
            <ul class="b">${g.items.map(x => `<li>${x}</li>`).join('')}</ul>
          </div>`).join('')}</div>`
      : `<ul class="b">${(p.b || []).map(x => `<li>${x}</li>`).join('')}</ul>`;
    const link = p.url
      ? `<a class="proj-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer">View on GitHub<span class="arr"></span></a>`
      : '';
    const hasMedia = !!(p.img || gallery);
    const stageAttrs = `class="ph${hasMedia ? ' has-img' : ''}${gallery ? ' gallery-stage' : ''}" data-slot="project-${i + 1}"${gallery ? ` role="button" tabindex="0" aria-label="Browse ${esc(p.t)} screenshots"` : ''}`;
    const mediaBlock = `<div class="device device-app${gallery ? ' has-gallery' : ''}">
          <div class="device-shell">
            <div class="device-ear" aria-hidden="true"></div>
            <div ${stageAttrs}>${media}</div>
          </div>
          <div class="device-meta"><span class="device-name">${esc(p.t)}</span><span class="device-tag">${esc(p.tag)}</span></div>
          ${crumbs}
        </div>`;
    return `
    <article class="proj tone-${p.tone} rv" style="--i:${i}">
      <div class="txt">
        <div class="meta"><em>${String(i + 1).padStart(2, '0')}</em>${esc(p.cat)}</div>
        <h3>${esc(p.t)}</h3>
        <p class="desc">${p.d}</p>
        ${body}
        <div class="stack">${p.s.map(x => `<span>${x}</span>`).join('')}</div>
        ${link}
      </div>
      ${mediaBlock}
    </article>`;
  }).join('');

  /* Project screenshot galleries (autoplay + click-to-show breadcrumbs) */
  $$('#projList .has-gallery').forEach(win => {
    const slides = $$('.gallery-slide', win);
    const crumbs = $$('.gallery-crumb', win);
    const tray = $('.gallery-crumbs', win);
    const stage = $('.gallery-stage', win);
    if (slides.length < 2 || !tray || !stage) return;

    let idx = 0;
    let timer = null;
    const INTERVAL = 3200;

    const show = (next) => {
      idx = (next + slides.length) % slides.length;
      slides.forEach((img, i) => img.classList.toggle('on', i === idx));
      crumbs.forEach((btn, i) => {
        btn.classList.toggle('on', i === idx);
        btn.setAttribute('aria-current', i === idx ? 'true' : 'false');
      });
    };

    const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
    const start = () => {
      stop();
      if (reduce || slides.length < 2) return;
      timer = setInterval(() => show(idx + 1), INTERVAL);
    };

    const openCrumbs = () => {
      tray.hidden = false;
      tray.classList.add('open');
      stage.setAttribute('aria-expanded', 'true');
    };

    stage.addEventListener('click', () => {
      openCrumbs();
      show(idx + 1);
      start();
    });
    stage.addEventListener('keydown', e => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      e.preventDefault();
      openCrumbs();
      show(idx + 1);
      start();
    });

    crumbs.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        openCrumbs();
        show(Number(btn.dataset.i) || 0);
        start();
      });
    });

    win.addEventListener('pointerenter', stop);
    win.addEventListener('pointerleave', start);
    start();
  });

  const stickyCards = $$('#projList .proj');
  const stickyTopPx = () => matchMedia('(max-width:1000px)').matches ? 76 : 100;
  const updStickyStack = () => {
    if (!stickyCards.length || reduce) return;
    // tablet / phone: cards are a plain list (CSS disables sticky) – nothing to dim
    if (matchMedia('(max-width:1000px)').matches) return;
    const top = stickyTopPx();
    stickyCards.forEach((card, i) => {
      const next = stickyCards[i + 1];
      if (!next) {
        card.style.setProperty('--stack-dim', '0');
        return;
      }
      // dim / tuck the card as the next one slides over it
      const nextTop = next.getBoundingClientRect().top;
      const cover = clamp((top + 28 - nextTop) / Math.max(card.offsetHeight * 0.55, 120), 0, 1);
      card.style.setProperty('--stack-dim', cover.toFixed(3));
    });
  };

  // timeline
  $('#tl').insertAdjacentHTML('beforeend', D.timeline.map((t, i) => {
    const tag = t.tag ? `<span class="tag">${esc(t.tag)}</span>` : '';
    const card = `<div class="tl-card ${i % 2 ? 'R' : 'L'}${t.tag ? '' : ' no-tag'}">${tag}<h3>${esc(t.t)}</h3><div class="org">${esc(t.org)}</div><p>${esc(t.d)}</p></div>`;
    const date = `<div class="tl-date ${i % 2 ? 'L' : 'R'}">${t.when}</div>`;
    return `<div class="tl-row rv ${i % 2 ? 'flip' : ''}">${i % 2 ? date : card}<span class="node"></span>${i % 2 ? card : date}</div>`;
  }).join(''));

  // skills
  $('#skGrid').innerHTML = D.skills.map((s, i) => `
    <div class="sk tone-${s.tone} rv" style="--d:${i * .07}s">
      <div class="sk-h"><span class="ibox">${icon(s.icon)}</span><h3>${esc(s.t)}</h3></div>
      ${s.items.map(([n, m]) => `<div class="row"><i>${esc(m)}</i><span>${esc(n)}</span></div>`).join('')}
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
     AI / full-stack flow – tabs, toast, KPIs
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
    if (i === 1) {
      count($('#k1'), 428);
      const k2 = $('#k2'); if (k2) k2.textContent = '2.4×';
      count($('#k3'), 36);
    }
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
     Services – drag scroller (only if section exists)
  --------------------------------------------------------- */
  if (svcTrack) {
    const bar = $('#svcBar'), cards = $$('.svc-card', svcTrack);
    const updSvc = () => {
      const max = svcTrack.scrollWidth - svcTrack.clientWidth;
      if (bar) bar.style.width = (12 + 88 * (max ? svcTrack.scrollLeft / max : 0)) + '%';
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
    const svcNext = $('#svcNext'), svcPrev = $('#svcPrev');
    if (svcNext) svcNext.addEventListener('click', () => svcTrack.scrollBy({ left: stepW(), behavior: 'smooth' }));
    if (svcPrev) svcPrev.addEventListener('click', () => svcTrack.scrollBy({ left: -stepW(), behavior: 'smooth' }));
    updSvc();
  }

  /* ---------------------------------------------------------
     Project windows – 3D tilt
  --------------------------------------------------------- */
  if (!coarse && !reduce) $$('#projList .proj').forEach(p => {
    const w = $('.win', p) || $('.device-app', p);
    if (!w) return;
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
     Door open – one scroll / swipe / tap / key opens smoothly.
     Page scroll is blocked until the door is fully open so the
     hero never drifts down mid-animation.
  --------------------------------------------------------- */
  const stage = $('#stage');
  const gate = $('#gate');
  let doorOpen = 0;
  let doorAnimating = false;
  let doorDone = false;

  const applyDoor = p => {
    if (!stage) return;
    doorOpen = clamp(p, 0, 1);
    root.style.setProperty('--open', doorOpen.toFixed(4));
    const opened = doorOpen >= .999;
    const revealed = doorOpen >= .55;
    stage.classList.toggle('is-open', opened);
    navwrap.classList.toggle('is-revealed', revealed);
    navwrap.setAttribute('aria-hidden', doorOpen < .2 ? 'true' : 'false');
    if (gate) gate.setAttribute('aria-hidden', opened ? 'true' : 'false');
    if (opened) doorDone = true;
  };

  const signalDoorOpening = () => {
    window.dispatchEvent(new CustomEvent('door:opening'));
  };

  const animateDoor = (to, duration = 1500) => {
    if (doorAnimating) return;
    const from = doorOpen;
    if (Math.abs(to - from) < .001) {
      applyDoor(to);
      return;
    }
    // Shader starts on the same frame the doors begin to move
    if (to > from) signalDoorOpening();
    doorAnimating = true;
    const t0 = performance.now();
    const tick = now => {
      const t = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - t, 3); // ease-out cubic
      applyDoor(from + (to - from) * e);
      if (t < 1) requestAnimationFrame(tick);
      else {
        applyDoor(to);
        doorAnimating = false;
      }
    };
    requestAnimationFrame(tick);
  };

  const tryOpenDoor = () => {
    if (reduce) {
      signalDoorOpening();
      applyDoor(1);
      return true;
    }
    if (doorDone || doorAnimating) return false;
    // snap any residual scroll back so the hero stays put
    if (scrollY !== 0) scrollTo(0, 0);
    animateDoor(1);
    return true;
  };

  if (reduce) {
    signalDoorOpening();
    applyDoor(1);
  } else {
    // capture-phase so we win even if a child stops bubbling
    document.addEventListener('wheel', e => {
      if (doorDone) return;
      if (doorAnimating) { e.preventDefault(); return; }
      // any downward scroll intent opens; upward is ignored while closed
      if (e.deltaY > 0 || e.deltaX !== 0) {
        e.preventDefault();
        tryOpenDoor();
      } else {
        e.preventDefault(); // keep hero from moving
      }
    }, { passive: false, capture: true });

    let touchY0 = 0;
    document.addEventListener('touchstart', e => {
      if (e.touches[0]) touchY0 = e.touches[0].clientY;
    }, { passive: true, capture: true });
    document.addEventListener('touchmove', e => {
      if (doorDone) return;
      if (!e.touches[0]) return;
      const dy = touchY0 - e.touches[0].clientY;
      if (doorAnimating || dy > 6) {
        e.preventDefault();
        if (dy > 6) tryOpenDoor();
      } else if (dy < -6) {
        e.preventDefault(); // block rubber-band scroll while closed
      }
    }, { passive: false, capture: true });

    document.addEventListener('keydown', e => {
      if (doorDone || doorAnimating) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (e.key !== 'ArrowUp') tryOpenDoor();
      }
    }, true);

    // tap / click the door (or the “Scroll to open” label) also opens it
    const gateCenter = $('.gate-center', gate) || gate;
    if (gate) {
      gate.style.cursor = 'pointer';
      const openOnTap = e => { e.preventDefault(); tryOpenDoor(); };
      gate.addEventListener('click', openOnTap);
      if (gateCenter && gateCenter !== gate) gateCenter.addEventListener('click', openOnTap);
    }

    // if anything still scrolls the page while closed, open + pin back to top
    addEventListener('scroll', () => {
      if (doorDone || doorAnimating) return;
      if (scrollY > 0) {
        tryOpenDoor();
        scrollTo(0, 0);
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Scroll loop
  --------------------------------------------------------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => { updWords(); updTl(); updStickyStack(); ticking = false; });
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  if (!reduce) applyDoor(0);
  updWords(); updTl(); updStickyStack();

  /* ---------------------------------------------------------
     Footer clock (Pakistan / GMT+5)
  --------------------------------------------------------- */
  const fClock = $('#fClock');
  if (fClock) {
    const tick = () => {
      const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());
      const hh = parts.find(p => p.type === 'hour')?.value || '--';
      const mm = parts.find(p => p.type === 'minute')?.value || '--';
      fClock.textContent = `${hh}:${mm} GMT+5`;
    };
    tick();
    setInterval(tick, 30000);
  }
})();
