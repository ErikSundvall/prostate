# PRD: Prostate MRI Zone Map Widget (SVG, Web Component)

## 1. Introduction / Overview

We will build a vector-graphics, HTML/JS/SVG-based widget to visualize a standardized prostate zone map for multidisciplinary team (MDT) conferences. The widget renders an accurate 2D schematic of the prostate divided into named zones and highlights where lesions occur, based on provided input data (view-only). The naming convention follows a three-dimensional coordinate schema, e.g., `1Cv` or `4Ad`, where:
- 1–4: rightmost (1) to leftmost (4)
- A/B/C: base (A), mid (B), apex (C)
- v/d: ventral (v, anterior) / dorsal (d, posterior)

The widget must be bilingual (Swedish/English) for labels, hints, and UI copy and must align with the Swedish guideline for localization of findings on prostate MRI.

Primary use: The MDT coordinator prepares a summary, and the widget is displayed to all MDT staff to visualize lesion locations. The widget presents data from an external JSON source (no in-widget authoring/editing in v1), with inspect-only interactions for details.

## 2. Goals

- Provide an accurate, guideline-aligned SVG map of prostate zones with canonical IDs and bilingual UI labels.
- Visualize lesions across one or more zones; handle multiple lesions overlapping the same zone.
- Offer inspect-only interactions (e.g., open a detail panel) without editing.
- Support JSON import/export for round-tripping lesion data without loss.
- Ensure accessibility (colorblind-safe palette, keyboard/ARIA) and fast load (<200 ms on a modern laptop, no network).
- Ship as a framework-agnostic Web Component with a demo page and NPM package.

## 3. User Stories

- As an MDT coordinator (primary user), I want to load pre-existing lesion data so the widget visualizes lesions by zone for the MDT meeting.
- As an MDT attendee, I want to quickly see which prostate zones contain lesions so I can understand lesion distribution.
- As an MDT attendee, I want to click or use the keyboard to open a small detail panel for a zone/lesion to read PI-RADS and comments.
- As a coordinator, I want to export the data (JSON) presented by the widget to include in documentation or to re-import later, without loss.
- As staff in Sweden, I want labels and hints in Swedish; as international staff, I want English, and I need to switch between languages easily.

## 4. Functional Requirements

1) Zone map rendering
   - 1.1 The system must render an SVG prostate schematic divided into 24 zones: 4 (left-right quartiles) × 2 (ventral/dorsal) × 3 levels (A=base, B=mid, C=apex).
   - 1.2 Each zone must have a stable canonical ID using the pattern `[1-4][A|B|C][v|d]` (e.g., `1Cv`, `4Ad`). IDs are not translated.
   - 1.3 The overall geometry should closely reflect the PDF schematic from the background materials and Swedish guideline; exact pixel/parity is not required in v1 but shapes must be visually faithful and unambiguous.
   - 1.4 No sub-zones beyond the standard 24 zones are included in this iteration.

2) Bilingual UI (Swedish/English)
   - 2.1 The widget must provide a language toggle (sv/en) that affects labels, tooltips/hints, legends, and UI copy (not IDs).
   - 2.2 Language files must be externalizable for future additions; the surrounding application sets the default/active language via attribute/property (stateless; no persistence like localStorage in v1).

3) Data input (view-only)
   - 3.1 The widget must accept lesion data via a JSON object adhering to this schema:
     ```json
       {
          "lesions": [
             {
                "id": "L1",                       // string (unique within the dataset)
                "zones": ["1Cv", "2Cv"],         // array of zone IDs (can span multiple zones)
                "pirads": 4,                        // integer (e.g., 1–5); already provided by source
                "comment": "Optional note",        // string, optional
                "size_mm": 12,                      // number, optional (detail panel)
                "details": {                        // optional, to align with Swedish guideline later
                   "sequence_notes": "…",          // string, optional
                   "laterality": "right",          // string, optional
                   "other": "…"                    // extensible placeholder
                }
             }
          ],
          "meta": {
             "version": "1.0",                   // optional schema/version
             "language": "sv"                    // optional hint for initial UI language
          }
       }
     ```
   - 3.2 The widget must validate that all referenced zone IDs exist; invalid IDs should be logged and ignored (no crash), surfaced via an optional warning callback/event.
   - 3.3 The widget must support loading data programmatically (property/setter) and via an HTML attribute containing a JSON string or a URL returning JSON (optional future extension; out-of-scope in v1 unless trivial).

4) Visualization rules
   - 4.1 Zones with one or more lesions must be highlighted by color.
   - 4.2 When multiple lesions affect the same zone, the zone’s color must reflect the highest PI-RADS value among those lesions by default.
   - 4.3 Provide a legend mapping PI-RADS severity to colors using a colorblind-safe palette. Default palette (placeholder, to be refined after review):
      - PI-RADS 5: #C62828 (deep red)
      - PI-RADS 4: #EF6C00 (orange)
      - PI-RADS 3: #F9A825 (amber)
      - PI-RADS 2: #66BB6A (green)
      - PI-RADS 1: #90CAF9 (blue)
      The palette must be configurable via a property or CSS custom properties for later adjustments.
   - 4.4 Lesion count per zone should be indicated (e.g., small badge/overlay number) in a non-obtrusive manner.

