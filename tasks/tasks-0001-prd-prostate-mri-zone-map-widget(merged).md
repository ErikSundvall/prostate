## Relevant Files

- `src/components/prostate-mri-map.ts` - Main Web Component implementing the SVG
  rendering, data binding, interactions, and public API.
- `src/components/prostate-mri-map.css` - Component styling (shadow DOM with CSS
  custom properties for theming).
- `src/assets/prostate-map.svg` - Editable SVG containing the 24 zone shapes
  with canonical IDs (pattern: `[1-4][A|B|C][v|d]`).
- `src/types.ts` - TypeScript interfaces and types for the lesion JSON schema
  and component props.
- `src/utils/palette-and-patterns.ts` - Utility functions: color/pattern
  mapping, `computeZoneState`, validation helpers, and pattern composition
  helpers.
- `src/utils/data-schema.ts` - Data validation helpers and schema-aware
  utilities (can import types from `src/types.ts`).
- `src/utils/translations.ts` - Translation dictionaries for `en` and `sv` languages used in the legend and other UI text.
- `demo/index.html` - Demo page showcasing language toggle, dataset dropdown,
      upload control, and the component. (Updated to include an internal JS demo
      renderer for quick viewing when the demo directory is served.)
- `demo/prostate-map.svg` - Copy of the SVG asset placed in `demo/` so the
      demo file-server (which may be rooted at `demo/`) can load the asset.
- `demo/data/example-1.json` - Example dataset 1 (index lesion spanning zones).
- `demo/data/example-2.json` - Example dataset 2 (multiple lesions, overlapping
  zones).
- `demo/data/example-3.json` - Example dataset 3 (edge cases: invalid zones,
  missing fields).
- `tests/validation.test.ts` - Unit tests for JSON validation and warning
  emission.
- `tests/rendering.test.ts` - Unit tests for mapping zones to SVG elements,
  color/pattern assignment and overlap handling.
- `deno.json` - Deno configuration file: tasks for `fmt`, `lint`, `test`, and
  `bundle` (and optional bundle/umd task).
- `README.md` - Usage and build instructions (Deno-centric), example JSON
  format, demo instructions and API docs.
- `LICENSE` - Apache-2.0 license file.

Skeleton files created in this step (placeholders):

- `src/components/prostate-mri-map.ts` — initial Web Component scaffold
  (placeholder)
- `src/components/prostate-mri-map.css` — CSS variables and minimal styles
- `src/assets/prostate-map.svg` — placeholder SVG with one example zone (replace
  with full 24-zone asset)
- `demo/index.html` and `demo/data/example-*.json` — demo page and example
  datasets

### Notes

- Tests should use Deno's built-in test runner. Keep tests alongside code when
  practical.
- Prefer TypeScript for type safety (`src/types.ts`), but allow plain JS for
  small helper files if needed.
- Keep the demo minimal and self-contained: no external network dependencies.

## Tasks

- [ ] 1.0 Project setup and core assets
  - [x] 1.1 Create repository skeleton and directories: `src/`,
        `src/components/`, `src/assets/`, `src/utils/`, `demo/`,
        `demo/data/`,and `tests/`.
  - [x] 1.2 Add `deno.json` with tasks for `fmt`, `lint`, `test`, `bundle`, and
        a `dev` task (if desired). Include sensible TypeScript/Deno compiler
        options and an import map if used.
    - [x] 1.3 Add `LICENSE` (Apache-2.0) and a minimal `CONTRIBUTING.md` note.
    - [x] 1.4 Create `src/assets/prostate-map.svg` with 24 clearly labeled zone
          shapes and stable IDs that match the canonical IDs (1Av, 1Ad, 1Bv, ...
          4Cv, 4Cd). - [x] 1.4.1 Defer to later: manual tracing (Inkscape) —
          Manually trace background bitmaps into yone big svg with identified
          zones. (Do not generate any help for this.) - [x] 1.4.2 pretend the
          current prostate-map.svg to be correct and go on with rest of work

    - [x] 1.5 Add three demo datasets to `demo/data/`:
    - `example-1.json` — typical MDT use (1–3 lesions, with at least one
      spanning multiple zones)
    - `example-2.json` — overlapping lesions and multiple lesions per zone
    - `example-3.json` — edge cases (invalid zone IDs, missing optional fields)
      to exercise validation and warnings

