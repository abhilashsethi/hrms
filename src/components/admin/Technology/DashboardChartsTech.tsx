import { TechnologyBarChart, TechnologyDonutChart } from "components/analytics";
interface Props {
  dashboardData?: any;
}
const DashboardChartsTech = ({ dashboardData }: Props) => {
  return (
    <div className="grid lg:grid-cols-2 content-between gap-6">
      <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
        <p className="font-bold text-lg text-center">Technologies Used Project Overview</p>
        <TechnologyBarChart
          labels={
            dashboardData?.TechInfo?.usedProjectCountArr?.length
              ? dashboardData?.TechInfo?.usedProjectCountArr?.map(
                (item: any) => item?.name
              )
              : []
          }
          data={
            dashboardData?.TechInfo?.usedProjectCountArr?.length
              ? dashboardData?.TechInfo?.usedProjectCountArr?.map(
                (item: any) => item?.usedInCount
              )
              : []
          }
          type="bar"
          text=""
        />
      </div>
      {/* <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
        <p className="text-lg font-bold text-center">Technology Details</p>
        <TechnologyDonutChart
          labels={
            dashboardData?.TechInfo?.usedProjectCountArr?.length
              ? dashboardData?.TechInfo?.usedProjectCountArr?.map(
                (item: any) => item?.name
              )
              : []
          }
          series={
            dashboardData?.TechInfo?.usedProjectCountArr?.length
              ? dashboardData?.TechInfo?.usedProjectCountArr?.map(
                (item: any) => item?.usedInCount
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
      </div> */}
    </div>
  );
};

export default DashboardChartsTech;
