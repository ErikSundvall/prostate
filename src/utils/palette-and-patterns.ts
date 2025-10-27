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
  const rootNode = rootSelection.node() as Element | null;
  if (rootNode) {
    const element = rootNode.querySelector(selector) as SVGElement | null;
    if (element) return d3.select(element);
  }
  const selection = rootSelection.select<SVGElement>(selector);
  if (!selection.empty()) return selection;
  if (rootNode) {
    const fallback = findZoneElement(rootNode, zoneId);
    return fallback ? d3.select(fallback as SVGElement) : selection;
  }
  return selection;
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
    if (!el) {
      console.warn(`Zone ID "${zoneId}" not found in SVG map`);
      continue;
    }

    if (state.highestPirads === null) {
      (el as HTMLElement).style.fill = "none";
      el.removeAttribute?.("data-pirads");
      el.removeAttribute?.("data-patterns");
      continue;
    }

    (el as HTMLElement).style.fill = getPiradsColor(state.highestPirads);
    el.setAttribute?.("data-pirads", String(state.highestPirads));
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

  for (const [zoneId, state] of Object.entries(zoneState)) {
    const zoneSelection = selectZoneElement(rootSelection, zoneId);
    if (zoneSelection.empty()) {
      console.warn(`Zone ID "${zoneId}" not found in SVG map`);
      continue;
    }

    if (state.highestPirads === null) {
      zoneSelection
        .attr("data-pirads", null)
        .style("fill", "none");
      continue;
    }

    zoneSelection
      .attr("data-pirads", String(state.highestPirads))
      .style("fill", getPiradsColor(state.highestPirads));
  }
}

const SVG_NS = "http://www.w3.org/2000/svg";

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