- [ ] 2.0 Web Component skeleton and public API
  - [x] 2.1 Create `src/components/prostate-mri-map.ts` (or
        `src/prostate-mri-map.ts`) and define the custom element class
        `ProstateMriMap` that extends `HTMLElement`.
  - [x] 2.2 Implement lifecycle methods: constructor, `connectedCallback`,
        `disconnectedCallback` and basic cleanup.
  - [x] 2.3 Attach an open Shadow DOM and render an SVG template (inline or via
        <object>/<svg> import) plus a container for UI chrome (legend, detail
        panel, inline warnings).
  - [x] 2.4 Expose observed attributes and properties: `language` ("sv"|"en"),
        `data` (object or JSON string), and `theme` (reserved). Support
        attribute <-> property sync and JSON parsing for `data` when provided as
        attribute.
  - [x] 2.5 Implement getters/setters for `language`, `data`, and `theme` with
        change handling and re-render hooks.
  - [x] 2.6 Add simple event emission helpers and stubs for `zone-click` and
        `data-warning` (CustomEvent) to be used throughout implementation.

        _Progress note_: `data-warning` emission is implemented and emits
        validation/parse warnings. `zone-click` event and zone interaction
        handlers are implemented (delegation to slotted SVG shapes).

- [x] 3.0 Data schema, loading and validation
  - [x] 3.1 Define TypeScript interfaces in `src/types.ts` describing the schema
        from the PRD: `Lesion`, `LesionDetails`, `ProstateMriData`, and `Meta`.
  - [x] 3.2 Implement `validateLesionData(data): { validData, warnings }` in
        `src/utils.ts` or `src/utils/data-schema.ts`. Validation details:
    - Confirm `lesions` is an array; each lesion has `id` (string), `zones`
      (array of canonical IDs), `pirads` (integer 1–5). Optional fields
      `comment`, `size_mm`, `details` accepted.
    - Check every zone referenced exists in the 24 canonical IDs; collect
      invalid zone IDs and produce warnings but do not crash.
    - Normalize zone ID casing/whitespace and dedupe zone lists per lesion.
      - [x] 3.3 Support loading data programmatically (component property), via an
        attribute containing a JSON string, and optionally via a URL (if
        provided and trivial to add). When loading from URL, handle fetch errors
        gracefully and emit warnings.

      - [x] 3.4 On validation warnings or load errors, render a small, non-blocking
        inline warning inside the component (an SVG `<text>`/HTML `<div>` placed
        in the visualization area) and dispatch a `data-warning` CustomEvent
        with `{ warnings, errors }` detail.
  - [x] 3.5 Strip or ignore invalid zone references for rendering while keeping
        them visible in the emitted warnings so host apps can log/act.

- [ ] 4.0 Visualization: colors, patterns, badges and legend
  - [x] 4.1 Add a color palette mapping PI-RADS → colors in
        `src/utils/palette-and-patterns.ts` and expose defaults as CSS custom
        properties in the component stylesheet to allow theming.
    - Defaults (ColorBrewer YlOrRd 5 sequential, mapping PI-RADS 1→light to
      5→dark):
      - PI-RADS 5: #A50F15
      - PI-RADS 4: #DE2D26
      - PI-RADS 3: #FB6A4A
      - PI-RADS 2: #FD8D3C
      - PI-RADS 1: #FFFFB2
  - [x] 4.2 Implement `computeZoneState(lesions)` that returns a mapping zoneId
        → { highestPirads, lesionIds: string[], count } and any per-zone
        pattern-stack metadata needed for rendering multiple lesions.
      - [x] 4.3 Apply fill colors to SVG zone shapes based on the computed highest
        PI-RADS per zone. Prefer CSS variables or style attributes for easy
        overrides.
                        - [x] 4.3.1 Wire `applyZoneStyles` into `src/components/prostate-mri-map.ts` so
                              the component applies computed styles to any slotted SVG when `data`
                              changes or when the `map-svg` slot content changes.
      - [x] 4.4 Define a small set of SVG `<pattern>`s (hatch, dots, diagonal) and a
        pattern assignment strategy: per lesion generate a pattern ID (e.g.,
        `pattern-L1`) and show one pattern per lesion (covering each zone of that lesion) on
        layers (semi-transparent) or  to preserve legibility of pirads colouring.
      - [x] 4.5 Change SVG manipulation of entire project to use D3 instead. Make Deno import latest D3 version and you should use https://deepwiki.com/d3/d3 to understand D3 and for querying its documentation. Feel free to simplify code while refactoring to D3.
  - [x] 4.6 Provide a legend UI (in the component) mapping PI-RADS to color and
        showing pattern examples; ensure legend text respects `language`
        property and is externalizable for translation.

