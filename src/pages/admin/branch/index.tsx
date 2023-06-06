import { BranchDashboardCards, BranchDashboardCharts } from "components/admin/branch";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const index = () => {
  const { data: branchDashboard, isLoading } = useFetch<any>(
    `branches/dashboardInfo/data`
  );
  console.log(branchDashboard);
  return (
    <PanelLayout title="All Branches - Admin Panel">
      <>
        <section className="lg:px-8 px-4 py-4">
          <AdminBreadcrumbs links={links} />
          {isLoading && <Loader />}
          <BranchDashboardCards data={branchDashboard} />
          <BranchDashboardCharts data={branchDashboard} />
        </section>
      </>
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Branch", link: "/admin/branch" }];
