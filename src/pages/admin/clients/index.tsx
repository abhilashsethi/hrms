import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { ClientDashboard } from "components/admin/clients";

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
const links = [{ id: 1, page: "Clients", link: "/admin/clients" }];
