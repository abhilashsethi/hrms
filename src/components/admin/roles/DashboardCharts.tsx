import { RoleBarChart, RoleDonutChart } from "components/analytics";

interface Props {
  dashboardData?: any;
  roleCard?: any;
}
const DashboardCharts = ({ dashboardData, roleCard }: Props) => {
  return (
    <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
      <div className="px-2 col-span-12 pt-9 w-full flex flex-col justify-center gap-2 md:col-span-12 lg:col-span-7 !border-gray-500 rounded-xl !shadow-xl">
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
      <div className="col-span-12 w-full flex flex-col justify-center md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
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
  );
};

export default DashboardCharts;
