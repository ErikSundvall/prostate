export interface LesionDetails {
  comment?: string;
  size_mm?: number;
  sequence_notes?: string;
  laterality?: string;
  other?: Record<string, unknown>;
}

export interface Lesion {
  id: string;
  zones: string[]; // canonical zone IDs
  pirads: number; // 1..5
  details?: LesionDetails;
}

export interface Meta {
  version?: string;
  language?: string;
  source?: string;
  created?: string;
}

export interface ProstateMriData {
  meta?: Meta;
  lesions: Lesion[];
}

export const CANONICAL_ZONES: string[] = (() => {
  const zones: string[] = [];
  for (let g = 1; g <= 4; g++) {
    for (const letter of ["A", "B", "C"]) {
      for (const suffix of ["v", "d"]) {
        zones.push(`${g}${letter}${suffix}`);
      }
    }
  }
  return zones;
})();

// types exported above via named exports
