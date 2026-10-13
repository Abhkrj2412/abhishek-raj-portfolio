# Abhishek Raj — Portfolio

A single-page portfolio built with Next.js 15 (App Router), React 19, TypeScript and Tailwind CSS 4. It uses white, black and grays only, and it scrolls as one continuous page.

The only animation dependency is **Lenis** (smooth scroll). Everything else is CSS animation, `IntersectionObserver` and small `requestAnimationFrame` loops. There is no GSAP, three.js or WebGL, and no external scripts at runtime.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-check + lint)
npm start          # serve the production build
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://abhishekraj.dev`) when deploying, so the Open Graph image resolves to an absolute URL.

## Content

**All text lives in `src/lib/data.ts`**: `PROFILE`, `NAV`, `SKILL_GROUPS`, `PROJECTS`, `CERTIFICATIONS`, `EXPERIENCE`, `EDUCATION`, `ACHIEVEMENTS`, `ID_BACK` and `QUICK_FACTS`. Components only read from it.

The source of truth is `Abhishek_Resume_13_10_2026.pdf` (copied to `public/Abhishek_Raj_Resume.pdf` for the Résumé ↓ button), including its embedded links. The owner supplied these directly:

- the roles *Senior Analyst* and *AI Engineer*
- the GitHub profile `https://github.com/Abhkrj2412`
- the recently used tools Microsoft Fabric, Azure Machine Learning, Azure Data Factory and Azure AI Foundry (marked with a dot in Skills)
- the headshot photo

The résumé has no repository links, so projects show no "View on GitHub" button. If you add a `github` URL to a project in `data.ts`, the button appears.

## Sections

| # | Section | Component | Signature motion |
|---|---|---|---|
| — | Navigation | `Navigation.tsx` | Frosted pill after 40 px, sliding ink indicator (IO `-45% 0px -50% 0px`), 2 px progress bar, clip-path mobile menu (Esc closes it, scroll is locked while open) |
| — | Hero | `hero/Hero.tsx` | Looping intro video blended into the page with `mix-blend-mode: multiply`; tries to play with sound, falls back to muted and unlocks sound on the first gesture; pauses below 35 % visibility; ▶/❚❚ button |
| 01 | About | `sections/About.tsx` | Lanyard ID card: damped pendulum driven by pointer velocity, idle sway, 3D flip (hover / tap / Enter·Space) |
| 02 | Skills | `sections/Skills.tsx` | Periodic table with a diagonal wave entrance (`(row+col)×40ms`), family filter, sticky inspector with brand-logo pop |
| 03 | Work | `sections/Work.tsx` | Expanding accordion gallery (flex 8 vs. spines), clip-path wipe on a grayscale "Illustrative UI" |
| 04 | Certifications | `sections/Certifications.tsx` | Ink-flood rows (`scaleX` on `::before`) |
| 05 | Experience | `sections/Experience.tsx` | Scroll-drawn spine; each stop lights up as the spine reaches it |
| 06 | Achievements | `sections/Achievements.tsx` | Pinned horizontal gallery (sticky, `100svh + travel`), count-ups (easeOutQuart 1.4 s), nearest card lifts |
| 07 | Contact | `sections/Contact.tsx` | Hopping letters, copy-to-clipboard chip (`aria-live`), spinning "say hello" badge, **block-mosaic portrait** (8×10 tiles assemble in a diagonal wave; tiles near the cursor lift) |

### Component layout

Each interactive section is split in two:

- `X.tsx` is a server component that holds the component CSS in a `<style>` tag.
- `X.client.tsx` holds the behaviour.

Splitting them means the CSS ships as HTML, not as client JavaScript, which keeps first-load JS at about 129 kB. Shared classes (`.btn`, `.card`, `.tag`, `.rv`, `.rv-mask`, …) are in `@layer components`, and resets are in `@layer base` in `src/app/globals.css`, so Tailwind utilities always win.

Other shared pieces:

