# ui.md — Michael's Portfolio

Source of truth for look, feel and behavior. Read fully before writing code. If this file and a reference image disagree, the image wins on proportions and spacing; this file wins on colors, content and scope.

## 1. Goal and audience

- Recruiter-first portfolio for Michael (Omale Michael), frontend developer and UI/UX designer, Lagos.
- Recruiters skim and often use phones. In 3 seconds they must see: who, what he does, proof, and how to get the resume.
- Light theme only. Monochrome. No dark mode, no theme toggle.
- Feel: premium, calm, precise, hand-crafted. Apple/Linear restraint. Futuristic feel comes from layout, depth and modular grid, never from color or effects.

## 2. Reference images (in `/references`)

Open and study every image before planning. Measure spacing, sizes, radii and proportions from them. If you cannot view images, stop and say so.

| File | Role | How to use it |
| --- | --- | --- |
| `overall_idea_layout_idea_ref_image.jpg` | Base layout | Centered rhythm, large soft-rounded containers on a grey frame, proof strip, quiet typography, big closing CTA. Follow container shapes, radii and vertical spacing closely. Replace its content with ours. |
| `hero_ref.jpg` | Hero | Match the composition: heavy extended name at left, small grey subline, short description lower left, portrait cropped at the container's bottom edge and slightly overlapping it, floating label pills overlapping the portrait, vertical 01-05 index at right, "scroll" hint bottom-left. Do not copy its content, colors or imagery. |
| `dev_text_ref_image.jpg` | Projects | Folder metaphor only. Rebuild folders in CSS/SVG as monochrome grey and white frosted glass. Never use its orange, yellow, blue or purple. |
| `dev_illustration_image.jpg` | Accent language | Use only two ideas, sparingly: small window-chrome label pills (three dots) and a thin dashed line with a cursor. At most 2-3 uses on the whole site. Do not copy the black outlined, cartoon style. |
| `timeline_ref.jpeg` | Experience | Replicate the structure: pill label, large headline, side note, column header row, staggered rounded pills with a label at left and uppercase meta at right. Swap green for monochrome. |
| `footer_ref.jpg` | Footer | Pixel-perfect replica. See section 8. |
| `dev_image.jpg` | Source photo | Never display it. It was only the source for the pencil portrait. |
| `final dev image.png` | Hero portrait | The finished pencil drawing. Process it into `/public/images/portrait.webp` and use it in the hero (section 6). |

## 3. Design tokens

```css
:root{
  --frame:#E4E4E1;      /* outer page frame */
  --surface:#F1F1EE;    /* main containers */
  --surface-2:#FAFAF9;  /* raised/white containers */
  --footer-bg:#F6F7F9;  /* footer body, from footer ref */
  --ink:#0B0C0E;
  --ink-2:#55575C;
  --ink-3:#8D8F94;
  --line:rgba(11,12,14,.08);
  --band:#0B0C0E;       /* footer top band; open decision, default near-black */
  --band-ink:#F5F5F3;

  --r-section:44px; --r-card:22px; --r-pill:999px;
  --shadow-soft:0 1px 0 rgba(11,12,14,.04),0 24px 48px -28px rgba(11,12,14,.22);
  --ease:cubic-bezier(.2,.7,.2,1);
}
```

- Spacing on a 4px scale. Section vertical padding: 96-160px desktop, 64-96px mobile.
- Elements are borderless. Separate with tone and the soft shadow, never hard borders. Hairlines (`--line`) only for the timeline header row and footer dividers.
- Apple-style continuous corners (use `corner-shape: squircle` where supported, otherwise border-radius).
- No gradients except the glass on folders. No accent color anywhere except what is defined here.

## 4. Typography

Load from Google Fonts with `font-display: swap`. Give every font a real fallback stack.

| Use | Font | Settings |
| --- | --- | --- |
| Hero name | Archivo (variable) | width 125, weight 800, tight tracking (-0.03em), line-height 0.95 |
| Headings, body, UI | Hanken Grotesk | headings 500-600, body 400, line-height 1.55 |
| Labels and meta | Hanken Grotesk | 600, uppercase, 11-12px, tracking 0.08em |
| Footer wordmark and band headline | Hanken Grotesk (or Instrument Sans) | band headline mixes weight 300 and 700; wordmark weight 600-700, lowercase |

