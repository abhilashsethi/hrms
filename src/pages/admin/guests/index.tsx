import {
  DashboardCardsGuest,
  DashboardChartsGuest,
} from "components/admin/guest";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const GuestsDashboard = () => {
  const { data: guestData, isLoading } = useFetch<any>(`guests/dashboard`);
  console.log(guestData);
  return (
    <PanelLayout title="Guests Dashboard - Admin Panel">
      <section className="lg:px-8 px-4 py-4">
        <AdminBreadcrumbs links={links} />
        <DashboardCardsGuest data={guestData} />
        <DashboardChartsGuest data={guestData} />
      </section>
    </PanelLayout>
  );
};

export default GuestsDashboard;
const links = [{ id: 1, page: "Departments", link: "/admin/department" }];
