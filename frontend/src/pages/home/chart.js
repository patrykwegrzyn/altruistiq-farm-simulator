import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data }) => {
  const chartData = data.map((row) => {
    return {
      short: row.name
        .match(/\b(\w)/g)
        .join("")
        .toUpperCase(),
      name: row.name,
      soy: row.food.soy.kgCO2e.toFixed(2),
      grass: row.food.grass.kgCO2e.toFixed(2),
      tractors: row.tractorsUsage.kgCO2e.toFixed(2),
      machines: row.milk_machinesUsage.kgCO2e.toFixed(2),
    };
  });

  return (
    <div style={{ width: 1230, height: 400, marginBottom: 50 }}>
      <ResponsiveBar
        data={chartData}
        keys={["soy", "grass", "tractors", "machines"]}
        indexBy="short"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.4}
        layout="vertical"
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        valueFormat={{ format: "", enabled: false }}
        colors={{ scheme: "nivo" }}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Farm",
          legendPosition: "left",
          legendOffset: 40,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "kgCO2e",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default BarChart;
