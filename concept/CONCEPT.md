# IES NG Landing Page — Konzept & Strategie

> Konzeptdokument für Stakeholder-Review und Projekt-Handoff.
> Stand: 09.02.2026

---

## 1. Projektziel

Erstellung einer modernen, einladenden Informations- und Einstiegsseite für das Projekt **IES New Generation** (IES NG). Die Seite dient als **Template**, das pro Organisation (BABS, BWL, etc.) konfiguriert und von einem Entwickler-Team weitergeführt wird.

### Primärziel
Schneller Zugang zu den beiden Umgebungen:
- **Produktion** (Live-System) — primärer CTA
- **Schulung / Test** — sekundärer CTA

### Sekundärziel
Informieren über das Projekt: Hintergrund, Fortschritt, Angebote (Digitale Werkstatt), Roadmap — in gut portionierten, visuell ansprechenden Abschnitten.

---

## 2. Zielgruppen

| Zielgruppe | Bedürfnis | Priorität |
|-----------|-----------|-----------|
| **Aktive Nutzer** (Kantonsangehörige, Einsatzkräfte) | Schneller Login zur Produktion/Schulung | Hoch |
| **Neue Nutzer** | Onboarding, Erste Schritte, Zugang beantragen | Mittel |
| **Entscheider / Stakeholder** | Projektinformation, Fortschritt, Partner | Mittel |
| **Interessierte / Pool-Teilnehmer** | Werkstatt-Angebote, Updates, Downloads | Mittel |

**Leitsatz:** Wer das System nutzt, findet sofort den Zugang. Wer sich informiert, findet portionierte, einladende Inhalte.

---

## 3. Designprinzipien

### 3.1 Modern & Einladend
- Weg vom klassischen Gov-Look (textlastig, bürokratisch)
- Illustrationen, Icons und visuelle Hierarchie statt Textwüsten
- Grosszügiger Whitespace, klare Sektionen
- Professionell, aber nicht steril

### 3.2 Scannbar
- Jede Sektion hat ein klares visuelles Muster (Karten, Icons, Timelines)
- Beim schnellen Scrollen erkennt man sofort die Hauptthemen
- Inhalte in kleine, verdaubare Blöcke portioniert
- Headlines die sofort den Inhalt kommunizieren

### 3.3 Klarheit vor Kreativität
- Einfache, aktive Sprache ("Sie erhalten Zugang" statt "Der Zugang wird bereitgestellt")
- Keine Abkürzungen ohne Erklärung beim ersten Vorkommen
- Funktioniert auch ohne Bilder/Illustrationen (Accessibility)

### 3.4 Template-fähig
- Alle Inhalte über CONFIG-Objekt steuerbar
- Farben, Logos, Links pro Organisation anpassbar
- Architektur erlaubt spätere CMS-Integration

---

## 4. Seitenarchitektur

### Multi-Page Struktur

```
HOME (/)
│
├── ÜBER IES (/about)
│
├── WERKSTATT (/werkstatt)
│
├── ROADMAP (/roadmap)
│
└── EINSTIEG (/getting-started)
```

---

### 4.1 HOME — Startseite

Die Startseite ist der erste Eindruck. Fokus auf schnellen Zugang + Überblick.

| # | Sektion | Inhalt | Zweck |
|---|---------|--------|-------|
| 1 | **Header** | Logo, Org-Name, Sprachwechsler, Login-Buttons | Navigation + Zugang |
| 2 | **Alert Banner** | Optionale Wartungs-/Störungsmeldung | Akute Info |
| 3 | **Hero** | Titel, Kurzbeschreibung, 2 CTAs (Produktion + Schulung), ggf. Video | Haupteinstieg |
| 4 | **Was ist IES?** | 3–4 Karten mit Icon + Kurztext (Kernfunktionen) | Schnellüberblick |
| 5 | **Status Dashboard** | Ampel-Status der Systemkomponenten | Betriebsinfo |
| 6 | **Werkstatt-Teaser** | Kurzbeschreibung + nächster Termin + CTA → /werkstatt | Engagement |
| 7 | **Aktuelles** | 2–3 neueste Projekt-Updates | Aktualität zeigen |
| 8 | **Hilfreiche Links** | 4–6 Link-Tiles (Doku, Support, Onboarding, etc.) | Weiterführung |
| 9 | **Kontakt + Footer** | Adresse, E-Mail, Rechtliches | Pflicht |

**Design-Idee Hero:** Grossflächig, mit Hintergrundbild oder subtiler Illustration. Die beiden CTAs stehen nebeneinander, visuell differenziert:
- Produktion: ausgefüllter Button (Primary)
- Schulung: Outline-Button (Secondary)

---

### 4.2 ÜBER IES — Hintergrund & Kontext

Für Besucher, die mehr über das Projekt erfahren wollen.

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | **Vision & Hintergrund** | Warum IES NG? Welches Problem löst es? |
| 2 | **Ereignisbewältigung** | Die 9 Kernfragen im Ereignisfall (Karten-Grid) |
| 3 | **Projektpartner** | Strategisch / Taktisch / Operativ (3-Stufen-Visualisierung) |
| 4 | **Scope** | Was deckt IES ab? + PDF-Download |
| 5 | **Downloads** | Alle verfügbaren Dokumente gesammelt |

---

### 4.3 WERKSTATT — Digitale Werkstatt

