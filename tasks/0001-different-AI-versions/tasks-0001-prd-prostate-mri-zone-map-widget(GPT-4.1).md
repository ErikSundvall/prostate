## Relevant Files

- `src/prostate-mri-map.ts` — Main Web Component for SVG rendering, data
  binding, and interactions.
- `src/prostate-map.svg` — SVG asset with 24 zone shapes, each with canonical
  zone IDs.
- `src/types.ts` — TypeScript interfaces for lesion data and component props.
- `src/utils.ts` — Utility functions for data validation, color/pattern mapping,
  and zone calculations.
- `src/styles.css` — CSS for component styling, palette variables, and
  accessibility.
- `demo/index.html` — Demo page with language toggle, dataset selector, and file
  upload.
- `demo/data/example1.json` — Example dataset 1.
- `demo/data/example2.json` — Example dataset 2.
- `demo/data/example3.json` — Example dataset 3 (edge cases).
- `tests/validation.test.ts` — Unit tests for data schema validation and error
  handling.
- `tests/rendering.test.ts` — Unit tests for SVG rendering and visualization
  logic.
- `deno.json` — Deno config for tasks, imports, and build scripts.
- `README.md` — Project documentation, build instructions, and usage examples.

### Notes

- Tests use Deno’s built-in test runner; place them in a `tests/` directory.
- Build with Deno to produce ES modules; no NPM dependencies.

## Tasks

- [ ] 1.0 Set up project structure and core assets
  - [ ] 1.1 Create the directory structure: `src/`, `demo/data/`, and `tests/`.
  - [ ] 1.2 Create `src/prostate-map.svg` with 24 zone shapes, each with a
        canonical ID (e.g., `id="1Cv"`).
  - [ ] 1.3 Create `deno.json` and add initial `fmt`, `lint`, `test`, and
        `bundle` tasks.
  - [ ] 1.4 Add three example JSON files in `demo/data/` (`example1.json`,
        `example2.json`, `example3.json`).

- [ ] 2.0 Build the Web Component skeleton and public API
  - [ ] 2.1 Define and register the `ProstateMriMap` custom element in
        `src/prostate-mri-map.ts`.
  - [ ] 2.2 Set up the shadow DOM to render the imported SVG and link to
        `src/styles.css`.
  - [ ] 2.3 Define the `Lesion` and `ProstateMriData` interfaces in
        `src/types.ts`.
  - [ ] 2.4 Expose `language` and `data` properties on the component, with
        corresponding attribute handling.
  - [ ] 2.5 Define custom event stubs for `zone-click` and `data-warning`.

- [ ] 3.0 Implement data loading and validation
  - [ ] 3.1 In `src/utils.ts`, create a function to validate the lesion data
        against the schema in `src/types.ts`.
  - [ ] 3.2 The validation function must check that all `zones` in the data are
        valid canonical IDs.
  - [ ] 3.3 When the component's `data` property is set, call the validation
        function.
  - [ ] 3.4 If validation fails, render a non-blocking warning message inside
        the component and dispatch a `data-warning` event with error details.

- [ ] 4.0 Add visualization features (colors, patterns, badges)
  - [ ] 4.1 Define the PI-RADS color palette as CSS custom properties in
        `src/styles.css`.
  - [ ] 4.2 In `src/utils.ts`, write a function to map lesions to zones and
        determine the highest PI-RADS score for each zone.
  - [ ] 4.3 Apply the corresponding color fill to each SVG zone shape based on
        its highest PI-RADS score.
  - [ ] 4.4 Define SVG `<pattern>`s for lesion differentiation and apply them to
        the zones. Ensure multiple patterns on one zone are distinguishable.
  - [ ] 4.5 Add a small `<text>` element over each zone to act as a badge for
        the lesion count.

- [ ] 5.0 Enable interactions and accessibility
  - [ ] 5.1 Add `tabindex="0"` to each SVG zone shape to make them focusable.
  - [ ] 5.2 Implement a detail panel (hidden by default) in the component's
        shadow DOM.
  - [ ] 5.3 Add `click` and `keydown` (Enter/Space) event listeners to each zone
        to show the detail panel with lesion info.
  - [ ] 5.4 Ensure the panel can be dismissed with the `Esc` key or by clicking
        outside.
  - [ ] 5.5 Add dynamic ARIA labels to each zone shape describing its state
        (e.g., "Zone 1Cv, 2 lesions, Highest PI-RADS 4").

- [ ] 6.0 Create demo page and UX polish
  - [ ] 6.1 Build `demo/index.html` with a `<prostate-mri-map>` instance.
  - [ ] 6.2 Add UI controls: a language toggle (sv/en), a dropdown to select one
        of the three example datasets, and a file input for uploading custom
        JSON.
  - [ ] 6.3 Implement logic to load and pass data from the controls to the
        component.
  - [ ] 6.4 Add hover effects and focus rings to zones using CSS for better
        discoverability.

- [ ] 7.0 Write tests and CI setup
  - [ ] 7.1 Create `tests/validation.test.ts` to test the data schema validation
        and `data-warning` event emission.
  - [ ] 7.2 Create `tests/rendering.test.ts` to test the logic for mapping data
        to zone colors and patterns.
  - [ ] 7.3 (Optional) Add a GitHub Actions workflow file that runs `deno lint`,
        `deno fmt --check`, and `deno test` on every push.

- [ ] 8.0 Finalize docs and packaging
  - [ ] 8.1 Write `README.md` with project overview, setup instructions, API
        documentation, and usage examples.
  - [ ] 8.2 Create a build script in `deno.json` that bundles the component into
        a single, distributable ES module.
  - [ ] 8.3 Add `LICENSE` file with Apache-2.0 license text.
