## Relevant Files

- `src/prostate-mri-map.ts` - Main Web Component class handling rendering, data
  binding, and interactions.
- `src/prostate-map.svg` - Static SVG asset with 24 zone paths, each with an ID
  matching the canonical zone names.
- `src/types.ts` - TypeScript interfaces for the lesion data schema and
  component props.
- `src/utils.ts` - Utility functions for data validation, color/pattern mapping,
  and zone calculations.
- `src/styles.css` - CSS for component styling, including palette variables and
  accessibility.
- `demo/index.html` - Demo page with language toggle, dataset selector, and file
  upload.
- `demo/data/example1.json` - First example dataset for demo.
- `demo/data/example2.json` - Second example dataset.
- `demo/data/example3.json` - Third example dataset with edge cases.
- `tests/validation.test.ts` - Unit tests for data schema validation and error
  handling.
- `tests/rendering.test.ts` - Unit tests for SVG rendering and visualization
  logic.
- `deno.json` - Deno config for tasks, imports, and build scripts.
- `README.md` - Project documentation, build instructions, and usage examples.

### Notes

- Tests use Deno's built-in test runner; place them in a `tests/` directory.
- Build with Deno to produce ES modules; no NPM dependencies.

## Tasks

- [ ] 1.0 Set up project structure and core assets
  - [ ] 1.1 Create directory structure: `src/`, `demo/`, `demo/data/`, `tests/`
  - [ ] 1.2 Initialize `deno.json` with compiler options, import maps, and task
        scripts (build, test, bundle)
  - [ ] 1.3 Create `src/prostate-map.svg` with 24 zone paths, each with
        canonical IDs (1Av, 1Ad, 1Bv, 1Bd, ... 4Cv, 4Cd)
  - [ ] 1.4 Verify SVG geometry reflects the guideline schematic (base/mid/apex
        levels, ventral/dorsal orientation)
  - [ ] 1.5 Add Apache-2.0 LICENSE file to repository root

- [ ] 2.0 Build the Web Component skeleton and public API
  - [ ] 2.1 Create `src/prostate-mri-map.ts` and define custom element class
        extending HTMLElement
  - [ ] 2.2 Implement constructor, connectedCallback, and disconnectedCallback
        lifecycle methods
  - [ ] 2.3 Set up Shadow DOM and attach the SVG template
  - [ ] 2.4 Define observed attributes: `language`, `data` (JSON string),
        `theme`
  - [ ] 2.5 Implement getters/setters for `language`, `data` (object), and
        `theme` properties
  - [ ] 2.6 Register the custom element as `<prostate-mri-map>` using
        `customElements.define()`
  - [ ] 2.7 Add basic event emission infrastructure for `zone-click` and
        `data-warning` using CustomEvent

- [ ] 3.0 Implement data loading and validation
  - [ ] 3.1 Create `src/types.ts` with TypeScript interfaces for LesionData,
        Lesion, LesionDetails, and Meta
  - [ ] 3.2 Create `src/utils.ts` with a `validateLesionData()` function that
        checks zone ID validity (against all 24 canonical IDs)
  - [ ] 3.3 Implement validation to collect invalid zone IDs and return warnings
        array
  - [ ] 3.4 In the component, call validation when `data` property is set
  - [ ] 3.5 If validation errors occur, render a small inline warning message
        inside the SVG (e.g., a `<text>` element at the top)
  - [ ] 3.6 Emit `data-warning` custom event with `{ warnings: [...] }` detail
        when errors are detected
  - [ ] 3.7 Filter out invalid zone references from internal data model to
        prevent crashes

- [ ] 4.0 Add visualization features (colors, patterns, badges)
  - [ ] 4.1 In `src/utils.ts`, create a `PI_RADS_COLORS` constant object mapping
        PI-RADS 1-5 to the specified hex colors
  - [ ] 4.2 Create a function `computeZoneState(lesions)` that returns a Map of
        zoneId → { pirads: number, lesionIds: [], count: number }
  - [ ] 4.3 Implement logic to determine highest PI-RADS per zone when multiple
        lesions overlap
  - [ ] 4.4 Apply fill colors to SVG zone paths based on computed PI-RADS values
        using CSS or inline styles
  - [ ] 4.5 Define SVG `<pattern>` elements for lesion patterns (hatches, dots,
        diagonals) in the shadow DOM
  - [ ] 4.6 Assign unique pattern IDs per lesion and apply as fill or overlay to
        zones
  - [ ] 4.7 Ensure overlapping patterns use semi-transparency or offsets to
        remain distinguishable
  - [ ] 4.8 Add small badge overlays (SVG `<text>` or `<circle>` with count) to
        zones with multiple lesions
  - [ ] 4.9 Create a legend element showing PI-RADS color mappings with
        bilingual labels

