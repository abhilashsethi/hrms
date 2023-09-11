import TicketDetails from "components/admin/clients/TicketDetails";
import { AdminBreadcrumbs } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { Tickets } from "types";

const ViewTicketDetails = () => {
  const { user } = useAuth();
  const router = useRouter();
  const {
    data: ticketsData,
    mutate,
    isLoading,
  } = useFetch<Tickets>(`tickets/${router?.query?.id}`);
  // console.log(ticketsData);
  const links =
    user?.role?.name === "CEO" || user?.role?.name === "DIRECTOR"
      ? [
          { id: 1, page: "Clients", link: "/admin/clients" },
          {
            id: 2,
            page: "All Client",
            link: "/admin/clients/all-clients",
          },
          {
            id: 3,
            page: "Client Profile",
            link: `/admin/clients/client-profile?id=${ticketsData?.clientId}`,
          },
        ]
      : [];
  return (
    <>
      <PanelLayout title="Ticket Details ">
        <section className="lg:px-8 px-2 py-4">
          <div className="pb-4">
            <AdminBreadcrumbs links={links} />
            <TicketDetails
              ticketsData={ticketsData}
              mutateTicket={mutate}
              ticketLoading={isLoading}
            />
          </div>
        </section>
      </PanelLayout>
    </>
  );
};

export default ViewTicketDetails;
