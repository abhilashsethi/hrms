import { BranchDashboardCards, BranchDashboardCharts } from "components/admin/branch";
import { DashboardCards, DashboardCharts } from "components/admin/department";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const index = () => {
  const { data: departmentDashboard, isLoading } = useFetch<any>(
    `branch/dashboard/details`
  );
  return (
    <PanelLayout title="All Branches - Admin Panel">
      <>
        <section className="lg:px-8 px-4 py-4">
          <AdminBreadcrumbs links={links} />
          {isLoading && <Loader />}
          <BranchDashboardCards data={departmentDashboard} />
          <BranchDashboardCharts data={departmentDashboard} />
        </section>
      </>
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Departments", link: "/admin/department" }];
