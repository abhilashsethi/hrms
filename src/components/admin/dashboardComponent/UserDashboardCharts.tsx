import { GuestBarChart, GuestDonutChart } from "components/analytics";

import { NoDatas } from "components/core";
import moment from "moment";
import Link from "next/link";
interface Props {
  data?: any;
}
const UserDashboardCharts = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Attendance Overview
          </p>
          <GuestBarChart
            labels={
              data?.currentYearAttendance?.length
                ? data?.currentYearAttendance?.map((item: any) => item?.month)
                : []
            }
            data={
              data?.currentYearAttendance?.length
                ? data?.currentYearAttendance?.map((item: any) => item?.count)
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            This Year Leave Details
          </p>
          {data?.allLeaveCount?.length ? (
            <GuestDonutChart
              labels={
                data?.allLeaveCount?.length
                  ? data?.allLeaveCount?.map((item: any) => item?._id)
                  : []
              }
              series={
                data?.allLeaveCount?.length
                  ? data?.allLeaveCount?.map((item: any) => item?.totalCount)
                  : []
              }
              text=""
              type="pie"
              colors={["#cddc39", "#a855f7", "#03a9f4", "#ef4444"]}
            />
          ) : (
            <NoDatas title={"No Leave Taken"} />
          )}
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            This Month Attendance Overview
          </p>
          <GuestDonutChart
            labels={
              data?.currentMonthPresentAndAbsent?.length
                ? data?.currentMonthPresentAndAbsent?.map(
                    (item: any) => item?.name
                  )
                : []
            }
            series={
              data?.currentMonthPresentAndAbsent?.length
                ? data?.currentMonthPresentAndAbsent?.map(
                    (item: any) => item?.count
                  )
                : []
            }
            text=""
            type="donut"
            colors={["#25d366", "#E60023"]}
          />
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Mails</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            <p>No Mails</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardCharts;