5) Inspect-only interactions
   - 5.1 Clicking (or keyboard activating) a zone opens a small detail panel that lists: the zone ID, lesion list that intersects the zone, each lesion’s PI-RADS, comment, and any optional fields provided (e.g., size_mm).
   - 5.2 Shift-click or right-click should also open the detail panel (mirroring the provided choice), ensuring keyboard parity (e.g., Enter/Space from focused zone opens panel).
   - 5.3 The panel is read-only in v1 (no editing). It must be dismissible via Esc and by clicking outside.

6) Accessibility
   - 6.1 Zones must be focusable and navigable via keyboard in a logical order.
   - 6.2 Each zone must expose an accessible name (e.g., "Zone 1Cv – 2 lesions – Highest PI-RADS 4").
   - 6.3 Color usage must meet colorblind-safe practice; do not rely on color alone—include badges/legend.

7) Data export
   - 7.1 Users must be able to export the current dataset as JSON (round-trip without loss), preserving lesion-to-zone relationships and attributes.
   - 7.2 Exports must not include any PHI beyond the provided lesion metadata. The widget should not introduce PHI.

8) Embedding and APIs
   - 8.1 Provide a framework-agnostic Web Component, e.g., `<prostate-mri-map>`.
    - 8.2 Public attributes/properties:
       - `language`: "sv" | "en" (set by surrounding application; no internal persistence in v1)
     - `data`: object matching the schema in 3.1
     - `theme`: optional, reserved for future color variations
   - 8.3 Events/callbacks (read-only notifications):
     - `zone-click` with `{ zoneId, lesions: [...] }`
     - `data-warning` for validation issues

9) Packaging and compatibility
   - 9.1 Provide a single embeddable bundle (UMD/IIFE) and an NPM package with ESM output.
   - 9.2 Support latest Chrome/Edge and current Firefox/Safari.
   - 9.3 License: Apache-2.0.

10) Performance and footprint
   - 10.1 Cold load (no network) must complete in < 200 ms on a modern laptop.
   - 10.2 Keep bundle size modest; avoid heavy dependencies. No frameworks required.

11) Demo
   - 11.1 Include a simple demo HTML page showing Swedish/English toggle, loading example JSON, and exporting it.

## 5. Non-Goals (Out of Scope for v1)

- Viewing MRI/DICOM images.
- 3D prostate rendering.
- Automated lesion detection.
- Advanced measurements/contours or in-widget data authoring/editing.
- Print-optimized A4 layout identical to the PDF (may be a future enhancement).

## 6. Design Considerations

- Use the provided PDF/PNG schematics (background folder) and the Swedish guideline as references for the zone boundaries and layout. The final asset is a clean, editable SVG built to be readable on typical MDT room displays.
- Visual style: modernized but faithful to the original schematic; colorblind-safe palette for PI-RADS mapping; clear badges/legend; unobtrusive labels.
- Bilingual copy: externalizable JSON dictionaries for `sv` and `en`. Zone IDs remain canonical and unchanged. Default/active language is set by the host application via property/attribute; the widget does not persist language itself.
- Consider subtle hover states and focus rings for discoverability and accessibility.

## 7. Technical Considerations

- Implementation: vanilla Web Component (Custom Elements + Shadow DOM) written in TypeScript (recommended) or modern JavaScript. Avoid framework coupling.
- Build: Rollup or Vite to produce UMD/IIFE (single file) and ESM outputs. Include type declarations if using TS.
- Testing: lightweight unit tests (e.g., Vitest/Jest) for mapping logic, color assignment, and import/export.
- Data model accommodates more than three lesions, though typical input includes up to three; UI remains performant with more.
- Security: no external calls by default; no PHI introduced. Data stays in memory unless explicitly exported.
 - License: Apache-2.0.

## 8. Success Metrics

- Accurate SVG map with all 24 zones correctly named and inspectable (A).
- JSON import/export round-trips without loss (C).
- Unit tests for core functions (G) with passing results in CI.
- Load time < 200 ms on a modern laptop (H).
- Optional qualitative: positive feedback from MDT users on clarity and bilingual usability.

## 9. Open Questions

1) Detail panel fields: When input formats are finalized, confirm the exact set beyond PI-RADS/comment/size_mm (e.g., laterality, sequence notes) and their naming.
2) Data input channel: Is attribute-based inline JSON needed in v1, or is programmatic property setting sufficient for your host application?
3) Demo datasets: Provide a small, de-identified example that matches expected MDT use for the demo page.

---

Appendix A: Example JSON

```json
{
  "lesions": [
    { "id": "L1", "zones": ["1Cv", "2Cv"], "pirads": 4, "comment": "Index lesion" },
    { "id": "L2", "zones": ["3Bd"], "pirads": 3, "comment": "Secondary" }
  ],
  "meta": { "version": "1.0", "language": "en" }
}
```
