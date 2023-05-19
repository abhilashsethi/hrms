import { RoleBarChart, RoleDonutChart } from "components/analytics";

interface Props {
  dashboardData?: any;
  roleCard?: any;
}
const DashboardCharts = ({ dashboardData, roleCard }: Props) => {
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Role Overview</p>
          <RoleBarChart
            labels={
              dashboardData?.roleWiseUsers?.length
                ? dashboardData?.roleWiseUsers?.map((item: any) => item?.name)
                : []
            }
            data={
              dashboardData?.roleWiseUsers?.length
                ? dashboardData?.roleWiseUsers?.map((item: any) => item?._count)
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Role Details</p>
          <RoleDonutChart
            labels={
              dashboardData?.roleWiseUsers?.length
                ? dashboardData?.roleWiseUsers?.map((item: any) => item?.name)
                : []
            }
            series={
              dashboardData?.roleWiseUsers?.length
                ? dashboardData?.roleWiseUsers?.map((item: any) => item?._count)
                : []
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

export default DashboardCharts;
