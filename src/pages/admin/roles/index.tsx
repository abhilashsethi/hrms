import { DashboardSkeletonLoading } from "components/admin/assets";
import { DashboardCards, DashboardCharts } from "components/admin/roles";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
const Roles = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const { data: roleDataCard } = useFetch<any>(
    `roles?page=${pageNumber}&limit=3`
  );
  const { data: roleDashboard, isLoading } = useFetch<any>(
    `roles/dashboard/details`
  );

  return (
    <PanelLayout title="Roles - Admin Panel">
      <section className="lg:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        {isLoading ? <DashboardSkeletonLoading />
          : (
            <>
              <DashboardCards dashboardData={roleDashboard} roleCard={roleDataCard} />
              <DashboardCharts
                dashboardData={roleDashboard}
                roleCard={roleDataCard}
              />
            </>)}
      </section>
    </PanelLayout>
  );
};
export default Roles;
const links = [{ id: 1, page: "Roles", link: "/admin/roles" }];
