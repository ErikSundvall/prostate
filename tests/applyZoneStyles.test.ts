/// <reference lib="dom" />
import { computeZoneState, applyZoneStyles } from "../src/utils/palette-and-patterns.ts";
import type { Lesion } from "../src/types.ts";

// Minimal mock element shape to avoid requiring a DOM in Deno tests
type MockEl = {
  id: string;
  setAttribute(name: string, value: string): void;
  getAttribute(name: string): string | null;
  removeAttribute(name: string): void;
};

function makeMockElement(id: string): MockEl {
  const attrs = new Map<string, string>();
  return {
    id,
    setAttribute(name: string, value: string) {
      attrs.set(name, value);
    },
    getAttribute(name: string) {
      return attrs.get(name) ?? null;
    },
    removeAttribute(name: string) {
      attrs.delete(name);
    },
  };
}

class MockRoot {
  elements: Record<string, MockEl> = {};
  constructor(ids: string[]) {
    for (const id of ids) this.elements[id] = makeMockElement(id);
  }
  querySelector(selector: string) {
    if (!selector || !selector.startsWith("#")) return null;
    const id = selector.slice(1);
    return (this.elements[id] as unknown) as Element | null;
  }
}

Deno.test("applyZoneStyles sets fill and data-pirads on mock SVG shapes", () => {
  const root = new MockRoot(["1Av", "1Bv"]);

  const lesions: Lesion[] = [
    { id: "L1", pirads: 3, zones: ["1Av"] },
    { id: "L2", pirads: 5, zones: ["1Av", "1Bv"] },
  ];

  const state = computeZoneState(lesions);
  applyZoneStyles(root as unknown as Element, state);

  const el1 = root.elements["1Av"];
  const fill1 = el1.getAttribute("fill");
  const data1 = el1.getAttribute("data-pirads");
  if (!fill1) throw new Error("1Av fill not set");
  if (data1 !== "5") throw new Error(`1Av data-pirads expected 5, got ${data1}`);

  const el2 = root.elements["1Bv"];
  const data2 = el2.getAttribute("data-pirads");
  if (data2 !== "5") throw new Error(`1Bv data-pirads expected 5, got ${data2}`);

  const patterns1 = el1.getAttribute("data-patterns");
  if (!patterns1 || !patterns1.includes("pattern-L1") || !patterns1.includes("pattern-L2")) {
    throw new Error(`1Av data-patterns expected to include pattern-L1 and pattern-L2, got ${patterns1}`);
  }
  const patterns2 = el2.getAttribute("data-patterns");
  if (patterns2) throw new Error(`1Bv should not have data-patterns but got ${patterns2}`);
});
