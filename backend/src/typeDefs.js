const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Purchases {
    id: String
    name: String
    type: String
    amount: Float
    unit: String
    kgCO2e: Float
  }

  type Stats {
    consumed: Float
    kgCO2e: Float
  }

  type FoodConsumed {
    soy: Stats
    grass: Stats
    total: Stats
  }

  type Farm {
    id: String
    name: String
    acres: Int
    cows: Int
    tractors: Int
    tractors_usage: Float
    milk_machines: Int
    milk_machines_kwh: Float
    milk_produced: Int
  }

  type FarmDetails {
    id: String
    name: String
    acres: Int
    cows: Int
    tractors: Int
    tractors_usage: Float
    milk_machines: Int
    milk_machines_kwh: Float
    milk_produced: Int
    purchases: [Purchases]
    food: FoodConsumed
    tractorsUsage: Stats
    milk_machinesUsage: Stats
    totalkgCO2e: Float
    kgCO2eperlmilk: Float
  }

  type Query {
    listFarms: [FarmDetails]
  }

  type Mutation {
    addFarm(
      name: String
      acres: Int
      cows: Int
      tractors: Int
      tractors_usage: Float
      milk_machines: Int
      milk_machines_kwh: Float
      milk_produced: Int
    ): Farm
  }
`;

module.exports = typeDefs;
