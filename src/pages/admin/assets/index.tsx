import {
  AssetsDashboardCard,
  AssetsDashboardCharts,
  DashboardSkeletonLoading,
} from "components/admin/assets";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { ASSET_DASHBOARD, BRANCH_DASHBOARD } from "types";

const index = () => {
  const { data: branchDashboard, isLoading } = useFetch<BRANCH_DASHBOARD>(
    `branches/dashboardInfo/data`
  );
  // console.log(branchDashboard);

  const { data: dashboardData, isLoading: dashboardDataLoading } =
    useFetch<ASSET_DASHBOARD>(`assets/dashboard/details`);
  return (
    <PanelLayout title="All Branches ">
      <>
        <section className="lg:px-8 px-4 py-4">
          <AdminBreadcrumbs links={links} />
          {isLoading ? (
            <DashboardSkeletonLoading />
          ) : (
            <>
              <AssetsDashboardCard
                data={dashboardData}
                branch={branchDashboard}
              />
              <AssetsDashboardCharts data={dashboardData} />
            </>
          )}
        </section>
      </>
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Assets", link: "/admin/assets" }];
