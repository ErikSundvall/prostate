/// <reference lib="dom" />
import * as d3 from "d3";
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
      if (st.highestPirads === null || p > st.highestPirads) {
        st.highestPirads = p;
      }
    }
  }
  return result;
}

type RootSelection = d3.Selection<Element, unknown, null, undefined>;

type OverlayDatum = {
  zoneId: string;
  lesionId: string;
  patternId: string;
  overlayIndex: number;
  opacity: number;
};

type BadgeDatum = {
  zoneId: string;
  count: number;
};

function escapeAttrValue(value: string): string {
  return String(value ?? "").replace(/"/g, '\\"');
}

function supportsD3Mutation(rootSelection: RootSelection): boolean {
  const node = rootSelection.node() as Element | null;
  if (!node) return false;
  const ownerDoc = node.ownerDocument;
  return !!(ownerDoc && typeof ownerDoc.createElementNS === "function");
}

function findZoneElement(root: Element, zoneId: string): Element | null {
  const attrSelector = `[id="${escapeAttrValue(zoneId)}"]`;
  try {
    const attrMatch = root.querySelector?.(attrSelector) ?? null;
    if (attrMatch) return attrMatch as Element;
  } catch {
    // ignore selector errors in non-CSS-aware mocks
  }

  try {
    const hashMatch = root.querySelector?.(`#${zoneId}`) ?? null;
    if (hashMatch) return hashMatch as Element;
  } catch {
    // ignore hash selector failures (ids beginning with digits)
  }

  if (typeof root.querySelectorAll === "function") {
    const nodes = root.querySelectorAll("[id]");
    for (const node of Array.from(nodes)) {
      if ((node as Element).getAttribute("id") === zoneId) {
        return node as Element;
      }
    }
  }

  const elementsMap = (root as unknown as {
    elements?: Record<
      string,
      { getAttribute?: (n: string) => string | null; id?: string }
    >;
  }).elements;
  if (elementsMap) {
    for (const candidate of Object.values(elementsMap)) {
      const attr = candidate?.getAttribute?.("id") ?? null;
      const prop = (candidate as { id?: string }).id ?? null;
      if (attr === zoneId || prop === zoneId) {
        return candidate as unknown as Element;
      }
    }
  }

  return null;
}

function selectZoneElement(
  rootSelection: RootSelection,
  zoneId: string,
): d3.Selection<SVGElement, unknown, null, undefined> {
  const selector = `[id="${escapeAttrValue(zoneId)}"]`;
  const selection = rootSelection.select<SVGElement>(selector);
  if (!selection.empty()) return selection;
  const rootNode = rootSelection.node() as Element | null;
  if (!rootNode) return selection;
  const fallback = findZoneElement(rootNode, zoneId);
  return fallback ? d3.select(fallback as SVGElement) : selection;
}

function ensureOverlayLayer(
  rootSelection: RootSelection,
): d3.Selection<SVGGElement, unknown, null, undefined> {
  let layer = rootSelection.select<SVGGElement>("g.zone-overlays");
  if (layer.empty()) {
    layer = rootSelection
      .append("g")
      .attr("class", "zone-overlays")
      .attr("data-overlay-layer", "true");
  }
  return layer;
}

function ensureBadgeLayer(
  rootSelection: RootSelection,
): d3.Selection<SVGGElement, unknown, null, undefined> {
  let layer = rootSelection.select<SVGGElement>("g.zone-badges");
  if (layer.empty()) {
    layer = rootSelection
      .append("g")
      .attr("class", "zone-badges")
      .attr("data-badge-layer", "true");
  }
  return layer;
}

function getCreateElement(
  source: Element,
): ((ns: string, tag: string) => Element) | null {
  const ownerDoc = source.ownerDocument;
  if (ownerDoc && typeof ownerDoc.createElementNS === "function") {
    return ownerDoc.createElementNS.bind(ownerDoc);
  }
  const direct = (source as unknown as {
    createElementNS?: (ns: string, tag: string) => Element;
  }).createElementNS;
  if (typeof direct === "function") {
    return direct.bind(source);
  }
  return null;
}

function applyZoneStylesFallback(
  root: Element,
  zoneState: Record<string, ZoneState>,
) {
  for (const [zoneId, state] of Object.entries(zoneState)) {
    const el = findZoneElement(root, zoneId);
    if (!el) continue;

    if (state.highestPirads === null) {
      el.setAttribute?.("fill", "none");
      el.removeAttribute?.("data-pirads");
      el.removeAttribute?.("data-patterns");
      continue;
    }

    el.setAttribute?.("fill", getPiradsColor(state.highestPirads));
    el.setAttribute?.("data-pirads", String(state.highestPirads));

    if (state.count > 1) {
      const patterns = state.lesionIds.map(getPatternId).join(" ");
      el.setAttribute?.("data-patterns", patterns);
    } else {
      el.removeAttribute?.("data-patterns");
    }
  }
}

function renderZoneBadgesFallback(
  root: Element,
  zoneState: Record<string, ZoneState>,
) {
  const create = getCreateElement(root);
  if (!create) return;

  for (const [zoneId, state] of Object.entries(zoneState)) {
    if (state.count <= 0) continue;
    const zoneEl = findZoneElement(root, zoneId);
    if (!zoneEl) continue;

    let cx = 6;
    let cy = 6;
    try {
      const bbox = (zoneEl as unknown as SVGGraphicsElement).getBBox?.();
      if (bbox) {
        cx = bbox.x + bbox.width - 6;
        cy = bbox.y + 6;
      }
    } catch {
      // ignore bbox failures in mocked environments
    }

    const group = create(SVG_NS, "g");
    group.setAttribute?.("class", "badge");
    group.setAttribute?.("data-badge-for", zoneId);

    const circle = create(SVG_NS, "circle");
    circle.setAttribute?.("r", "8");
    circle.setAttribute?.("cx", String(cx));
    circle.setAttribute?.("cy", String(cy));
    circle.setAttribute?.("fill", "#ffffff");
    circle.setAttribute?.("stroke", "#000000");
    circle.setAttribute?.("stroke-width", "1");

    const text = create(SVG_NS, "text");
    text.setAttribute?.("x", String(cx));
    text.setAttribute?.("y", String(cy + 4));
    text.setAttribute?.("text-anchor", "middle");
    text.setAttribute?.("font-size", "10");
    text.setAttribute?.("fill", "#000000");
    text.setAttribute?.("data-count", String(state.count));
    (text as unknown as { textContent?: string }).textContent = String(
      state.count,
    );

    (group as unknown as { appendChild?: (node: unknown) => void })
      .appendChild?.(circle);
    (group as unknown as { appendChild?: (node: unknown) => void })
      .appendChild?.(text);

    (root as unknown as { appendChild?: (node: unknown) => void })
      .appendChild?.(group);
  }
}

/**
 * Apply styles to SVG zone shapes based on computed zone state.
 * - `root` can be an SVGElement or any Element containing SVG zone shapes.
 * - For each zone in zoneState, find element by ID and set `fill` to the
 *   color for `highestPirads`, or remove the fill attribute if null.
 * - Also sets a `data-pirads` attribute for easier styling/testing.
 */
export function applyZoneStyles(
  root: Element,
  zoneState: Record<string, ZoneState>,
) {
  if (!root) return;
  const rootSelection = d3.select(root as Element);
  if (rootSelection.empty()) return;

  const rootNode = rootSelection.node() as Element | null;
  if (!rootNode) return;

  if (!supportsD3Mutation(rootSelection)) {
    applyZoneStylesFallback(rootNode, zoneState);
    return;
  }

  const overlayLayer = ensureOverlayLayer(rootSelection);

  for (const [zoneId, state] of Object.entries(zoneState)) {
    const zoneSelection = selectZoneElement(rootSelection, zoneId);
    if (zoneSelection.empty()) continue;

    if (state.highestPirads === null) {
      zoneSelection
        .attr("data-pirads", null)
        .attr("data-patterns", null);
      overlayLayer
        .selectAll<SVGUseElement, OverlayDatum>(
          `use.zone-overlay[data-overlay-for="${escapeAttrValue(zoneId)}"]`,
        )
        .remove();
      continue;
    }

    zoneSelection
      .attr("data-pirads", String(state.highestPirads));

    if (state.count > 1) {
      const patternIds = state.lesionIds.map(getPatternId);
      zoneSelection.attr("data-patterns", patternIds.join(" "));
      ensurePatternDefs(root, state.lesionIds);

      const overlayData: OverlayDatum[] = state.lesionIds.map((
        lesionId,
        index,
      ) => ({
        lesionId,
        patternId: getPatternId(lesionId),
        opacity: Math.max(0.2, 0.7 - index * 0.2),
        overlayIndex: index,
        zoneId,
      }));

      const zoneOverlaySelection = overlayLayer
        .selectAll<SVGUseElement, OverlayDatum>(
          `use.zone-overlay[data-overlay-for="${escapeAttrValue(zoneId)}"]`,
        )
        .data(overlayData, (d: OverlayDatum) => d.lesionId);

      zoneOverlaySelection.exit().remove();

      const zoneOverlayEnter = zoneOverlaySelection
        .enter()
        .append("use")
        .attr("class", "zone-overlay")
        .attr("data-overlay-for", zoneId)
        .attr("pointer-events", "none");

      const zoneOverlayMerge = zoneOverlayEnter.merge(zoneOverlaySelection);

      zoneOverlayMerge
        .attr("href", `#${zoneId}`)
        .attr("xlink:href", `#${zoneId}`)
        .attr("fill", (d: OverlayDatum) => `url(#${d.patternId})`)
        .attr("data-pattern-id", (d: OverlayDatum) => d.patternId)
        .attr("data-overlay-index", (d: OverlayDatum) => String(d.overlayIndex))
        .attr("opacity", (d: OverlayDatum) => String(d.opacity));

      zoneOverlayMerge.order();
    } else {
      zoneSelection.attr("data-patterns", null);
      overlayLayer
        .selectAll<SVGUseElement, OverlayDatum>(
          `use.zone-overlay[data-overlay-for="${escapeAttrValue(zoneId)}"]`,
        )
        .remove();
    }
  }
}

const PATTERN_SIZE = 20;
const SVG_NS = "http://www.w3.org/2000/svg";
type PatternDatum = {
  lesionId: string;
  patternId: string;
  builderIndex: number;
};

type PatternBuilder = (
  selection: d3.Selection<SVGPatternElement, PatternDatum, null, undefined>,
) => void;

const PATTERN_BUILDERS: PatternBuilder[] = [
  (pattern) => {
    pattern
      .append("path")
      .attr("d", `M0 ${PATTERN_SIZE} L${PATTERN_SIZE} 0`)
      .attr("stroke", "#000")
      .attr("stroke-opacity", "0.85")
      .attr("stroke-width", "2");
  },
  (pattern) => {
    pattern
      .append("path")
      .attr("d", `M0 ${PATTERN_SIZE} L${PATTERN_SIZE} 0`)
      .attr("stroke", "#000")
      .attr("stroke-opacity", "0.7")
      .attr("stroke-width", "1.8");
    pattern
      .append("path")
      .attr("d", `M0 0 L${PATTERN_SIZE} ${PATTERN_SIZE}`)
      .attr("stroke", "#000")
      .attr("stroke-opacity", "0.7")
      .attr("stroke-width", "1.8");
  },
  (pattern) => {
    pattern
      .append("circle")
      .attr("cx", PATTERN_SIZE / 2)
      .attr("cy", PATTERN_SIZE / 2)
      .attr("r", PATTERN_SIZE / 4)
      .attr("fill", "#000")
      .attr("fill-opacity", "0.45");
  },
];

function patternIndexForLesion(lesionId: string): number {
  const normalized = String(lesionId ?? "");
  let sum = 0;
  for (let i = 0; i < normalized.length; i++) sum += normalized.charCodeAt(i);
  return PATTERN_BUILDERS.length ? sum % PATTERN_BUILDERS.length : 0;
}

export function getPatternId(lesionId: string) {
  // sanitize lesion id for use in an id attribute
  return `pattern-${String(lesionId).replace(/[^a-zA-Z0-9_-]/g, "-")}`;
}

/**
 * Render small SVG badges (circle + text) for zones that have lesions.
 * This is intended to run in the browser where `createElementNS` and
 * `getBBox` are available. The function is defensive and will no-op when
 * required DOM APIs are missing.
 */
export function renderZoneBadges(
  root: Element,
  zoneState: Record<string, ZoneState>,
) {
  if (!root) return;
  const rootSelection = d3.select(root as Element);
  if (rootSelection.empty()) return;

  const rootNode = rootSelection.node() as Element | null;
  if (!rootNode) return;

  if (!supportsD3Mutation(rootSelection)) {
    renderZoneBadgesFallback(rootNode, zoneState);
    return;
  }

  const badgeLayer = ensureBadgeLayer(rootSelection);

  const data: BadgeDatum[] = Object.entries(zoneState)
    .filter(([, state]) => state.count > 0)
    .map(([zoneId, state]) => ({ zoneId, count: state.count }));

  const badges = badgeLayer
    .selectAll<SVGGElement, BadgeDatum>("g.badge")
    .data(data, (d: BadgeDatum) => d.zoneId);

  badges.exit().remove();

  const badgeEnter = badges
    .enter()
    .append("g")
    .attr("class", "badge")
    .attr("data-badge-for", (d: BadgeDatum) => d.zoneId);

  badgeEnter.append("circle");
  badgeEnter.append("text");

  const badgeMerge = badgeEnter.merge(badges);

  badgeMerge.each(function (this: SVGGElement, datum: BadgeDatum) {
    const zoneSelection = selectZoneElement(rootSelection, datum.zoneId);
    if (zoneSelection.empty()) {
      d3.select(this).remove();
      return;
    }

    let cx = 6;
    let cy = 6;
    const node = zoneSelection.node() as SVGGraphicsElement | null;
    if (node) {
      try {
        const bbox = node.getBBox();
        cx = bbox.x + bbox.width - 6;
        cy = bbox.y + 6;
      } catch {
        // ignore and retain defaults
      }
    }

    const group = d3.select(this);
    group.attr("data-badge-for", datum.zoneId);

    group
      .select<SVGCircleElement>("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", 8)
      .attr("fill", "#ffffff")
      .attr("stroke", "#000000")
      .attr("stroke-width", 1);

    group
      .select<SVGTextElement>("text")
      .attr("x", cx)
      .attr("y", cy + 4)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#000000")
      .attr("data-count", String(datum.count))
      .text(String(datum.count));
  });
}

/**
 * Ensure simple hatch pattern defs exist for each lesion id on the given SVG root.
 * Patterns are simple diagonal hatch overlays; the underlying zone fill remains
 * the color determined by PI-RADS, and the pattern overlay is semi-transparent.
 */
export function ensurePatternDefs(root: Element, lesionIds: string[]) {
  if (!root || !lesionIds.length) return;

  const rootSelection = d3.select(root as Element);
  if (rootSelection.empty()) return;
  if (!supportsD3Mutation(rootSelection)) return;

  let defs = rootSelection.select<SVGDefsElement>("defs");
  if (defs.empty()) {
    defs = rootSelection.insert<SVGDefsElement>("defs", ":first-child");
  }

  const uniqueIds = Array.from(new Set(lesionIds));
  const data: PatternDatum[] = uniqueIds.map((lesionId) => ({
    lesionId,
    patternId: getPatternId(lesionId),
    builderIndex: patternIndexForLesion(lesionId),
  }));

  const patternSelection = defs
    .selectAll<SVGPatternElement, PatternDatum>(
      'pattern[data-pattern-source="lesion"]',
    )
    .data(data, (d: PatternDatum) => d.patternId);

  const patternEnter = patternSelection
    .enter()
    .append("pattern")
    .attr("id", (d: PatternDatum) => d.patternId)
    .attr("data-pattern-source", "lesion")
    .attr("patternUnits", "userSpaceOnUse")
    .attr("width", PATTERN_SIZE)
    .attr("height", PATTERN_SIZE);

  patternEnter
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", PATTERN_SIZE)
    .attr("height", PATTERN_SIZE)
    .attr("fill", "none")
    .attr("stroke", "none");

  patternEnter.each(function (this: SVGPatternElement, d: PatternDatum) {
    const patternSelectionForBuilder = d3.select(this) as d3.Selection<
      SVGPatternElement,
      PatternDatum,
      null,
      undefined
    >;
    const builder = PATTERN_BUILDERS[d.builderIndex] ?? PATTERN_BUILDERS[0];
    builder(patternSelectionForBuilder);
  });
}
