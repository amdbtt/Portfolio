# Muhammad Ahmad – animated portfolio

A static site (no build step). Open `index.html` in a browser, or upload the whole folder to any host (Netlify, Vercel, GitHub Pages, cPanel).

```
Portfolio/
├── index.html        page structure (hero, about, flow, projects, contact…)
├── css/styles.css    colours, layout, animations, light/dark theme
├── js/data.js        ALL text content for services, projects, timeline, skills
├── js/main.js        animations and interactions
└── assets/           drop your images here
```

## Colour scheme (from the reference PDF)

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#0B0B10` | page background |
| `--bg2` | `#101017` | alternate sections |
| `--violet` | `#8B6CFF` | "muhammad" box, buttons, check marks |
| `--violet2` | `#A18BFF` | italic serif words |
| `--c-purple` | `#1B1633` | purple cards |
| `--c-teal` | `#0D2027` | teal cards |
| `--c-brown` | `#2A1710` | brown cards |
| `--cream` | `#F5F4F0` | marquee, cream cards, buttons |
| `--orange` | `#FF7A50` | marquee sparkles |

All of them live at the top of `css/styles.css`. A light theme is included (toggle in the nav, remembered in `localStorage`).

## Animations

- **Hero letters** – every letter of *muhammad*, *ahmad* and the headline flies in from a random position, then keeps floating on its own path. Moving the mouse near a letter pushes it away and it springs back.
- Floating tech chips with mouse parallax, floating portrait card.
- Tilted, endlessly scrolling cream marquee.
- About paragraph lights up word by word as you scroll; stats count up.
- Storefront demo: 3D-tilt entrance, auto-advancing tabs (storefront → numbers → channel sync) with progress bars, "Added to basket" toast loop.
- Services: draggable horizontal card rail with progress bar; cards tilt as they slide in.
- Project windows tilt in 3D under the cursor.
- Journey timeline line fills as you scroll.
- Gradient email and footer wordmark shimmer.
- `prefers-reduced-motion` turns the motion off.

## Adding your images

Every empty striped box has a `data-slot` name (`hero-portrait`, `about-portrait`, `certificate`, `project-1` … `project-6`, `product`, `store-banner`).
Put your files in `assets/` and drop an `<img>` inside the box, for example:

```html
<span class="ph" data-slot="hero-portrait">
  <img src="assets/portrait.webp" alt="Portrait of Muhammad Ahmad">
</span>
```

The CSS already makes the image fill the box (`.ph img { object-fit: cover }`). Remove the icon and label inside if you want.
For the project boxes, add the `<img>` inside the `.ph` that `js/main.js` generates, or edit the `projects` template in `main.js`.

## Editing text

Services, projects, timeline, skills and the marquee words are in `js/data.js`. Hero, About, contact and footer text are in `index.html`.

## Fonts

Loaded from Google Fonts: **Inter Tight** (headings), **Inter** (body), **Instrument Serif** (italic accents). An internet connection is needed for the exact look; otherwise system fonts are used.
