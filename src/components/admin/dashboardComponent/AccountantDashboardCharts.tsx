import { Tooltip } from "@mui/material";
import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import Link from "next/link";
import { Quotation } from "types";
interface Props {
  data?: any;
}
const AccountantDashboardCharts = ({ data }: Props) => {
  const { user } = useAuth();
  const { data: dashboardData } = useFetch<Quotation>(
    `dashboards/accountant/dashboard?userId=${user?.id}`
  );
  const cards = [
    {
      id: 1,
      color: "bg-gradient-to-r from-rose-100 to-teal-100",

      name: "Payal Sharma",
      count: data?.GuestInfo?.totalGuest || 0,
      link: "/admin",
    },
    {
      id: 2,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "Ajay Kumar",
      count: data?.GuestInfo?.blockedGuestCount || 0,
      link: "/admin",
    },
    {
      id: 3,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "Study In Russia",
      count: data?.GuestInfo?.guestCountByGender[0]?._count || 0,
      link: "/admin",
    },
    {
      id: 4,
      color: "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",

      name: "Political Party Web",
      count: data?.GuestInfo?.guestCountByGender[1]?._count || 0,
      link: "/admin",
    },
  ];
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            Month-Wise Paid Bills Overview
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
            data={[10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32]}
            type="bar"
            text=""
          />
        </div>

        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Quotations Overview</p>
          <GuestDonutChart
            labels={
              dashboardData?.quotationOverview?.length
                ? dashboardData?.quotationOverview?.map((item) => item?.status)
                : []
            }
            series={
              dashboardData?.quotationOverview?.length
                ? dashboardData?.quotationOverview?.map((item) => item?._count)
                : []
            }
            text=""
            type="donut"
            colors={["#3d5afe", "#9c27b0", "#eeff41"]}
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Bills Overview</p>
          <GuestDonutChart
            labels={
              dashboardData?.billOverview?.length
                ? dashboardData?.billOverview?.map((item) => item?.billType)
                : []
            }
            series={
              dashboardData?.billOverview?.length
                ? dashboardData?.billOverview?.map((item) => item?._count)
                : []
            }
            text=""
            type="donut"
            colors={["#3d5afe", "#9c27b0", "#eeff41"]}
          />
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Quotations</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            {cards?.map((item) => (
              <Link href={item?.link} key={item?.id}>
                <div
                  className={`h-full w-full bg-slate-200 py-4 lg:px-5 px-2 flex flex-col gap-2 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-300 ease-in-out`}
                >
                  <Tooltip title="Client Name">
                    <span className="flex w-full justify-center justify-items-center">
                      <PhotoViewer />
                    </span>
                  </Tooltip>
                  <span className="font-semibold text-center tracking-wide text-lg">
                    {item?.name}
                  </span>
                  <div className="grid lg:grid-cols-2 gap-4 text-sm text-center font-semibold">
                    <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                      <span>Start Date</span>
                      <span>15-02-2023</span>
                    </div>
                    <div className="flex flex-col gap-1 rounded-lg px-3 py-2 bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600 text-white justify-center w-full">
                      <span>End Date</span>
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

export default AccountantDashboardCharts;
