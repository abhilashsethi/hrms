import {
  Apartment,
  Edit,
  Event,
  Forum,
  Google,
  InsertDriveFileRounded,
  LinkRounded,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Button,
  Chip,
  Grid,
  Tooltip,
} from "@mui/material";
import React from "react";
import {
  ClientDetails,
  ProjectDescription,
  ProjectTabs,
  TechnologyUsed,
} from "components/project";
import { DEFAULTPROFILE } from "assets/home";
import {
  ProjectDocuments,
  ProjectMembers,
  ProjectURLS,
} from "components/drawer";
import { useState } from "react";
import { ProjectBasicDetailsUpdate } from "components/dialogues";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Projects } from "types";
import moment from "moment";

const ProjectDetails = () => {
  const router = useRouter();
  const [isURL, setIsURL] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDocuments, setIsDocuments] = useState(false);
  const [isMembers, setIsMembers] = useState(false);
  const { data: projectData, mutate } = useFetch<Projects>(
    `projects/${router?.query?.id}`
  );
  console.log(projectData);

  const shortCuts: shortCutTypes[] = [
    {
      id: 1,
      icon: <LinkRounded />,
      title: "Project URLs",
      onClick: () => setIsURL(true),
    },
    {
      id: 2,
      icon: <Forum />,
      title: "Chats",
    },
    {
      id: 3,
      icon: <InsertDriveFileRounded />,
      title: "Documents",
      onClick: () => setIsDocuments(true),
    },
  ];
  const BasicData = [
    {
      id: 1,
      title: "Created",
      value: `${moment(projectData?.createdAt).format("ll")}`,
      icon: <Event fontSize="small" />,
    },
    {
      id: 2,
      title: "Deadline",
      value: `${
        projectData?.createdAt
          ? moment(projectData?.createdAt).format("ll")
          : `Not specified`
      }`,
      icon: <Event fontSize="small" />,
    },
    {
      id: 3,
      title: "Gmail",
      value: `${projectData?.gmail ? projectData?.gmail : `---`}`,
      icon: <Google fontSize="small" />,
    },
    {
      id: 4,
      title: "Industry",
      value: `${projectData?.industry ? projectData?.industry : `---`}`,
      icon: <Apartment fontSize="small" />,
    },
  ];
  return (
    <div className="mt-2">
      <ProjectBasicDetailsUpdate
        open={isUpdate}
        handleClose={() => setIsUpdate(false)}
        id={router?.query?.id}
        mutate={mutate}
      />
      <ProjectDocuments
        open={isDocuments}
        onClose={() => setIsDocuments(false)}
      />
      <ProjectMembers
        projectId={router?.query?.id}
        projectData={projectData}
        open={isMembers}
        onClose={() => setIsMembers(false)}
        mutate={mutate}
      />
      <ProjectURLS
        id={router?.query?.id}
        open={isURL}
        onClose={() => setIsURL(false)}
      />
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <div className="w-full bg-white rounded-md shadow-jubilation p-6">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold tracking-wide text-lg text-secondary">
                {projectData?.name}
              </h1>
              <Button
                size="small"
                variant="contained"
                className="!bg-theme"
                startIcon={<Edit />}
                onClick={() => setIsUpdate(true)}
              >
                Edit
              </Button>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <span className="text-sm font-semibold">Status : </span>
              <span
                className={`px-3 py-1 uppercase rounded-sm shadow-md text-xs tracking-wide font-semibold text-white ${
                  projectData?.status === "Pending"
                    ? `bg-yellow-500`
                    : projectData?.status === "Ongoing"
                    ? `bg-blue-500`
                    : projectData?.status === "Onhold"
                    ? `bg-red-500`
                    : projectData?.status === "Completed"
                    ? `bg-green-500`
                    : `bg-slate-500`
                }`}
              >
                {projectData?.status}
              </span>
              {/* <Chip label="Progress" color="warning" size="small" /> */}
            </div>
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-3 mt-4 w-2/3">
                {BasicData?.map((item) => (
                  <div
                    key={item?.id}
                    className=" w-full flex items-start gap-4"
                  >
                    <div className="w-1/3">
                      <p className="text-sm font-semibold text-slate-600 flex gap-2 items-center">
                        {item?.icon}
                        <span>{item?.title} :</span>
                      </p>
                    </div>
                    <div className="w-1/2">
                      <p className="text-sm">{item?.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              {!projectData?.involvedMembers?.length ? (
                <div>
                  <p>No Members assigned</p>
                  <Button
                    onClick={() => setIsMembers(true)}
                    variant="contained"
                    className="bg-theme"
                    size="small"
                  >
                    Assign Members
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col justify-center w-1/3 items-center">
                  <h1 className="text-slate-600 font-semibold mt-4">TEAM</h1>
                  <div
                    onClick={() => setIsMembers(true)}
                    className="flex justify-start mt-4"
                  >
                    <AvatarGroup className="!cursor-pointer" max={4}>
                      {projectData?.involvedMembers?.map((data) => (
                        <Avatar alt={data?.name} src={data?.photo || " "} />
                      ))}
                    </AvatarGroup>
                  </div>
                </div>
              )}
            </div>

            {/* ------------shortcuts------------ */}
            <div className="w-full flex gap-2 mt-6 justify-center">
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

            <ProjectTabs />
          </div>
        </Grid>
        <Grid item lg={4}>
          <div className="w-full">
            <ProjectDescription description={projectData?.description} />
            <ClientDetails projectData={projectData} mutate={mutate} />
            <TechnologyUsed projectData={projectData} mutate={mutate} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDetails;

interface shortCutTypes {
  id?: number;
  icon?: any;
  title?: string;
  onClick?: any;
}
