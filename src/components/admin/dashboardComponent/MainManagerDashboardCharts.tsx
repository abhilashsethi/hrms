import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { useAuth, useFetch } from "hooks";
interface Props {
  data?: any;
}
const MainManagerDashboardCharts = ({ data }: Props) => {
  const { user } = useAuth();
  const { data: dashboardData } = useFetch<any>(
    `dashboards/manager/dashboard?managerId=${user?.id}&branchId=${user?.employeeOfBranchId}`
  );

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Leaves Overview
          </p>
          <GuestBarChart
            labels={
              dashboardData?.currentYearLeaveData?.length
                ? dashboardData?.currentYearLeaveData?.map(
                    (item: any) => item?.month
                  )
                : []
            }
            data={
              dashboardData?.currentYearLeaveData?.length
                ? dashboardData?.currentYearLeaveData?.map(
                    (item: any) => item?.leaveCount
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Assets Overview</p>
          <GuestDonutChart
            labels={
              dashboardData?.assetOverView?.length
                ? dashboardData?.assetOverView?.map((item: any) => item?.type)
                : []
            }
            series={
              dashboardData?.assetOverView?.length
                ? dashboardData?.assetOverView?.map((item: any) => item?.count)
                : []
            }
            text=""
            type="pie"
            colors={["#25d366", "#E60023", "#BD33B5"]}
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Bills Overview</p>
          <GuestDonutChart
            labels={
              dashboardData?.billCountStatusWise?.length
                ? dashboardData?.billCountStatusWise?.map(
                    (item: any) => item?.billType
                  )
                : []
            }
            series={
              dashboardData?.billCountStatusWise?.length
                ? dashboardData?.billCountStatusWise?.map(
                    (item: any) => item?._count
                  )
                : []
            }
            text=""
            type="donut"
            colors={["#005d32", "#BD33B5", "#E60023"]}
          />
        </div>
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            Role Wise Employee Strength
          </p>
          <GuestBarChart
            labels={
              dashboardData?.roleWiseEmployeeCount?.length
                ? dashboardData?.roleWiseEmployeeCount?.map(
                    (item: any) => item?.roleName
                  )
                : []
            }
            data={
              dashboardData?.roleWiseEmployeeCount?.length
                ? dashboardData?.roleWiseEmployeeCount?.map(
                    (item: any) => item?.count
                  )
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

export default MainManagerDashboardCharts;
