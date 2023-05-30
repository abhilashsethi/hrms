import { AdminDashboard, WelcomeUser } from "components/admin";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  return (
    <PanelLayout title="Dashboard - Admin Panel">
      <>
        <WelcomeUser title="Welcome Superadmin!" />
        <AdminDashboard />
      </>
    </PanelLayout>
  );
};

export default AdminHome;
