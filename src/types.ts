export interface LesionDetails {
  sequence_notes?: string;
  laterality?: string;
  other?: Record<string, unknown>;
}

export interface Lesion {
  id: string;
  zones: string[];
  pirads: number;
  comment?: string;
  size_mm?: number;
  details?: LesionDetails;
}

export interface ProstateMriData {
  lesions: Lesion[];
  meta?: { version?: string; language?: string };
}
