import { GuestBarChart, GuestDonutChart } from "components/analytics";
import {
  FactCheck,
  AccountTree,
  QuestionAnswer,
  WebAsset,
} from "@mui/icons-material";
import Link from "next/link";
import { PhotoViewer } from "components/core";
import { Tooltip } from "@mui/material";
import AreaChart from "./AreaChart";
interface Props {
  data?: any;
}
const MainManagerDashboardCharts = ({ data }: Props) => {
  const getMonthName = (monthNumber: any) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("default", { month: "long" });
  };
  const cards = [
    {
      id: 1,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "John Doe",
      count: data?.GuestInfo?.totalGuest || 0,
      link: "/admin",
    },
    {
      id: 2,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "Prasad Ghos",
      count: data?.GuestInfo?.blockedGuestCount || 0,
      link: "/admin",
    },
    {
      id: 3,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "Subala Mohanta",
      count: data?.GuestInfo?.guestCountByGender[0]?._count || 0,
      link: "/admin",
    },
    {
      id: 4,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "Joti Panda",
      count: data?.GuestInfo?.guestCountByGender[1]?._count || 0,
      link: "/admin",
    },
  ];
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Last Year Leaves Overview</p>
          <GuestBarChart
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
            data={[15, 10, 11, 10, 9, 12, 12, 26, 12, 10, 18, 19]}
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Assets Overview</p>
          <GuestDonutChart
            labels={["Assigned", "Not Assigned"]}
            series={[70, 30]}
            text=""
            type="pie"
            colors={["#25d366", "#E60023", "#BD33B5"]}
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Project Overview</p>
          <GuestDonutChart
            labels={["PENDING", "COMPLETED"]}
            series={[80, 20]}
            text=""
            type="donut"
            colors={[
              "#005d32",
              "#BD33B5",
              "#E60023",
            ]}
          />
        </div>
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Role Wise Employee Strength</p>
          <GuestBarChart
            labels={["DEVELOPER", "CEO", "HR", "TESTER", "DIRECTOR"]}
            data={[15, 9, 11, 10, 5]}
            type="bar"
            text=""
          />
        </div>

      </div>
    </div>
  );
};

export default MainManagerDashboardCharts;
