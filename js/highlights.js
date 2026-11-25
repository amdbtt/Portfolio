/* ============================================================
   HIGHLIGHTED PROJECTS  ·  js/highlights.js
   Load AFTER main.js. Edit HIGHLIGHTS only; markup is generated.
   media[].type  → "image" | "video"
   Videos: .mp4 (H.264), under ~8 MB each, always give a poster.
   ============================================================ */
(() => {
  'use strict';

  const HIGHLIGHTS = [
    {
      title: 'CamoWild',
      kicker: 'React Native · Computer Vision',
      layout: 'phone',
      desc: 'A React Native CLI mobile app for camouflaged object detection in the wild. Python vision pipelines with OpenCV, PyTorch and YOLO spot hidden animals in complex scenes, while Pinecone powers similarity search over detection embeddings. Includes live analytics, detection overlays and subscription plans.',
      tags: ['Python', 'React Native CLI', 'Computer Vision', 'OpenCV', 'PyTorch', 'YOLO', 'Pinecone'],
      links: [],
      media: [
        { type: 'video', src: 'assets/highlights/camowild/demo.mp4', poster: 'assets/highlights/camowild/poster.jpg?v=phone1', alt: 'CamoWild camouflaged object detection walkthrough' },
        { type: 'image', src: 'assets/highlights/camowild/1.jpg?v=phone1', alt: 'CamoWild detection result with overlay mask and confidence' },
        { type: 'image', src: 'assets/highlights/camowild/2.jpg?v=phone1', alt: 'CamoWild real-time analytics dashboard' },
        { type: 'image', src: 'assets/highlights/camowild/3.jpg?v=phone1', alt: 'CamoWild Basic and Pro subscription plans' },
        { type: 'image', src: 'assets/highlights/camowild/4.jpg?v=phone1', alt: 'CamoWild checkout for camouflaged object detection subscription' }
      ]
    },
    {
      title: 'MetaBread',
      kicker: 'Full Stack 3D AI Platform',
      desc: 'A dual company 3D processing platform for point clouds and geospatial assets. Computer vision with Detectron2 and LangGraph workflows in Python, a React frontend, Django APIs, and PostgreSQL with pgVector. Built for autonomous vehicles, AR/VR, robotics and geospatial AI.',
      tags: ['Python', 'Computer Vision', 'LangGraph', 'Detectron2', 'React', 'Django', 'PostgreSQL', 'pgVector'],
      links: [
        { label: 'Visit MetaBread', href: 'https://metabread.cloud/', primary: true }
      ],
      media: [
        { type: 'video', src: 'assets/highlights/metabread/demo.mp4', poster: 'assets/highlights/metabread/poster.jpg', alt: 'MetaBread dual company point cloud processing walkthrough' },
        { type: 'image', src: 'assets/highlights/metabread/1.jpg', alt: 'MetaBread dashboard with 3D point cloud viewport' },
        { type: 'image', src: 'assets/highlights/metabread/2.jpg', alt: 'MetaBread processing stage UI detail' }
      ]
    },
    {
      title: 'NeuroScan Brain Tumor MRI Classifier',
      kicker: 'AI Medical Imaging',
      desc: 'A diagnostic workstation that classifies brain MRI scans with a VGG16 model and returns tumor type probabilities with confidence and risk tags. When a disease or cancer signal is found, a LangGraph chatbot uses Google location GPS to suggest the best hospitals nearby or at a place the user chooses.',
      tags: ['Python', 'VGG16', 'NumPy', 'MRI', 'LangGraph', 'Google Maps'],
      links: [
        { label: 'View on GitHub', href: 'https://github.com/amdbtt/NeuroScan', primary: true }
      ],
      media: [
        { type: 'video', src: 'assets/highlights/neuroscan/demo.mp4', poster: 'assets/highlights/neuroscan/poster.jpg', alt: 'NeuroScan MRI classification walkthrough' },
        { type: 'image', src: 'assets/highlights/neuroscan/1.jpg', alt: 'NeuroScan diagnostic workstation with MRI loaded' },
        { type: 'image', src: 'assets/highlights/neuroscan/2.jpg', alt: 'NeuroScan classification probabilities and report' },
        { type: 'video', src: 'assets/highlights/neuroscan/chatbot.mp4', poster: 'assets/highlights/neuroscan/chatbot-poster.jpg?v=full1', alt: 'NeuroScan LangGraph chatbot finding nearby hospitals with Google location' },
        { type: 'image', src: 'assets/highlights/neuroscan/3.jpg?v=full1', alt: 'NeuroScan chatbot hospital recommendations on the map' }
      ]
    },
    {
      title: 'RentInc',
      kicker: 'Vue.js · Property platform',
      desc: 'A Leeds focused rental platform built with Vue.js and Bootstrap   property search, listings, maps and live chat, plus a smart chatbot system powered by LangGraph, served on AWS/Nginx behind Cloudflare with GA4, GTM and conversion tracking.',
      tags: ['Vue.js', 'Bootstrap', 'LangGraph', 'Python', 'jQuery', 'Google Maps', 'Cloudinary', 'AWS', 'Nginx', 'Cloudflare', 'GA4', 'GTM'],
      links: [
        { label: 'Visit RentInc', href: 'https://www.rentinc.co.uk/', primary: true }
      ],
      media: [
        { type: 'video', src: 'assets/highlights/rentinc/demo.mp4', poster: 'assets/highlights/rentinc/poster.jpg', alt: 'RentInc website walkthrough' },
        { type: 'image', src: 'assets/highlights/rentinc/1.jpg', alt: 'RentInc homepage hero — Find your next home in Leeds' },
        { type: 'image', src: 'assets/highlights/rentinc/2.jpg', alt: 'RentInc property search and listings view' },
        { type: 'image', src: 'assets/highlights/rentinc/3.jpg', alt: 'RentInc site detail screen' }
      ]
    }
  ];

  const rail = document.getElementById('hlRail');
  if (!rail) return;

  const prev = document.getElementById('hlPrev');
  const next = document.getElementById('hlNext');
  const bar = document.getElementById('hlBar');
  const count = document.getElementById('hlCount');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const PLAY = '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const MUTED = '<svg class="off-ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M22 9l-6 6M16 9l6 6"/></svg>';
  const SOUND = '<svg class="on-ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7"/></svg>';

  const mediaHTML = (m, i) => m.type === 'video'
    ? `<video class="hl-m${i === 0 ? ' on' : ''}" src="${esc(m.src)}" ${m.poster ? `poster="${esc(m.poster)}"` : ''} muted loop playsinline preload="metadata" aria-label="${esc(m.alt || '')}"></video>`
    : `<img class="hl-m${i === 0 ? ' on' : ''}" src="${esc(m.src)}" alt="${esc(m.alt || '')}" loading="lazy" decoding="async">`;

  const thumbHTML = (m, i) => {
    const pic = m.type === 'video' ? (m.poster || '') : m.src;
    return `<button class="hl-thumb${i === 0 ? ' on' : ''}" type="button" data-i="${i}" aria-label="Show ${esc(m.alt || (m.type + ' ' + (i + 1)))}">
      ${pic ? `<img src="${esc(pic)}" alt="" loading="lazy">` : ''}
      ${m.type === 'video' ? `<span class="play">${PLAY}</span>` : ''}
    </button>`;
  };

  const cardHTML = p => `
    <article class="hl-card" aria-label="${esc(p.title)}">
      <div class="hl-media">
        <div class="hl-stage${p.layout === 'phone' ? ' is-phone' : ''}">
          ${p.media.map(mediaHTML).join('')}
          <button class="hl-sound" type="button" aria-pressed="false" aria-label="Toggle sound">${MUTED}${SOUND}</button>
        </div>
        ${p.media.length > 1 ? `<div class="hl-thumbs${p.layout === 'phone' ? ' is-phone' : ''}">${p.media.map(thumbHTML).join('')}</div>` : ''}
      </div>
      <div class="hl-info">
        <span class="hl-kicker">${esc(p.kicker)}</span>
        <h4>${esc(p.title)}</h4>
        <p>${esc(p.desc)}</p>
        <ul class="hl-tags">${p.tags.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <div class="hl-links">
          ${(p.links || []).map(l => `<a class="${l.primary ? 'btn-cream' : 'btn-ghost'}" href="${esc(l.href)}"${l.href && l.href !== '#' ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(l.label)}${l.primary ? ' <span class="arr"></span>' : ''}</a>`).join('')}
        </div>
      </div>
    </article>`;

  rail.innerHTML = HIGHLIGHTS.map(cardHTML).join('');
  const cards = [...rail.querySelectorAll('.hl-card')];

  /* ----- media switching ----- */
  const activeMedia = card => card.querySelector('.hl-m.on');

  function syncVideo(card, shouldPlay) {
    card.querySelectorAll('video').forEach(v => {
      const live = v.classList.contains('on') && shouldPlay;
      if (live && !reduce) { v.play().catch(() => {}); }
      else { v.pause(); }
      if (reduce) v.controls = v.classList.contains('on');
    });
    card.classList.toggle('has-video-on', activeMedia(card)?.tagName === 'VIDEO');
  }

  function show(card, i) {
    card.querySelectorAll('.hl-m').forEach((el, k) => el.classList.toggle('on', k === i));
    card.querySelectorAll('.hl-thumb').forEach((el, k) => el.classList.toggle('on', k === i));
    syncVideo(card, card.classList.contains('is-active'));
  }

  cards.forEach(card => {
    card.addEventListener('click', e => {
      const t = e.target.closest('.hl-thumb');
      if (t) { show(card, +t.dataset.i); return; }
      const s = e.target.closest('.hl-sound');
      if (s) {
        const v = activeMedia(card);
        if (v && v.tagName === 'VIDEO') {
          v.muted = !v.muted;
          s.setAttribute('aria-pressed', String(!v.muted));
        }
      }
    });
  });

  /* ----- active card (plays video only when in view) ----- */
  let current = 0;
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      const card = en.target;
      const on = en.isIntersecting && en.intersectionRatio >= 0.6;
      card.classList.toggle('is-active', on);
      if (on) current = cards.indexOf(card);
      syncVideo(card, on);
    });
    updateUI();
  }, { root: rail, threshold: [0, 0.6, 1] });
  cards.forEach(c => io.observe(c));

  /* ----- controls ----- */
  const step = () => {
    const c = cards[0];
    if (!c) return 0;
    const gap = parseFloat(getComputedStyle(rail).gap || getComputedStyle(rail).columnGap || 24);
    return c.getBoundingClientRect().width + gap;
  };
  /* ----- vertical page scroll drives horizontal rail (sticky scrub) ----- */
  const rootEl = rail.closest('.highlights') || rail;
  const track = document.getElementById('hlTrack') || rootEl;
  let scrubLock = false;

  /* Phones / small tablets: no sticky scrub. The rail is a plain swipe carousel
     (the sticky block would be taller than the screen). Matches the 860px CSS breakpoint. */
  const noScrub = window.matchMedia('(max-width: 860px)');

  const go = dir => {
    scrubLock = true;
    rail.scrollBy({ left: dir * step(), behavior: reduce ? 'auto' : 'smooth' });
    clearTimeout(go._t);
    go._t = setTimeout(() => { scrubLock = false; }, 450);
  };

  function updateUI() {
    const max = rail.scrollWidth - rail.clientWidth;
    if (bar) bar.style.width = (max > 0 ? Math.min(100, (rail.scrollLeft / max) * 100) : 100) + '%';
    if (count) count.textContent = `${current + 1} / ${cards.length}`;
    if (prev) prev.disabled = rail.scrollLeft <= 4;
    if (next) next.disabled = rail.scrollLeft >= max - 4;
  }

  prev && prev.addEventListener('click', () => go(-1));
  next && next.addEventListener('click', () => go(1));
  rail.addEventListener('scroll', () => requestAnimationFrame(updateUI), { passive: true });
  rail.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  });

  const setTrackHeight = () => {
    if (reduce || cards.length < 2 || noScrub.matches) {
      rootEl.classList.remove('is-scrub');
      track.style.removeProperty('--hl-scroll-h');
      return;
    }
    rootEl.classList.add('is-scrub');
    const max = Math.max(rail.scrollWidth - rail.clientWidth, 0);
    // ~0.85px vertical scroll per 1px of horizontal travel, min 160vh
    const h = Math.max(innerHeight * 1.6, max * 0.9 + innerHeight * 0.85);
    track.style.setProperty('--hl-scroll-h', `${Math.round(h)}px`);
  };

  const scrub = () => {
    if (reduce || scrubLock || cards.length < 2 || noScrub.matches) { updateUI(); return; }
    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 0) { updateUI(); return; }
    const rect = track.getBoundingClientRect();
    const travel = Math.max(track.offsetHeight - innerHeight, 1);
    const p = Math.min(Math.max(-rect.top / travel, 0), 1);
    rail.scrollLeft = p * max;
    updateUI();
  };

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { scrub(); ticking = false; });
  };

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { setTrackHeight(); scrub(); });

  /* ----- pause videos when the tab is hidden ----- */
  document.addEventListener('visibilitychange', () => {
    cards.forEach(c => syncVideo(c, !document.hidden && c.classList.contains('is-active')));
  });

  setTrackHeight();
  scrub();
  updateUI();
})();
