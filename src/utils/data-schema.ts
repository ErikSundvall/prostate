import type { ProstateMriData } from "../types.ts";

export function validateLesionData(
  data: unknown,
): { validData?: ProstateMriData; warnings: string[] } {
  const warnings: string[] = [];
  if (!data || typeof data !== "object") {
    warnings.push("Data is not an object");
    return { warnings };
  }
  const d = data as ProstateMriData;
  if (!Array.isArray(d.lesions)) {
    warnings.push("Missing lesions array");
    return { warnings };
  }
  // basic normalization
  d.lesions.forEach((l) => {
    l.zones = Array.isArray(l.zones)
      ? l.zones.map((z) => String(z).trim())
      : [];
  });
  return { validData: d, warnings };
}