- Fluid sizes with `clamp()`. Hero name about 7-9vw on desktop. Body 16-17px.
- Left-aligned paragraphs, max 60ch. Sentence case everywhere except labels.
- Typographic apostrophes and quotes.

## 5. Page structure

1. **Nav:** tiny persistent bar. `Michael` left; `Projects  Experience  Resume  Contact` right. Resume is a text link to the PDF. Sits inside or just above the hero container as in the hero ref. Sticky, compact, no heavy blur.
2. **Hero** (section 6).
3. **Credibility strip:** text wordmarks, evenly spaced, like the logo row in the layout ref: `CloudCrave` (Staff), `Zelion` (Intern), `Bells University` (CS and IT, 2024-2029). No fake logos.
4. **Projects** (section 7).
5. **Experience** (section 9), full screen.
6. **Resume** (section 10).
7. **Contact and footer** (section 8).

A 01-05 index at the hero's right edge maps to Hero, Projects, Experience, Resume, Contact and highlights the current section.

## 6. Hero and portrait

- Composition from `hero_ref.jpg`: one large rounded container, nav inside top-left.
- Left: `Michael` (display font), under it a small grey line `Frontend developer and UI/UX designer`, then a short description and the two buttons.
- Draft description: "I design and build products people actually finish using, from the interface and motion to the backend behind it."
- Buttons: `Resume (PDF)` solid ink, `Contact` soft surface. 48px high, pill radius.
- Floating pills (2-3, white, soft shadow, dot + label, overlapping the portrait edge): `React, TypeScript, React Native` / `Open to opportunities` / `Lagos, Nigeria`.
- Bottom-left: a small "scroll" hint with a mouse icon.
- **Portrait:** a graphite pencil drawing of Michael, head and shoulders, cap with logo and headphones, facing forward, eyes at the viewer, fading out at the shoulders. Source file: `final dev image.png` (in `/references`). Convert it to `/public/images/portrait.webp`: turn white into transparency (light pixels become transparent, graphite stays opaque, no hard cutout or white halos), then compress to under 150 KB. Do not edit the drawing itself.
  - Place it center-right, cropped by the container's bottom edge, slightly overlapping the container's right edge as in the hero ref.
  - If the asset still has a white background, use `mix-blend-mode: multiply` and make sure no parent sets `opacity`, `transform` or `isolation`.
  - Give it a soft ground shadow like the hero ref. Never add a frame or border.
  - Use `alt="Pencil portrait of Michael"`. Preload it.
- If both `final dev image.png` and `portrait.webp` are missing, render an obvious grey placeholder block and a `TODO` comment. Never substitute `dev_image.jpg`.

## 7. Projects

- Folders: CSS/SVG, monochrome frosted glass (back panel, tab, front lid, soft inner highlight, `backdrop-filter` blur used only here). One folder per project, slightly staggered and overlapping like the folder ref. On hover the lid lifts 6-8px.
- Each folder opens a case study page at `/work/:slug`.
- Case study template, short: one-line summary, My role, Stack, One decision or metric, Live link, 1-3 screenshots.
- Never invent metrics, screenshots or links. Missing items render as a clearly marked `TODO`.

Featured (include only if confirmed live; otherwise mark `in progress`):
- Docket (lead): AI test-case generator that turns screenshots and requirements into a traceable test matrix.
- Caleb's Library: free notes and past-questions library for Bells students.
- Correr: Expo + Convex coaching app, server-side AI; label beta.
- Zelion work: admin page, landing page refactor, newsletter automation. Text only, code is private.
- Empathon Autos: only if the deployed site is stable.

"In progress" row, small and quiet, 3-4 lines max: Scriptmate, Sketchroom, ChatBot Studio, Clover (pending description). Do not include Synapse.

## 8. Contact and footer (pixel-perfect)

Replicate `footer_ref.jpg` exactly. Measure everything from the image at its native width, then express in `vw`, `rem` and `%`. Start values below are approximations to verify against the image.