- [ ] 5.0 Enable interactions and accessibility
  - [ ] 5.1 Add `tabindex="0"` to each zone path to make them keyboard focusable
  - [ ] 5.2 Implement click handler on zone paths to open detail panel
  - [ ] 5.3 Implement shift-click and contextmenu (right-click) handlers to also
        open detail panel (prevent default context menu)
  - [ ] 5.4 Implement keydown handler for Enter and Space keys to open detail
        panel when zone is focused
  - [ ] 5.5 Create a detail panel component (div with position: absolute in
        shadow DOM) that displays zone ID, lesion list, PI-RADS, comments,
        size_mm, and details fields
  - [ ] 5.6 Implement panel dismissal on Escape key and click-outside detection
  - [ ] 5.7 Add ARIA labels to each zone path using `aria-label` attribute with
        format "Zone [ID] – [count] lesions – Highest PI-RADS [value]"
  - [ ] 5.8 Ensure logical keyboard navigation order (left-to-right,
        top-to-bottom through zones)
  - [ ] 5.9 Emit `zone-click` custom event with `{ zoneId, lesions: [...] }`
        detail when zone is activated

- [ ] 6.0 Create demo page and UX polish
  - [ ] 6.1 Create `demo/index.html` with basic HTML structure and script import
        for the Web Component
  - [ ] 6.2 Add language toggle buttons (Swedish/English) that set the
        `language` property on the component
  - [ ] 6.3 Create `demo/data/example1.json` with a typical lesion dataset (2-3
        lesions, some spanning zones)
  - [ ] 6.4 Create `demo/data/example2.json` with multiple overlapping lesions
        in the same zones
  - [ ] 6.5 Create `demo/data/example3.json` with edge cases (invalid zone IDs,
        missing optional fields)
  - [ ] 6.6 Add a dropdown/select element to switch between the three example
        datasets
  - [ ] 6.7 Implement file upload input that reads JSON and loads it into the
        component's `data` property
  - [ ] 6.8 Add CSS for hover states on zones (subtle opacity/stroke changes)
  - [ ] 6.9 Add CSS custom properties (CSS variables) for palette colors to
        allow easy customization
  - [ ] 6.10 Style the demo page for clarity and add basic instructions

- [ ] 7.0 Write tests and CI setup
  - [ ] 7.1 Create `tests/validation.test.ts` with tests for zone ID validation
        (valid IDs pass, invalid IDs are caught)
  - [ ] 7.2 Add test cases for lesion data with missing required fields
  - [ ] 7.3 Add test case verifying warning events are emitted on invalid data
  - [ ] 7.4 Create `tests/rendering.test.ts` with tests for color assignment
        based on PI-RADS values
  - [ ] 7.5 Add test for zone state computation (highest PI-RADS selection,
        lesion count)
  - [ ] 7.6 Add test for pattern assignment and overlap handling
  - [ ] 7.7 Run tests using `deno test` command and verify all pass
  - [ ] 7.8 (Optional) Create `.github/workflows/test.yml` for GitHub Actions CI
        that runs `deno test` on push

- [ ] 8.0 Finalize docs and packaging
  - [ ] 8.1 Write `README.md` with project overview, feature list, and
        requirements
  - [ ] 8.2 Document installation/usage instructions for Deno
  - [ ] 8.3 Include example usage code showing how to use the
        `<prostate-mri-map>` component
  - [ ] 8.4 Document the JSON data schema with full example
  - [ ] 8.5 Document public API (attributes, properties, events)
  - [ ] 8.6 Add instructions for running the demo locally
  - [ ] 8.7 Add instructions for running tests
  - [ ] 8.8 Create a Deno task in `deno.json` for building an ES module bundle
        (e.g., using `deno bundle`)
  - [ ] 8.9 Create a task for building a UMD/IIFE browser bundle if needed (may
        use esbuild via Deno)
  - [ ] 8.10 Test the bundle by loading it in the demo page
  - [ ] 8.11 Add notes about Apache-2.0 license and contribution guidelines
