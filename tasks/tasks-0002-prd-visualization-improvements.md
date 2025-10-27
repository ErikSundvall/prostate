# Task List: Prostate MRI Map Visualization Improvements

**Based on:** `0002-prd-visualization-improvements.md`  
**Status:** Ready for Implementation

## Relevant Files

- `src/components/prostate-mri-map.ts` - Main Web Component that needs modifications for hover behavior and badge removal
- `src/utils/palette-and-patterns.ts` - Contains zone styling logic, pattern management, and badge rendering functions that need refactoring
- `src/components/prostate-mri-map.css` - CSS styles for component (may need hover transition styles)
- `demo/index.html` - Demo page where map selector dropdown will be added
- `deno.json` - Build configuration that needs asset copying task modifications
- `src/assets/prostate-map.svg` - Primary prostate map SVG
- `src/assets/prostate-map-2.svg` - Secondary prostate map SVG (will be refined manually)
- `demo/prostate-map.svg` - Copy destination for SVG assets (auto-generated during build)
- `demo/prostate-map-2.svg` - Copy destination for SVG assets (auto-generated during build)

### Notes

- The existing codebase uses Deno as runtime and D3.js for SVG manipulation
- Current implementation already has pattern support via `ensurePatternDefs` and overlay rendering
- Badge rendering is handled by `renderZoneBadges` function which needs to be removed
- Component uses Shadow DOM with slotted SVG content - feel free to simplify and reduce amount opf code if possible
- Use Deno's (unit) testing framework as before; additional validation will be through visual inspection per PRD after each step
- Do not preform Git operations, that is the job of the developer

## Tasks

### 1.0 Check if current implementation still works
- [x] 1.1 Run all existing unit tests (`deno test`) and verify they pass
- [x] 1.2 Start dev server (`deno task dev`) and load demo at http://localhost:4507/
- [x] 1.3 Test all four example datasets (example-1.json through example-4.json) in the demo
- [x] 1.4 Verify zone click events open detail panel with lesion information
- [x] 1.5 Verify keyboard navigation (Tab, Enter/Space on zones) works
- [x] 1.6 Verify language switching (en/sv) updates UI text correctly
- [x] 1.7 Document any broken functionality found during testing in a comment or issue note
- [x] 1.8 Check console for any runtime errors or warnings

### 2.0 Implement automated asset copying in build process
- [x] 2.1 Add a new Deno task called `copy-assets` in `deno.json` that copies `src/assets/*.svg` to `demo/`
  - Use Deno's `Deno.copyFile()` if possible
  - Handle cross-platform compatibility (consider using a small TypeScript script)
- [x] 2.2 Create `scripts/copy-assets.ts` helper script to perform the copying operation
  - List all files in `src/assets/`
  - Copy each `.svg` file to `demo/` directory
  - Log which files were copied
- [x] 2.3 Update the `bundle` task in `deno.json` to run `copy-assets` before bundling
  - Chain tasks: `deno task copy-assets && deno bundle ...`
- [x] 2.4 Update the `dev` task to copy assets before starting the dev server
- [x] 2.5 Test the asset copying by modifying `src/assets/prostate-map.svg`, running `deno task bundle`, and verifying `demo/prostate-map.svg` is updated
- [ ] 2.7 Add a comment in `demo/` directory (e.g., in a README or HTML comment) noting that SVG files are auto-generated from `src/assets/` and thus should not be edited in demo/

### 3.0 Add prostate map switching functionality to demo
- [x] 3.1 Refine `src/assets/prostate-map-2.svg` with proper zone IDs matching `prostate-map.svg` conventions
  - Verify zone IDs follow the pattern: `{1-4}{A-C}{v|d}` (e.g., `1Av`, `2Bd`)
  - Add placeholder zones if complete anatomy is not ready yet, these will then be manually edited in Inkscape by developer. Place the placeholder zones in a matrix (groups with rows) mimicked after prostate-map.svg
- [x] 3.2 Add a new dropdown control in `demo/index.html` labeled "Map used:" positioned near Language and Dataset controls
  - HTML: `<select id="map-selector"><option value="prostate-map.svg">prostate-map.svg</option><option value="prostate-map-2.svg">prostate-map-2.svg</option></select>`
- [x] 3.3 Implement JavaScript event handler for map selector dropdown change
  - On change, reload the selected SVG file
  - Clear existing SVG from the component slot
  - Fetch and insert new SVG into the slot
  - Re-render current dataset on the new map
- [x] 3.4 Update `loadSvg()` function in `demo/index.html` to accept a filename parameter (default: `prostate-map.svg`)
- [x] 3.5 Add error handling if selected map file fails to load
  - Display `alert()` popup with error message per PRD requirement
  - Fall back to default map if load fails
- [x] 3.6 Test switching between both maps with each example dataset
- [x] 3.7 Verify that zone IDs in `prostate-map-2.svg` that don't exist log a console message (per PRD open question #3)
  - Add validation logic to check for missing zones and log warnings
- [ ] 3.8 Ensure map selection resets to default on page reload (no persistence needed per PRD)

### 4.0 Remove badge/number display from zone visualization
- [ ] 4.1 Locate the `renderZoneBadges()` function in `src/utils/palette-and-patterns.ts`
- [ ] 4.2 Comment out or remove the call to `renderZoneBadges()` in `src/components/prostate-mri-map.ts`
  - Search for invocations of `renderZoneBadges` and disable them
