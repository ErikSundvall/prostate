import { computeZoneState } from "../src/utils/palette-and-patterns.ts";
import type { Lesion } from "../src/types.ts";

Deno.test("computeZoneState - overlapping lesions", () => {
  const lesions: Lesion[] = [
    { id: "L1", pirads: 3, zones: ["1Av", "1Bv"] },
    { id: "L2", pirads: 5, zones: ["1Av"] },
    { id: "L3", pirads: 2, zones: ["2Cv"] },
  ];

  const state = computeZoneState(lesions);

  // 1Av should have two lesions and highest pirads 5
  if (!state["1Av"]) throw new Error("missing 1Av");
  if (state["1Av"].count !== 2) throw new Error("1Av count expected 2");
  if (state["1Av"].highestPirads !== 5) throw new Error("1Av highestPirads expected 5");

  // 1Bv should have one lesion and highest pirads 3
  if (state["1Bv"].count !== 1) throw new Error("1Bv count expected 1");
  if (state["1Bv"].highestPirads !== 3) throw new Error("1Bv highestPirads expected 3");

  // 2Cv
  if (state["2Cv"].count !== 1) throw new Error("2Cv count expected 1");
  if (state["2Cv"].highestPirads !== 2) throw new Error("2Cv highestPirads expected 2");
});

Deno.test("computeZoneState - empty lesions", () => {
  const state = computeZoneState([] as Lesion[]);
  // pick a canonical zone and assert defaults
  if (!Object.prototype.hasOwnProperty.call(state, "1Av")) throw new Error("1Av missing");
  if (state["1Av"].count !== 0) throw new Error("1Av count expected 0");
  if (state["1Av"].highestPirads !== null) throw new Error("1Av highestPirads expected null");
});
