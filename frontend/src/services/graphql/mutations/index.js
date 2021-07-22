import { gql } from "@apollo/client";

export const ADD_FARM_MUTATION = gql`
  mutation addFarm(
    $name: String
    $acres: Int
    $cows: Int
    $tractors: Int
    $tractors_usage: Float
    $milk_machines: Int
    $milk_machines_kwh: Float
    $milk_produced: Int
  ) {
    addFarm(
      name: $name
      acres: $acres
      cows: $cows
      tractors: $tractors
      tractors_usage: $tractors_usage
      milk_machines: $milk_machines
      milk_machines_kwh: $milk_machines_kwh
      milk_produced: $milk_produced
    ) {
      name
    }
  }
`;