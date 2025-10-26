# Prostate MRI Zone Map Widget

A Web Component for visualizing prostate MRI zones with lesion data, built with TypeScript and D3.js.

## Overview

This widget displays an interactive SVG map of the prostate divided into 48 zones (4 glands × 3 sectors × 2 depths). It visualizes MRI findings (lesions) using PI-RADS scoring with colors and patterns, supports localization, and provides accessibility features.

## Features

- **Interactive Zone Map**: Click zones to view lesion details
- **PI-RADS Visualization**: Color-coded zones (1-5) with pattern overlays for lesions
- **Localization Support**: English and Swedish translations
- **Accessibility**: Keyboard navigation, ARIA labels, focus management
- **Data Validation**: Warns about invalid zone IDs or data issues
- **Customizable Styling**: CSS variables for palette overrides
- **Shadow DOM Encapsulation**: No style conflicts with host applications

## Installation

### Via NPM (planned)

```bash
npm install prostate-mri-map
```

### Direct Download

Download the bundled JavaScript from the [releases page](https://github.com/ErikSundvall/prostate/releases).

## Usage

### Basic HTML

```html
<!DOCTYPE html>
<html>
<head>
  <title>Prostate MRI Map</title>
</head>
<body>
  <prostate-mri-map language="en"></prostate-mri-map>

  <script type="module" src="prostate-mri-map.bundle.js"></script>
  <script>
    const map = document.querySelector('prostate-mri-map');
    map.data = {
      lesions: [
        {
          id: "lesion-1",
          zones: ["2Bv", "2Bd"],
          pirads: 4,
          details: {
            comment: "Suspicious lesion in peripheral zone"
          }
        }
      ]
    };
  </script>
</body>
</html>
```

### With Custom SVG

The component requires a slotted SVG map. If not provided, it expects the SVG to be in `demo/prostate-map.svg` or bundled.

```html
<prostate-mri-map language="en">
  <svg slot="map-svg">
    <!-- Your prostate zone SVG here -->
  </svg>
</prostate-mri-map>
```

## API

### Attributes

- `language`: `"en"` or `"sv"` - Sets the UI language (default: `"en"`)

### Properties

- `data`: `ProstateMriData` - The lesion data to display
- `language`: `string` - Get/set the language

### Events

- `data-warning`: Fired when data contains warnings (invalid zones, etc.)
  - `detail`: `{ warnings: string[] }`
- `zone-click`: Fired when a zone is clicked
  - `detail`: `{ zoneId: string, lesions: Lesion[] }`

### Data Format

```typescript
interface ProstateMriData {
  meta?: {
    version?: string;
    language?: string;
    source?: string;
    created?: string;
  };
  lesions: Lesion[];
}

interface Lesion {
  id: string;
  zones: string[]; // e.g., ["1Av", "1Ad"]
  pirads: number; // 1-5
  details?: {
    comment?: string;
    size_mm?: number;
    sequence_notes?: string;
    laterality?: string;
    other?: Record<string, unknown>;
  };
}
```

### Valid Zone IDs

The prostate is divided into 48 zones using the format `{gland}{sector}{depth}`:

- Glands: 1, 2, 3, 4
- Sectors: A, B, C
- Depths: v (ventral), d (dorsal)

Examples: `1Av`, `2Bd`, `3Cv`, `4Ad`

## Styling

Override PI-RADS colors using CSS variables:

```css
prostate-mri-map {
  --pirads-1: #ffffb2;
  --pirads-2: #fd8d3c;
  --pirads-3: #fb6a4a;
  --pirads-4: #de2d26;
  --pirads-5: #a50f15;
}
```

## Demo

See `demo/index.html` for a complete example with controls and event logging.

Run the demo locally:

```bash
deno task dev
```

## Development

### Prerequisites

- Deno 1.40+
- Node.js (for JSDOM in tests)

### Setup

```bash
git clone https://github.com/ErikSundvall/prostate
cd prostate
deno install
```

### Testing

```bash
deno task test
```

### Building

```bash
deno task bundle
```

## License

MIT License - see LICENSE file.

## Contributing

See CONTRIBUTING.md for guidelines.

## Clinical Background

Based on Swedish prostate cancer care program localization standards:
https://kunskapsbanken.cancercentrum.se/diagnoser/prostatacancer/vardprogram/mall-for-lokalisering-av-fynd-vid-mr-prostata/

---

This is an experiment regarding using AI-assisted code generation for making a
prostate radiology zone visualisation widget that can be embedded into web
applications.

The clinical background is in:

AI project scaffolding from:
https://github.com/snarktank/ai-dev-tasks?tab=readme-ov-file
https://youtu.be/fD4ktSkNCw4?si=XJlBagB6CYbKxKbB

Tracking dialogue and user actions in: journal of process\AI-interactions.md
