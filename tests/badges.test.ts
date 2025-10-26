import { renderZoneBadges } from "../src/utils/palette-and-patterns.ts";
import type { ZoneState } from "../src/utils/palette-and-patterns.ts";

// Minimal mock SVG element and root to test badge rendering without a DOM.
class MockZone {
  id: string;
  bbox: { x: number; y: number; width: number; height: number };
  attrs = new Map<string, string>();
  constructor(id: string, bbox = { x: 10, y: 10, width: 40, height: 20 }) {
    this.id = id;
    this.bbox = bbox;
  }
  getAttribute(n: string) { return this.attrs.get(n) ?? null; }
  setAttribute(n: string, v: string) { this.attrs.set(n, v); }
  removeAttribute(n: string) { this.attrs.delete(n); }
  getBBox() { return this.bbox; }
}

class MockSvgRoot {
  elements: Record<string, { getAttribute?: (n: string) => string | null; id?: string }> = {};
  created: Array<{ tag: string; attrs: Map<string, string>; children: unknown[] }> = [];
  constructor(ids: string[]) {
    for (const id of ids) this.elements[id] = new MockZone(id) as unknown as { getAttribute?: (n: string) => string | null; id?: string };
  }
  querySelector(sel: string) {
    if (!sel.startsWith('[id="')) return null;
    const id = sel.slice(5, -2);
    return this.elements[id] ?? null;
  }
  querySelectorAll() { return [] as Element[]; }
  createElementNS(_ns: string, tag: string) {
    const node: { tag: string; attrs: Map<string, string>; children: unknown[] } = { tag, attrs: new Map<string, string>(), children: [] };
    (node as unknown as { setAttribute: (n: string, v: string) => void }).setAttribute = (n: string, v: string) => node.attrs.set(n, v);
    (node as unknown as { getAttribute: (n: string) => string | null }).getAttribute = (n: string) => node.attrs.get(n) ?? null;
    (node as unknown as { appendChild: (c: unknown) => void }).appendChild = (c: unknown) => node.children.push(c);
    this.created.push(node);
    return node as unknown as Element;
  }
}

Deno.test("renderZoneBadges creates badge elements for zones with counts", () => {
  const root = new MockSvgRoot(["1Av", "1Bv"]);
  const state: Record<string, ZoneState> = {
    "1Av": { highestPirads: 4, lesionIds: ["L1"], count: 1 },
    "1Bv": { highestPirads: null, lesionIds: [], count: 0 },
  } as Record<string, ZoneState>;

  renderZoneBadges(root as unknown as Element, state);

  // One badge should be created for 1Av
  const created = root.created;
  if (created.length === 0) throw new Error("No badge elements created");
  const g = created.find((n) => n.tag === 'g' && n.attrs.get('data-badge-for') === '1Av');
  if (!g) throw new Error("Badge group for 1Av not created");
  const text = (g.children as unknown[]).find((c) => (c as { tag?: string })?.tag === 'text') as unknown;
  if (!text) throw new Error('Badge text missing');
  const textNode = text as { tag?: string; attrs?: Map<string,string> };
  if (!textNode.attrs || textNode.attrs.get('data-count') !== '1') throw new Error(`Badge text count expected 1 got ${textNode.attrs?.get('data-count')}`);
});
