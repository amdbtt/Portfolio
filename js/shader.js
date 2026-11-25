/* Dark-mode hero light. Three.js r128 WebGL shader on #shaderBg. */
(() => {
  'use strict';
  const container = document.getElementById('shaderBg');
  if (!container || !window.THREE) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  const dark = () => root.getAttribute('data-theme') !== 'light';
  const coarse = matchMedia('(pointer: coarse)').matches;

  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;
  const fragmentShader = `
    #define TWOPI 6.2831853072
    #define PI    3.14159265359
    precision highp float;
    uniform vec2  resolution;
    uniform float time;
    void main(void) {
      vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
      float t = time * 0.21;
      float lineWidth = 0.002;
      vec3 raw = vec3(0.0);
      raw.r += lineWidth *  0.0 / max(0.0001, abs(fract(t + 0.00) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.r += lineWidth *  1.0 / max(0.0001, abs(fract(t + 0.01) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.r += lineWidth *  4.0 / max(0.0001, abs(fract(t + 0.02) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.r += lineWidth *  9.0 / max(0.0001, abs(fract(t + 0.03) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.r += lineWidth * 16.0 / max(0.0001, abs(fract(t + 0.04) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.g += lineWidth *  0.0 / max(0.0001, abs(fract(t - 0.01 + 0.00) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.g += lineWidth *  1.0 / max(0.0001, abs(fract(t - 0.01 + 0.01) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.g += lineWidth *  4.0 / max(0.0001, abs(fract(t - 0.01 + 0.02) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.g += lineWidth *  9.0 / max(0.0001, abs(fract(t - 0.01 + 0.03) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.g += lineWidth * 16.0 / max(0.0001, abs(fract(t - 0.01 + 0.04) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.b += lineWidth *  0.0 / max(0.0001, abs(fract(t - 0.02 + 0.00) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.b += lineWidth *  1.0 / max(0.0001, abs(fract(t - 0.02 + 0.01) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.b += lineWidth *  4.0 / max(0.0001, abs(fract(t - 0.02 + 0.02) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.b += lineWidth *  9.0 / max(0.0001, abs(fract(t - 0.02 + 0.03) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      raw.b += lineWidth * 16.0 / max(0.0001, abs(fract(t - 0.02 + 0.04) * 5.0 - length(uv + mod(uv.x + uv.y, 0.2))));
      float intensity = (raw.r + raw.g + raw.b) / 3.0;
      vec3 p0 = vec3(1.000, 0.918, 0.000);
      vec3 p1 = vec3(1.000, 0.596, 0.000);
      vec3 p2 = vec3(1.000, 0.353, 0.000);
      vec3 p3 = vec3(0.318, 0.318, 0.988);
      vec3 p4 = vec3(0.000, 0.882, 0.953);
      vec3 p5 = vec3(1.000, 0.753, 1.000);
      vec3 p6 = vec3(1.000, 0.435, 1.000);
      vec3 p7 = vec3(0.671, 1.000, 0.353);
      vec3 p8 = vec3(0.000, 0.565, 0.424);
      vec3 p9 = vec3(0.988, 0.012, 0.176);
      float cycleTick  = floor(time * 0.2);
      float colorIdx   = mod(cycleTick, 10.0);
      float colorNext  = mod(cycleTick + 1.0, 10.0);
      float cyclePhase = fract(time * 0.2);
      float blendT     = smoothstep(0.72, 1.0, cyclePhase);
      vec3 palette[10];
      palette[0] = p0; palette[1] = p1; palette[2] = p2;
      palette[3] = p3; palette[4] = p4; palette[5] = p5;
      palette[6] = p6; palette[7] = p7; palette[8] = p8;
      palette[9] = p9;
      vec3 ca = vec3(0.0);
      vec3 cb = vec3(0.0);
      for (int i = 0; i < 10; i++) {
        ca += palette[i] * step(float(i), colorIdx) * step(colorIdx, float(i));
        cb += palette[i] * step(float(i), colorNext) * step(colorNext, float(i));
      }
      vec3 accentColor = mix(ca, cb, blendT);
      vec3 dark = vec3(0.008, 0.008, 0.010);
      vec3 mid  = accentColor * 0.30;
      vec3 col  = mix(dark, mid, smoothstep(0.0, 0.45, intensity));
      col       = mix(col, accentColor, smoothstep(0.55, 1.4, intensity));
      col      += raw * 0.04;
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const scene = new THREE.Scene();
  const geo = new THREE.PlaneGeometry(2, 2);
  const uniforms = {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() }
  };
  const mat = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader });
  scene.add(new THREE.Mesh(geo, mat));

  const renderer = new THREE.WebGLRenderer({ antialias: !coarse, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.25 : 1.75));
  container.appendChild(renderer.domElement);

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h);
    uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
  };
  resize();
  addEventListener('resize', resize);
  if (window.ResizeObserver) new ResizeObserver(resize).observe(container);

  // Clock stays frozen until the door starts opening, so the intro isn't missed.
  let started = false;
  let looping = false;
  const loop = () => {
    if (!started) return;
    looping = true;
    requestAnimationFrame(loop);
    if (!dark() || document.hidden) return;
    uniforms.time.value += coarse ? 0.014 : 0.018;
    renderer.render(scene, camera);
  };

  const start = () => {
    if (started) return;
    started = true;
    resize();
    if (dark() && !looping) loop();
  };

  window.addEventListener('door:opening', start);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && dark() && started && !looping) loop();
  });

  new MutationObserver(() => {
    if (dark() && started) {
      resize();
      if (!looping) loop();
    }
  }).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
})();