- **Top band:** full width, height about 22% of viewport width. Left-aligned content block starting about 22% from the left. Headline `Let's work together`: `Let's work` weight 300, `together` weight 700, about 5.3vw. Two links to its right, 15px weight 700, 2px underline offset 6px: `Get in Touch` and `Resume`. Colors: `--band` background, `--band-ink` text (green replaced).
- **Body:** `--footer-bg` background. Left column: LinkedIn and GitHub icons (24px, ink), below them `© 2026 Michael` in `--ink-3` 14px, followed by `Terms of Use` and `Privacy Policy` in ink 14px. Right: two columns, bold 13px city line then grey 13px lines (Lagos, Nigeria, email, phone).
- **Wordmark:** lowercase `michael`, ink on `--footer-bg`, sized in `vw` so the glyphs span about 84% of the viewport width (left edge near 8%, right edge near 92%). Container uses `overflow:hidden` and clips roughly the bottom third of the letters, exactly as the reference crops them. No extra margin below.
- Contact form is not needed. Email and LinkedIn are enough.
- Replace placeholder contact details with real ones; until supplied, show `TODO` text, never fake data.

## 9. Experience timeline (full screen)

- Section min-height `100svh`, centered content, one big rounded container like `timeline_ref.jpeg`.
- Top-left pill `Experience` with a dot. Headline: `Building since 2024.` Short side note at right: "Learned it, shipped it, got promoted."
- Header row: `2024`, `2025`, `2026 - now` in uppercase small labels over a hairline, like the WEEK row.
- Three tracks of staggered rounded pills (height 56-64px, radius 18px, label left, uppercase meta right):
  - **Skills:** `HTML, CSS, JavaScript` (2024), `React and web development` (2025), `Apps: Expo, React Native` (2026). Pills overlap in time.
  - **Work:** `CloudCrave: Intern` (2024-2026) joined to `CloudCrave: Staff` (2026-now); `Zelion: Intern` (2026-now).
  - **School:** a thin bar `Bells University, CS and IT` from 2024 running off the right edge toward `2029`.
- Styling: neutral grey pills, the current stage in near-black with light text. No other colors.
- Entrance: pills slide and fade in left to right, staggered 80ms, once.
- **Mobile:** do not shrink the chart. Stack as three cards (Skills, Work, School) with the same pill styling.
- Content must match the resume exactly.

## 10. Resume section

- Container in the style of the layout ref's closing block. A compact at-a-glance: current roles, school, 6-8 skills, one line on PrimeAxis Group (founder).
- Primary button `Download resume (PDF)` linking to `/resume.pdf`; if missing, show `TODO`.
- Optional small real photo (grayscale, circular, 72px) here only.

## 11. Motion

- Soft, crisp, staggered. Durations 500-900ms, `--ease`. Reveal on scroll once, translateY(18-24px) to 0 with opacity. Stagger 60-80ms.
- Hover: translateY(-2px) on buttons and cards, shadow deepens slightly. Folder lid lift.
- Respect `prefers-reduced-motion` (no transforms, instant states).
- Forbidden: scroll-jacking, parallax on text, slow hero intros, looping decorative animations, Three.js or WebGL.

## 12. Anti-patterns

- Generic hero plus three-card grid, centered gradient blobs, emoji icons, skill percentage bars, stock illustrations.
- Glassmorphism outside the folders, colored shadows, neon glows, hard borders, cartoon avatars.
- Lorem ipsum, invented testimonials, invented numbers, invented logos.
- Decoration without a reason. If an element cannot be justified by the concept, cut it.

## 13. Quality bar

- Mobile first: test at 375px before desktop. No horizontal scroll. Touch targets 44px.
- Performance: images WebP/AVIF, portrait under 150 KB, lazy-load below the fold, no layout shift, Lighthouse performance 90+ on mobile.
- Accessibility: contrast AA, visible focus rings, semantic landmarks, alt text, full keyboard use, correct heading order.
- SEO: title, meta description, Open Graph image, `lang="en"`.

## 14. Content rules

- Copy is short, plain and specific. Claim only what is true: nothing about Synapse; "Building since 2024"; both 2026 roles shown as overlapping.
- Unknown facts render as visible `TODO`. Never fabricate.
- Needed from Michael: real email and phone, CloudCrave job title and 2-3 contributions, screenshots or demos for featured projects, Clover description, footer band color decision, `resume.pdf`. (The portrait is `final dev image.png`, already provided.)
