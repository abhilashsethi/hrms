import { AssetsDashboardCard, AssetsDashboardCharts } from "components/admin/assets";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const index = () => {
     const { data: branchDashboard, isLoading } = useFetch<any>(
          `branches/dashboardInfo/data`
     );
     return (
          <PanelLayout title="All Branches - Admin Panel">
               <>
                    <section className="lg:px-8 px-4 py-4">
                         <AdminBreadcrumbs links={links} />
                         {isLoading && <Loader />}
                         <AssetsDashboardCard data={branchDashboard} />
                         <AssetsDashboardCharts data={branchDashboard} />
                    </section>
               </>
          </PanelLayout>
     );
};

export default index;
const links = [{ id: 1, page: "Assets", link: "/admin/assets" }];
