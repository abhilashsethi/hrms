import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import {
  ClientDashboardCard,
  ClientDashboardCharts,
} from "components/admin/clients";
import { useFetch } from "hooks";
import { Client } from "types";
import { BLOCK, CUSTOMER, HANDSHAKE, INACTIVE } from "assets/dashboard_Icons";

const index = () => {
  const { data: clientData, isLoading } = useFetch<Client>(
    `clients/dashboard/details`
  );

  console.log("clientData", clientData);
  return (
    <PanelLayout title="Clients Dashboard - SY HR MS">
      <div className="px-4 pt-4">
        <AdminBreadcrumbs links={links} />
      </div>
      <div className="flex gap-2 py-4">
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
const cards = [
  {
    id: 1,
    // icon: <People fontSize="large" className="!text-white text-5xl" />,
    icon: <img src={HANDSHAKE.src} className="w-16" alt="" />,
    count: "34",
    title: "Total Clients",
    color: "bg-gradient-to-br from-blue-600 to-cyan-400",
  },
  {
    id: 2,
    icon: <img src={CUSTOMER.src} className="w-16" alt="" />,

    count: "20",
    title: "Active Clients",
    color: "bg-gradient-to-br from-green-500 to-emerald-400",
  },
  {
    id: 3,
    // icon: (
    // 	<PlaylistAddCheckCircleRounded
    // 		fontSize="large"
    // 		className="!text-white text-5xl"
    // 	/>
    // ),
    icon: <img src={INACTIVE.src} className="w-12" alt="" />,
    count: "18",
    title: "Inactive Clients",
    color: "bg-gradient-to-br from-orange-500 to-yellow-400",
  },
  {
    id: 4,
    icon: <img src={BLOCK.src} className="w-12" alt="" />,
    count: "10",
    title: "Blocked Clients",
    color: "bg-gradient-to-br from-[#ff5874] to-[#ff8196]",
  },
];
