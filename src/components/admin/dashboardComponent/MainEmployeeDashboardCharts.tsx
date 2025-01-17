import { GuestBarChart, GuestDonutChart } from "components/analytics";

import { NoDatas } from "components/core";
import moment from "moment";
import Link from "next/link";
interface Props {
  data?: any;
}
const MainEmployeeDashboardCharts = ({ data }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            Current Year Attendance Overview
          </p>
          {data?.currentYearAttendance?.length ? (
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
          ) : (
            <NoDatas title={"No Attendance This Year"} />
          )}
        </div>
        <div className="w-full px-2 py-4 bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Current Year Leave Details
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
        <div className="w-full px-2 py-4 bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Current Month Attendance
          </p>
          {data?.currentMonthPresentAndAbsent?.length ? (
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
          ) : (
            <NoDatas title={"No Attendance This Month"} />
          )}
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Projects</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            {data?.recentProjects?.length ? (
              data?.recentProjects
                ?.slice(0, 4)
                ?.sort(
                  (a: any, b: any) =>
                    (new Date(b?.createdAt) as any) -
                    (new Date(a?.createdAt) as any)
                )
                ?.map((item: any) => (
                  <Link
                    href={`/admin/projects/project-details?id=${item?.id}`}
                    key={item?.id}
                  >
                    <div
                      className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
                    >
                      <div className="flex justify-between gap-1 text-xs font-semibold">
                        <div>
                          {" "}
                          <p className="font-semibold text-sm">Industry</p>{" "}
                          {item?.industry ? item?.industry : "Not specified"}
                        </div>
                        <div
                          className={`px-2 rounded-lg flex items-center uppercase shadow-md text-xs tracking-wide font-semibold text-white ${
                            item?.status === "Pending"
                              ? `bg-yellow-500`
                              : item?.status === "Ongoing"
                              ? `bg-blue-500`
                              : item?.status === "Onhold"
                              ? `bg-red-500`
                              : item?.status === "Completed"
                              ? `bg-green-500`
                              : `bg-slate-500`
                          }`}
                        >
                          {item?.status}
                        </div>
                      </div>
                      <span className="font-semibold text-center tracking-wide text-lg">
                        {item?.name}
                      </span>
                      <div className="grid lg:grid-cols-2 gap-4 text-xs text-center font-semibold">
                        <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black justify-center w-full">
                          <span>Start Date</span>
                          <span>{moment(item?.startDate).format("LL")}</span>
                        </div>
                        <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-black justify-center w-full">
                          <span>End Date</span>
                          <span>{moment(item?.endDate).format("LL")}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
            ) : (
              <NoDatas title={"No Projects"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEmployeeDashboardCharts;
