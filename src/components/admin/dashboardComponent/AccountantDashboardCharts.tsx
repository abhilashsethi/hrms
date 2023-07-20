import { Business, Email, Person } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { QUOTATION } from "assets/home";
import { GuestBarChart, GuestDonutChart } from "components/analytics";
import { PhotoViewer } from "components/core";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
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
  const { data: quotation } = useFetch<Quotation[]>(`quotations`);
  console.log(quotation);
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            Month-Wise Paid Bills Overview
          </p>
          <GuestBarChart
            labels={
              dashboardData?.monthWiseBillOverview?.length
                ? dashboardData?.monthWiseBillOverview?.map(
                    (item) => item?.month
                  )
                : []
            }
            data={
              dashboardData?.monthWiseBillOverview?.length
                ? dashboardData?.monthWiseBillOverview?.map(
                    (item) => item?.count
                  )
                : []
            }
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
            {quotation
              ?.slice(0, 4)
              ?.sort(
                (a: any, b: any) =>
                  (new Date(b?.createdAt) as any) -
                  (new Date(a?.createdAt) as any)
              )
              ?.map((item) => (
                <Link
                  href={`/admin/quotation/quotation-details?id=${item?.id}`}
                  key={item?.id}
                >
                  <div className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
                    <div className="relative">
                      <p
                        className={`absolute top-2 z-50 rounded-r-xl 
              ${
                item?.status === "Rejected"
                  ? "bg-red-500"
                  : item?.status === "Accepted"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              } text-white text-sm px-2 pr-3 py-1 font-semibold`}
                      >
                        {item?.status}
                      </p>

                      <div className="flex justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 py-3 rounded-t-lg w-full border">
                        <img src={QUOTATION.src} alt="" className="w-24" />
                      </div>
                      <div className="px-4 pb-3 bg-gradient-to-r from-rose-100 to-teal-100">
                        <div className="flex gap-2 py-2 md:py-0 justify-start">
                          <p className="text-sm md:text-sm text-gray-700">
                            <span>
                              <Person className=" text-gray-500 mr-1" />
                            </span>
                            {item?.clientName}
                          </p>
                        </div>
                        <div className="flex gap-2 py-2 md:py-0 justify-start">
                          <p className="text-sm md:text-sm text-gray-700">
                            <span>
                              <Email
                                className=" text-gray-500 mr-1"
                                fontSize="small"
                              />
                            </span>
                            {item?.clientEmail}
                          </p>
                        </div>

                        <div className="mt-3 flex flex-col justify-start">
                          <div className="grid items-center py-2 md:py-0">
                            <p className="font-semibold text-base text-blue-600">
                              Quotation Title :
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                              {item?.quotationTitle}
                            </p>
                          </div>

                          <div className=" grid items-center py-2 md:py-0">
                            <p className="font-semibold text-base text-blue-600">
                              Quotation Number :
                            </p>
                            <p className="text-sm md:text-base text-gray-700">
                              {item?.quotationNumber}
                            </p>
                          </div>
                        </div>
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
