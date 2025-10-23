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
  - [ ] 1.1 Create the directory structure: `src/`, `src/assets/`, `src/utils/`, `src/components/`, `demo/`, and `tests/`.
  - [ ] 1.2 Create `src/assets/prostate-map.svg` with 24 zone paths, each with a canonical ID (e.g., `id="1Cv"`).
  - [ ] 1.3 Create `deno.json` with scripts for `fmt`, `lint`, `test`, and `bundle`.
  - [ ] 1.4 Add three example JSON datasets in `demo/datasets/` (`example-1.json`, `example-2.json`, `example-3.json`).

- [ ] 2.0 Component skeleton and API
  - [ ] 2.1 Define and register the `ProstateMriMap` custom element in `src/components/prostate-mri-map.ts`.
  - [ ] 2.2 Set up the shadow DOM to render the SVG and link to `src/components/prostate-mri-map.css`.
  - [ ] 2.3 Define the `language`, `data`, and `theme` attributes/properties with default values.
  - [ ] 2.4 Implement stubs for `zone-click` and `data-warning` events.

- [ ] 3.0 Data validation and loading
  - [ ] 3.1 Define TypeScript interfaces for lesion data in `src/utils/data-schema.ts`.
  - [ ] 3.2 Implement a validation function to check lesion data against the schema.
  - [ ] 3.3 Wire the validation function to the `data` property setter in the component.
  - [ ] 3.4 Display a warning message and emit a `data-warning` event for invalid data.

- [ ] 4.0 Visualization: coloring, patterns, badges
  - [ ] 4.1 Define the PI-RADS color palette as CSS variables in `src/components/prostate-mri-map.css`.
  - [ ] 4.2 Write a function to map lesions to zones and compute the highest PI-RADS score per zone.
  - [ ] 4.3 Apply color fills to SVG zones based on their PI-RADS scores.
  - [ ] 4.4 Add SVG patterns for lesion differentiation and ensure they are distinguishable when overlapping.
  - [ ] 4.5 Add a badge to each zone showing the lesion count.

- [ ] 5.0 Interactions and accessibility
  - [ ] 5.1 Add `tabindex="0"` to SVG zones to make them keyboard-navigable.
  - [ ] 5.2 Implement a detail panel to display zone and lesion information on click or keyboard activation.
  - [ ] 5.3 Ensure the detail panel can be dismissed via `Esc` or clicking outside.
  - [ ] 5.4 Add ARIA labels to zones describing their state (e.g., "Zone 1Cv, 2 lesions, PI-RADS 4").

- [ ] 6.0 Demo page and UX polish
  - [ ] 6.1 Build `demo/index.html` with a `<prostate-mri-map>` instance.
  - [ ] 6.2 Add controls for language toggle, dataset selection, and file upload.
  - [ ] 6.3 Implement logic to load and pass data from the controls to the component.
  - [ ] 6.4 Add hover effects and focus styles for better discoverability.

- [ ] 7.0 Tests and CI
  - [ ] 7.1 Write unit tests for data validation in `tests/data-validation.test.ts`.
  - [ ] 7.2 Write unit tests for visualization logic in `tests/mapping.test.ts`.
  - [ ] 7.3 Add a GitHub Actions workflow to run `deno lint`, `deno fmt --check`, and `deno test` on push.

- [ ] 8.0 Docs and packaging
  - [ ] 8.1 Write `README.md` with setup instructions, API documentation, and usage examples.
  - [ ] 8.2 Create a build script in `deno.json` to bundle the component as an ES module.
  - [ ] 8.3 Add an `LICENSE` file with Apache-2.0 license text.
