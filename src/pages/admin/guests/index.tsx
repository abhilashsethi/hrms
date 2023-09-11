import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  DashboardCardsGuest,
  DashboardChartsGuest,
} from "components/admin/guest";
import { AdminBreadcrumbs, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const GuestsDashboard = () => {
  const { data: guestData, isLoading } = useFetch<any>(
    `guests/dashboard/details`
  );
  return (
    <PanelLayout title="Guests Dashboard ">
      <section className="lg:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        {isLoading ? (
          <DashboardSkeletonLoading />
        ) : (
          <>
            <DashboardCardsGuest data={guestData} />
            <DashboardChartsGuest data={guestData} />
          </>
        )}
      </section>
    </PanelLayout>
  );
};

export default GuestsDashboard;
const links = [{ id: 1, page: "Guests", link: "/admin/guests" }];