- [ ] 5.0 Interactions and accessibility
  - [x] 5.1 Make each SVG zone shape focusable (`tabindex="0"`), and add
        `role="button"` (or an appropriate role) and `aria-label` describing its
        state (e.g., "Zone 1Cv — 2 lesions — Highest PI-RADS 4").
  - [x] 5.2 Add pointer and keyboard handlers: `click`, `contextmenu`
        (right-click), and `keydown` for Enter/Space to open the detail panel.
        For `contextmenu`, prevent the browser default menu when opening the
        panel.
  - [x] 5.3 Build a small, dismissible detail panel hosted inside the shadow DOM
        that lists the zone ID and lesions that intersect that zone, with
        fields: lesion id, pirads, comment, size_mm, and any details. The panel
        must be dismissible with Esc and by clicking outside.
  - [ ] 5.4 Ensure keyboard navigation order is logical (left→right, base→apex
        or another clear pattern) and that focus is trapped when the detail
        panel is open (for accessibility), or at minimum the panel is reachable
        and dismissible via keyboard.
  - [x] 5.5 Emit `zone-click` CustomEvent with `{ zoneId, lesions }` when a zone
        is activated; keep the event read-only (no modifications to underlying
        data in v1).
  - [ ] 5.6 Ensure all dynamic text is localized according to `language` and
        that language labels are externalized into small translation
        dictionaries (JSON) for `sv` and `en`.

- [ ] 6.0 Demo page and UX polish
  - [x] 6.1 Create `demo/index.html` with a `<prostate-mri-map>` instance and
        controls: language toggle (sv/en), dataset dropdown (example-1..3), and
        a file input for uploading a JSON dataset.
  - [x] 6.2 Implement the demo control wiring: selecting a dataset or uploading
        a file loads data into the component and displays inline warnings if
        present.
  - [ ] 6.3 Add clear demo instructions and show a small example of listening to
        `zone-click` and `data-warning` events in the demo.
  - [ ] 6.4 Provide CSS variables for palette overrides in the demo so reviewers
        can test different palettes.
  - [ ] 6.5 Add subtle hover states and visible focus rings to improve
        discoverability; ensure these meet contrast/visibility guidelines.

- [ ] 7.0 Tests and CI
  - [ ] 7.1 Create unit tests for `validateLesionData()` covering: valid
        dataset, invalid zone IDs, missing required fields, and
        normalization/deduplication behavior.
  - [ ] 7.2 Add unit tests for `computeZoneState()` covering multiple
        overlapping lesions, highest PI-RADS selection, and count correctness.
  - [ ] 7.3 Add rendering tests that verify correct color/pattern assignment to
        a DOM/SVG snapshot or via DOM inspection (using a minimal test harness
        compatible with Deno).
  - [ ] 7.4 Add tests that verify `data-warning` and `zone-click` events are
        emitted with correct details.
  - [ ] 7.5 Use `deno test` to run the test suite locally; add a lightweight
        GitHub Actions workflow (`.github/workflows/ci.yml`) that runs
        `deno fmt --check`, `deno lint`, and `deno test` on push/pull request.

- [ ] 8.0 Docs, packaging and release
  - [ ] 8.1 Write `README.md` with project overview, API
        (attributes/properties/events), example JSON data format, demo
        instructions and build steps.
  - [ ] 8.2 Add code examples showing programmatic usage and attribute-based
        usage in the README.
  - [ ] 8.3 Provide a `deno` bundle task in `deno.json` that creates a
        distributable ES module (e.g.,
        `deno bundle src/components/prostate-mri-map.ts dist/prostate-mri-map.bundle.js`).
  - [ ] 8.4 Optionally create a small UMD/IIFE build for direct browser
        consumption (e.g., using esbuild via Deno or a tiny wrapper) and verify
        it loads in the demo page.
  - [ ] 8.5 Tag releases on GitHub and publish a Deno-friendly release
        (optional).
  - [ ] 8.6 Document contribution guidelines and the Apache-2.0 license in
        repository files.

## Implementation notes and priorities

- Start with a minimal, working Web Component that loads static
  `demo/data/example-1.json`, renders the SVG, and colors zones by highest
  PI-RADS. Add validation and inline warnings next, then patterns and badges,
  then full accessibility and keyboard flows. Keep iterations small and
  test-driven.
- Prefer explicit, small utilities (`validateLesionData`, `computeZoneState`,
  `applyZoneStyles`) to keep logic testable and focused.
- Keep bundle size small: avoid heavy dependencies. Use Deno's standard tooling
  for formatting, linting and testing.

---

Generated by synthesizing multiple task drafts into a single, consolidated task
list. The file aggregates the most complete, actionable items from all provided
drafts and organizes them for a junior developer to begin implementing the
widget.
