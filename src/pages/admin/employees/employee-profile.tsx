import { Home, Person2 } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import PanelLayout from "layouts/panel";
import React from "react";
import { CardHead, ProfileTabs } from "components/Profile";
import { AdminBreadcrumbs } from "components/core";

const EmployeeProfile = () => {
  return (
    <PanelLayout title="User Profile - SY HR MS">
      <section className="px-8 mx-auto p-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <CardHead />
        <ProfileTabs />
      </section>
    </PanelLayout>
  );
};

export default EmployeeProfile;
const links = [
  { id: 1, page: "All Employees", link: "/admin/employees" },
  {
    id: 2,
    page: "Employee Profile",
    link: "/admin/employees/employee-profile",
  },
];
