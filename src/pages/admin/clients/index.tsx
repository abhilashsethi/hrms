import PanelLayout from "layouts/panel";
import { ClientDashboard } from "components/admin";
import { AdminBreadcrumbs } from "components/core";

const index = () => {
  return (
    <PanelLayout title="Clients Dashboard - SY HR MS">
      <div className="px-4 pt-4">
        <AdminBreadcrumbs links={links} />
      </div>
      <ClientDashboard />
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Employees", link: "/admin/employees" }];
