# IES-16535: Landing Page Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Complete rewrite of the IES NG landing page per IES-16535 requirements, Alertswiss-inspired design.

**Architecture:** Single HTML file, React 18 via CDN (Babel standalone), no build step. Structured CONFIG object for all content (CMS-ready). i18n via translation keys with `t()` helper. Existing design-system.css/.js reused and extended.

**Tech Stack:** React 18 (CDN), Babel Standalone, Lucide React Icons, Custom Design System (CSS tokens + React components), Inline SVG (canton map)

**Design Doc:** `docs/plans/2026-02-19-ies16535-redesign-design.md`

---

## Task 1: Scaffold — New index.html Skeleton + i18n + CONFIG

**Files:**
- Backup: `index.html` → `index.old.html`
- Create: `index.html` (new)

**Step 1: Backup old index.html**
```bash
cp index.html index.old.html
```

**Step 2: Create new index.html with base structure**

Minimal HTML with:
- CDN scripts (React 18, ReactDOM, Babel, Lucide)
- Link to `design-system/design-system.css`
- Script tag for `design-system/design-system.js`
- Script tag for `lib/agentation.js`
- `<div id="root">`
- Babel script block with:
  - `TRANSLATIONS` object (DE complete, FR/IT/EN placeholder keys)
  - `t(key)` helper function
  - `LanguageContext` (React Context for current language)
  - `CONFIG` object with full structure (all sections, sample data)
  - `App` component rendering placeholder sections
  - `ReactDOM.createRoot` mount

**CONFIG structure:**
```javascript
const CONFIG = {
  org: 'BABS',
  orgFull: 'Bundesamt für Bevölkerungsschutz',
  logoUrl: 'illustrations/logo-ies.svg',
  systems: [
    { id: 'prod', name: 'Produktivsystem', status: 'online', url: '#', version: '2.1.0', updated: '2026-02-19' },
    { id: 'training', name: 'Schulungsumgebung', status: 'online', url: '#' },
    { id: 'edu', name: 'Edu-Plattform', status: 'online', url: '#' },
    { id: 'acceptance', name: 'Abnahme', status: 'maintenance', url: '#' },
  ],
  cutoverDate: '2026-10-19T00:00:00',
  hero: {
    title: 'hero.title',  // i18n key
    subtitle: 'hero.subtitle',
    description: 'hero.description',
  },
  roadmap: [
    { date: '2025-07-01', titleKey: 'roadmap.heilmittel', completed: true },
    { date: '2025-10-01', titleKey: 'roadmap.schulung_pilot', completed: true },
    { date: '2026-02-01', titleKey: 'roadmap.schulung_alle', completed: true },
    { date: '2026-06-01', titleKey: 'roadmap.produktiv_technik', completed: false },
    { date: '2026-10-19', titleKey: 'roadmap.cutover', completed: false, highlight: true },
  ],
  stakeholders: {
    strategic: [
      { name: 'IVR', role: 'Projektausschuss' },
      { name: 'SGNOR', role: 'Projektausschuss' },
      { name: 'Swiss Paramedic Association', role: 'Projektausschuss' },
    ],
    tactical: [
      { name: 'Head of Pools', description: 'stakeholder.hop_desc' },
      { name: 'Experts', description: 'stakeholder.expert_desc' },
    ],
    operative: [
      { name: 'Pool Rettungsdienst', key: 'pool.rettung' },
      { name: 'Pool Sanität', key: 'pool.sanitaet' },
      { name: 'Pool Spital', key: 'pool.spital' },
    ],
  },
  workshopCta: { titleKey: 'workshop.title', url: '#', interval: 'workshop.interval' },
  cantons: {
    ZH: { status: 'planning', contact: { name: 'TBD', role: 'TBD' }, trainings: [] },
    BE: { status: 'pilot', contact: { name: 'TBD', role: 'TBD' }, trainings: [] },
    // ... all 26 cantons
  },
  news: [
    { date: '2026-02-01', titleKey: 'news.wef', descriptionKey: 'news.wef_desc' },
  ],
  releaseNotes: [
    { version: '2.1.0', date: '2026-02-15', changes: ['release.change1'] },
  ],
  faq: [
    { questionKey: 'faq.login', answerKey: 'faq.login_answer' },
    { questionKey: 'faq.access', answerKey: 'faq.access_answer' },
  ],
  contact: {
    org: 'Bundesamt für Bevölkerungsschutz (BABS)',
    address: ['Monbijoustrasse 51A', '3003 Bern'],
    email: 'ies@babs.admin.ch',
  },
  partners: [
    { name: 'BABS', logoKey: 'partner.babs' },
  ],
  apps: {
    playStore: '#',
    appStore: '#',
  },
  legal: {
    impressumUrl: '#',
    datenschutzUrl: '#',
  },
};
```

**Step 3: Verify skeleton loads in browser**

Run: open `http://localhost:8080` — should see blank page with no console errors, placeholder text for each section.

**Step 4: Commit**
```bash
git add index.html index.old.html
git commit -m "feat(IES-16535): scaffold new index.html with CONFIG + i18n"
```

---

