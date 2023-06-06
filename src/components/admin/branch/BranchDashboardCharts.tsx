import { BranchBarChart, BranchBarChartDetails } from "components/analytics";
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
          <BranchBarChart
            labels={
              data?.countryWiseBranchCount?.length
                ? data?.countryWiseBranchCount?.map((item: any) => item.country)
                : []
            }
            data={
              data?.countryWiseBranchCount?.length
                ? data?.countryWiseBranchCount?.map((item: any) => item.count)
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Branch Wise Employee Overview</p>
          <BranchBarChartDetails
            labels={
              data?.branchWiseEmployeeCount?.length
                ? data?.branchWiseEmployeeCount?.map((item: any) => item.name)
                : []
            }
            data={
              data?.branchWiseEmployeeCount?.length
                ? data?.branchWiseEmployeeCount?.map((item: any) => item.employeeCount)
                : []
            }
            type="bar"
            text=""
          />
        </div>
      </div>
    </div>
  );
};

export default BranchDashboardCharts;
