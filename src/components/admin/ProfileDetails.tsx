import { Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import {
  CopyClipboard,
  EmployeeProfileCopyLink,
  HeadText,
  Loader,
  ViewEmployeeHead,
} from "components/core";
import {
  BankInformationUpdate,
  PersonalInformations,
  SecurityInformation,
  UpdateProfileHead,
} from "components/dialogues";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
import { useMemo, useState } from "react";
import { Security, User } from "types";
import EmpAttendanceIndividual from "./EmpAttendanceIndividual";
import EmployLeaves from "./EmployLeaves";
import EmployProjects from "./EmployProjects";
import { useRouter } from "next/router";

const ProfileDetails = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [isDialogue, setIsDialogue] = useState(false);
  const [isPersonal, setIsPersonal] = useState(false);
  const [isSecurity, setIsSecurity] = useState(false);
  const [isBank, setIsBank] = useState(false);
  const {
    data: employData,
    mutate,
    isLoading,
  } = useFetch<User>(`users/${user?.id}`);
  const { data: securityData, mutate: securityMutate } = useFetch<Security>(
    `security?userId=${
      employData?.role?.name === "SECURITY" ? router?.query?.id : undefined
    }`
  );
  const { data: projectDetails } = useFetch<any>(
    `projects?${
      user?.id
        ? `${
            user?.role?.name === "PROJECT MANAGER"
              ? `managerId=${employData?.id}`
              : ``
          }`
        : ""
    }${
      user?.id
        ? user?.role?.name === "PROJECT MANAGER"
          ? ``
          : `memberId=${employData?.id}`
        : ``
    }`
  );
  const SwitchBloodgroup = (bloodGroup: any) => {
    return (
      <span>
        {bloodGroup === "A_Positive"
          ? "A+"
          : bloodGroup === "A_Negative"
          ? "A-"
          : bloodGroup === "B_Negative"
          ? "B-"
          : bloodGroup === "B_Positive"
          ? "B+"
          : bloodGroup === "AB_Positive"
          ? "AB+"
          : bloodGroup === "AB_Negative"
          ? "AB-"
          : bloodGroup === "O_Positive"
          ? "O+"
          : bloodGroup === "O_Negative"
          ? "0-"
          : "Not mentioned"}
      </span>
    );
  };

  const basicDetails = useMemo(
    () => [
      {
        id: 1,
        title: "First Name",
        value: employData?.firstName ? employData?.firstName : "---",
      },
      {
        id: 18,
        title: "Last Name",
        value: employData?.lastName ? employData?.lastName : "---",
      },
      {
        id: 19,
        title: "Email",
        value: employData?.username ? employData?.username : "---",
        copy: true,
        isCut: false,
      },
      {
        id: 2,
        title: "Personal Email",
        value: employData?.email ? employData?.email : "---",

        copy: true,
        isCut: false,
      },

      {
        id: 3,
        title: "Emp Id",
        value: employData?.employeeID ? employData?.employeeID : "---",
        copy: true,
      },
      {
        id: 10,
        title: "Branch",
        value: employData?.employeeOfBranch?.name
          ? employData?.employeeOfBranch?.name
          : "---",
        copy: false,
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
        id: 11,
        title: "Country Code",
        value: `${employData?.countryCode ? employData?.countryCode : "---"}`,
        copy: false,
      },
      {
        id: 5,
        title: "Phone",
        value: `${employData?.phone ? employData?.phone : "---"}`,
        copy: true,
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
        value: employData?.bloodGroup
          ? SwitchBloodgroup(employData?.bloodGroup)
          : "---",
      },
      {
        id: 10,
        title: "Department",
        value: `${
          employData?.department?.name ? employData?.department?.name : "---"
        }`,
      },
      // {
      // 	id: 9,
      // 	title: "Wallet",
      // 	value: `${employData?.wallet ? employData?.wallet : "---"}`,
      // },
    ],
    [employData]
  );
  const personalDetails = useMemo(
    () => [
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
      {
        id: 6,
        title: "UAN No",
        value: `${employData?.uanNo ? employData?.uanNo : "---"}`,
      },
    ],
    [employData]
  );
  const bankDetails = useMemo(
    () => [
      {
        id: 1,
        title: "Bank Name",
        value: `${employData?.bankName ? employData?.bankName : "---"}`,
      },
      {
        id: 2,
        title: "Bank Ac/No",
        value: `${employData?.accountNo ? employData?.accountNo : "---"}`,
      },
      {
        id: 3,
        title: "IFSC Code",
        value: `${employData?.ifscCode ? employData?.ifscCode : "---"}`,
      },
    ],
    [employData]
  );
  const securityDetails = useMemo(
    () => [
      {
        id: 1,
        title: "Agency Address",
        value: `${
          securityData?.agencyAddress ? securityData?.agencyAddress : "---"
        }`,
      },
      {
        id: 2,
        title: "Agency Name",
        value: `${securityData?.agencyName ? securityData?.agencyName : "---"}`,
      },
      {
        id: 3,
        title: "Shift Type",
        value: `${
          securityData?.shift?.type ? securityData?.shift?.type : "---"
        }`,
      },
      {
        id: 4,
        title: "Agency",
        value: `${securityData?.isAgency ? "Yes" : "No"}`,
      },
    ],
    [securityData]
  );
  if (isLoading) {
    return (
      <section className="min-h-screen">
        <Loader />
      </section>
    );
  }

  return (
    <section>
      <UpdateProfileHead
        mutate={mutate}
        employData={employData}
        open={isDialogue}
        handleClose={() => setIsDialogue(false)}
      />
      <PersonalInformations
        mutate={mutate}
        employData={employData}
        open={isPersonal}
        handleClose={() => setIsPersonal(false)}
      />
      <BankInformationUpdate
        employData={employData}
        mutate={mutate}
        open={isBank}
        handleClose={() => setIsBank(false)}
      />
      <SecurityInformation
        open={isSecurity}
        handleClose={() => setIsSecurity(false)}
        mutate={mutate}
        securityMutate={securityMutate}
        securityData={securityData}
      />
      <section className="mb-12 flex gap-3">
        <Grid container spacing={2}>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <div className="w-full h-full rounded-lg bg-white shadow-xl md:p-4 p-2">
              <ViewEmployeeHead employData={employData} mutate={mutate} />
              {/* --------------------Basic Details-------------------- */}
              <section className="py-4 md:px-8 px-3">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Basic Details" />
                  {user?.role?.name === "CEO" || user?.role?.name === "COO" ? (
                    <Tooltip title="Edit">
                      <IconButton onClick={() => setIsDialogue(true)}>
                        <ICONS.Edit className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </div>
                {basicDetails?.map((item) => (
                  <div
                    key={item?.id}
                    className="md:flex gap-2 items-center font-medium py-1.5"
                  >
                    <div className="md:w-[30%] w-full">
                      <p className="text-sm text-gray-600">{item?.title} :</p>
                    </div>
                    <div className="md:w-2/3 w-full break-all">
                      {item?.copy ? (
                        <CopyClipboard
                          value={item?.value}
                          isCut={item?.isCut}
                        />
                      ) : (
                        <p className="text-sm">{item?.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </section>
              {/* --------------Personal Details---------------------- */}
              <section className="md:px-8 px-3">
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
                    className="md:flex grid gap-2 items-center font-medium py-1.5"
                  >
                    <div className="md:w-[30%] w-full">
                      <p className="text-sm text-gray-600">{item?.title} :</p>
                    </div>
                    <div className="md:w-2/3 w-full break-all">
                      <EmployeeProfileCopyLink value={item?.value} />
                    </div>
                  </div>
                ))}
              </section>
              {/* ---------------------Bank Details------------------------- */}
              <section className="md:px-8 px-3 mt-2">
                <div className=" pb-2 flex justify-between items-center">
                  <HeadText title="Bank Details" />
                  {user?.role?.name === "CEO" || user?.role?.name === "COO" ? (
                    <Tooltip title="Edit">
                      <IconButton onClick={() => setIsBank(true)}>
                        <ICONS.Edit className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </div>
                {bankDetails?.map((item) => (
                  <div
                    key={item?.id}
                    className="md:flex grid gap-2 items-center font-medium py-1.5"
                  >
                    <div className="md:w-[30%] w-full">
                      <p className="text-sm text-gray-600">{item?.title} :</p>
                    </div>
                    <div className="md:w-2/3 w-full break-all">
                      <p className="text-sm">{item?.value}</p>
                    </div>
                  </div>
                ))}
              </section>
              {/* ---------------------Security Details------------------------- */}
              {employData?.role?.name === "SECURITY" && (
                <section className="md:px-8 px-3 mt-2">
                  <div className=" pb-2 flex justify-between items-center">
                    <HeadText title="Security Details" />
                    <Tooltip title="Edit">
                      <IconButton onClick={() => setIsSecurity(true)}>
                        <ICONS.Edit className="h-5 w-5" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  {securityDetails?.map((item) => (
                    <div
                      key={item?.id}
                      className="md:flex grid gap-2 items-center font-medium py-1.5"
                    >
                      <div className="md:w-[30%] w-full">
                        <p className="text-sm text-gray-600">{item?.title} :</p>
                      </div>
                      <div className="md:w-2/3 w-full break-all">
                        <p className="text-sm">{item?.value}</p>
                      </div>
                    </div>
                  ))}
                </section>
              )}
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className="w-full h-full">
              <EmpAttendanceIndividual employData={employData} />
              <EmployLeaves employData={employData} />
              {user?.role?.name === "HR" ? null : (
                <EmployProjects
                  employData={employData}
                  projectDetails={projectDetails}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </section>
    </section>
  );
};

export default ProfileDetails;
