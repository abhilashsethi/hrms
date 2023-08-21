import {
  DailyAttendance,
  GuestBarChart,
  GuestDonutChart,
} from "components/analytics";
import { useAuth, useFetch } from "hooks";

const MainHrDashboardCharts = () => {
  const { user } = useAuth();
  const { data: hrDetails, isLoading: hrIsLoading } = useFetch<any>(
    `dashboards/hr-dashInfo?branchId=${user?.employeeOfBranchId}`
  );
  console.log(hrDetails);
  const { data: employeeDetails } = useFetch<any>(`users/dashboard/details`);
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Employee Joining Overview
          </p>
          <GuestBarChart
            labels={
              hrDetails?.userCountMonthWise?.length
                ? hrDetails?.userCountMonthWise?.map((item: any) => item?.month)
                : []
            }
            data={
              hrDetails?.userCountMonthWise?.length
                ? hrDetails?.userCountMonthWise?.map((item: any) => item?.count)
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            This Month Leave Details
          </p>
          <GuestDonutChart
            labels={
              hrDetails?.leaveCounts?.length
                ? hrDetails?.leaveCounts?.map((item: any) => item?.type)
                : []
            }
            series={
              hrDetails?.leaveCounts?.length
                ? hrDetails?.leaveCounts?.map((item: any) => item?._count?.type)
                : []
            }
            text=""
            type="pie"
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
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Attendance Overview
          </p>
          <GuestBarChart
            labels={
              hrDetails?.currentYearAttendance?.length
                ? hrDetails?.currentYearAttendance?.map(
                    (item: any) => item?.month
                  )
                : []
            }
            data={
              hrDetails?.currentYearAttendance?.length
                ? hrDetails?.currentYearAttendance?.map(
                    (item: any) => item?.count
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="grid grid-cols-12 content-between gap-10 m-5 !mb-6">
          <div className="col-span-12 bg-white w-full  gap-5 md:col-span-12 lg:col-span-12 !border-grey-500 rounded-xl !shadow-xl">
            <div className="font-semibold flex justify-center py-4 pl-2 ">
              <p>Last Week Employee's Report </p>
            </div>
            <DailyAttendance
              type="area"
              data={employeeDetails?.lastWeekAttendanceArr}
              totalUsers={employeeDetails?.totalUsers}
            />
          </div>
        </div>
        {/* <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Guests</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            {hrDetails?.recentGuests
              ?.slice(0, 4)
              ?.sort(
                (a: any, b: any) =>
                  (new Date(b?.createdAt) as any) -
                  (new Date(a?.createdAt) as any)
              )
              ?.map((item: any) => (
                <Link
                  href={`/admin/guests/guest-profile?id=${item?.id}`}
                  key={item?.id}
                >
                  <div
                    className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
                  >
                    <Tooltip title="Project Manager">
                      <span className="flex w-full justify-center justify-items-center">
                        <PhotoViewer name={item?.name} />
                      </span>
                    </Tooltip>
                    <span className="font-semibold text-center tracking-wide text-lg">
                      {item?.name}
                    </span>
                    <span className="font-semibold text-center tracking-wide text-sm">
                      {item?.designation}
                    </span>
                    <div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
                      <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                        <span>Valid From</span>
                        <span>
                          {item?.card?.length ? (
                            moment(item?.card[0]?.validFrom).format("ll")
                          ) : (
                            <p>Not Given</p>
                          )}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                        <span>Valid Till</span>
                        <span>
                          {item?.card?.length ? (
                            moment(item?.card[0]?.validTill).format("ll")
                          ) : (
                            <p>Not Given</p>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MainHrDashboardCharts;
