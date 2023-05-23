import { Add, CheckBox, Edit } from "@mui/icons-material";
import { Avatar, AvatarGroup, Button, Checkbox } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { ProjectCreateTask } from "components/dialogues";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";

const ProjectTasks = () => {
  const [isCreate, setIsCreate] = useState(false);
  const router = useRouter();
  const {
    data: projectData,
    mutate,
    isLoading,
  } = useFetch<any>(`projects/${router?.query?.id}`);
  return (
    <>
      <ProjectCreateTask
        id={router?.query?.id}
        open={isCreate}
        mutate={mutate}
        handleClose={() => setIsCreate(false)}
      />
      <div className="flex border-b-2 pb-2 justify-end">
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
      {isLoading && <p className="text-center">Please wait...</p>}
      <section className="flex flex-col gap-3 max-h-[30rem] overflow-y-auto pr-2 pt-2">
        {projectData?.tasks?.map((item: any) => (
          <div
            key={item?.id}
            className={`w-full rounded-md shadow-md p-4 shadow-sleek ${
              item?.status === "COMPLETED"
                ? "bg-green-100"
                : item?.status === "ONGOING"
                ? "bg-blue-100"
                : "bg-cyan-50"
            }`}
          >
            <div className="flex justify-end text-xs">
              <p>{moment(item?.createdAt).format("ll")}</p>
            </div>
            <div className="flex justify-between">
              <h1 className="font-semibold text-slate-700">{item?.title}</h1>
              <span
                className={`text-xs font-semibold px-4 py-1 h-6 rounded-full text-white ${
                  item?.status === "Open"
                    ? "bg-purple-400"
                    : item?.status === "Pending"
                    ? "bg-yellow-500"
                    : item?.status === "Ongoing"
                    ? "bg-blue-500"
                    : item?.status === "Completed"
                    ? "bg-green-500"
                    : "bg-green-400"
                }`}
              >
                {item?.status}
              </span>
            </div>
            <p className="mt-1 text-sm tracking-wide">{item?.description}</p>
            <h2 className="mt-2 text-sm font-semibold text-slate-700">
              Assigned To :
            </h2>
            <div className="flex justify-start mt-4">
              <AvatarGroup
                className="!cursor-pointer"
                //   onClick={() => setIsMembers({ dialogue: true })}
                max={4}
              >
                <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
                <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
                <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
                <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
                <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
              </AvatarGroup>
            </div>
          </div>
        ))}
      </section>
      {projectData?.tasks?.length === 0 ? <p>No Tasks found...</p> : null}
    </>
  );
};

export default ProjectTasks;

const cards = [
  { id: 1, title: "Scanned Cards UI for guests section", status: "ONGOING" },
  { id: 2, title: "Scanned Cards UI for guests section", status: "COMPLETED" },
  { id: 3, title: "Scanned Cards UI for guests section", status: "COMPLETED" },
];
