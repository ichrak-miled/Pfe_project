export type FuelType = 'Essence' | 'Diesel';

export interface VehiculeDraft {
  matricule: string;
  marque: string;
  modele: string;
  puissance: number;
  carburant: FuelType;
  places: number;
  annee: number;
}

export interface VehiculeCreatedResponse {
  id?: string;
  matricule: string;
  message?: string;
}
