import { BranchBarChart, BranchBarChartDetails, ClientLineCharts } from "components/analytics";
import React from "react";
interface Props {
  data?: any;
}
const AssetsDashboardCharts = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Branch Wise Asset Overview</p>
          <BranchBarChart
            labels={
              ["India", "Pakistan", "Bangladesh", "Chaina", "Austrelia", "England"]
            }
            data={
              [20, 30, 15, 10, 50, 80]
            }
            type="bar"
            text=""
          />
        </div>
        <div className="px-2 py-4 pt-9 bg-white w-full gap-5 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
          <p className="text-center text-lg font-bold">Assets Strength</p>
          <ClientLineCharts
            labels={
              ["Assigned", "Not Assigned"]
            }
            series={
              [70, 30]
            }
            text=""
            type="donut"
            colors={[
              "#106EAD",
              "#C33C5E",
              "#25d366",
              "#BD33B5",
              "#E60023",
              "#005d32",
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetsDashboardCharts;