## Task 2: Design System CSS — Alertswiss Adjustments

**Files:**
- Modify: `design-system/design-system.css`

**Step 1: Adjust color tokens**

Update primary palette toward Alertswiss aesthetic (clean federal look, stronger red accents):
- Keep existing blue primary (#0E3D73) as base
- Add Swiss red accent: `--color-accent: #D32F2F` (Bundesrot-nah)
- Ensure surface colors are clean white/light gray
- Add section-specific background variables

**Step 2: Add new utility classes**

Add classes needed for new sections:
- `.section-alt` — alternating light background
- `.container` — max-width centered container
- `.status-chip` — for system status indicators (online/offline/maintenance)
- `.countdown` — countdown widget styles
- `.timeline` — vertical timeline styles
- `.canton-map` — map container + canton hover/active states
- `.tab-section` — news/release/faq tab area
- `.footer-apps` — app store badge layout

**Step 3: Visual verify** — check design-system/showcase.html still works.

**Step 4: Commit**
```bash
git add design-system/design-system.css
git commit -m "feat(IES-16535): adjust design tokens for Alertswiss aesthetic"
```

---

## Task 3: Header + System-Status-Leiste

**Files:**
- Modify: `index.html` (add Header + StatusBar components)

**Step 1: Build `StatusBar` component**
- Renders `CONFIG.systems` as colored chips
- Green = online, Yellow = maintenance, Red = offline
- Uses `Badge` from design system

**Step 2: Build `Header` component**
- Sticky, white background, subtle shadow on scroll
- Left: IES NG logo (from `CONFIG.logoUrl`)
- Center: Nav links (Scroll-to anchors: Vision, Roadmap, Karte, News, Kontakt)
- Right: Language switcher (DE/FR/IT/EN buttons, only DE active)
- Direct-links row below nav: 4 buttons for systems (Produktiv, Schulung, Edu, Abnahme)
- Mobile: Hamburger menu with drawer

**Step 3: Visual verify** — header sticky, status bar visible, mobile responsive.

**Step 4: Commit**
```bash
git commit -m "feat(IES-16535): add header with status bar and quick-access links"
```

---

## Task 4: Hero + Countdown

**Files:**
- Modify: `index.html` (add Hero + Countdown components)

**Step 1: Build `Countdown` component**
- Calculate diff from `CONFIG.cutoverDate` to now
- Display: Tage / Stunden / Minuten / Sekunden
- `useEffect` with `setInterval(1000)` for live update
- Styled as prominent widget (large numbers, small labels)

**Step 2: Build `HeroSection` component**
- Clean full-width section, light gradient background
- Large headline via `t(CONFIG.hero.title)`
- Subtitle + short description
- Countdown widget prominently placed
- Optional: one of the existing SVG illustrations (e.g., `connected-world.svg`)

**Step 3: Visual verify** — countdown ticks, text readable, responsive.

**Step 4: Commit**
```bash
git commit -m "feat(IES-16535): add hero section with countdown to cutover date"
```

---

## Task 5: Roadmap / Meilensteine

**Files:**
- Modify: `index.html` (add RoadmapSection component)

**Step 1: Build `RoadmapSection` component**
- Vertical timeline from `CONFIG.roadmap`
- Each milestone: date badge, title, description
- Completed items: solid circle, muted style
- Current/future: outlined circle
- Highlight item (cutover 19.10.2026): red accent, larger, with emphasis
- Below timeline: info block about IES-KSD transition (20+ years)

**Step 2: Add timeline CSS** (if not already in Task 2)

**Step 3: Visual verify** — timeline renders vertically, highlight visible, mobile stacks correctly.

**Step 4: Commit**
```bash
git commit -m "feat(IES-16535): add roadmap timeline with milestones"
```

---

## Task 6: Stakeholder & Organisationen

**Files:**
- Modify: `index.html` (add StakeholderSection component)

**Step 1: Build `StakeholderSection` component**
- 3-level visual (cards or columns):
  - **Strategisch**: organization cards from `CONFIG.stakeholders.strategic`
  - **Taktisch**: Head of Pools + Experts with descriptions
  - **Operativ**: Pool list from `CONFIG.stakeholders.operative`
- Each level has icon + title + content
- CTA button at bottom: "Blick in die digitale Werkstatt" → links to workshop URL
- Uses `Card` component from design system

**Step 2: Visual verify** — 3 levels readable, CTA prominent, mobile stacks.

**Step 3: Commit**
```bash
git commit -m "feat(IES-16535): add stakeholder section with 3-level model"
```

---

## Task 7: Interaktive Kantonskarte (SVG)

**Files:**
- Create: `illustrations/switzerland.svg` (or inline in index.html)
- Modify: `index.html` (add CantonMapSection component)

**Step 1: Source/create Switzerland SVG**

Need an SVG map of Switzerland with 26 cantons as individual `<path>` elements with `id` attributes matching canton codes (ZH, BE, LU, etc.). Source options:
- Wikipedia Commons (public domain Swiss canton map SVG)
- Generate simplified SVG

Each path needs `data-canton="XX"` attribute.

**Step 2: Build `CantonMapSection` component**
- Render inline SVG
- Color each canton based on `CONFIG.cantons[id].status`:
  - `planning` → gray (#DCE3E8)
  - `pilot` → yellow (#F5A623)
  - `training` → blue (#1C79E5)
  - `productive` → green (#0B6E35)
- Hover: darken fill, show tooltip with canton name
- Click: open detail panel (slide-in or modal) showing:
  - Canton name + status badge
  - Contact person (name, role)
  - Training info/dates
- Legend below map with color explanations
- Uses `Modal` or custom panel from design system

**Step 3: Visual verify** — map renders, colors correct, click opens panel, mobile: map scrollable.

**Step 4: Commit**
```bash
git commit -m "feat(IES-16535): add interactive canton map with status overlay"
```

---

## Task 8: News, Release Notes & FAQ

**Files:**
- Modify: `index.html` (add NewsSection component)

**Step 1: Build `NewsSection` component**
- Uses `Tabs` component from design system with 3 tabs:
  - **News**: card grid from `CONFIG.news` — date, title, description
  - **Release Notes**: list from `CONFIG.releaseNotes` — version badge, date, change list
  - **FAQ**: accordion from `CONFIG.faq` — uses `Collapsible` component

**Step 2: Visual verify** — tabs switch, content renders, FAQ collapses/expands.

**Step 3: Commit**
```bash
git commit -m "feat(IES-16535): add news, release notes, and FAQ section with tabs"
```

---

## Task 9: Organisation & Kontakt

**Files:**
- Modify: `index.html` (add ContactSection component)

**Step 1: Build `ContactSection` component**
- Left: BABS info (logo, full name, address from CONFIG)
- Center: Partner grid from `CONFIG.partners`
- Right: Contact hub — email link, postal address
- Clean 3-column layout, collapses on mobile

**Step 2: Visual verify** — layout balanced, email clickable, mobile stacks.

**Step 3: Commit**
```bash
git commit -m "feat(IES-16535): add organization and contact section"
```

---

## Task 10: Footer

**Files:**
- Modify: `index.html` (add Footer component)

**Step 1: Build `Footer` component**
- Top row: App store badges (Play Store + App Store) from `CONFIG.apps`
- Middle row: Legal links (Impressum, Datenschutz) from `CONFIG.legal`
- Bottom row: System status compact (small dots) + Copyright
- Dark background, light text

**Step 2: Visual verify** — footer at bottom, badges visible, links work.

**Step 3: Commit**
```bash
git commit -m "feat(IES-16535): add footer with app links and legal"
```

---

## Task 11: Mobile Responsiveness Pass

**Files:**
- Modify: `index.html` (responsive tweaks)
- Modify: `design-system/design-system.css` (media queries if needed)

**Step 1: Test all sections at mobile breakpoints (375px, 768px, 1024px)**

Check and fix:
- Header hamburger menu works
- Status bar wraps or scrolls horizontally
- Hero text sizes down
- Timeline becomes single-column
- Canton map is scrollable/zoomable on mobile
- Tabs stack properly
- Footer stacks

**Step 2: Visual verify** — at each breakpoint, all sections usable.

**Step 3: Commit**
```bash
git commit -m "feat(IES-16535): mobile responsiveness pass"
```

---

## Task 12: Content Update Procedure Documentation

**Files:**
- Create: `docs/CONTENT-UPDATE-GUIDE.md`

**Step 1: Write guide**

Document for project team members:
- How to edit content in CONFIG object
- How to add news items, FAQ entries, release notes
- How to update canton status
- How to update system status
- How to deploy via `git push` + Vercel auto-deploy
- How to add translations (FR/IT/EN keys)

**Step 2: Commit**
```bash
git add docs/CONTENT-UPDATE-GUIDE.md
git commit -m "docs(IES-16535): add content update procedure guide"
```

---

## Task 13: Final Polish + Deploy

**Files:**
- Modify: `index.html` (final adjustments)

**Step 1: Full visual walkthrough**
- Scroll through entire page desktop + mobile
- Check all interactive elements (map, tabs, FAQ, countdown, nav)
- Verify smooth scroll anchors work
- Check no console errors

**Step 2: Clean up**
- Remove `index.old.html` (or keep in git history)
- Ensure `.gitignore` includes `.vercel`

**Step 3: Deploy**
```bash
vercel --prod
```

**Step 4: Final commit**
```bash
git commit -m "feat(IES-16535): final polish and production deploy"
```

---

## Task Order & Dependencies

```
Task 1 (Scaffold) → Task 2 (CSS)
                  → Task 3 (Header)  → Task 4 (Hero)
                                     → Task 5 (Roadmap)
                                     → Task 6 (Stakeholder)
                                     → Task 7 (Canton Map)
                                     → Task 8 (News/FAQ)
                                     → Task 9 (Contact)
                                     → Task 10 (Footer)
                  → Task 11 (Mobile) — after all sections done
                  → Task 12 (Docs) — independent
                  → Task 13 (Polish) — last
```

Tasks 3–10 are largely independent after Task 1+2 are done. Task 7 (Canton Map) is the most complex and can be parallelized with other sections.
