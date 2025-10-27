# PRD: Prostate MRI Map Visualization Improvements

**Document ID:** 0002-prd-visualization-improvements  
**Created:** 2025-10-27  
**Status:** Draft

## 1. Introduction/Overview

This PRD describes improvements to the prostate MRI visualization component, focusing on simplified visual display and enhanced hover interactions. The feature builds upon the existing 0001 implementation but changes core visualization behaviors to make the map cleaner and interactions more intuitive.

**Problem:** The current implementation shows numbers/badges on zones which creates visual clutter. Patterns are always visible, making it hard to distinguish between single and multiple lesions at a glance.

**Goal:** Create a cleaner default visualization showing only zone colors, with patterns appearing dynamically on hover to reveal lesion overlap information.

## 2. Goals

1. Simplify the default zone visualization by removing numbers/badges
2. Implement intelligent pattern display that activates only on hover
3. Enable switching between different prostate map SVGs during development
4. Automate asset synchronization between src/assets and demo directories
5. Maintain all existing functionality (click events, data validation, accessibility)

## 3. User Stories

**US-1:** As a clinician viewing the prostate map, I want to see a clean color-coded visualization without numerical badges, so that I can quickly assess the highest PIRADS score in each zone.

**US-2:** As a clinician, when I hover over a zone with multiple lesions, I want to see patterns appear on all zones covered by those lesions, so that I can understand the full extent of each overlapping lesion.

**US-3:** As a developer testing the application, I want to switch between different prostate map SVGs using a dropdown, so that I can compare visualizations and test with different anatomical representations.

**US-4:** As a developer, when I modify SVG files in src/assets, I want them automatically copied to the demo directory during build, so that the demo always uses the latest assets.

## 4. Functional Requirements

### 4.1 Zone Color Display (Default State)

**FR-1:** Each zone SHALL display a solid fill color corresponding to the highest PIRADS score among all lesions affecting that zone.

**FR-2:** Zones with no lesions SHALL display as transparent (no fill).

**FR-3:** The component SHALL use the existing PIRADS color mapping:
- PIRADS 1: #FFFFB2
- PIRADS 2: #FD8D3C
- PIRADS 3: #FB6A4A
- PIRADS 4: #DE2D26
- PIRADS 5: #A50F15

**FR-4:** Numbers/badges SHALL NOT be displayed on zones in the default state.

### 4.2 Hover Interaction - Pattern Display

**FR-5:** When a user hovers over a zone, the component SHALL identify all lesions that overlap that zone.

**FR-6:** For each identified lesion, the component SHALL display that lesion's pattern on ALL zones covered by that lesion (not just the hovered zone).

**FR-7:** Multiple patterns SHALL be layered/blended when displayed simultaneously (if a zone is hovered that contains multiple lesions).

**FR-8:** The base zone colors (highest PIRADS) SHALL remain visible under the patterns.

**FR-9:** Patterns SHALL fade in with a 300ms transition when hover begins.

**FR-10:** Patterns SHALL fade out with a 300ms transition when hover ends.

**FR-11:** If 3+ lesions overlap a zone, all patterns SHALL be displayed even if they blend together (distinguishability is not required).

**FR-12:** No tooltip or text information SHALL be displayed on hover (information is shown only on click).

### 4.3 Prostate Map Switching (Development Feature)

**FR-13:** The demo/index.html SHALL include a dropdown control labeled "Prostate Map:" positioned near the existing "Dataset" and "Language" dropdowns.

**FR-14:** The dropdown SHALL offer two options:
- "prostate-map.svg" (default)
- "prostate-map-2.svg"

**FR-15:** When a different map is selected, the component SHALL reload the SVG and re-render with the current dataset.

**FR-16:** The map selection SHALL reset to default (prostate-map.svg) on page reload (no persistence).

**FR-17:** This map switching feature SHALL be present only in demo/index.html (development/test environment).

**FR-18:** Both prostate-map.svg and prostate-map-2.svg SHALL use identical zone naming conventions.

### 4.4 Asset Management - Automated Copying

**FR-19:** During the build process, ALL files from src/assets/ SHALL be automatically copied to demo/.

**FR-20:** The copying SHALL occur during any build task (dev, build, bundle).

**FR-21:** Files in demo/ that are copied from src/assets SHALL be tracked in git (not git-ignored) to ensure the demo works standalone.

### 4.5 Existing Functionality (Preserved)

**FR-22:** Zone click events SHALL continue to emit `zone-click` events with lesion details.

**FR-23:** Data validation and `data-warning` events SHALL continue to function as before.

**FR-24:** Keyboard navigation and accessibility features SHALL be maintained.

**FR-25:** All existing localization (en/sv) SHALL continue to work.

## 5. Non-Goals (Out of Scope)

