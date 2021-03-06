import  excelToJson from "convert-excel-to-json";
import { Response } from 'express';
const { farms, purchases } = require("./store");

import { FarmRaw, Purchase } from "./types"


const convert = {
  gal2l: (g:number) => g / 0.21997,
  tone2kg: (t: number) => t / 1000,
};

function FarmModel(farm: FarmRaw): FarmRaw {
  farm = Object.keys(farm).reduce((obj:any, key:string): FarmRaw => {
    let val = farm[key];
    // convert coma separate numbers to actual floats
    if (key !== "name" && typeof val === "string") {
      val = parseFloat(val.replace(",", "."));
    }
    obj[key] = val;
    return obj;
  }, {});
  // excelToJson does not handle empty cells so we can hack with defaults 0
  const {
    name,
    acres = 0,
    cows = 0,
    tractors = 0,
    tractors_usage = 0,
    milk_machines = 0,
    milk_machines_kwh = 0,
    milk_produced = 0,
  } = farm;
  return {
    name,
    acres,
    cows,
    tractors,
    tractors_usage,
    milk_machines,
    milk_machines_kwh,
    milk_produced,
  };
}

// standardise units to kg , liters
function PurchaseModel(purchase: Purchase) {
  let { amount, unit } = purchase;

  switch (unit) {
    case "ton":
      amount = convert.tone2kg(amount);
      unit = "kg";
      break;
    case "galon":
      amount = convert.gal2l(amount);
      unit = "l";
      break;
  }

  return { ...purchase, amount, unit };
}

export default async (req : any, res: Response) => {
  const { Farms, Purchases } = excelToJson({
    source: req.files.file.data,
    sheets: [
      {
        name: "Farms",
        columnToKey: {
          A: "name",
          B: "acres",
          C: "cows",
          D: "tractors",
          E: "tractors_usage",
          F: "milk_machines",
          G: "milk_machines_kwh",
          H: "milk_produced",
        },
      },
      {
        name: "Purchases",
        columnToKey: {
          A: "farm",
          B: "type",
          C: "amount",
          D: "unit",
        },
      },
    ],
  });

  try {
    // in real life that would be async call to database
    farms.set(Farms.slice(1).map(FarmModel));
    purchases.set(Purchases.slice(1).map(PurchaseModel));
    res.json({ status: "success" });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error: error.code,
    });
  }
};
