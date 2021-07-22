const { farms, purchases } = require("./store");

const co2Factors = {
  Electricity: 0.23314, // per kWh
  Diesel: 2.68787, // per liter
  Food: 1.3289, // per kg,
};

const purchaseskgCO2eStats = (purchase) => {
  const { type, amount } = purchase;
  let kgCO2e = 0;
  switch (type) {
    case "Diesel":
      kgCO2e = amount * co2Factors[type];
      break;
    case "Electricity":
      kgCO2e = amount * co2Factors[type];
      break;
    default:
      kgCO2e = amount * co2Factors["Food"];
  }
  return kgCO2e;
};

const milkMachineStats = (farm) => {
  const { milk_machines, milk_machines_kwh } = farm;
  const consumedKWH = 16 * milk_machines * milk_machines_kwh;
  return {
    consumed: consumedKWH,
    kgCO2e: consumedKWH * co2Factors["Electricity"],
  };
};

const tractorStats = (farm) => {
  // assuming each tractore does equal millage
  // some imaginary factor i have no idea how to corolate tractor usage with acres
  const { acres, tractors, tractors_usage } = farm;
  const milagePerTractor = 1.6 * acres;
  const consumptionPerTractor = (milagePerTractor / 100) * tractors_usage;
  const consumptionAllTractors = consumptionPerTractor * tractors;

  return {
    consumed: consumptionAllTractors,
    kgCO2e: consumptionAllTractors * co2Factors["Diesel"],
  };
};

const foodStats = (farm) => {
  const { cows } = farm;
  const soyConsumedKg = cows * 3; // 3kg /day/cow
  const grassConsumedKg = cows * 14; // 14kg /day/cow
  ////https://www.thecattlesite.com/articles/4191/how-much-forage-does-a-dairy-cow-need-a-day/

  const soykgCO2e = soyConsumedKg * co2Factors["Food"];
  const grasskgCO2e = grassConsumedKg * co2Factors["Food"];

  return {
    soy: {
      consumed: soyConsumedKg,
      kgCO2e: soykgCO2e,
    },
    grass: {
      consumed: grassConsumedKg,
      kgCO2e: grasskgCO2e,
    },
    total: {
      consumed: soyConsumedKg + grassConsumedKg,
      kgCO2e: soykgCO2e + grasskgCO2e,
    },
  };
};

const resolvers = {
  Query: {
    listFarms: () => {
      return farms.get().map((farm) => {
        const { name, milk_produced } = farm;
        const purchasesData = purchases.get().map((purchase) => {
          const kgCO2e = purchaseskgCO2eStats(purchase);
          return { ...purchase, kgCO2e };
        });

        const stats = {
          food: foodStats(farm),
          tractorsUsage: tractorStats(farm),
          milk_machinesUsage: milkMachineStats(farm),
        };

        const farmPurchases = purchasesData.filter((p) => p.farm === name);

        const totalkgCO2e =
          Math.round(
            (stats.food.total.kgCO2e +
              stats.tractorsUsage.kgCO2e +
              stats.milk_machinesUsage.kgCO2e) *
              100
          ) / 100;
        const kgCO2eperlmilk = (totalkgCO2e / milk_produced).toFixed(2);

        return {
          ...farm,
          ...stats,
          purchases,
          totalkgCO2e,
          kgCO2eperlmilk,
          purchases: farmPurchases,
        };
      });
    },
  },
  Mutation: {
    addFarm: async (_, args, { dataSources }) => {
      farms.add(args);
      return { args };
    },
  },
};

module.exports = resolvers;
