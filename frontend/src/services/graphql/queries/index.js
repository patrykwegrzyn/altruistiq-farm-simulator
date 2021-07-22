import { gql } from "@apollo/client";

export const LIST_FARM_QUERY = gql`
  query {
    listFarms {
      id
      name
      acres
      cows
      tractors
      tractors_usage
      milk_machines
      milk_machines_kwh
      milk_produced
      kgCO2eperlmilk
      purchases {
        id
        type
        amount
        unit
        kgCO2e
      }
      food {
        grass {
          consumed
          kgCO2e
        }
        soy {
          consumed
          kgCO2e
        }
        total {
          consumed
          kgCO2e
        }
      }
      tractorsUsage {
        consumed
        kgCO2e
      }
      milk_machinesUsage {
        consumed
        kgCO2e
      }
      totalkgCO2e
    }
  }
`;

