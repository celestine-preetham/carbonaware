export type Category = 'Transport' | 'Food' | 'Energy' | 'Shopping';

export interface Activity {
  id: string;
  title: string;
  category: Category;
  co2e: number; // in kg CO2 equivalent
  date: string;
}

export interface EmissionFactor {
  id: string;
  title: string;
  category: Category;
  factor: number; // kg CO2e per unit
  unit: string;
}
