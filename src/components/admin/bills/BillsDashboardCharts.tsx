import { BranchBarChart, ClientLineCharts } from "components/analytics";
import React from "react";
import { Bills } from "types";
interface Props {
  data?: Bills;
}
const BillsDashboardCharts = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full flex bg-white flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            Current Year Bills Overview
          </p>
          <BranchBarChart
            labels={
              data?.currentYearBillCountMonthWise?.length
                ? data?.currentYearBillCountMonthWise?.map(
                    (item) => item?.month
                  )
                : null
            }
            data={
              data?.currentYearBillCountMonthWise?.length
                ? data?.currentYearBillCountMonthWise?.map(
                    (item) => item?.count
                  )
                : null
            }
            type="bar"
            text=""
          />
        </div>
        <div className="px-2 py-4 pt-9 bg-white w-full gap-5 !border-grey-500 rounded-xl !shadow-xl">
          <p className="text-center text-lg font-bold">Bills Overview</p>
          <ClientLineCharts
            labels={
              data?.typeWiseBillCount?.length
                ? data?.typeWiseBillCount?.map((item) => item?.billType)
                : null
            }
            series={
              data?.typeWiseBillCount?.length
                ? data?.typeWiseBillCount?.map((item) => item?._count)
                : null
            }
            text=""
            type="donut"
            colors={["#106EAD", "#C33C5E", "#25d366"]}
          />
        </div>
      </div>
    </div>
  );
};

export default BillsDashboardCharts;
