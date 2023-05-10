import { Edit, SendRounded } from "@mui/icons-material";
import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { EmployProjects } from "components/admin";
import { ClientMeetings } from "components/admin/clients";
import { RenderIconRow } from "components/common";
import { HeadText, Loader } from "components/core";
import {
  BankInformationUpdate,
  ChangeProfile,
  PersonalInformations,
  UpdateProfileHead,
} from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "types";

const GuestProfile = () => {
  const router = useRouter();
  const [isDialogue, setIsDialogue] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const {
    data: employData,
    mutate,
    isLoading,
  } = useFetch<User>(`users/${router?.query?.id}`);
  const basicDetails = [
    {
      id: 1,
      title: "Name",
      value: `${employData?.name ? employData?.name : "---"}`,
    },
    {
      id: 2,
      title: "Email",
      value: `${employData?.email ? employData?.email : "---"}`,
    },
    {
      id: 3,
      title: "EmpId",
      value: `${employData?.employeeID ? employData?.employeeID : "---"}`,
    },
    {
      id: 4,
      title: "Date Of Joining",
      value: `${
        employData?.joiningDate
          ? moment(employData?.joiningDate).format("ll")
          : "---"
      }`,
    },
    {
      id: 5,
      title: "Phone",
      value: `${employData?.phone ? employData?.phone : "---"}`,
    },
    {
      id: 6,
      title: "Date Of Birth",
      value: `${
        employData?.dob ? moment(employData?.dob).format("ll") : "---"
      }`,
    },
    {
      id: 7,
      title: "Address",
      value: `${employData?.address ? employData?.address : "---"}`,
    },
    {
      id: 8,
      title: "Gender",
      value: `${employData?.gender ? employData?.gender : "---"}`,
    },
    {
      id: 9,
      title: "Blood Group",
      value: `${employData?.bloodGroup ? employData?.bloodGroup : "---"}`,
    },
    {
      id: 9,
      title: "Wallet",
      value: `${employData?.wallet ? employData?.wallet : "---"}`,
    },
  ];
  const personalDetails = [
    {
      id: 1,
      title: "PAN No",
      value: `${employData?.panNo ? employData?.panNo : "---"}`,
    },
    {
      id: 2,
      title: "Aadhar No",
      value: `${employData?.aadharNo ? employData?.aadharNo : "---"}`,
    },
    {
      id: 3,
      title: "Gmail",
      value: `${employData?.gmail ? employData?.gmail : "---"}`,
    },
    {
      id: 5,
      title: "Linkedin",
      value: `${employData?.linkedin ? employData?.linkedin : "---"}`,
    },
    {
      id: 6,
      title: "Github",
      value: `${employData?.github ? employData?.github : "---"}`,
    },
  ];
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout title="Guest Profile - Admin Panel">
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
        <section className="mb-12 px-4 flex gap-3">
          <Grid container spacing={2}>
            <Grid item lg={8}>
              <div className="w-full my-4 h-full rounded-lg bg-white shadow-xl p-4">
                <div className="w-full bg-blue-100/50 rounded-lg p-8">
                  <div className="grid grid-cols-2 gap-2 justify-between">
                    <div className="">
                      <div className="tracking-wide w-full h-full">
                        <p className="font-semibold text-lg tracking-wide">
                          {employData?.name}
                        </p>
                        <p className="text-lg text-slate-600 font-medium mt-1">
                          {employData?.role?.name || "John Doe"}
                        </p>

                        <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                          <RenderIconRow
                            value={employData?.email || "jogn@yard.com"}
                            isEmail
                          />
                        </p>
                        <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                          <RenderIconRow
                            value={employData?.phone || "1234567895"}
                            isPhone
                          />
                        </p>
                        <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
                          <RenderIconRow
                            value={employData?.employeeID || "SY20005"}
                            isId
                          />
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="grid gap-2 justify-items-end px-4">
                        <div className="grid gap-2 justify-center justify-items-center items-center">
                          <div className="h-28 w-28  rounded-full border-[4px] border-white flex justify-center items-center text-3xl">
                            <div className="relative h-full w-full flex justify-center items-center group">
                              {employData?.photo && (
                                <div className="h-full w-full bg-slate-300 rounded-full">
                                  <img
                                    className="h-full w-full object-cover rounded-full shadow-md"
                                    src={employData?.photo}
                                    alt="John Doe"
                                  />
                                </div>
                              )}
                              {!employData?.photo && (
                                <div className="h-full w-full text-white rounded-full uppercase shadow-lg flex justify-center items-center text-4xl font-bold bg-gradient-to-br from-theme-100 via-theme-50 to-secondary-100">
                                  {employData?.name.slice(0, 1) || "J"}
                                </div>
                              )}
                              <div
                                onClick={() => setIsProfile(true)}
                                className="absolute cursor-pointer rounded-full w-full h-full group-hover:flex transition-all ease-in-out duration-300 justify-center items-center hidden  bg-[#0007]"
                              >
                                <Edit className="!text-white" />
                              </div>
                            </div>
                          </div>
                          <Button
                            className="!bg-theme"
                            variant="contained"
                            startIcon={<SendRounded />}
                          >
                            Send Message
                          </Button>
                        </div>
                      </div>
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
                {/* --------------Personal Details---------------------- */}
                <section className="px-8">
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
                </section>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div className="w-full h-full">
                <ClientMeetings />
                <EmployProjects />
                {/* <EmployLeaves /> */}
              </div>
            </Grid>
          </Grid>
        </section>
      </section>
    </PanelLayout>
  );
};

export default GuestProfile;
