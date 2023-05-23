import {
  Add,
  ChevronRight,
  Edit,
  InsertDriveFile,
  Person,
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { DEFAULTIMG, DEFAULTPROFILE } from "assets/home";
import { PhotoViewer } from "components/core";
import { ProjectCreateBug } from "components/dialogues";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";

const ProjectBugs = () => {
  const router = useRouter();
  const [isCreate, setIsCreate] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const {
    data: projectData,
    mutate,
    isLoading,
  } = useFetch<any>(`projects/${router?.query?.id}`);
  console.log(projectData);

  return (
    <section>
      <ProjectCreateBug
        id={router?.query?.id}
        open={isCreate}
        mutate={mutate}
        handleClose={() => setIsCreate(false)}
      />
      <div className="flex gap-2 pb-2 mb-2 border-b-2">
        <div className="w-[60%]">
          <Button
            onClick={() => setIsCreate(true)}
            size="small"
            className="!bg-cyan-500"
            variant="contained"
            startIcon={<Add />}
          >
            ADD NEW
          </Button>
        </div>
        <div className="w-[40%] h-8 flex justify-between pl-4 pr-12 text-xs tracking-wide items-center text-slate-600">
          <span>STATUS</span>
          <span>DOCS</span>
          <span>
            <Tooltip title="Inspector">
              <Person fontSize="small" />
            </Tooltip>
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        {projectData?.bugs.map((item: any, i: any) => (
          <CardComponent index={i} key={item?.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ProjectBugs;

const cards = [
  { id: 1, title: "Login functionality not working properly!" },
  { id: 2, title: "Issue in profile image upload!" },
  { id: 3, title: "Change password issue!" },
  { id: 4, title: "Form upload issue!" },
];

interface Props {
  key?: number;
  index?: number;
  item?: { title?: string; status?: string };
}

const CardComponent = ({ key, index, item }: Props) => {
  const [isDescription, setIsDescription] = useState(false);
  return (
    <div className="border-b-2 py-2">
      <div className=" w-full rounded-md py-3 flex items-start">
        <div className="w-[57%] pr-3">
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-slate-500 rounded-full text-white flex justify-center items-center text-xs">
              {Number(index) + 1}
            </div>
            <div className="w-[90%]">
              <h1 className="text-sm font-medium text-slate-900">
                {item?.title}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[43%] h-8 flex justify-between pl-4 text-sm tracking-wide items-center text-slate-600">
          <span
            className={`text-xs font-medium px-3 py-1 h-6 rounded-full text-white ${
              item?.status === "Completed"
                ? `bg-green-400`
                : item?.status === "Open"
                ? `bg-purple-400`
                : item?.status === "Pending"
                ? `bg-yellow-400`
                : item?.status === "Ongoing"
                ? `bg-blue-400`
                : item?.status === "Reviewed"
                ? `bg-black`
                : `bg-slate-600`
            }`}
          >
            {item?.status}
          </span>
          <span>
            <Tooltip title="Documents">
              <IconButton size="small">
                <InsertDriveFile />
              </IconButton>
            </Tooltip>
          </span>
          <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
          <IconButton
            onClick={() => setIsDescription((prev) => !prev)}
            size="small"
          >
            <ChevronRight
              fontSize="small"
              className={`${
                isDescription ? `!rotate-[-90deg]` : ``
              } transition-all ease-in-out duration-200`}
            />
          </IconButton>
        </div>
      </div>
      {isDescription ? (
        <div className="flex gap-2 justify-between items-end">
          <div className="transition-all ease-in-out duration-200 w-[90%]">
            <h1 className="text-sm font-semibold text-gray-600">
              Description :
            </h1>
            <p className="text-sm py-3 tracking-wide">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Incidunt
              consectetur perspiciatis officiis est necessitatibus, possimus
              aspernatur quisquam ipsam nihil voluptas!
            </p>
          </div>
          <div className="w-[10%] pb-4">
            {" "}
            <IconButton>
              <Edit />
            </IconButton>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const statuses = [
  { id: 1, value: "Open" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Ongoing" },
  { id: 4, value: "Completed" },
];