Die "Blick in die Werkstatt" als eigenständiges, attraktives Angebot.

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | **Was ist die Digitale Werkstatt?** | Kurzbeschreibung, Zielgruppe, Format |
| 2 | **Nächste Termine** | Kommende Sessions mit Datum, Thema |
| 3 | **Pool-Anmeldung** | CTA → externer Link (konfigurierbar) |
| 4 | **Rückblick** | Highlights vergangener Sessions (optional) |
| 5 | **Pool-Dokument** | PDF-Download |

---

### 4.4 ROADMAP — Zeitplan & Releases

Für Nutzer, die den Projektfortschritt verfolgen.

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | **Zeitplan** | Roadmap-Grafik (Meilensteine) |
| 2 | **Transition** | Von IES-KSD zu IES NG (Timeline mit Phasen) |
| 3 | **Releasenotes** | Versionierte Änderungen mit Feature/Fix/Improvement Tags |
| 4 | **Wartungsfenster** | Geplante Wartungen mit Datum, Uhrzeit, Impact |

---

### 4.5 EINSTIEG — Erste Schritte (Getting Started)

Für neue Nutzer, die Zugang erhalten wollen.

| # | Sektion | Inhalt |
|---|---------|--------|
| 1 | **Rollenwahl** | "Ich bin..." — Admin / Enduser / Ausbilder |
| 2 | **Checkliste** | Schritt-für-Schritt Zugang beantragen |
| 3 | **Onboarding** | Links zu Schulungsmaterial, Videos, Tutorials |
| 4 | **FAQ** | Häufige Fragen (Akkordeon) |

> **Hinweis:** Diese Seite ist konzeptionell vorbereitet. Der genaue Inhalt wird gemeinsam mit den POs definiert.

---

## 5. Navigation & Header

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] IES NG        Über IES  Werkstatt  Roadmap  Einstieg│
│                                          [DE ▾]  [Buttons] │
└─────────────────────────────────────────────────────────────┘
```

- **Logo + Name:** Links, immer sichtbar
- **Navigation:** Hauptseiten als Links
- **Sprachwechsler:** Dropdown (DE/FR/IT/EN), initial nur DE aktiv
- **Login-Buttons:** Rechts, immer sichtbar (Produktion + Schulung)
- **Sticky Header:** Bleibt beim Scrollen sichtbar
- **Mobile:** Hamburger-Menü, Login-Buttons bleiben sichtbar

---

## 6. Sprachen

| Sprache | Status | Anmerkung |
|---------|--------|-----------|
| Deutsch | Aktiv | Erstsprache, vollständig |
| Français | Geplant | UI-Switcher vorhanden, Übersetzung offen |
| Italiano | Geplant | UI-Switcher vorhanden, Übersetzung offen |
| English | Geplant | UI-Switcher vorhanden, Übersetzung offen |

**Strategie:**
- Sprachwechsler von Anfang an im UI (zeigt Bereitschaft)
- Nicht-übersetzte Sprachen zeigen Fallback auf Deutsch mit Hinweis
- Vollständige Übersetzung kommt mit CMS-Integration
- Architektur: i18n-fähiges CONFIG-Objekt (Texte als Schlüssel, pro Sprache auflösbar)

---

## 7. Technische Architektur

### Stack
- **Framework:** React 19 + Vite
- **Routing:** React Router (Client-Side) für Multi-Page
- **Styling:** Design System (CSS Tokens + Komponenten)
- **Icons:** Lucide React
- **Hosting:** Vercel
- **Build:** Vite (statischer Export)

### Content-Management
- **Phase 1 (jetzt):** Statisches CONFIG-Objekt
- **Phase 2 (später):** CMS-Integration (durch weiterführendes Dev-Team)
- **Vorbereitung:** CONFIG-Struktur so gestalten, dass sie 1:1 durch CMS-API ersetzbar ist

### Multi-Tenant
- Ein CONFIG pro Organisation (BABS, BWL, etc.)
- Farben, Logos, Links, Texte konfigurierbar
- Gleiches Template, verschiedene Ausprägungen

---

## 8. Abgrenzung & Nicht-Scope

| Thema | Entscheidung |
|-------|-------------|
| CMS-Integration | Nicht in Phase 1, Architektur aber vorbereitet |
| Vollständige Übersetzungen | Nicht in Phase 1, Sprachwechsler-UI vorhanden |
| Authentifizierung | Kein Login auf der Landing Page selbst — Links zu externen Umgebungen |
| Dark Mode | Nicht geplant (nice-to-have) |
| Analytics | Nicht in Phase 1 |
| Backend / API | Kein eigenes Backend, rein statisch |

---

## 9. Offene Punkte

| # | Thema | Status | Anmerkung |
|---|-------|--------|-----------|
| 1 | Getting-Started Inhalte | Offen | Gemeinsam mit POs definieren |
| 2 | Werkstatt-Termine | Offen | Quelle klären (manuell vs. API) |
| 3 | Illustrationen / Bildsprache | Offen | undraw.co oder eigene? |
| 4 | BWL-Konfiguration | Offen | Zweite Organisation als Template-Variante |
| 5 | Pool-Anmeldung URL | Offen | Externer Link von BABS bereitstellen |
| 6 | Barrierefreiheit (WCAG 2.1 AA) | Empfohlen | Pflicht für Bundesverwaltung |

---

## 10. Nächste Schritte

1. **Stakeholder-Review** dieses Konzepts
2. **Wireframes** für Homepage + 1–2 Unterseiten
3. **Design-Iteration** basierend auf Wireframes
4. **Implementation** der Multi-Page-Architektur (React Router)
5. **Content-Feinschliff** mit POs
6. **Feedback-Runde** mit Stakeholdern
