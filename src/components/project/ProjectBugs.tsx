import {
  Add,
  ChevronRight,
  Close,
  Delete,
  Edit,
  FilterListRounded,
  InsertDriveFile,
} from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { LoaderAnime, PhotoViewerSmall } from "components/core";
import { ProjectCreateBug, UpdateBugStatus } from "components/dialogues";
import ViewScreenshot from "components/dialogues/ViewScreenshot";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
interface Props {
  projectId?: any;
}
const ProjectBugs = ({ projectId }: Props) => {
  const router = useRouter();
  const [bugStatus, setBugStatus] = useState(null);

  const [isCreate, setIsCreate] = useState(false);
  const {
    data: projectData,
    mutate,
    isLoading,
  } = useFetch<any>(
    `projects/all-bugs/of-project?projectId=${router?.query?.id}${
      bugStatus ? `&status=${bugStatus}` : ""
    }&orderBy=createdAt:desc`
  );
  return (
    <section>
      <ProjectCreateBug
        id={router?.query?.id}
        open={isCreate}
        mutate={mutate}
        handleClose={() => setIsCreate(false)}
      />
      <ViewScreenshot />
      <div className=" pb-2 mb-2 border-b-2">
        <div className="md:flex grid items-center md:justify-between gap-4 w-full ">
          <div className="flex justify-between md:w-2/3 w-full gap-2">
            <div className="w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme">
              <IconButton
                onClick={() => {
                  setBugStatus(null);
                }}
              >
                <Tooltip
                  title={bugStatus !== null ? `Remove Filters` : `Filter`}
                >
                  {bugStatus !== null ? (
                    <Close className={"!text-white"} />
                  ) : (
                    <FilterListRounded className={"!text-white"} />
                  )}
                </Tooltip>
              </IconButton>
            </div>
            <TextField
              fullWidth
              className=""
              select
              label="Bug status"
              size="small"
              value={bugStatus}
              onChange={(e: any) => {
                setBugStatus(e.target?.value);
              }}
            >
              {bugSelects?.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div className="">
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
        </div>
      </div>
      <div className="flex flex-col max-h-[30rem] overflow-scroll">
        {isLoading ? <p>Loading....</p> : null}
        {projectData?.length ? (
          projectData?.map((item: any, i: any) => (
            <>
              {/* {console.log(item)} */}
              <CardComponent
                index={i}
                key={item?.id}
                item={item}
                mutate={mutate}
                isLoading={isLoading}
                projectId={projectId}
              />
            </>
          ))
        ) : (
          <LoaderAnime text="No Bug at this time" />
        )}
      </div>
    </section>
  );
};

export default ProjectBugs;

interface Props {
  key?: number;
  index?: number;
  mutate?: any;
  projectId?: any;
  isLoading?: boolean;
  item?: {
    title?: string;
    status?: string;
    description?: string;
    bugs?: any;
    pictures?: any;
    id?: any;
    createdAt?: any;
    detectedBy?: any;
  };
}

const CardComponent = ({
  key,
  index,
  isLoading,
  item,
  mutate,
  projectId,
}: Props) => {
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
          Swal.fire(`Info`, "It will take some time", "info");
          const response = await change(`projects/remove-bugs/${projectId}`, {
            method: "DELETE",
            body: {
              bugs: [`${id}`],
            },
          });
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          mutate();
          Swal.fire("Success", "Deleted successfully!", "success");
        }
      } catch (error) {
        if (error instanceof Error) {
          Swal.fire(`Error`, error?.message, `error`);
        } else {
          Swal.fire(`Error`, "Something Went Wrong", `error`);
        }
      }
    });
  };
  console.log(item);
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
        {isLoading && (
          <div className="flex justify-center items-center">Loading...</div>
        )}
        <div className=" w-full rounded-md py-3 md:flex grid items-start">
          <div className="md:w-[57%] w-full pr-3">
            <div className="flex gap-2">
              <div className="h-5 w-5 bg-slate-500 rounded-full text-white flex justify-center items-center text-xs">
                {Number(index) + 1}
              </div>
              <div className="md:w-[90%] w-full">
                <h1 className="text-sm font-medium text-slate-900">
                  {item?.title}
                </h1>
              </div>
            </div>
          </div>
          <div className="md:w-[43%] w-full py-2 md:h-8 md:flex grid md:justify-between pl-4 text-sm tracking-wide items-center text-slate-600">
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
            {item?.pictures?.length ? (
              <span>
                <p className="text-xs md:hidden block pt-2">Document :</p>
                <Tooltip title="Screenshot">
                  <IconButton
                    onClick={() => setIsScreenshot(true)}
                    size="small"
                  >
                    <InsertDriveFile />
                  </IconButton>
                </Tooltip>
              </span>
            ) : (
              "---"
            )}
            {/* <div className="md:flex hidden">
							<ProfileImage id={item?.detectedBy?.id} />
						</div> */}
            <div className="flex justify-between">
              <div className="md:flex text-slate-600">
                {item?.createdAt ? moment(item?.createdAt).format("ll") : null}
              </div>
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
        </div>
        {isDescription ? (
          <div className="md:flex grid md:gap-6 md:justify-between items-start">
            <div className="transition-all ease-in-out duration-200 md:w-[90%] w-full">
              <h1 className="text-sm font-semibold text-gray-600">
                Description :
              </h1>
              <p className="text-sm py-3 text-justify">{item?.description}</p>
            </div>
            <div className="transition-all ease-in-out duration-200 md:w-[50%] w-full">
              <h1 className="text-sm font-semibold text-gray-600">
                Detected By :
              </h1>
              <p className="text-sm py-3 tracking-wide">
                {item?.detectedBy?.name}
              </p>
            </div>
            <div className="md:w-[10%] pb-4 flex gap-2">
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

const ProfileImage = ({ id }: any) => {
  const { data: personData } = useFetch<User>(`users/${id}`);

  console.log(personData);

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
const bugSelects = [
  { id: 1, value: "Open", label: "Open" },
  { id: 2, value: "Pending", label: "Pending" },
  { id: 3, value: "Ongoing", label: "Ongoing" },
  { id: 4, value: "Fixed", label: "Fixed" },
  { id: 5, value: "Reviewed", label: "Reviewed" },
];
