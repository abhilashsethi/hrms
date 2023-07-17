import { GuestBarChart, GuestDonutChart } from "components/analytics";
interface Props {
  data?: any;
}
const SalesDashboardCharts = ({ data }: Props) => {
  const getMonthName = (monthNumber: any) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Attendance Overview
          </p>
          <GuestBarChart
            labels={[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ]}
            data={[15, 10, 11, 10, 9, 12, 12, 26, 12, 10, 18, 19]}
            type="bar"
            text=""
          />
        </div>

        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Meetings Overview</p>
          <GuestDonutChart
            labels={["PENDING", "COMPLETED"]}
            series={[80, 20]}
            text=""
            type="donut"
            colors={["#005d32", "#BD33B5", "#E60023"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesDashboardCharts;
