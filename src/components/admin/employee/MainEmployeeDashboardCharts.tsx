import { GuestBarChart, GuestDonutChart } from "components/analytics";

interface Props {
  data?: any;
}
const MainEmployeeDashboardCharts = ({ data }: Props) => {
  const getMonthName = (monthNumber: any) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Last Month Attendance Overview</p>
          <GuestBarChart
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]}
            data={[5, 5, 10, 10, 0, 12, 2, 6, 2, 0, 8, 9]}
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Leave Details</p>
          <GuestDonutChart
            labels={["Casual Leave", "Sick Leave"]}
            series={["70", "30"]}
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

export default MainEmployeeDashboardCharts;
