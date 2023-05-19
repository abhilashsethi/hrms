import { HeadText } from "components/core";
import moment from "moment";
import { AccountTreeRounded, Handyman } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { ViewProjectsDrawer } from "components/drawer";
interface Props {
  projectData?: any;
}
const ClientProjects = ({ projectData }: Props) => {
  const [projects, setProjects] = useState(false);
  const [viewProjects, setViewProjects] = useState<any>(null);
  return (
    <section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
      <ViewProjectsDrawer
        open={projects}
        onClose={() => setProjects(false)}
        setViewProject={setViewProjects}
      />
      <div className="flex justify-between">
        <HeadText title={`Projects (${projectData?.length})`} />
        <Tooltip title="View All Projects">
          <div
            // onClick={() => setTickets(true)}
            className="rounded-full group flex justify-start items-center hover:scale-105 ease-in-out transition-all duration-400 cursor-pointer !text-blue-500 flex-col gap-2 "
          >
            <span className="bg-[#dbe3ff] p-2 shadow-lg rounded-md transition-all ease-in-out duration-200">
              <Handyman onClick={() => setProjects(true)} />
            </span>
          </div>
        </Tooltip>
      </div>
      <div className="flex flex-col gap-1 mt-4 max-h-[15rem] overflow-y-auto">
        {projectData?.map((item: any, i: any) => (
          <div key={i} className="flex gap-1 py-3 border-b-[1px]">
            <div className="w-1/5 flex justify-center items-center">
              <div className="h-12 w-12 bg-theme-100 rounded-full flex justify-center items-center">
                <AccountTreeRounded className="!text-secondary" />
              </div>
            </div>
            <div className="w-4/5 h-12">
              <div className="flex justify-between pr-3 items-center">
                <p className="text-sm font-semibold tracking-wide">
                  {item?.name}
                </p>
                <span className="py-1 px-3 rounded-md bg-emerald-100 tracking-wide border-green-400 border-[1px] text-green-500 text-xs font-semibold">
                  {item?.status}
                </span>
              </div>
              <p className="text-sm tracking-wide">
                Deadline : {moment(new Date()).format("ll")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientProjects;

const cards = [
  {
    id: 1,
    title: "HRMS for SY",
    deadline: "May 10, 2023",
    status: "COMPLETED",
  },
  {
    id: 2,
    title: "Yard ERP",
    deadline: "May 10, 2023",
    status: "COMPLETED",
  },
  {
    id: 3,
    title: "Yard CRM",
    deadline: "May 10, 2023",
    status: "COMPLETED",
  },
];
