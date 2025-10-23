## Relevant Files

- `src/components/prostate-mri-map.ts` - Main Web Component implementing the SVG rendering, data binding, interactions, and public API.
- `src/components/prostate-mri-map.css` - Component styling (shadow DOM or exported CSS variables for theming).
- `src/assets/prostate-map.svg` - Editable SVG containing the 24 zone shapes with identifiable IDs matching canonical zone IDs.
- `src/utils/data-schema.ts` - Type definitions and validation helpers for the lesion JSON schema.
- `src/utils/palette-and-patterns.ts` - Color palette, pattern definitions, and pattern-composition helpers.
- `src/demo/index.html` - Demo page showcasing language toggle, dataset dropdown, upload control, and the component.
- `src/demo/datasets/example-1.json` - Example dataset 1 (index lesion spanning zones)
- `src/demo/datasets/example-2.json` - Example dataset 2 (multiple lesions, overlapping zones)
- `src/demo/datasets/example-3.json` - Example dataset 3 (edge cases: invalid zones, missing fields)
- `tests/data-validation.test.ts` - Unit tests for JSON validation and warning emission.
- `tests/mapping.test.ts` - Unit tests for mapping zones to SVG elements and color/pattern assignment.
- `deno.json` - Deno configuration file for builds and tests.
- `README.md` - Usage and build instructions (Deno-centric), example JSON format, and demo instructions.

### Notes

- Unit tests should use Deno's built-in test runner (or a minimal test harness that works with Deno).
- Keep tests alongside the code where feasible. Use TypeScript for type safety but allow plain JS if preferred.


## Tasks

- [ ] 1.0 Prepare assets and repo configuration
  - [ ] 1.1 Create `src/assets/prostate-map.svg` with 24 clearly labeled zone shapes (IDs matching `[1-4][A|B|C][v|d]`).
  - [ ] 1.2 Add `deno.json` with scripts for build, bundle, and test.
  - [ ] 1.3 Create three example JSON datasets in `src/demo/datasets/`.

- [ ] 2.0 Component skeleton and API
  - [ ] 2.1 Implement `src/components/prostate-mri-map.ts` skeleton: custom element registration, basic shadow DOM, and minimal rendering of the SVG.
  - [ ] 2.2 Expose public attributes/properties: `language`, `data`, and `theme`.
  - [ ] 2.3 Implement basic event emission stubs: `zone-click` and `data-warning`.

- [ ] 3.0 Data validation and loading
  - [ ] 3.1 Implement `src/utils/data-schema.ts` with TypeScript interfaces and validation functions for the lesion JSON schema.
  - [ ] 3.2 Wire up data loading in the component: accept programmatic data and attribute-based JSON; handle fetch if URL provided (optional).
  - [ ] 3.3 Show an inline non-blocking warning in the visualization area when load/validation errors occur and emit `data-warning` with details.

- [ ] 4.0 Visualization: coloring, patterns, badges
  - [ ] 4.1 Implement `src/utils/palette-and-patterns.ts` with default PI-RADS colors and pattern definitions.
  - [ ] 4.2 Map lesions to zones and compute zone-level state (highest PI-RADS, lesion list, patterns).
  - [ ] 4.3 Apply colors and pattern fills to SVG zones; ensure overlapping patterns remain distinguishable.
  - [ ] 4.4 Add small badge/overlay for lesion counts per zone.

- [ ] 5.0 Interactions and accessibility
  - [ ] 5.1 Make each zone focusable and keyboard navigable; implement Enter/Space to open the detail panel.
  - [ ] 5.2 Implement click/shift-click/right-click handlers to open a read-only detail panel.
  - [ ] 5.3 Add ARIA labels for each zone and ensure the detail panel is accessible and dismissible via Esc.

- [ ] 6.0 Demo page and UX polish
  - [ ] 6.1 Build `src/demo/index.html` with language toggle (sv/en), dataset dropdown (3 provided), and file upload to load a JSON file.
  - [ ] 6.2 Ensure the demo shows the inline warning for invalid input and allows switching datasets.
  - [ ] 6.3 Add simple CSS variables for palette customization in the demo.

- [ ] 7.0 Tests and CI
  - [ ] 7.1 Implement `tests/data-validation.test.ts` and `tests/mapping.test.ts` covering schema validation, load warnings, and color/pattern assignment.
  - [ ] 7.2 Add a simple GitHub Actions workflow that runs `deno test` on push (optional; can be added later).

- [ ] 8.0 Docs and packaging
  - [ ] 8.1 Write `README.md` with Deno-based build and usage instructions and the example JSON format.
  - [ ] 8.2 Create a Deno-friendly bundle script to produce a distributable ES module for the component.
