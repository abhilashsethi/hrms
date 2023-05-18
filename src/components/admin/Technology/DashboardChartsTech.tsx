import { TechnologyBarChart, TechnologyDonutChart } from "components/analytics";
interface Props {
  dashboardData?: any;
}
const DashboardChartsTech = ({ dashboardData }: Props) => {
  return (
    <div className="grid lg:grid-cols-2 content-between gap-6">
      <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
        <p className="font-bold text-lg text-center">Technology Overview</p>
        <TechnologyBarChart
          labels={
            dashboardData?.TechInfo?.usedProjectCount?.length
              ? dashboardData?.TechInfo?.usedProjectCount?.map(
                  (item: any) => item?.name
                )
              : []
          }
          data={
            dashboardData?.TechInfo?.usedProjectCount?.length
              ? dashboardData?.TechInfo?.usedProjectCount?.map(
                  (item: any) => item?._count?.usedProjectIds
                )
              : []
          }
          type="bar"
          text=""
        />
      </div>
      <div className="w-full flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
        <p className="text-lg font-bold text-center">Technology Details</p>
        <TechnologyDonutChart
          labels={
            dashboardData?.TechInfo?.usedProjectCount?.length
              ? dashboardData?.TechInfo?.usedProjectCount?.map(
                  (item: any) => item?.name
                )
              : []
          }
          series={
            dashboardData?.TechInfo?.usedProjectCount?.length
              ? dashboardData?.TechInfo?.usedProjectCount?.map(
                  (item: any) => item?._count?.usedProjectIds
                )
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

export default DashboardChartsTech;
