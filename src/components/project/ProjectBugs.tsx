import {
  Add,
  ChevronRight,
  Delete,
  Edit,
  InsertDriveFile,
  Person,
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { DEFAULTIMG, DEFAULTPROFILE } from "assets/home";
import { PhotoViewer, PhotoViewerSmall } from "components/core";
import { ProjectCreateBug, UpdateBugStatus } from "components/dialogues";
import ViewScreenshot from "components/dialogues/ViewScreenshot";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";

const ProjectBugs = () => {
  const router = useRouter();

  const [isCreate, setIsCreate] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const {
    data: projectData,
    mutate,
    isLoading,
  } = useFetch<any>(`projects/${router?.query?.id}`);

  return (
    <section>
      <ProjectCreateBug
        id={router?.query?.id}
        open={isCreate}
        mutate={mutate}
        handleClose={() => setIsCreate(false)}
      />
      <ViewScreenshot />
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
          <CardComponent
            index={i}
            key={item?.id}
            item={item}
            mutate={mutate}
            projectId={item?.id}
          />
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
  mutate?: any;
  projectId?: any;
  item?: {
    title?: string;
    status?: string;
    description?: string;
    bugs?: any;
    pictures?: any;
    id?: any;
  };
}

const CardComponent = ({ key, index, item, mutate, projectId }: Props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDescription, setIsDescription] = useState(false);
  const [isScreenshot, setIsScreenshot] = useState(false);
  const { change } = useChange();
  const handleDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const response = await change(`projects/remove-tasks/${projectId}`, {
            method: "DELETE",
            body: {
              tasks: [`${id}`],
            },
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          mutate();
          Swal.fire("Success", "Deleted successfully!", "success");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <>
      <ViewScreenshot
        open={isScreenshot}
        handleClose={() => setIsScreenshot(false)}
        link={item?.pictures[0]}
      />
      <UpdateBugStatus
        id={item?.id}
        open={isUpdate}
        mutate={mutate}
        handleClose={() => setIsUpdate(false)}
      />
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
              <Tooltip title="Screenshot">
                <IconButton onClick={() => setIsScreenshot(true)} size="small">
                  <InsertDriveFile />
                </IconButton>
              </Tooltip>
            </span>
            <ProfileImage id={item?.bugs?.detectedBy} />
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
              <p className="text-sm py-3 tracking-wide">{item?.description}</p>
            </div>
            <div className="w-[10%] pb-4 flex gap-2">
              <IconButton onClick={() => setIsUpdate(true)} size="small">
                <Edit />
              </IconButton>
              <IconButton size="small" onClick={() => handleDelete(item?.id)}>
                <Delete className="!text-red-500" />
              </IconButton>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

const statuses = [
  { id: 1, value: "Open" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Ongoing" },
  { id: 4, value: "Completed" },
];

const ProfileImage = ({ id }: any) => {
  const { data: personData } = useFetch<User>(`users/${id}`);
  return (
    <Tooltip title={personData?.name}>
      <PhotoViewerSmall
        name={personData?.name}
        photo={personData?.photo}
        size="2.5rem"
      />
    </Tooltip>
  );
};
