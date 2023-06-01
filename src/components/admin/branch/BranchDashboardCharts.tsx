import { DepartmentBarChart, DepartmentDonutChart } from "components/analytics";
import React from "react";
interface Props {
  data?: any;
}
const BranchDashboardCharts = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Country Wise Branch Overview</p>
          <DepartmentBarChart
            labels={["India", "PAKISTAN", "CHAINA", "BANGLADESH"]}
            data={
              ["10", "05", "08", "20"]
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Branch Wise Employee Overview</p>
          <DepartmentDonutChart
            labels={["SY-1", "SY-2", "SY-3" ]}
            series={
               [10, 60, 30]
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

export default BranchDashboardCharts;
