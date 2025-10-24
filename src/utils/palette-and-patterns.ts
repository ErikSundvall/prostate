import type { Lesion } from "../types.ts";
import { CANONICAL_ZONES } from "../types.ts";

export const PI_RADS_COLORS = {
  5: "#A50F15",
  4: "#DE2D26",
  3: "#FB6A4A",
  2: "#FD8D3C",
  1: "#FFFFB2",
} as const;

export type Pirads = 1 | 2 | 3 | 4 | 5;

export function getPiradsColor(p: number): string {
  return PI_RADS_COLORS[Math.min(5, Math.max(1, Math.round(p))) as Pirads];
}

export type ZoneState = {
  highestPirads: number | null;
  lesionIds: string[];
  count: number;
};

/**
 * Compute per-zone aggregated state from an array of lesions.
 * Returns a mapping zoneId -> { highestPirads, lesionIds, count }.
 * Zones with no lesions will have highestPirads=null and count=0.
 */
export function computeZoneState(lesions: Lesion[] = {} as Lesion[]) {
  const result: Record<string, ZoneState> = {};
  // initialize all canonical zones with defaults
  for (const z of CANONICAL_ZONES) {
    result[z] = { highestPirads: null, lesionIds: [], count: 0 };
  }

  for (const lesion of lesions) {
    const id = lesion.id;
    const p = Number(lesion.pirads) || 0;
    for (const zone of lesion.zones || []) {
      if (!result[zone]) {
        // if zone isn't canonical for some reason, create an entry
        result[zone] = { highestPirads: null, lesionIds: [], count: 0 };
      }
      const st = result[zone];
      st.lesionIds.push(id);
      st.count = st.lesionIds.length;
      if (st.highestPirads === null || p > st.highestPirads) st.highestPirads = p;
    }
  }
  return result;
}

/**
 * Apply styles to SVG zone shapes based on computed zone state.
 * - `root` can be an SVGElement or any Element containing SVG zone shapes.
 * - For each zone in zoneState, find element by ID and set `fill` to the
 *   color for `highestPirads`, or remove the fill attribute if null.
 * - Also sets a `data-pirads` attribute for easier styling/testing.
 */
export function applyZoneStyles(root: Element, zoneState: Record<string, ZoneState>) {
  if (!root) return;
  for (const zoneId of Object.keys(zoneState)) {
  try {
  // avoid relying on CSS.escape which may not exist in all runtimes
  const selector = `#${zoneId}`;
  const el = root.querySelector(selector) as Element | null;
      if (!el) continue;
      const st = zoneState[zoneId];
      if (st.highestPirads === null) {
        el.removeAttribute("fill");
        el.removeAttribute("data-pirads");
        el.removeAttribute("data-patterns");
      } else {
        el.setAttribute("fill", getPiradsColor(st.highestPirads));
        el.setAttribute("data-pirads", String(st.highestPirads));
        if (st.count > 1) {
          // assign per-lesion pattern IDs (do not inject defs here)
          const patterns = st.lesionIds.map(getPatternId).join(" ");
          el.setAttribute("data-patterns", patterns);
        } else {
          el.removeAttribute("data-patterns");
        }
      }
    } catch (err) {
      // defensive: skip problematic zone selectors
      // eslint-disable-next-line no-console
      console.warn(`applyZoneStyles: skipped ${zoneId} — ${err}`);
    }
  }
}

export function getPatternId(lesionId: string) {
  // sanitize lesion id for use in an id attribute
  return `pattern-${String(lesionId).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}
