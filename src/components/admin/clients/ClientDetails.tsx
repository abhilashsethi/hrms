import {
  AccountTree,
  BugReport,
  Edit,
  Handyman,
  HelpCenter,
  Receipt,
  SendRounded,
  Support,
  SupportAgent,
} from "@mui/icons-material";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import {
  CountryNameFlag,
  HeadText,
  Loader,
  PhotoViewer,
} from "components/core";
import {
  BankInformationUpdate,
  ChangeProfile,
  PersonalInformations,
  UpdateProfileHead,
} from "components/dialogues";
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
  const [isProfile, setIsProfile] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const [tickets, setTickets] = useState(false);
  const [viewTickets, setViewTickets] = useState<any>(null);
  const {
    data: clientData,
    mutate,
    isLoading,
  } = useFetch<Client>(`clients/${router?.query?.id}`);
  console.log("ksakckack", clientData);
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
  ];

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section>
      <ChangeProfile
        open={isProfile}
        handleClose={() => setIsProfile(false)}
        mutate={mutate}
      />
      <UpdateProfileHead
        mutate={mutate}
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
      <PersonalInformations
        mutate={mutate}
        open={isPersonal}
        handleClose={() => setIsPersonal(false)}
      />
      <BankInformationUpdate
        mutate={mutate}
        open={isBank}
        handleClose={() => setIsBank(false)}
      />
      <ViewTicketsDrawer
        open={tickets}
        onClose={() => setTickets(false)}
        setViewTickets={setViewTickets}
      />
      <section className="mb-12 flex gap-3">
        <Grid container spacing={2}>
          <Grid item lg={8}>
            <div className="w-full rounded-lg bg-white shadow-xl p-4">
              <div className="w-full bg-blue-100/50 rounded-lg p-8">
                <Grid container spacing={3}>
                  <Grid item lg={9}>
                    <div className="tracking-wide w-full h-full">
                      <p className="font-semibold tracking-wide">
                        {clientData?.name || "John Smith"}
                      </p>
                      <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                        <RenderIconRow
                          value={
                            clientData?.email || "johnsmith@gmail.com" || "---"
                          }
                          isEmail
                        />
                      </p>
                      <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                        <RenderIconRow
                          value={clientData?.phone || "9974521485" || "---"}
                          isPhone
                        />
                      </p>
                      <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                        <CountryNameFlag countryName={"Australia"} />
                      </p>
                    </div>
                  </Grid>
                  <Grid item lg={3}>
                    <PhotoViewer
                      photo={
                        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                      }
                      size="5.5rem"
                    />
                  </Grid>
                </Grid>
                <div className="flex justify-between items-center pt-4">
                  <div className="w-full flex justify-between gap-3">
                    <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center w-1/3 py-3 rounded-md shadow-lg bg-[#bbcbff] ">
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
                    <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center w-1/3 py-3 rounded-md shadow-lg bg-[#b9e9fd]">
                      <AccountTree
                        fontSize="large"
                        className="bg-white p-1 rounded-lg mb-3 text-theme"
                      />
                      <p className={`text-sm text-gray-800 font-semibold`}>
                        Ongoing Projects
                      </p>
                      <p className="text-sm font-medium">12</p>
                    </div>
                    <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center w-1/3 py-3 rounded-md shadow-lg bg-[#f6c8ff]">
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
                    <div className="hover:scale-95 transition duration-500 ease-in-out cursor-pointer text-center w-1/3 py-3 rounded-md shadow-lg bg-[#feb76f]">
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
              </div>
              {/* --------------------Basic Details-------------------- */}
              <section className="py-4 px-8">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Basic Details" />
                  <Tooltip title="Edit">
                    <IconButton
                    // onClick={() => setIsDialogue(true)}
                    >
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
              {/* --------------Personal Details---------------------- */}
              {/* <section className="px-8">
								<div className=" pb-2 flex justify-between items-center">
									<HeadText title="Personal Details" />
									<Tooltip title="Edit">
										<IconButton onClick={() => setIsPersonal(true)}>
											<ICONS.Edit className="h-5 w-5" />
										</IconButton>
									</Tooltip>
								</div>
								{personalDetails?.map((item) => (
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
							</section> */}
              {/* ---------------------Bank Details------------------------- */}
              {/* <section className="px-8 mt-2">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Bank Details" />
                  <Tooltip title="Edit">
                    <IconButton onClick={() => setIsBank(true)}>
                      <ICONS.Edit className="h-5 w-5" />
                    </IconButton>
                  </Tooltip>
                </div>
                {bankDetails?.map((item) => (
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
              </section> */}
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className="w-full h-full">
              <ClientMeetings />
              <ClientProjects />
              {/* <EmployLeaves /> */}
            </div>
          </Grid>
        </Grid>
      </section>
    </section>
  );
};

export default ClientDetails;
