import TicketDetails from "components/admin/clients/TicketDetails";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import router from "next/router";
import { TicketsConversations } from "types";

const ViewTicketDetails = () => {
  const { data: ticketsData, mutate, isLoading } = useFetch<TicketsConversations[]>(
    `ticket-conversations/${router?.query?.id}`
  );
  console.log("ticketsData",ticketsData);
  return (
    <>
      <PanelLayout title="Ticket Details - SY HR MS">
        <section className="px-8">
          <div className="pb-4">
            <AdminBreadcrumbs links={links} />
            <TicketDetails />
          </div>
        </section>
      </PanelLayout>
    </>
  );
};

export default ViewTicketDetails;

const roles = [
  { id: 1, value: "CEO" },
  { id: 2, value: "Manager" },
  { id: 3, value: "Director" },
  { id: 4, value: "Founder" },
];

const links = [
  { id: 1, page: "Clients", link: "/admin/clients" },
  // {
  // 	id: 2,
  // 	page: "Client Profile",
  // 	link: "/admin/clients/client-profile",
  // },
  {
    id: 3,
    page: "View Ticket Details",
    link: "/admin/clients/view-ticket-details",
  },
];