- `src/lib/hooks.ts`: `useInView`, `useScrollProgress`, `prefersReducedMotion`, `useFinePointer`
- `src/lib/scroll.tsx`: the Lenis instance, `scrollToTarget`, `lockScroll` and anchor routing
- `src/components/ui/`: `TechLogo` (`BRAND` / `CONCEPT` maps, `isBrand()`), `SectionHead`, `RevealObserver`, `MiniUI`, `MosaicPortrait`, `Icons`

### Accessibility

- Semantic sections in heading order and a skip link
- `:focus-visible` styles everywhere
- Every visual has a text equivalent (`aria-label`s on the video, ID card and mosaic; numbers are in each card's label)
- `prefers-reduced-motion` turns off Lenis, decorative animation, video autoplay and count-ups

## Rebuilding the hero video and stills

Run `scripts/build-hero-assets.py`. It needs Python 3.9+, `numpy` and `Pillow`. For ffmpeg it uses `$FFMPEG`, then `PATH`, then the `imageio-ffmpeg` package:

```bash
pip install numpy pillow imageio-ffmpeg
python scripts/build-hero-assets.py path/to/intro.mp4 --portrait scripts/portrait-source.png
# options: --crop W:H:X:Y   --levels R:G:B   --seconds 10   --fade 0.5
```

What it does:

1. **Crop.** It finds the person in sampled frames (pixels darker than the backdrop) and crops a 4:5 box head to toe, centred. This source gave `crop=812:1016:532:19`. It then scales to 768×960.
2. **Whiten the backdrop.** It applies `colorlevels`. The default is `rimax=gimax=bimax=0.98`, but this source's backdrop is greyer, so the script measured it and used `0.896 / 0.884 / 0.872`. The backdrop comes out pure white and disappears under `multiply`.
3. **Make the loop seamless.** It takes the first 10 s, cross-fades the last 0.5 s of picture into the first 0.5 s (ffmpeg `xfade`), and does the same to the audio, sample-accurately and equal-power, in numpy (not `acrossfade`). Nothing is stretched, so lips stay in sync. The loop is 9.5 s.
4. **Export:**
   - `public/hero/hero.webm` (VP9 CRF 36 + Opus 80k)
   - `public/hero/hero.mp4` (H.264 CRF 24 `-preset slow` + AAC 96k, `+faststart`)
   - `public/hero/poster.webp` (first frame)
5. **Stills:**
   - `public/portrait-bust.webp` (480×600, ID card)
   - `public/portrait.webp` (720×900 grayscale, mosaic)
   - `public/og.jpg` (1200×630). Its text comes from `scripts/og-text.json`.

## Credits and licences

- **Fonts** (self-hosted in `src/fonts`, SIL Open Font License 1.1, licence files alongside): Inter Tight, Instrument Serif, JetBrains Mono. Sourced from Fontsource.
- **Logos** (`public/logos`):
  - [devicon](https://github.com/devicons/devicon) "original" SVGs, MIT (`LICENSE-devicon.txt`): Python, TypeScript, Node.js, React, Next.js, Ruby, MongoDB, MySQL, Docker, Git, Postman, FastAPI, Terraform, GitHub Actions, Pytest, Vitest, PostgreSQL, Apache Spark, Express, Azure, Azure SQL Database, Salesforce, Apache Airflow, AWS.
  - [simple-icons](https://simpleicons.org) paths filled with each brand's official colour, CC0 1.0 (`LICENSE-simple-icons.md`, `DISCLAIMER-simple-icons.md`): Anthropic, Claude, Google Gemini, Model Context Protocol, ElevenLabs, Vercel, Snowflake, Delta Lake, HubSpot, SAP, Matillion, GitHub.
  - All brand names and logos are trademarks of their owners and are used only to say which tools were used.
  - Brands with no redistributable logo (OpenAI, Microsoft Fabric, Workato, dbt, Dagster, …) and concepts (RAG, MCP tooling, agents, …) use the custom line icons in `TechLogo.tsx`'s `CONCEPT` map.
- **Hero video and portrait:** supplied by the site owner.
