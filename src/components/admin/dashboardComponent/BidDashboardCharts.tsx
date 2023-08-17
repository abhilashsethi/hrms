import { TENDERCARD } from "assets/home";
import { GuestBarChart, GuestDonutChart } from "components/analytics";

import { useAuth, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { Tender } from "types";
interface Props {
  data?: any;
}
const BidDashboardCharts = ({ data }: Props) => {
  const { user } = useAuth();
  const { data: tenderData } = useFetch<Tender[]>(
    `tenders/all-tender/by-memberId?userId=${user?.id}&orderBy=createdAt:asc`
  );
  const { data: dashboardData } = useFetch<Tender>(
    `dashboards/bid-manager/dashboard?userId=${user?.id}`
  );
  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 content-between gap-6">
        <div className="px-2 py-4 w-full bg-white flex flex-col justify-center gap-2 !border-gray-500 rounded-xl !shadow-xl">
          <p className="font-bold text-lg text-center">
            This Year Attendance Overview
          </p>
          <GuestBarChart
            labels={
              dashboardData?.monthWiseTenderCount?.length
                ? dashboardData?.monthWiseTenderCount?.map(
                    (item) => item?.month
                  )
                : []
            }
            data={
              dashboardData?.monthWiseTenderCount?.length
                ? dashboardData?.monthWiseTenderCount?.map(
                    (item) => item?.tenderCount
                  )
                : []
            }
            type="bar"
            text=""
          />
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            This Year Leave Details
          </p>
          {/* {data?.allLeaveCount?.length ? ( */}
          <GuestDonutChart
            labels={
              dashboardData?.thisYearLeaveDetails?.length
                ? dashboardData?.thisYearLeaveDetails?.map(
                    (item) => item?.status
                  )
                : []
            }
            series={
              dashboardData?.thisYearLeaveDetails?.length
                ? dashboardData?.thisYearLeaveDetails?.map(
                    (item) => item?._count
                  )
                : []
            }
            text=""
            type="pie"
            colors={["#cddc39", "#a855f7", "#03a9f4", "#ef4444"]}
          />
          {/* ) : (
            <NoDatas title={"No Leave Taken"} />
          )} */}
        </div>
        <div className="w-full px-2 py-4 flex flex-col bg-white justify-center !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">
            Tender status Overview
          </p>
          <GuestDonutChart
            labels={
              dashboardData?.tenderCountStatusWise?.length
                ? dashboardData?.tenderCountStatusWise?.map(
                    (item) => item?.status
                  )
                : []
            }
            series={
              dashboardData?.tenderCountStatusWise?.length
                ? dashboardData?.tenderCountStatusWise?.map(
                    (item) => item?.count
                  )
                : []
            }
            text=""
            type="donut"
            colors={["#25d366", "#E60023", "#a855f7"]}
          />
        </div>
        <div className="w-full px-2 py-4 bg-white !border-gray-500 rounded-xl !shadow-xl">
          <p className="text-lg font-bold text-center">Recent Tenders</p>
          <div className="grid lg:grid-cols-2 grid-cols-1 lg:px-8 px-2 py-4 gap-4">
            {tenderData?.length &&
              tenderData
                ?.slice(0, 4)

                ?.map((item: any) => (
                  <Link
                    href={`/admin/tenders/tender-details?id=${item?.tenders?._id?.$oid}`}
                    key={item?.tenders?.id}
                  >
                    <div className="w-full h-full rounded-lg overflow-hidden shadow-sleek">
                      <div
                        className={`h-28 w-full flex justify-center items-center relative bg-[#76DCC7]`}
                      >
                        <div
                          className={`px-4 py-0.5 rounded-r-full absolute top-[10px] left-0 ${
                            item?.tenders?.status === "Open"
                              ? `bg-yellow-400`
                              : item?.tenders?.status === "Disqualified"
                              ? `bg-red-500`
                              : item?.tenders?.status === "L1"
                              ? `bg-blue-500`
                              : item?.tenders?.status === "Cancelled"
                              ? `bg-[#f97316]`
                              : item?.tenders?.status === "FinancialEvaluation"
                              ? `bg-[#8b5cf6]`
                              : item?.tenders?.status === "TechnicalEvaluation"
                              ? `bg-[#e879f9]`
                              : item?.tenders?.status === "BidAwarded"
                              ? `bg-[#9333ea]`
                              : `bg-green-500`
                          }`}
                        >
                          <span className="text-xs font-semibold text-white tracking-wide">
                            {item?.tenders?.status}
                          </span>
                        </div>

                        <img
                          className="h-12 object-contain "
                          src={TENDERCARD.src}
                          alt="icon"
                        />
                      </div>
                      <div className="bg-white p-4">
                        <h1 className="font-semibold text-sm">
                          {item?.tenders?.title}
                        </h1>
                        <h1 className="mt-2 text-sm font-semibold">
                          Tender No :
                        </h1>
                        <span className="text-sm text-gray-600">
                          {item?.tenders?.tenderNo}
                        </span>
                        <h1 className="mt-2 text-sm font-semibold">
                          Category :
                        </h1>
                        <span className="text-sm text-gray-600">
                          {item?.tenders?.category}
                        </span>
                        <h1 className="mt-2 text-sm font-semibold">
                          Submission Date :
                        </h1>
                        <span className="text-sm text-gray-600">
                          {item?.tenders?.submissionDate ? (
                            moment(item?.tenders?.submissionDate).format("ll")
                          ) : (
                            <p className="text-gray-500 font-medium">
                              Not Specified
                            </p>
                          )}
                        </span>
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

export default BidDashboardCharts;
