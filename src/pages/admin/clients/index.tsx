import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs, Loader } from "components/core";
import {
  ClientDashboardCard,
  ClientDashboardCharts,
} from "components/admin/clients";
import { useFetch } from "hooks";
import { Client } from "types";

const index = () => {
  const { data: clientData, isLoading } = useFetch<Client>(
    `clients/dashboard/details`
  );

  return (
    <PanelLayout title="Clients Dashboard - SY HR MS">
      <div className="px-4 pt-4">
        <AdminBreadcrumbs links={links} />
      </div>
      <div className="flex gap-2 py-4">
        {isLoading && <Loader />}
        <div className="w-full px-4 ">
          <ClientDashboardCard cards={clientData} />
          <ClientDashboardCharts cards={clientData} />
        </div>
      </div>
    </PanelLayout>
  );
};

export default index;
const links = [{ id: 1, page: "Clients", link: "/admin/clients" }];
