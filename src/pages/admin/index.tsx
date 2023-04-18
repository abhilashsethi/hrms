import { AdminDashboard, WelcomeUser } from "components/admin";
import PanelLayout from "layouts/panel";
import React from "react";

const AdminHome = () => {
  return (
    <PanelLayout title="Home - Admin Panel">
      <>
        <WelcomeUser title="Welcome Superadmin!" />
        <AdminDashboard />
      </>
    </PanelLayout>
  );
};

export default AdminHome;
