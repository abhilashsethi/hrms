import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { ClientDetails } from "components/admin/clients";
const ClientProfile = () => {
  return (
    <PanelLayout title="Client Profile - SY HR MS">
      <section className="lg:px-8 px-4 py-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <ClientDetails />
      </section>
    </PanelLayout>
  );
};

export default ClientProfile;
const links = [
  { id: 1, page: "Clients", link: "/admin/clients" },
  {
    id: 2,
    page: "All Client",
    link: "/admin/clients/all-clients",
  },
];