- Deleting or archiving 0001-prefixed files (they will remain in place, superseded)
- Adding tooltips or hover text displays (only visual patterns on hover)
- Supporting more than two prostate map SVGs in this phase
- Map selection persistence across page reloads
- Automatic file watching/copying during development (only during build)
- Changes to the data format or API
- Production-level map switching UI (only in demo)

## 6. Design Considerations

### 6.1 Visual Hierarchy
- Default state: Clean, uncluttered zones showing only colors
- Hover state: Layered patterns reveal lesion extent
- Click state: Full information display (existing behavior - check that it actually works, don't trust the current implementation)

### 6.2 Transitions
- All pattern fade-in/fade-out: 300ms
- Transition type: ease-in-out (standard)

### 6.3 Pattern Rendering
- Patterns must support layering without completely obscuring the base color
- Consider using semi-transparent patterns or stroke-based patterns (some of this is likely already available in current code)
- CSS opacity or SVG pattern opacity should enable blending

### 6.4 Map Switching UI
- Dropdown should match existing demo page styling
- Label: "Map used:"
- Positioned with Language and Dataset controls
- Simple implementation (direct file path switching)

## 7. Technical Considerations

### 7.1 Hover State Management
- Track currently hovered zone
- Compute affected lesions on hover
- Apply patterns to all zones covered by those lesions
- Clear patterns on mouse leave

### 7.2 SVG Pattern References
- Patterns may be defined in SVG `<defs>` section
- Pattern IDs should follow format: `pattern-{lesionId}`
- Ensure patterns are loaded with the SVG

### 7.3 Build Process Updates
- Modify build tasks (deno.json or build scripts) to include asset copying
- Copy src/assets/* to demo/ before/during bundle step
- Ensure demo bundle includes latest assets

### 7.4 SVG Loading
- Implement dynamic SVG loading based on map selection
- Cache SVG content to avoid repeated fetches
- Ensure zone ID parsing works with both maps (note that prostate-map-2.svg does not contain all zones at start of development, they will be added After a while)

### 7.5 Compatibility
- Both prostate-map.svg and prostate-map-2.svg must have matching zone ID structures  (note that prostate-map-2.svg does not contain all zones at start of development, they will be added After a while)
- Manual refinements to prostate-map-2.svg should maintain zone naming consistency

## 8. Success Metrics

**SM-1:** Visual inspection confirms zones display only colors (no badges) in default state.

**SM-2:** Visual inspection confirms patterns appear on hover across all affected zones.

**SM-3:** Visual inspection confirms smooth 300ms transitions for pattern fade-in/fade-out.

**SM-4:** Dropdown in demo/index.html successfully switches between both prostate maps.

**SM-5:** Asset files (SVGs) in demo/ are automatically updated during build process.

**SM-6:** All existing functionality (clicks, validation, accessibility) continues to work.

**SM-7:** Visual inspection with example-4.json (several overlaps) demonstrates correct multi-lesion pattern display.

## 9. Open Questions

1. Should we add any visual indicator (cursor change, subtle highlight) when hovering over zones to make the interactive nature more obvious?
- yes

2. If pattern blending makes it hard to distinguish individual lesions visually, should we consider a future enhancement for pattern visibility controls?
- no

3. Should prostate-map-2.svg have any specific validation or checks to ensure zone naming consistency before loading?
- just a console printout explaining problems

4. Do we need any error handling if a selected map file fails to load?
- Yes, show an alert popup

5. Should there be any console logging or debug output when patterns are applied/removed during hover?
- no
---

## Appendix: Example Scenarios

### Scenario A: Viewing Clean Map
1. User loads demo with example-1.json
2. User sees zones colored by highest PIRADS
3. No numbers or patterns visible
4. Map is clean and easy to interpret

### Scenario B: Hovering Single-Lesion Zone
1. User hovers over zone "2Bv" (contains only lesion-1)
2. Pattern for lesion-1 fades in (300ms) on zones "2Bv" and "2Bd"
3. User moves mouse away
4. Patterns fade out (300ms)

### Scenario C: Hovering Multi-Lesion Zone
1. User loads example-4.json (several overlaps)
2. User hovers over zone with 3 overlapping lesions
3. All 3 patterns fade in, layered/blended
4. Patterns appear on ALL zones covered by those 3 lesions
5. Base zone colors remain visible beneath patterns

### Scenario D: Switching Maps
1. Developer selects "prostate-map-2.svg" from dropdown
2. Component reloads SVG
3. Current dataset re-renders on new map
4. All zones and patterns work identically

### Scenario E: Build Process
1. Developer modifies src/assets/prostate-map-2.svg
2. Developer runs `deno task build`
3. Build process copies updated SVG to demo/
4. Demo reflects latest changes without manual copying
