import PanelLayout from "layouts/panel";
import { EmployDashboard } from "components/admin";
import { AdminBreadcrumbs } from "components/core";

const index = () => {
  return (
    <PanelLayout title="Clients Dashboard - SY HR MS">
      <div className="px-4 pt-4">
        <AdminBreadcrumbs links={links} />
      </div>
      <EmployDashboard />
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Employees", link: "/admin/employees" }];
