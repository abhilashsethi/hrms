import { EmployDashboard, WelcomeUser } from "components/admin";
import PanelLayout from "layouts/panel";
import React from "react";

const Employees = () => {
  return (
    <PanelLayout title="Employees Dashboard - Admin Panel">
      <section className="bg-slate-100">
        <WelcomeUser title="Welcome Superadmin!" />
        <EmployDashboard />
      </section>
    </PanelLayout>
  );
};

export default Employees;
