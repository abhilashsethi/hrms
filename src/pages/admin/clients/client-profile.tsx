import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { ClientDetails } from "components/admin/clients";
import { useAuth } from "hooks";
const ClientProfile = () => {
  const { user } = useAuth();
  const links = [
    {
      id: 1,
      page: "Profile",
      link: `/admin/clients/client-profile?id=${user?.id}`,
    },
  ];

  return (
    <PanelLayout title="Client Profile">
      <section className="lg:px-8 md:px-4 px-2 py-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <ClientDetails />
      </section>
    </PanelLayout>
  );
};

export default ClientProfile;
