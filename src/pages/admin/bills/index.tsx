import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  BillsDashboardCard,
  BillsDashboardCharts,
} from "components/admin/bills";
import { AdminBreadcrumbs } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Bills, BillsDashboard } from "types";

const index = () => {
  const { user } = useAuth();
  const { data: billDashboard, isLoading } = useFetch<Bills>(
    `bills/dashboard/info${
      user?.role?.name === "ACCOUNTANT"
        ? `?branchId=${user?.employeeOfBranchId}`
        : ``
    }`
  );
  console.log(billDashboard);
  return (
    <PanelLayout title="All Bills">
      <>
        <section className="lg:px-8 px-4 py-4">
          <AdminBreadcrumbs links={links} />
          {isLoading ? (
            <DashboardSkeletonLoading />
          ) : (
            <>
              <BillsDashboardCard data={billDashboard} />
              <BillsDashboardCharts data={billDashboard} />
            </>
          )}
        </section>
      </>
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Bills", link: "/admin/bills" }];
