import { AccountTree, BugReport, Handyman, Receipt } from "@mui/icons-material";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import {
  CountryNameFlag,
  ClientProfileImage,
  HeadText,
  Loader,
  PhotoViewer,
} from "components/core";
import { ChangeProfile, UpdateClient } from "components/dialogues";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { Client } from "types";
import ClientMeetings from "./ClientMeetings";
import ClientProjects from "./ClientProjects";
import { ViewTicketsDrawer } from "components/drawer";

const ClientDetails = () => {
  const router = useRouter();
  const [isDialogue, setIsDialogue] = useState(false);
  const [tickets, setTickets] = useState(false);
  const [viewTickets, setViewTickets] = useState<any>(null);
  const {
    data: clientData,
    mutate,
    isLoading,
  } = useFetch<Client>(`clients/${router?.query?.id}`);
  const { data: ticketsData } = useFetch<any>(
    `tickets?${router?.query?.id ? `&clientId=${router?.query?.id}` : ""}`
  );
  const { data: projectData } = useFetch<any>(
    `projects?${router?.query?.id ? `&clientId=${router?.query?.id}` : ""}`
  );

  const basicDetails = [
    {
      id: 1,
      title: "Name",
      value: `${clientData?.name ? clientData?.name : "---"}`,
    },
    {
      id: 2,
      title: "Email",
      value: `${clientData?.email ? clientData?.email : "---"}`,
    },

    {
      id: 5,
      title: "Phone",
      value: `${clientData?.phone ? clientData?.phone : "---"}`,
    },

    {
      id: 8,
      title: "Gender",
      value: `${clientData?.gender ? clientData?.gender : "---"}`,
    },
    {
      id: 8,
      title: "Country",
      value: `${clientData?.country ? clientData?.country : "---"}`,
    },
  ];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section>
      <UpdateClient
        mutate={mutate}
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
      <ViewTicketsDrawer
        open={tickets}
        onClose={() => setTickets(false)}
        setViewTickets={setViewTickets}
        ticket={ticketsData}
      />
      <section className="">
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <div className="w-full rounded-lg bg-white shadow-xl p-4">
              <div className="w-full bg-blue-100/50 rounded-lg p-8">
                <div className="grid lg:grid-cols-2 gap-4">
                  <div className="tracking-wide w-full h-full">
                    <p className="font-semibold tracking-wide">
                      {clientData?.name || "---"}
                    </p>
                    <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                      <RenderIconRow
                        value={clientData?.email || "---"}
                        isEmail
                      />
                    </p>
                    <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                      <RenderIconRow
                        value={clientData?.phone || "---"}
                        isPhone
                      />
                    </p>
                    <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                      <CountryNameFlag
                        countryName={clientData?.country || "---"}
                      />
                    </p>
                  </div>
                  <div className="px-4 grid justify-items-end ">
                    <span>
                      <ClientProfileImage values={clientData} mutate={mutate} />
                    </span>
                  </div>
                </div>
                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4 items-center pt-4">
                  <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#bbcbff] ">
                    <Handyman
                      fontSize="large"
                      className="bg-white p-1 rounded-lg mb-3 text-theme"
                    />
                    <p className={`text-sm text-gray-800 font-semibold`}>
                      Total Projects
                    </p>
                    <p className="text-sm font-medium">
                      {" "}
                      {clientData?._count?.projects}
                    </p>
                  </div>
                  <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#b9e9fd]">
                    <AccountTree
                      fontSize="large"
                      className="bg-white p-1 rounded-lg mb-3 text-theme"
                    />
                    <p className={`text-sm text-gray-800 font-semibold`}>
                      Ongoing Projects
                    </p>
                    <p className="text-sm font-medium">12</p>
                  </div>
                  <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#f6c8ff]">
                    <Receipt
                      fontSize="large"
                      className="bg-white p-1 rounded-lg mb-3 text-theme"
                    />
                    <p className={`text-sm text-gray-800 font-semibold`}>
                      Total Tickets
                    </p>
                    <p className="text-sm font-medium">
                      {clientData?._count.tickets}
                    </p>
                  </div>
                  <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center py-3 rounded-md shadow-lg bg-[#feb76f]">
                    <BugReport
                      fontSize="large"
                      className="bg-white p-1 rounded-lg mb-3 text-theme"
                    />
                    <p className={`text-sm text-gray-800 font-semibold`}>
                      Active Bugs
                    </p>
                    <p className="text-sm font-medium">8</p>
                  </div>
                </div>
              </div>
              {/* --------------------Basic Details-------------------- */}
              <section className="py-4 px-8">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Basic Details" />
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setIsDialogue(true)}>
                      <ICONS.Edit className="h-5 w-5" />
                    </IconButton>
                  </Tooltip>
                </div>
                {basicDetails?.map((item) => (
                  <div
                    key={item?.id}
                    className="flex gap-2 items-center font-medium py-1.5"
                  >
                    <div className="w-[30%]">
                      <p className="text-sm text-gray-600">{item?.title} :</p>
                    </div>
                    <div className="w-2/3">
                      <p className="text-sm">{item?.value}</p>
                    </div>
                  </div>
                ))}
              </section>
            </div>
          </div>
          <div>
            <div className="w-full h-full">
              <ClientMeetings ticketsData={ticketsData} isLoading={isLoading} />
              <ClientProjects projectData={projectData} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ClientDetails;
