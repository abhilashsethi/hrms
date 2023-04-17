import { AdminDashboard, WelcomeUser } from "components/admin";
import PanelLayout from "layouts/panel";
import React from "react";

const AdminHome = () => {
  return (
    <PanelLayout title="Home - Admin Panel">
      <section className=" bg-slate-100">
        <WelcomeUser title="Welcome Superadmin!" />
        <AdminDashboard />
      </section>
    </PanelLayout>
  );
};

export default AdminHome;
