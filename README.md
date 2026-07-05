# Claude Benedict Busole — Personal Portfolio

Personal portfolio website for **Claude Benedict Busole**, Senior Full-Stack / Backend / Cloud Software Engineer. Built with Astro 4, Three.js, and Tailwind CSS.

**Live demo:** [claudebusole.dev](https://claudebusole.dev) *(deploy target)*

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 4](https://astro.build) — static site generation, zero JS by default |
| 3D / WebGL | [Three.js 0.184](https://threejs.org) — hero scene + cinematic career section |
| Styling | [Tailwind CSS 3](https://tailwindcss.com) + custom CSS animations |
| Fonts | Inter (variable) · JetBrains Mono |
| Deployment target | Vercel / Netlify / Cloudflare Pages |

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output → dist/
npm run preview    # preview the production build locally
```

Node ≥ 18 required.

---

## Project structure

```
d:\website\
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # HTML shell, global scripts (tilt, counter, scroll reveal)
│   ├── pages/
│   │   └── index.astro           # Single-page entry — imports all section components
│   ├── components/
│   │   ├── Nav.astro             # Fixed nav, mobile menu
│   │   ├── Hero.astro            # Three.js WebGL hero + terminal mockup
│   │   ├── About.astro           # Bio, stats, education card
│   │   ├── Experience.astro      # Cinematic 3D career section (300vh scroll)
│   │   ├── Projects.astro        # 8 featured project cards (icon-based, no screenshots)
│   │   ├── Skills.astro          # Categorized tech stack tags
│   │   ├── Values.astro          # Engineering values + currently-expanding stacks
│   │   ├── Contact.astro         # Contact CTA + email / LinkedIn / GitHub links
│   │   └── Footer.astro          # Minimal footer
│   └── styles/
│       └── global.css            # Tailwind directives, design tokens, shared utilities
├── astro.config.mjs
├── tailwind.config.mjs
└── tsconfig.json
```

---

## Sections

### Hero
Full-viewport WebGL scene rendered with Three.js:
- Rotating icosahedron (wireframe edges + transparent faces)
- Three orbital rings (indigo / violet / cyan) at independent angles
- Six satellite objects (octahedra, tetrahedra, cubes) orbiting in 3D paths
- 900-point particle field in a spherical distribution
- Two animated colored point lights moving through the scene
- Camera follows cursor with smooth parallax (`mousemove` → lerp)
- Stats bar with count-up animation on scroll-in (`data-count` attribute)
- Terminal mockup showing a CI/CD + AWS ECS deploy, not a frontend build

### Experience — Cinematic Career
The most elaborate section. The section is `height: 300vh`, creating a scroll-driven movie effect:

1. A sticky Three.js viewport stays in view for the full scroll distance
2. A **3D corridor** of three glowing "movie frames" recedes into fog — one per job
3. The **camera physically flies forward** through the corridor as the user scrolls
4. Corridor particles stream toward the viewer from the far end
5. Each frame has corner bracket accents, scan-line fill, and a per-frame point light that activates when the camera is nearby
6. **Content panels** (`opacity` + `translateY` transitions) cross-fade at scroll thirds
7. Film-style UI chrome: letterbox gradient bars, `01 / 03` scene counter, animated bottom marquee

**Jobs:** Clearpath Financial Technologies (2024–2026) → Nexora Solutions Inc. (2020–2023) → Bell Canada (2019–2020)

### Projects
Eight featured project cards in a responsive grid — icon-based (no screenshots, since these are internal/work projects without public URLs):

| Project | Stack | Category |
|---|---|---|
| AI Document Summarization API | Python · FastAPI · OpenAI/Claude API · Redis | AI / Cloud API |
| Expense Splitting & Budget Tracker | React Native · Expo · Node.js · Plaid | FinTech / Mobile |
| E-Commerce Price Tracker | Python · FastAPI · PostgreSQL · AWS Lambda | Data Pipeline / Serverless |
| Fintech Transaction & API Platform | TypeScript · Node.js · AWS ECS · PostgreSQL | Fintech / Platform |
| Distributed Auth & RBAC Services | OAuth 2.0 · OIDC · RBAC · Node.js | Security / Identity |
| Cloud-Native Backend Migration | AWS ECS/Lambda/RDS · Docker · Kubernetes | Cloud / DevOps |
| Healthcare & Enterprise SaaS Integrations | React · Next.js · PostgreSQL · MySQL | Healthcare / SaaS |
| Enterprise Network Operations Dashboard | Java · Spring Boot · MySQL · JUnit | Enterprise / Network Ops |

Each card has a colored spotlight hover effect driven by `mousemove` (see [Interactivity](#interactivity)).

### Skills
Eight categorized groups: Frontend · Backend & APIs · Databases & Data · Cloud & DevOps · Testing & Quality · AI-Assisted Engineering · Architecture & Security · Process.

### Values
Engineering values section:
- Six value cards (reliability, documented APIs, automated testing, small services, cross-functional collaboration, mentorship)
- "Currently Expanding" tag list of adjacent stacks being ramped up on

### Contact
Email CTA + three link cards (Email · LinkedIn · GitHub) + location line.

---

## Interactivity

All interactive behaviour lives in `src/layouts/Layout.astro` (one global `<script>`) and in component-level `<script>` tags processed by Vite.

### Scroll reveal
`.reveal` elements start at `opacity: 0; transform: translateY(28px)` and transition to visible when they enter the viewport via `IntersectionObserver`. Stagger delays use `.reveal-delay-1` through `.reveal-delay-4`.

### 3D card tilt
Elements with `.tilt-card` get a perspective tilt driven by `mousemove`. The child `.tilt-inner` receives `rotateX` / `rotateY` transforms via `perspective(1200px)`. `data-tilt` sets the max angle (default 8°). A CSS variable `--gx` / `--gy` drives a radial-gradient spotlight that follows the cursor inside each card.

```html
<div class="tilt-card" data-tilt="10">
  <div class="tilt-inner">
    <!-- card content -->
    <div class="spotlight"></div>
  </div>
</div>
```

### Count-up stats
`data-count` + `data-suffix` on any element triggers a cubic-ease-out counter animation when the element scrolls into view.

```html
<span data-count="7" data-suffix="+">0+</span>
```

### Cinematic career scroll
`window.scroll` maps the scroll position within `#experience` (0 → 1) to:
- Camera Z position (`52` → `-18`, flying forward through the corridor)
- Active scene index (0 / 1 / 2) controlling panel visibility, dot indicator, marquee text, and frame point-light intensity

---

## Design tokens

Defined in `src/styles/global.css` and used as Tailwind utilities throughout:

| Token | Value | Usage |
|---|---|---|
| Background | `#09090b` (zinc-950) | Page background |
| Surface | `#111113` | Card backgrounds |
| Border | `#27272a` (zinc-800) | Default borders |
| Accent | `#6366f1` (indigo-500) | Primary accent, links, badges |
| Gradient | indigo-400 → purple-400 → cyan-400 | Animated heading text |
| Text primary | `#fafafa` (zinc-50) | Headings |
| Text secondary | `#a1a1aa` (zinc-400) | Body copy |
| Text muted | `#71717a` (zinc-500) | Labels, metadata |

### Key CSS classes

```css
.gradient-text-animated  /* shifting indigo→violet→cyan gradient on text */
.tech-badge-glow         /* indigo-tinted monospace badge with hover lift */
.tilt-card / .tilt-inner /* JS-driven 3D perspective tilt */
.spotlight               /* radial-gradient that follows cursor within card */
.reveal / .reveal-delay-N /* scroll-triggered fade-up entrance */
.dot-grid                /* subtle dot-pattern background */
.section-label           /* uppercase indigo tracking label */
```

---

## Three.js scenes

### Hero scene (`Hero.astro`)
```
IcosahedronGeometry(2.8, 1)  ← wireframe via EdgesGeometry + LineSegments
TorusGeometry × 3            ← orbital rings
OctahedronGeometry × 2
IcosahedronGeometry × 2      ← satellite objects
TetrahedronGeometry × 1
BoxGeometry × 1
BufferGeometry (900 pts)     ← particle field, vertexColors
PointLight × 2               ← moving colored lights
Camera follows mousemove     ← smooth lerp, delta 0.035
```

### Career corridor scene (`Experience.astro`)
```
FogExp2(0x000000, 0.028)     ← depth fog
GridHelper                   ← floor grid
Line × N                     ← corridor depth lines
Group × 3 (one per job)
  └─ Line (frame rectangle)
  └─ Line × 9 (scan lines)
  └─ Line × 4 (corner brackets)
  └─ PointLight               ← activates per scene
  └─ Points (120 particles)
Points (700 corridor pts)    ← stream toward camera on each frame
Camera Z driven by scroll    ← 52 → -18 over 300vh
```

---

## Customisation

### Adding a project card
Open `src/components/Projects.astro` and add an entry to the `projects` array:

```js
{
  name: 'Project Name',
  icon: '🚀',
  tagline: 'One-line description',
  description: 'Longer description...',
  stack: ['Node.js', 'PostgreSQL', 'AWS'],
  color: '#6366f1',      // accent color for this card
  category: 'Backend / Cloud',
  highlights: ['Highlight one.', 'Highlight two.'],
  metrics: ['-60% latency', '99.9% uptime'],
},
```

### Changing the color theme
All accent colors reference `#6366f1` (indigo-500). A global find-and-replace across `src/` for this value plus the gradient stops in `global.css` is all that's needed.

### Deploying
The build outputs a fully static site to `dist/`. Drop it on any CDN:

```bash
npm run build
# Upload dist/ to Vercel, Netlify, Cloudflare Pages, or any static host
```

Vercel zero-config: push to GitHub → import repo → done.

---

## Performance

Built on Astro's static output:
- **Zero framework JS** shipped by default (no React runtime, no hydration)
- Three.js (`~518 KB` minified, `~132 KB` gzip) is the only JS payload — loaded once
- Fonts loaded via Google Fonts with `preconnect`
- All animations are CSS transforms or WebGL — no layout thrashing

---

## Contact

**Claude Benedict Busole**
- Email: [c.b.busole@gmail.com](mailto:c.b.busole@gmail.com)
- LinkedIn: [linkedin.com/in/benedict-busole-079680116](https://linkedin.com/in/benedict-busole-079680116)
- GitHub: [github.com/claude-expert](https://github.com/claude-expert)
- Location: Mississauga, ON, Canada
