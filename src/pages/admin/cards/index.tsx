import {
  AssignmentTurnedIn,
  ContactPhone,
  DevicesOther,
  PendingActions,
} from "@mui/icons-material";
import {
  CARDICON1,
  CARDICON2,
  CARDICON3,
  CARDICON4,
} from "assets/dashboard_Icons";
import { BranchBarChart } from "components/analytics";
import CardStatus from "components/analytics/CardStatus";
import { AdminBreadcrumbs, DashboardCard } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Card } from "types";

const Cards = () => {
  const { data: cardData, mutate } = useFetch<Card[]>(`cards`);
  const { data: cardDetails } = useFetch<{
    cards?: {
      scannedCards?: number | undefined;
      blockedCards?: number | undefined;
      cardsAssignedToEmployee?: number | undefined;
      cardsAssignedToGuest?: number | undefined;
    };
  }>(`cards/dashboard/details`);
  const cards = [
    {
      id: 1,
      icon: <ContactPhone className="text-theme" />,
      count: cardDetails?.cards?.cardsAssignedToGuest
        ? cardDetails?.cards?.cardsAssignedToGuest
        : 0,
      title: "Assigned to Guests",
      img: CARDICON1.src,
      bg: "from-blue-500 to-blue-300",
      link: "/admin/cards/scanned?isGuest=true",
    },
    {
      id: 2,
      icon: <PendingActions className="text-theme" />,
      count: cardDetails?.cards?.cardsAssignedToEmployee
        ? cardDetails?.cards?.cardsAssignedToEmployee
        : 0,
      title: "Assigned to Employees",
      bg: "from-yellow-500 to-yellow-300",
      img: CARDICON2.src,
      link: "/admin/cards/scanned?isEmployee=true",
    },
    {
      id: 3,
      icon: <AssignmentTurnedIn className="text-theme" />,
      count: cardDetails?.cards?.blockedCards
        ? cardDetails?.cards?.blockedCards
        : 0,
      title: "Blocked Cards",
      bg: "from-emerald-500 to-emerald-300",
      img: CARDICON3.src,
      link: "/admin/cards/scanned",
    },
    {
      id: 4,
      icon: <DevicesOther className="text-theme" />,
      count: cardDetails?.cards?.scannedCards
        ? cardDetails?.cards?.scannedCards
        : 0,
      title: "Scanned Cards",
      bg: "from-purple-500 to-purple-300",
      img: CARDICON4.src,
      link: "/admin/cards/scanned",
    },
  ];

  return (
    <PanelLayout title="Cards Dashboard">
      <section className="lg:px-8 px-2 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="mt-4">
          <div className="flex gap-2 py-4">
            <DashboardCard data={cards} />
          </div>
        </div>
        <div className="grid md:grid-cols-12 content-between gap-6 !mb-6">
          <div className="col-span-12 pt-9 pb-4 w-full bg-white gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
            <p className="text-lg font-bold text-center">
              Scanned Users Assigned Overview
            </p>
            <BranchBarChart
              labels={
                cardDetails?.cards
                  ? ["Assigned To Employee", "Assigned To Guest"]
                  : []
              }
              data={
                cardDetails?.cards
                  ? [
                      cardDetails?.cards?.cardsAssignedToEmployee,
                      cardDetails?.cards?.cardsAssignedToGuest,
                    ]
                  : []
              }
              type="bar"
              text=""
            />
          </div>
          <div className="col-span-12 pt-9 pb-4 w-full bg-white flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
            <p className="text-lg font-bold text-center">Scanned Card Status</p>
            <CardStatus
              labels={["Blocked", "Un-Blocked"]}
              text=""
              type="donut"
              series={[
                cardData?.filter((item) => item?.isBlocked)?.length || 0,
                cardData?.filter((item) => item?.isBlocked === false)?.length ||
                  0,
              ]}
            />
          </div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Cards;

const links = [{ id: 1, page: "Cards", link: "/admin/cards" }];

//
