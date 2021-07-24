export interface Purchase {
  id: string;
  farm: string;
  type: string;
  amount: number;
  unit: string;
  kgCO2e: number;
}


export interface FarmRaw {
  name: string
  acres: number
  cows: number
  tractors: number
  tractors_usage: number
  milk_machines: number
  milk_machines_kwh: number
  milk_produced: number
  [key: string]: number | string,
}

export interface Farm extends FarmRaw {
  id: string
  
}


export type Stat = {
  consumed: number,
  kgCO2e: number
}

export type FoodStat = {
  soy: Stat
  grass: Stat,
  total: Stat
}