- [ ] 4.3 Update `applyZoneStyles()` to skip badge rendering logic
  - Remove badge layer creation if it's only used for numbers
  - Keep pattern overlay layer (needed for hover patterns)
- [ ] 4.4 Update CSS in `src/components/prostate-mri-map.css` to remove any badge-related elements if styles exist
  - Add `display: none` for `.zone-badges` or similar selectors
- [ ] 4.5 Run unit tests to ensure badge removal doesn't break other functionality
  - Update or remove tests that specifically check for badge rendering
- [ ] 4.6 Visually verify in demo that zones show only solid colors (no numbers/badges)
- [ ] 4.7 Verify zones with multiple lesions still have pattern data attributes set (for future hover implementation)
- [ ] 4.8 Update inline demo script in `demo/index.html` to also skip badge rendering if it has a fallback renderer
- [ ] 4.9 Document the change: add comment explaining badges are removed per PRD 0002

### 5.0 Implement hover-activated pattern display with transitions
- [ ] 5.1 Add CSS transition styles for pattern fade-in/fade-out (300ms, ease-in-out)
  - In `src/components/prostate-mri-map.css`, add: `.zone-overlays { transition: opacity 300ms ease-in-out; }`
  - Set default opacity for overlays to 0, show on hover
- [ ] 5.2 Add a visual hover indicator (cursor change) to zones in CSS
  - Add: `.zone:hover { cursor: pointer; }` (already partially exists, ensure it's visible)
  - Consider adding a subtle highlight or stroke on hover per PRD open question #1
- [ ] 5.3 Implement hover event handlers in `src/components/prostate-mri-map.ts`
  - Add `_onZoneMouseEnter(event)` handler
  - Add `_onZoneMouseLeave(event)` handler
  - Bind these handlers in constructor
- [ ] 5.4 In `_onZoneMouseEnter()`, identify the hovered zone and all lesions affecting it
  - Use `computeZoneState()` to get lesion IDs for the zone
  - For each lesion, find ALL zones covered by that lesion
- [ ] 5.5 Apply patterns to all affected zones (not just the hovered zone)
  - Use D3 selections to add pattern fills to zone elements
  - Layer multiple patterns if the hovered zone has multiple lesions
  - Set opacity to 1 with transition for fade-in effect
- [ ] 5.6 Store the current hover state (which patterns are active) to allow cleanup on mouse leave
  - Use a component instance variable: `_activePatterns` or similar
- [ ] 5.7 In `_onZoneMouseLeave()`, clear all pattern overlays
  - Set opacity back to 0 with transition for fade-out effect
  - Remove pattern fills after transition completes
- [ ] 5.8 Ensure base zone colors (highest PIRADS) remain visible under patterns
  - Patterns should be semi-transparent or stroke-based (review existing pattern definitions)
  - Test with example-4.json (several overlaps) to verify blending
- [ ] 5.9 Test hover behavior with each example dataset
  - Verify single-lesion zones show patterns on all affected zones
  - Verify multi-lesion zones show all patterns layered
  - Verify smooth 300ms transitions
- [ ] 5.10 Ensure hover patterns work correctly with keyboard navigation
  - When a zone receives focus via Tab, show patterns similar to hover
  - Clear patterns on blur
- [ ] 5.11 Update unit tests if needed to cover hover behavior
  - Mock hover events and verify pattern application
  - Test transition timing if feasible

### 6.0 Final testing and validation
- [ ] 6.1 Visual inspection: Verify zones display only colors (no badges) in default state
- [ ] 6.2 Visual inspection: Hover over zones and confirm patterns appear on all affected zones with 300ms fade
- [ ] 6.3 Visual inspection: Test map switching between both SVG files with all datasets
- [ ] 6.4 Visual inspection: Verify asset copying works (modify `src/assets/*.svg`, rebuild, check `demo/`)
- [ ] 6.5 Run all unit tests (`deno test`) and confirm they pass
- [ ] 6.6 Test with example-1.json (single lesions) - verify hover patterns appear correctly
- [ ] 6.7 Test with example-2.json (one overlap) - verify both lesion patterns show on hover
- [ ] 6.8 Test with example-4.json (several overlaps) - verify all patterns layer correctly
- [ ] 6.9 Test keyboard navigation (Tab through zones, Enter/Space to click)
- [ ] 6.10 Test language switching (en/sv) still works correctly
- [ ] 6.11 Verify click events still emit `zone-click` events with lesion details
- [ ] 6.12 Verify data validation still triggers `data-warning` events for bad data (example-3.json)
- [ ] 6.13 Test error handling: manually break a map URL and verify alert popup appears
- [ ] 6.14 Check browser console for any errors or warnings during all tests
- [ ] 6.15 Document any issues or limitations found during testing
- [ ] 6.16 Update README.md or documentation if new features (map switching) need user guidance
- [ ] 6.17 Create a brief summary of changes made for code review or PR description

---

**Implementation Notes:**
- Follow existing code patterns (Deno, TypeScript, D3.js)
- Maintain accessibility features throughout (ARIA, keyboard nav)
- Keep existing functionality working while adding new features
- Use visual inspection as primary validation per PRD success metrics
- Tests should complement visual validation, not replace it
