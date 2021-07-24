export interface FarmRow {
  id: string;
  name: string;
  acres: number;
  cows: number;
  tractors: number;
  tractors_usage: number;
  milk_machines: number;
  milk_machines_kwh: number;
  milk_produced: number;
  totalkgCO2e: number;
  kgCO2eperlmilk: number;
  purchases: PurchaseRow[];
  [key: string]: any;
}

export interface PurchaseRow {
  [key: string]: number | string,
}

