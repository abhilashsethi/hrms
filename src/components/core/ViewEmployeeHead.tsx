import {
  AccountTreeRounded,
  ChecklistRounded,
  EmailRounded,
  FileDownload,
  InsertDriveFileRounded,
  ReceiptLongRounded,
  Send,
} from "@mui/icons-material";
import { Grid, Tooltip } from "@mui/material";
import { RenderIconRow } from "components/common";
import { useFetch } from "hooks";
import { User } from "types";
import EmployeeProfileImage from "./EmployeeProfileImage";
import { ChangeProfile } from "components/dialogues";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  ViewDocumentDrawer,
  ViewLeaveDrawer,
  ViewProjectsDrawer,
} from "components/drawer";
import CopyClipboard from "./CopyCliboard";

const ViewEmployeeHead = () => {
  const [document, setDocument] = useState(false);
  const [projects, setProjects] = useState(false);
  const [leaves, setLeaves] = useState(false);
  const [viewLeaves, setViewLeaves] = useState<any>(null);
  const [viewProjects, setViewProjects] = useState<any>(null);
  const [viewDocument, setViewDocument] = useState<any>(null);

  const router = useRouter();
  const [isProfile, setIsProfile] = useState(false);
  const { data: employData, mutate } = useFetch<User>(
    `users/${router?.query?.id}`
  );

  const shortCuts: shortCutTypes[] = [
    {
      id: 1,
      icon: <InsertDriveFileRounded />,
      title: "Documents",
      onClick: () => setDocument(true),
    },
    {
      id: 2,
      icon: <FileDownload />,
      title: "Salary Slip",
    },
    {
      id: 3,
      icon: <ReceiptLongRounded />,
      title: "Transactions",
    },
    {
      id: 4,
      icon: <EmailRounded />,
      title: "Mail",
    },
    {
      id: 5,
      icon: <Send />,
      title: "Message",
    },
    {
      id: 6,
      icon: <AccountTreeRounded />,
      title: "Projects",
      onClick: () => setProjects(true),
    },
    {
      id: 6,
      icon: <ChecklistRounded />,
      title: "Leaves",
      onClick: () => setLeaves(true),
    },
  ];

  return (
    <>
      <ChangeProfile
        open={isProfile}
        handleClose={() => setIsProfile(false)}
        mutate={mutate}
      />
      <div className="w-full bg-blue-100/50 rounded-lg md:p-8 p-3">
        <div className="flex md:flex-row flex-col-reverse gap-2 md:gap-0">
          <div className="md:w-3/4 w-full tracking-wide h-full flex flex-col items-center">
            <p className="font-semibold tracking-wide">{employData?.name}</p>
            <p className="text-sm text-slate-600 font-medium mt-1">
              {employData?.role?.name || "---"}
            </p>
            <p className="text-sm text-slate-600 mt-1 font-bold flex gap-2">
              EMP ID :
              <span className="text-gray-400">
                <CopyClipboard value={employData?.employeeID} />
              </span>
            </p>
            <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
              <RenderIconRow
                value={employData?.email || "---"}
                isEmail
                longText={false}
              />
            </p>
            <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
              <RenderIconRow value={employData?.phone || "---"} isPhone />
            </p>
          </div>
          <div className="md:w-1/4 w-full h-full flex justify-center items-center">
            <EmployeeProfileImage employData={employData} mutate={mutate} />
          </div>
        </div>
        <div className="flex justify-between items-center pt-4">
          <ViewLeaveDrawer
            open={leaves}
            onClose={() => setLeaves(false)}
            setViewLeaves={setViewLeaves}
          />
          <ViewProjectsDrawer
            open={projects}
            onClose={() => setProjects(false)}
            setViewProject={setViewProjects}
          />

          <ViewDocumentDrawer
            open={document}
            onClose={() => setDocument(false)}
            setViewDocument={setViewDocument}
          />
          <div className="w-full flex gap-2 flex-wrap justify-center">
            {shortCuts?.map((item) => (
              <Tooltip key={item?.id} title={item?.title}>
                <div
                  onClick={item?.onClick}
                  className="w-24 rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-600 flex-col gap-2"
                >
                  <span className="p-2 bg-white shadow-lg rounded-md group-hover:rotate-[-12deg] transition-all ease-in-out duration-200">
                    <span>{item?.icon}</span>
                  </span>
                  <p className="text-xs text-center font-semibold ">
                    {item?.title}
                  </p>
                </div>
              </Tooltip>
            ))}
          </div>

          {/* <div className="grid lg:grid-cols-7 w-full gap-2">
            {shortCuts?.map((item) => (
              <Tooltip key={item?.id} title={item?.title}>
                <div
                  onClick={item?.onClick}
                  className="h-12 w-full bg-gradient-to-r !text-white from-theme-400 hover:from-black to-theme-200 hover:to-black rounded-md shadow-md flex justify-center items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer "
                >
                  {item?.icon}
                </div>
              </Tooltip>
            ))}
          </div> */}
          {/* <div className="font-medium text-sm">
            <Button
              className="!bg-theme"
              variant="contained"
              startIcon={<SendRounded />}
            >
              Send Message
            </Button>
          </div>
          <div className="font-medium text-sm">
            <Button
              onClick={() => setDocument(true)}
              className="!bg-theme"
              variant="contained"
              startIcon={<Email />}
            >
              Send Mail
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default ViewEmployeeHead;

interface shortCutTypes {
  id?: number;
  icon?: any;
  title?: string;
  onClick?: any;
}
