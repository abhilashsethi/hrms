import {
  TENDERICONS1,
  TENDERICONS2,
  TENDERICONS3,
} from "assets/dashboard_Icons";
import { CLOSE } from "assets/home";
import { CommonBarChart, CommonDonutChart } from "components/analytics";
import { AdminBreadcrumbs, DashboardCard } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useMemo } from "react";
import { Tender } from "types";

const TenderDashboard = () => {
  const {
    data: tenderData,
    isLoading,
  } = useFetch<any>(
    `tenders/get/dashboard/info`
  );
  console.log(tenderData);
  const cards = useMemo(
    () => [
      {
        id: 1,
        count: tenderData?.tenderCount,
        title: "Total Tenders",
        bg: "from-blue-500 to-blue-300",
        img: TENDERICONS1.src,
      },
      {
        id: 2,
        count: tenderData?.totalOpenTenderCount,
        title: "Opened Tenders",
        bg: "from-green-500 to-green-300",
        img: TENDERICONS2.src,
      },
      {
        id: 4,
        count: tenderData?.totalClosedTenderCount,
        title: "Closed Tenders",
        bg: "from-green-500 to-green-300",
        img: CLOSE.src,
      },
      {
        id: 3,
        count: tenderData?.totalSubmittedTenderCount,
        title: "Submitted Tenders",
        bg: "from-yellow-500 to-yellow-300",
        img: TENDERICONS3.src,
      },
    ],
    []
  );
  return (
    <PanelLayout title="Tenders Dashboard - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="mt-4">
          <DashboardCard data={cards} />
        </div>
        <div className="grid grid-cols-2 gap-8 mt-6">
          <div className="p-6 rounded-md shadow-lg bg-white">
            <h1 className="font-bold">Tender Ratio</h1>
            <CommonDonutChart
              labels={tenderData?.allTenderCountStatusWise?.length ?
                tenderData?.allTenderCountStatusWise?.map((item: any) => item?.status)
                : []}
              text="Tender Ratio"
              series={tenderData?.allTenderCountStatusWise?.length ?
                tenderData?.allTenderCountStatusWise?.map((item: any) => item?._count)
                : []}
              type="pie"
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
          <div className="p-6 rounded-md shadow-lg bg-white">
            <h1 className="font-bold">Recent month status</h1>
            <CommonBarChart
              labels={tenderData?.allTenderCountMonthWiseOfCurrentYear?.length ?
                tenderData?.allTenderCountMonthWiseOfCurrentYear?.map((item: any) => item?.monthAbbreviation)
                : null}
              data={tenderData?.allTenderCountMonthWiseOfCurrentYear?.length ?
                tenderData?.allTenderCountMonthWiseOfCurrentYear?.map((item: any) => item?.count)
                : null
              }
              type="bar"
              text=""
            />
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default TenderDashboard;

const links = [{ id: 1, page: "Tenders", link: "/admin/tenders" }];
