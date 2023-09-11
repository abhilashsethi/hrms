import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  QuotationDashboardCard,
  QuotationDashboardCharts,
} from "components/admin/quotation";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Quotation } from "types";

const index = () => {
  const { data: dashboardData, isLoading } = useFetch<Quotation>(
    `quotations/dashboard/info`
  );
  return (
    <PanelLayout title="All Branches ">
      <>
        <section className="lg:px-8 px-4 py-4">
          <AdminBreadcrumbs links={links} />
          {isLoading ? (
            <DashboardSkeletonLoading />
          ) : (
            <>
              <QuotationDashboardCard data={dashboardData} />
              <QuotationDashboardCharts data={dashboardData} />
            </>
          )}
        </section>
      </>
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Quotation", link: "/admin/quotation" }];
