import { Home } from "@mui/icons-material";
import { Breadcrumbs } from "@mui/material";
import { EmployDashboard, WelcomeUser } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
import React from "react";

const Employees = () => {
  return (
    <PanelLayout title="Employees Dashboard - Admin Panel">
      <section className="bg-slate-100">
        <WelcomeUser title="Welcome Superadmin!" />
        <AdminBreadcrumbs />
        <EmployDashboard />
      </section>
    </PanelLayout>
  );
};

export default Employees;
