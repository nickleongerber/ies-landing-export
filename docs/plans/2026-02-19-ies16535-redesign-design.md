# IES-16535: Landing Page Redesign — Design Document

> Datum: 2026-02-19 | Status: Abgenommen (Draft)

## Kontext

Neue Anforderungen für die IES NG Landing Page. Komplett-Redesign der bestehenden Single-HTML-Seite. Design angelehnt an [alert.swiss](https://www.alert.swiss).

## Entscheidungen

| Thema | Entscheidung |
|-------|-------------|
| Architektur | Single HTML beibehalten (React via CDN, kein Build-Step) |
| Ansatz | Clean Rewrite — neue index.html, Design System + Illustrations behalten |
| CMS | Kommt später durch Entwickler. Jetzt: strukturiertes CONFIG-Objekt, CMS-ready |
| i18n | Infrastruktur einbauen (Translation-Keys + `t()` Helper), nur DE mit echtem Content |
| System-Status | Statisch im CONFIG (kein Live-API) |
| Kantonskarte | Echte SVG-Schweizerkarte mit klickbaren Kantonen |
| Design-Sprache | Alertswiss-angelehnt: clean, weiß, Bundes-Ästhetik, Sans-Serif, Rot/Blau Akzente |

## Seitenstruktur

### 1. Header & Quick-Access
- Sticky Header: IES NG Logo links, Navigation rechts
- System-Status-Leiste unter Header: 3 Chips (Produktiv, Schulung, edu) — grün/gelb/rot
- Direkt-Links als Buttons: Produktivsystem, Schulungsumgebung, Edu, Abnahme
- Sprach-Switcher (DE/FR/IT/EN) oben rechts
- Mobile: Hamburger-Menu, Status-Leiste kompakt

### 2. Hero + Countdown
- Clean Hero ohne Video (Alertswiss-Stil)
- Headline: "IES NG — Die Zukunft der Einsatzführung"
- Countdown-Widget zum 19.10.2026 (Tage/Stunden/Minuten)
- Kurze Projektbeschreibung (2-3 Sätze)

### 3. Roadmap / Meilensteine
- Vertikale Timeline, 5 Meilensteine:
  - 01.07.2025: Go-Live Heilmittelplattform (BWL)
  - Okt 2025: Schulung Head of Pools + Experten + Pilotkantone
  - Feb 2026: Schulung alle Nutzer
  - Jun 2026: Produktivsystem technisch verfügbar
  - **19.10.2026: Gesamtschweizerischer Cut-over** (hervorgehoben)
- Info-Block: Details zur IES-KSD Ablösung nach 20+ Jahren

### 4. Stakeholder & Organisationen
- 3-Ebenen-Modell visuell dargestellt:
  - **Strategisch:** Verbände (IVR, SGNOR, Swiss Paramedic Association) — Sitz im Projektausschuss
  - **Taktisch:** Head of Pools & Experts — Fachspezialisten, Anforderungen & Testing
  - **Operativ:** Die Pools (berufsspezifische Gruppen / User)
- CTA: "Blick in die digitale Werkstatt" — Online-Events alle 2 Monate

### 5. Interaktive Kantonskarte
- Inline-SVG Schweizerkarte mit 26 Kantonen
- Farbcodierung nach Status:
  - Grau: In Planung
  - Gelb: Pilotierung
  - Blau: Schulung
  - Grün: Produktiv
- Klick auf Kanton → Overlay/Panel:
  - Aktueller Stand der Einführung
  - Kontaktperson (Name/Funktion)
  - Schulungstermine/Infos
- Legende unterhalb der Karte

### 6. News, Release Notes & FAQ
- 3 Bereiche (Tabs oder Spalten):
  - **News:** Karten mit Datum, Titel, Kurzbeschreibung
  - **Release Notes:** Version + Änderungen
  - **FAQ:** Akkordeon (Anmeldung, Zugriffsberechtigungen, org. Schnittstellen)
- Content aus CONFIG-Arrays

### 7. Organisation & Kontakt
- Trägerschaft: BABS mit Logo
- Kooperationspartner: Grid mit Bundesämtern + Ansprechpersonen
- Kontakt-Hub: Zentrales Postfach für Projektanfragen

### 8. Footer
- Mobile App-Links: Google Play + Apple AppStore Badges
- Rechtliches: Impressum, Datenschutz (Schweizer Recht / Bundesstandard)
- System-Status kompakt (Wiederholung)
- Copyright

## Technische Architektur

### i18n-System
```javascript
const TRANSLATIONS = {
  de: { 'hero.title': 'IES NG — Die Zukunft der Einsatzführung', ... },
  fr: { 'hero.title': '[FR] ...', ... },
  it: { 'hero.title': '[IT] ...', ... },
  en: { 'hero.title': '[EN] ...', ... },
};
const t = (key) => TRANSLATIONS[currentLang][key] || TRANSLATIONS['de'][key];
```

### CONFIG-Struktur (CMS-ready)
```javascript
const CONFIG = {
  org: 'BABS',
  systems: [
    { name: 'Produktivsystem', status: 'online', url: '...', version: '...' },
    { name: 'Schulungsumgebung', status: 'online', url: '...' },
    { name: 'edu', status: 'maintenance', url: '...' },
    { name: 'Abnahme', status: 'online', url: '...' },
  ],
  roadmap: [
    { date: '2025-07-01', title: '...', description: '...', completed: true },
    // ...
  ],
  cutoverDate: '2026-10-19',
  stakeholders: { strategic: [...], tactical: [...], operative: [...] },
  cantons: {
    ZH: { status: 'pilot', contact: { name: '...', role: '...' }, trainings: [...] },
    // ... 26 Kantone
  },
  news: [...],
  releaseNotes: [...],
  faq: [...],
  contact: { org: 'BABS', email: '...', address: [...] },
  apps: { playStore: '...', appStore: '...' },
  legal: { impressum: '...', datenschutz: '...' },
};
```

### Kantonskarte
- Inline-SVG mit `<path>` pro Kanton, `data-canton="ZH"` Attribute
- React-State für selektierten Kanton
- Farbgebung via CSS-Klassen basierend auf `CONFIG.cantons[id].status`

### Beibehaltene Assets
- `design-system/design-system.css` — Tokens anpassen Richtung Alertswiss
- `design-system/design-system.js` — React Components erweitern
- `illustrations/` — SVGs wo passend wiederverwenden
- `lib/agentation.js` — beibehalten

## Akzeptanzkriterien (aus Ticket)
- [x] Alle Punkte aus Lieferergebnisse auf Landing-Page verfügbar
- [ ] Durch Projektmitarbeiter editierbar (CONFIG-Objekt, Prozedur dokumentiert)
- [ ] Prozedur zur Aktualisierung dokumentiert
- [ ] Design angelehnt an alert.swiss
- [ ] Mehrsprachig (DE fertig, FR/IT/EN Infrastruktur)
