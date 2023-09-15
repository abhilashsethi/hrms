import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { useAuth, useFetch } from "hooks";
import { SalesDashboard } from "types";

const SalesDashboardCharts = () => {
  const { user } = useAuth();

  const { data: dashboardData } = useFetch<SalesDashboard>(
    `dashboards/sales/dashboard?userId=${user?.id}`
  );

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Attendance Overview
          </p>
          <GuestBarChart
            labels={
              dashboardData?.currentYearAttendance?.length
                ? dashboardData?.currentYearAttendance?.map(
                    (item) => item?.month
                  )
                : []
            }
            data={
              dashboardData?.currentYearAttendance?.length
                ? dashboardData?.currentYearAttendance?.map(
                    (item) => item?.count
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>

        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Meetings Overview</p>
          <GuestDonutChart
            labels={
              dashboardData?.meetingCounts?.length
                ? dashboardData?.meetingCounts?.map((item) => item?.status)
                : []
            }
            series={
              dashboardData?.meetingCounts?.length
                ? dashboardData?.meetingCounts?.map(
                    (item) => item?._count?.status
                  )
                : []
            }
            text=""
            type="donut"
            colors={["#cddc39", "#448aff"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardCharts;
