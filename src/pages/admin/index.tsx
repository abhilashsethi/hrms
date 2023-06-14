import { AdminDashboard, WelcomeUser } from "components/admin";
import { MainEmployeeDashboardCards, MainEmployeeDashboardCharts } from "components/admin/employee";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  return (
    <PanelLayout title="Dashboard - Admin Panel">
      <>
        {/* <WelcomeUser title="Welcome Superadmin!" />
        <AdminDashboard /> */}
        <WelcomeUser title="Welcome Developer Name!" />
        <section className="lg:px-8 px-4 py-4">
          <MainEmployeeDashboardCards data={""} />
          <MainEmployeeDashboardCharts data={""} />
        </section>
      </>
    </PanelLayout>
  );
};

export default AdminHome;
