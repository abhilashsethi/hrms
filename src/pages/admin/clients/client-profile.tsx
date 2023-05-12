import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { ClientDetails } from "components/admin/clients";
const ClientProfile = () => {
  return (
    <PanelLayout title="User Profile - SY HR MS">
      <section className="px-8 mx-auto p-4">
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
    page: "Client Profile",
    link: "/admin/clients/client-profile",
  },
];

// const attendance = [
//   { title: "PRESENT", date: "2023-04-03" },
//   { title: "ABSENT", date: "2023-04-04" },
//   { title: "PRESENT", date: "2023-04-05" },
// ];
