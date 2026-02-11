# IES NG Landing Page — Spezifikation & Anforderungen

> Lebendiges Dokument. Wird laufend ergänzt basierend auf Feedback und neuen Anforderungen.

## Auftrag

Erstellung einer Landing Page für das Projekt "IES New Generation" (IES NG), die als zentrale Informations- und Einstiegsseite für alle Beteiligten dient. Die Seite soll als **Template** dienen, das pro Organisation (BABS, BWL, etc.) konfiguriert werden kann.

## Quellen

| Quelle | Beschreibung |
|--------|-------------|
| [babs.admin.ch/de/ies-ng](https://www.babs.admin.ch/de/ies-ng) | Aktueller Content (Text, Bilder, Downloads) |
| [Confluence: Landingpage Konzept](https://nexwork.atlassian.net/wiki/spaces/IESNG/pages/3937501418/Landingpage+Konzept) | Ältere Anforderungen / Ideensammlung |

## Architektur

- **Single HTML File** mit inline CSS + JSX (Babel Standalone)
- **Kein Build-Step** — React 18 + Babel via CDN
- **Design System** aus `design-system/` Ordner (CSS Tokens + React Components)
- **CONFIG-Objekt** am Anfang der Datei steuert alle Inhalte pro Organisation

## Sektionen

### Pflicht (implementiert)

| # | Sektion | Beschreibung | Datenquelle |
|---|---------|-------------|-------------|
| 1 | **Header** | Sticky, Logo + Org-Name + Login-Buttons | CONFIG |
| 2 | **Alert Banner** | Optionale Warnmeldung (Wartung, Störung) | CONFIG.alertBanner |
| 3 | **Hero** | Titel, Beschreibung, Login-CTAs, Video-Link | CONFIG.hero |
| 4 | **Status Dashboard** | Ampel-Status aller Systemkomponenten | CONFIG.systemStatus |
| 5 | **Hintergrund & Ziele** | Vision, Ziele des Projekts + Illustration | Statisch |
| 6 | **Ereignisbewältigung** | Kernfragen im Ereignisfall, Karten-Grid | Statisch |
| 7 | **Roadmap** | Projekt-Zeitplan als Bild | CONFIG.images.roadmap |
| 8 | **Digitale Werkstatt** | Pool-Info + Download | CONFIG.downloads.pool |
| 9 | **Transitionsplan** | Timeline mit Meilensteinen + Download | Statisch + CONFIG |
| 10 | **Scope** | Bedarfsevaluation + Download | CONFIG.downloads.scope |
| 11 | **Projektpartner** | 3 Stufen: Strategisch, Taktisch, Operativ | Statisch |
| 12 | **Releasenotes** | Versionierte Änderungen mit Typ-Tags | CONFIG.releases |
| 13 | **Wartungsfenster** | Geplante Wartungen mit Datum/Zeit/Impact | CONFIG.maintenance |
| 14 | **Projektupdates** | Collapsible Updates (PI 4, Jan 2025, etc.) | Statisch |
| 15 | **Hilfreiche Links** | 6 Link-Tiles (Docs, API, Support, etc.) | CONFIG.quickLinks |
| 16 | **Kontakt** | Adresse, E-Mail, Schnellzugriff-Buttons | CONFIG.contact |
| 17 | **Footer** | Copyright | CONFIG |

### Offen / Ideen

- [ ] Mehrsprachigkeit (DE/FR/IT)
- [ ] Dynamische Daten via API statt CONFIG-Objekt
- [ ] Authentifizierter Bereich (z.B. personalisierte Infos)
- [ ] Dark Mode

## Multi-Tenant / Multi-Org

Die Seite wird über das `CONFIG`-Objekt pro Organisation konfiguriert:

```js
CONFIG = {
  org: "BABS",           // Kürzel
  orgFull: "Bundesamt für Bevölkerungsschutz BABS",
  logoUrl: "",           // Logo-URL
  loginLinks: [...],     // Produktion + Schulung URLs
  // ... alle weiteren Inhalte
}
```

Geplante Organisationen:
- **BABS** (Bundesamt für Bevölkerungsschutz) — Primär
- **BWL** (Bundesamt für wirtschaftliche Landesversorgung) — Geplant

## Technische Abhängigkeiten

| Dependency | Version | CDN | Zweck |
|-----------|---------|-----|-------|
| React | 18.x | unpkg | UI Framework |
| ReactDOM | 18.x | unpkg | DOM Rendering |
| Lucide React | 0.563.0 | unpkg | Icons |
| Babel Standalone | latest | unpkg | JSX Transformation |
| Design System | lokal | `../design-system/` | Tokens + Komponenten |

### CDN-Reihenfolge (kritisch)

1. react
2. react-dom
3. `window.react = window.React` (Shim!)
4. lucide-react
5. design-system.js
6. babel standalone

## Design

- **Illustrationen**: undraw.co (MIT-lizenziert), CDN: `https://cdn.undraw.co/illustrations/{slug}.svg`
- **Bilder**: von babs.admin.ch (Roadmap, etc.)
- **Farben**: Design System Tokens (Primary: #0E3D73, etc.)
- **Typografie**: Inter (via Design System)
- **Layout**: Max-width 1080px, responsive Grid

## Status

| Task | Status |
|------|--------|
| Content von babs.admin.ch | ✅ Übernommen |
| Confluence-Anforderungen integriert | ✅ Gap-Analyse + 4 neue Sektionen |
| Illustrationen (undraw.co) | ✅ 7 Illustrationen |
| Status Dashboard | ✅ Platzhalter-Daten |
| Releasenotes | ✅ Beispieldaten |
| Wartungsfenster | ✅ Beispieldaten |
| Quick Links | ✅ Platzhalter |
| Design-Überarbeitung | 🔄 In Arbeit |
| Storybook Component Sheet | ⬜ Offen |
| Multi-Org Setup (BWL) | ⬜ Offen |
