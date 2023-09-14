import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { NoDatas } from "components/core";
import { useAuth, useFetch } from "hooks";
interface Props {
  data?: any;
}
const MainManagerDashboardCharts = ({ data }: Props) => {
  const { user } = useAuth();
  const { data: dashboardData } = useFetch<any>(
    `dashboards/manager/dashboard?managerId=${user?.id}&branchId=${user?.employeeOfBranchId}`
  );
  console.log(dashboardData);
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white  justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Leaves Overview
          </p>
          {dashboardData?.currentYearLeaveData?.length ? (
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
          ) : (
            <NoDatas title={"No Leaves This Year"} />
          )}
        </div>
        <div className="w-full px-2 py-4  bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Assets Overview</p>
          {dashboardData?.assetOverView?.length ? (
            <GuestDonutChart
              labels={
                dashboardData?.assetOverView?.length
                  ? dashboardData?.assetOverView?.map((item: any) => item?.type)
                  : []
              }
              series={
                dashboardData?.assetOverView?.length
                  ? dashboardData?.assetOverView?.map(
                      (item: any) => item?.count
                    )
                  : []
              }
              text=""
              type="pie"
              colors={["#25d366", "#E60023", "#BD33B5"]}
            />
          ) : (
            <NoDatas title={"No Assets"} />
          )}
        </div>
        <div className="w-full px-2 py-4  bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Current Year Asset Overview
          </p>
          {dashboardData?.currentYearAssetDetails?.length ? (
            <GuestBarChart
              labels={
                dashboardData?.currentYearAssetDetails?.length
                  ? dashboardData?.currentYearAssetDetails?.map(
                      (item: any) => item?.month
                    )
                  : []
              }
              data={
                dashboardData?.currentYearAssetDetails?.length
                  ? dashboardData?.currentYearAssetDetails?.map(
                      (item: any) => item?.assetCount
                    )
                  : []
              }
              type="bar"
              text=""
            />
          ) : (
            <NoDatas title={"No Assets"} />
          )}
        </div>
        <div className="px-2 py-4 w-full bg-white  justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Resent Assets</p>
          {dashboardData?.roleWiseEmployeeCount?.length ? (
            <GuestBarChart
              labels={
                dashboardData?.roleWiseEmployeeCount?.length
                  ? dashboardData?.roleWiseEmployeeCount?.map((item: any) =>
                      item?.roleName ? item?.roleName : "None"
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
          ) : (
            <NoDatas title={"No Assets"} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainManagerDashboardCharts;
