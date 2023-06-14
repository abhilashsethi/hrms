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
        <MainEmployeeDashboardCards data={""} />
        <MainEmployeeDashboardCharts data={""} />
      </>
    </PanelLayout>
  );
};

export default AdminHome;
