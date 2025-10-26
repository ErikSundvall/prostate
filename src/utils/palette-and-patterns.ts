/// <reference lib="dom" />
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
  console.log("palette-and-patterns.ts applyZoneStyles:", zoneState);
  for (const zoneId of Object.keys(zoneState)) {
    try {
      // Prefer attribute selector to avoid issues with IDs that start with
      // digits or otherwise would make `#id` invalid in a CSS selector.
      const safeId = String(zoneId || "").replace(/"/g, '\\"');
      const selector = `[id="${safeId}"]`;
      let el: Element | null = null;
      try {
        el = root.querySelector(selector) as Element | null;
      } catch {
        // selector may still fail in odd runtimes; fall through to manual scan
        el = null;
      }

      if (!el) {
        // Defensive fallback: scan all nodes with id and compare attribute.
        // Support environments where `root` is a minimal mock (tests) that
        // exposes an `elements` map instead of querySelectorAll.
        const maybeRoot = root as unknown as {
          querySelectorAll?: (s: string) => NodeListOf<Element>;
          elements?: Record<string, { getAttribute?: (n: string) => string | null }>;
        };
        if (typeof maybeRoot.querySelectorAll === 'function') {
          const nodes = maybeRoot.querySelectorAll!('[id]');
          for (const n of Array.from(nodes)) {
            if ((n as Element).getAttribute('id') === zoneId) { el = n as Element; break; }
          }
        } else if (maybeRoot.elements && typeof maybeRoot.elements === 'object') {
          for (const candidate of Object.values(maybeRoot.elements)) {
            const attrId = candidate && typeof candidate.getAttribute === 'function' ? candidate.getAttribute('id') : null;
            const propId = (candidate as unknown as { id?: string })?.id ?? null;
            if (attrId === zoneId || propId === zoneId) {
              el = candidate as unknown as Element;
              break;
            }
          }
        }
      }

      if (!el) continue;
      const st = zoneState[zoneId];
      if (st.highestPirads === null) {
        // Explicitly set transparent/none so CSS defaults don't render black
        el.setAttribute('fill', 'none');
        el.removeAttribute('data-pirads');
        el.removeAttribute('data-patterns');
      } else {
        el.setAttribute('fill', getPiradsColor(st.highestPirads));
        el.setAttribute('data-pirads', String(st.highestPirads));
        if (st.count > 1) {
          const patterns = st.lesionIds.map(getPatternId).join(' ');
          el.setAttribute('data-patterns', patterns);
          // Try to inject a simple overlay pattern to visually indicate overlaps.
          try {
            ensurePatternDefs(root, st.lesionIds);
              // prefer inserting overlays next to the original zone element so
              // any accompanying labels remain above the overlays and per-row
              // transforms continue to apply.
              const overlayParent = (el.parentElement as Element)
                || (root.querySelector && root.querySelector('#zones'))
                || root;
              // remove any existing overlays for this zone (we'll recreate one per lesion)
              try {
                const selector = `[data-overlay-for="${zoneId}"]`;
                const existingAll = (overlayParent && typeof overlayParent.querySelectorAll === 'function')
                  ? overlayParent.querySelectorAll(selector)
                  : root.querySelectorAll(selector);
                for (const ex of Array.from(existingAll || [])) { if (ex.parentNode) ex.parentNode.removeChild(ex); }
              } catch {
                // ignore
              }
              const canClone = typeof (el as { cloneNode?: unknown }).cloneNode === 'function';
              const maker = (root.ownerDocument && typeof (root.ownerDocument as Document).createElementNS === 'function')
                ? (root.ownerDocument as Document).createElementNS.bind(root.ownerDocument)
                : (typeof (root as unknown as { createElementNS?: unknown }).createElementNS === 'function')
                  ? (root as unknown as { createElementNS: (ns: string, tag: string) => Element }).createElementNS.bind(root)
                  : null;

              const insertBeforeSibling = () => {
                if (!overlayParent || !el.parentNode) return null;
                let anchor: ChildNode | null = el.nextSibling;
                while (anchor) {
                  if (anchor.nodeType === 1 && (anchor as Element).getAttribute('data-overlay-for') === zoneId) {
                    anchor = anchor.nextSibling;
                    continue;
                  }
                  break;
                }
                return anchor;
              };

              if (canClone && overlayParent) {
                const anchor = insertBeforeSibling();
                for (let i = 0; i < st.lesionIds.length; i++) {
                  const lid = st.lesionIds[i];
                  const pid = getPatternId(lid);
                  const overlay = (el.cloneNode(false) as Element);
                  // Clean up identifying attributes so we don't duplicate ids/classes unintentionally
                  overlay.removeAttribute('id');
                  overlay.removeAttribute('data-pirads');
                  overlay.removeAttribute('data-patterns');
                  overlay.removeAttribute('tabindex');
                  overlay.setAttribute('class', `${(overlay.getAttribute('class') || '').replace(/\bzone\b/g, '').trim()} zone-overlay`.trim());
                  overlay.setAttribute('fill', `url(#${pid})`);
                  overlay.setAttribute('stroke', 'none');
                  overlay.setAttribute('opacity', String(Math.max(0.2, 0.7 - (i * 0.2))));
                  overlay.setAttribute('data-overlay-for', zoneId);
                  overlay.setAttribute('data-overlay-index', String(i));
                  overlay.setAttribute('data-pattern-id', pid);
                  overlay.setAttribute('pointer-events', 'none');
                  if (anchor) {
                    overlayParent.insertBefore(overlay as unknown as ChildNode, anchor);
                  } else {
                    (overlayParent as unknown as { appendChild?: (n: ChildNode) => void }).appendChild?.(overlay as unknown as ChildNode);
                  }
                }
              } else if (maker) {
                // Fallback for non-clone environments (e.g., minimal test mocks)
                for (let i = 0; i < st.lesionIds.length; i++) {
                  const lid = st.lesionIds[i];
                  const pid = getPatternId(lid);
                  const use = maker('http://www.w3.org/2000/svg', 'use') as unknown as Element;
                  try { use.setAttribute('href', `#${zoneId}`); } catch { use.setAttribute('xlink:href', `#${zoneId}`); }
                  use.setAttribute('fill', `url(#${pid})`);
                  use.setAttribute('opacity', String(Math.max(0.2, 0.7 - (i * 0.2))));
                  use.setAttribute('data-overlay-for', zoneId);
                  use.setAttribute('data-overlay-index', String(i));
                  use.setAttribute('data-pattern-id', pid);
                  use.setAttribute('pointer-events', 'none');
                  (overlayParent as unknown as { appendChild?: (n: ChildNode) => void }).appendChild?.(use as unknown as ChildNode);
                }
              }
          } catch {
            // ignore pattern failures
          }
        } else {
          el.removeAttribute('data-patterns');
          // remove any existing overlays (both cloned overlays and <use> fallbacks)
          try {
            const selector = `[data-overlay-for="${zoneId}"]`;
            const existingAll = (root && typeof (root.querySelectorAll) === 'function')
              ? root.querySelectorAll(selector)
              : [];
            for (const ex of Array.from(existingAll || [])) {
              if (ex && ex.parentNode) ex.parentNode.removeChild(ex);
            }
          } catch {
            // ignore cleanup failures
          }
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

/**
 * Render small SVG badges (circle + text) for zones that have lesions.
 * This is intended to run in the browser where `createElementNS` and
 * `getBBox` are available. The function is defensive and will no-op when
 * required DOM APIs are missing.
 */
export function renderZoneBadges(root: Element, zoneState: Record<string, ZoneState>) {
  if (!root || typeof (root as unknown as { createElementNS?: unknown }).createElementNS !== 'function') return;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  for (const zoneId of Object.keys(zoneState)) {
    const st = zoneState[zoneId];
    try {
      // find zone element (use attribute selector for safety)
      const selector = `[id="${String(zoneId).replace(/"/g, '\\"')}"]`;
      let zoneEl: Element | null = null;
      try { zoneEl = root.querySelector(selector); } catch { zoneEl = null; }
      if (!zoneEl) continue;

      // badge id / lookup
      const badgeSelector = `g.badge[data-badge-for="${zoneId}"]`;
      let badge = root.querySelector(badgeSelector) as SVGGElement | null;

      if (st.count > 0) {
        // compute badge position using bounding box if available
        let cx = 0, cy = 0;
        try {
          const bbox = (zoneEl as unknown as SVGGraphicsElement).getBBox();
          cx = bbox.x + bbox.width - 6;
          cy = bbox.y + 6;
        } catch {
          // fallback: top-left
          cx = 6; cy = 6;
        }

        if (!badge) {
          // prefer ownerDocument.createElementNS if available, otherwise use
          // root.createElementNS (mock in tests) if present.
          const maker = (root.ownerDocument && typeof (root.ownerDocument as Document).createElementNS === 'function')
            ? (root.ownerDocument as Document).createElementNS.bind(root.ownerDocument)
            : (typeof (root as unknown as { createElementNS?: unknown }).createElementNS === 'function')
              ? (root as unknown as { createElementNS: (ns: string, tag: string) => Element }).createElementNS.bind(root)
              : null;
          if (!maker) continue;
          badge = maker(SVG_NS, 'g') as unknown as SVGGElement;
          badge.setAttribute('class', 'badge');
          badge.setAttribute('data-badge-for', zoneId);
          // circle
          const circle = maker(SVG_NS, 'circle') as unknown as Element;
          circle.setAttribute('r', '8');
          circle.setAttribute('cx', String(cx));
          circle.setAttribute('cy', String(cy));
          circle.setAttribute('fill', '#ffffff');
          circle.setAttribute('stroke', '#000000');
          circle.setAttribute('stroke-width', '1');
          // text
          const text = maker(SVG_NS, 'text') as unknown as Element;
          text.setAttribute('x', String(cx));
          text.setAttribute('y', String(cy + 4));
          text.setAttribute('text-anchor', 'middle');
          text.setAttribute('font-size', '10');
          text.setAttribute('fill', '#000');
          text.setAttribute('data-count', String(st.count));
          text.textContent = String(st.count);
          badge.appendChild(circle as unknown as ChildNode);
          badge.appendChild(text as unknown as ChildNode);
          // append badge into root (as last child)
          (root as unknown as { appendChild?: (n: ChildNode) => void }).appendChild?.(badge as unknown as ChildNode);
        } else {
          // update existing badge
          const text = badge.querySelector('text');
          if (text) {
            text.textContent = String(st.count);
            text.setAttribute('data-count', String(st.count));
          }
          const circle = badge.querySelector('circle');
          if (circle) {
            circle.setAttribute('cx', String(cx));
            circle.setAttribute('cy', String(cy));
          }
        }
      } else {
        // remove badge if present
        if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
      }
    } catch (err) {
      // non-fatal
      // eslint-disable-next-line no-console
      console.warn(`renderZoneBadges skipped ${zoneId} — ${err}`);
    }
  }
}

/**
 * Ensure simple hatch pattern defs exist for each lesion id on the given SVG root.
 * Patterns are simple diagonal hatch overlays; the underlying zone fill remains
 * the color determined by PI-RADS, and the pattern overlay is semi-transparent.
 */
export function ensurePatternDefs(root: Element, lesionIds: string[]) {
  if (!root) return;
  // find or create <defs> inside root
  let defs = root.querySelector('defs') as Element | null;
  const maker = (root.ownerDocument && typeof (root.ownerDocument as Document).createElementNS === 'function')
    ? (root.ownerDocument as Document).createElementNS.bind(root.ownerDocument)
    : (typeof (root as unknown as { createElementNS?: unknown }).createElementNS === 'function')
      ? (root as unknown as { createElementNS: (ns: string, tag: string) => Element }).createElementNS.bind(root)
      : null;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  if (!defs && maker) {
    defs = maker(SVG_NS, 'defs');
    if (defs) root.insertBefore(defs as unknown as Node, root.firstChild as Node);
  }
  if (!defs || !maker) return;
  for (const lid of lesionIds) {
    const pid = getPatternId(lid);
    if (defs.querySelector(`#${pid}`)) continue;
    const pattern = maker(SVG_NS, 'pattern');
    pattern.setAttribute('id', pid);
    pattern.setAttribute('patternUnits', 'userSpaceOnUse');
    // Larger pattern size to be visible after scale(0.2) transform
    pattern.setAttribute('width', '20');
    pattern.setAttribute('height', '20');
    // base rect (transparent so base color shows through)
    const rect = maker(SVG_NS, 'rect');
    rect.setAttribute('x', '0'); rect.setAttribute('y', '0'); rect.setAttribute('width', '20'); rect.setAttribute('height', '20'); rect.setAttribute('fill', 'none');
    // diagonal line across the pattern tile
    const path = maker(SVG_NS, 'path');
    path.setAttribute('d', 'M0 20 L20 0');
    // thicker, more visible stroke
    path.setAttribute('stroke', '#000');
    path.setAttribute('stroke-opacity', '0.9');
    path.setAttribute('stroke-width', '2');
    pattern.appendChild(rect as unknown as ChildNode);
    pattern.appendChild(path as unknown as ChildNode);
    defs.appendChild(pattern as unknown as ChildNode);
  }
}
