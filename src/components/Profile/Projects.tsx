import {
  DeleteRounded,
  EditRounded,
  Event,
  MoreVertRounded,
  TaskAlt,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
} from "@mui/material";
import { AWS, CSS, JAVASCRIPT, NEXTJS, REACT } from "assets/svgicons";
import { PhotoViewer } from "components/core";
import { ProjectAddLink, ProjectUpdate } from "components/dialogues";
import { ProjectMembers, ProjectURLS } from "components/drawer";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import Link from "next/link";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { Projects } from "types";
interface PROPS {
  projectData?: any;
  mutate?: any;
  isLoading?: any;
}
const Projects = ({ projectData, mutate, isLoading }: PROPS) => {
  const [url, setUrl] = useState<{
    dialogue?: boolean;
    projectId?: string | null;
  }>({
    dialogue: false,
    projectId: null,
  });
  const [isMembers, setIsMembers] = useState(false);
  const [isProjectData, setIsProjectData] = useState<Projects | null>(null);

  return (
    <>
      <ProjectURLS
        id={url?.projectId}
        open={url?.dialogue}
        onClose={() => setUrl({ dialogue: false })}
      />
      <ProjectMembers
        projectData={isProjectData}
        mutate={mutate}
        open={isMembers}
        onClose={() => setIsMembers(false)}
      />
      {isLoading && (
        <div className="w-full flex gap-2 mb-4">
          {skeletons?.map((item) => (
            <>
              <SkeletonsStructure key={item?.id} />
            </>
          ))}
        </div>
      )}

      {/* ----------------------- */}
      <div className="grid gap-6 lg:grid-cols-3 pb-8">
        {projectData?.map((item: any) => (
          <div
            key={item?.id}
            className="relative bg-white w-full rounded-xl flex flex-col gap-2 tracking-wide border-b-[3px] border-theme shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]"
          >
            <div className="absolute right-[10px] top-[10px]">
              <MoreOption item={item} mutate={mutate} />
            </div>
            <div className="px-4 py-2">
              <div className="flex gap-2 items-center">
                <TaskAlt fontSize="small" />
                <h2 className="py-1 font-semibold capitalize tracking-wide">
                  {item?.name}
                </h2>
              </div>
              <div className="flex justify-between items-start py-4">
                <span className="text-sm flex flex-col">
                  <span className="font-semibold">Industry</span>
                  <span className="">
                    {item?.industry ? item?.industry : "Not specified"}
                  </span>
                </span>
                <span
                  className={`px-3 py-1 uppercase rounded-sm shadow-md text-xs tracking-wide font-semibold text-white ${
                    item?.status === "Pending"
                      ? `bg-yellow-500`
                      : item?.status === "Ongoing"
                      ? `bg-blue-500`
                      : item?.status === "Onhold"
                      ? `bg-red-500`
                      : item?.status === "Completed"
                      ? `bg-green-500`
                      : `bg-slate-500`
                  }`}
                >
                  {item?.status}
                </span>
              </div>
              <div>
                <h1 className="font-semibold text-sm">Client Information : </h1>
                {item?.client ? (
                  <div className="w-full border-2 mt-1 rounded-md p-3 flex gap-3 items-center">
                    <PhotoViewer
                      name={item?.client?.name}
                      photo={item?.client?.photo}
                      size="3rem"
                    />
                    <div>
                      <h2 className="text-sm font-semibold">
                        {item?.client?.name}
                      </h2>
                      <h2 className="font-light text-sm">
                        {item?.client?.email}
                      </h2>
                    </div>
                  </div>
                ) : (
                  <span className="py-4 text-sm">Not specified</span>
                )}
              </div>
              <div className="grid grid-cols-2 w-4/5 gap-1 text-sm py-2">
                <div className="font-semibold">Created :</div>
                <div className="flex gap-2 items-center">
                  {item?.startDate ? (
                    <Event className="!text-gray-600" fontSize="small" />
                  ) : null}
                  <span>
                    {item?.startDate
                      ? moment(item?.startDate).format("ll")
                      : `Not specified`}
                  </span>
                </div>
                <div className="font-semibold">Deadline :</div>
                <div className="flex gap-2 items-center">
                  {item?.endDate ? (
                    <Event className="!text-gray-600" fontSize="small" />
                  ) : null}
                  <span>
                    {item?.endDate
                      ? moment(item?.endDate).format("ll")
                      : `Not specified`}
                  </span>
                </div>
                <div className="font-semibold">Quick Links :</div>
                <span
                  onClick={() =>
                    setUrl({ dialogue: true, projectId: item?.id })
                  }
                  className="w-full py-2 flex justify-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-200 rounded-sm bg-gradient-to-r from-slate-700 via-slate-500 to-slate-500 shadow-md text-xs tracking-wide font-semibold text-white"
                >
                  Project URLs
                </span>
              </div>

              <div className="py-2 text-md ">
                <div className="flex gap-6 items-center">
                  <span className="text-sm font-semibold">Team :</span>
                </div>
                {!item?.involvedMembers?.length ? (
                  <p>No Members assigned.</p>
                ) : (
                  <div className="flex gap-2 group items-center pt-2">
                    <AvatarGroup
                      className="!cursor-pointer"
                      onClick={() => {setIsMembers(true), setIsProjectData(item)}}
                      max={4}
                    >
                      {item?.involvedMembers?.map(
                        (data: { name?: string; photo?: string }) => (
                          <Avatar alt={data?.name} src={data?.photo || " "} />
                        )
                      )}
                    </AvatarGroup>
                    <span>{item?.Manager?.name}</span>
                  </div>
                )}
              </div>
              <div>
                <span className="text-sm font-semibold">Technology Used:</span>
                {!item?.technologies?.length ? (
                  <p>Not specified</p>
                ) : (
                  <div className="py-4 flex gap-3 flex-wrap">
                    {item?.technologies?.map((data: any) => (
                      <Tooltip title={data?.name}>
                        <img
                          key={data?.id}
                          className="h-7 object-contain"
                          src={data?.logo}
                          alt="photo"
                        />
                      </Tooltip>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects;

interface Props {
  item: any;
  mutate?: any;
}
const MoreOption = ({ item, mutate }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { change } = useChange();
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isAdd, setIsAdd] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });

  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await change(`projects/${id}`, {
            method: "DELETE",
          });
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          Swal.fire(`Success`, "Deleted Successfully!", "success");
          mutate();

          return;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ProjectUpdate
        id={isUpdate?.id}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <ProjectAddLink
        id={isAdd?.id}
        open={isAdd?.dialogue}
        handleClose={() => setIsAdd({ dialogue: false })}
        mutate={mutate}
      />
      <Tooltip title="More">
        <IconButton onClick={handleClick}>
          <MoreVertRounded />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: "15th June 2021",
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link href={`/admin/projects/project-details?id=${item?.id}`}>
          <MenuItem>
            <ListItemIcon>
              <EditRounded fontSize="small" />
            </ListItemIcon>
            Details
          </MenuItem>
        </Link>
        <MenuItem onClick={() => handleDelete(item?.id)}>
          <ListItemIcon>
            <DeleteRounded fontSize="small" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

const techs = [
  { id: 1, img: REACT.src },
  { id: 2, img: JAVASCRIPT.src },
  { id: 3, img: NEXTJS.src },
  { id: 4, img: AWS.src },
  { id: 5, img: CSS.src },
];

const skeletons = [{ id: 1 }, { id: 2 }, { id: 3 }];

const SkeletonsStructure = () => {
  return (
    <div className="w-1/3 px-4">
      <div className="h-full w-full border-2 rounded-md p-4">
        <div className="flex gap-2 items-center">
          <Skeleton variant="circular" width={22} height={22} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
        </div>
        <div className="flex gap-2 items-start mt-4">
          <div className="w-full">
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "40%" }} />
            <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
          </div>
          <Skeleton variant="text" sx={{ fontSize: "1.3rem", width: "45%" }} />
        </div>
        <div className="mt-4">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "50%" }} />
          <div className="w-full border-2 mt-1 rounded-md p-3 flex gap-3 items-center">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="w-2/3">
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "50%" }}
              />
              <Skeleton
                variant="text"
                sx={{ fontSize: "1rem", width: "70%" }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 w-4/5 gap-1 text-sm mt-4">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70%" }} />
        </div>
        <div className="w-full mt-6">
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "75%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "50%" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem", width: "60%" }} />
        </div>
      </div>
    </div>
  );
};

interface techSectionProps {
  techIds?: string[];
}
