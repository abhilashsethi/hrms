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
const MainHrDashboardCharts = ({ data }: Props) => {
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
          <p className="font-bold text-lg text-center">Last Year Employee Overview</p>
          <GuestBarChart
            labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
            data={[15, 10, 11, 10, 9, 12, 12, 26, 12, 10, 18, 19]}
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Last Month Leave Details</p>
          <GuestDonutChart
            labels={data?.leaveCounts?.length ? data?.leaveCounts?.map((item: any) => item?.type) : []}
            series={data?.leaveCounts?.length ? data?.leaveCounts?.map((item: any) => item?._count?.type) : []}
            text=""
            type="pie"
            colors={[
              "#106EAD", "#C33C5E", "#25d366", "#BD33B5", "#E60023", "#005d32"
            ]}
          />
        </div>
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">Last Year Attendance Overview</p>
          <AreaChart text="Repairs Report" type="area" />
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Guests</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">

            {cards?.map((item) => (
              <Link href={item?.link} key={item?.id}>
                <div
                  className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
                >
                  <Tooltip title="Project Manager">
                    <span className="flex w-full justify-center justify-items-center">
                      <PhotoViewer />
                    </span>
                  </Tooltip>
                  <span className="font-semibold text-center tracking-wide text-lg">
                    {item?.name}
                  </span>
                  <span className="font-semibold text-center tracking-wide text-sm">
                    Manager
                  </span>
                  <div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
                    <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                      <span>Valid From</span>
                      <span>15-02-2023</span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                      <span>Valid Till</span>
                      <span>18-03-2023</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHrDashboardCharts;
