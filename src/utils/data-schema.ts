import type { Lesion, ProstateMriData } from "../types.ts";
import { CANONICAL_ZONES } from "../types.ts";

export function normalizeZoneId(id: string) {
  return id.trim().replace(/\s+/g, "").toUpperCase().replace(/V$/i, "v")
    .replace(/D$/i, "d");
}

export function validateLesionData(
  raw: unknown,
): { validData?: ProstateMriData; warnings: string[] } {
  const warnings: string[] = [];
  if (!raw || typeof raw !== "object") {
    warnings.push("Data must be an object");
    return { warnings };
  }
  const obj = raw as Record<string, unknown>;
  if (!Array.isArray(obj["lesions"])) {
    warnings.push("Missing or invalid 'lesions' array");
    return { warnings };
  }
  const lesionsRaw = obj["lesions"] as unknown[];
  const lesions: Lesion[] = [];
  for (const l of lesionsRaw) {
    if (!l || typeof l !== "object") {
      warnings.push("Invalid lesion entry (not an object)");
      continue;
    }
    const rec = l as Record<string, unknown>;
    const id = String(rec.id ?? "").trim();
    if (!id) {
      warnings.push("Lesion missing id");
      continue;
    }
    const pirads = Number(rec.pirads ?? NaN);
    if (!Number.isInteger(pirads) || pirads < 1 || pirads > 5) {
      warnings.push(`Lesion ${id} has invalid pirads '${rec.pirads}'`);
    }
    let zones: string[] = [];
    if (Array.isArray(rec.zones)) {
      zones = rec.zones.map((z) => normalizeZoneId(String(z)));
    } else if (typeof rec.zones === "string") {
      zones = [normalizeZoneId(rec.zones)];
    }
    // filter invalid zones
    const validZones: string[] = [];
    for (const z of zones) {
      if (CANONICAL_ZONES.includes(z)) validZones.push(z);
      else warnings.push(`Lesion ${id} references invalid zone '${z}'`);
    }
    // dedupe
    const deduped = Array.from(new Set(validZones));
    lesions.push({
      id,
      pirads,
      zones: deduped,
      details: rec.details as unknown as Lesion["details"],
    });
  }
  const validData: ProstateMriData = { lesions };
  return { validData, warnings };
}

export default validateLesionData;
