import {
  DeleteRounded,
  EditRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Loader } from "components/core";
import { ProjectUpdate } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Projects } from "types";

const Projects = () => {
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const { data: projectData, mutate } = useFetch<Projects[]>(`projects`);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {projectData?.map((item: any) => (
        <div className="relative bg-white w-full rounded-xl flex flex-col gap-2 tracking-wide shadow-xl">
          <div className="absolute right-[10px] top-[10px]">
            <MoreOption item={item} mutate={mutate} />
          </div>
          <div className="px-4 py-2">
            <h1 className="py-1 text-xl font-semibold capitalize tracking-wide">
              {item?.name}
            </h1>
            <div className="text-sm text-gray-400 ">
              <span>Start Date -</span>{" "}
              <span>{moment(item?.startDate).format("ll")}</span>
            </div>
            <div className="py-4 text-md text-gray-400 tracking-wide">
              <p>{item?.description}</p>
            </div>
            <div className="py-2 text-md">
              <h2>Deadline :</h2>
              <span>{moment(item?.endDate).format("ll")}</span>
            </div>
            <div className="py-2 text-md">
              <h2>Team :</h2>
              <ProfilesView item={item?.userIDs} />
            </div>
            <div className="py-2 text-md">
              <h2>Github :</h2>
              <Link href="#">{item?.github}</Link>
            </div>
            <div className="py-2 text-md">
              <h2>Developing URL :</h2>
              <Link href="#">{item?.devURL} </Link>
            </div>
            <div className="py-2 text-md">
              <h2>Production URL :</h2>
              <Link href="#">{item?.prodURL} </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;

interface Props {
  item: any;
  mutate?: any;
}

const ProfilesView = ({ item }: Props) => {
  const [myData, setMyData] = useState<any>([]);
  const { data: usersData, isLoading } = useFetch<any>(`users`);
  useEffect(() => {
    let reqData = usersData?.filter((dt: any) => item?.includes(dt?.id));
    setMyData(reqData);
  }, [item]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="py-2 flex justify-start">
      <AvatarGroup max={5}>
        {myData?.map((teams: any) => (
          <>
            <Avatar alt={teams?.name} src={teams?.photo || " "} />
          </>
        ))}
      </AvatarGroup>
    </div>
  );
};
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
        <MenuItem onClick={() => setIsUpdate({ dialogue: true, id: item?.id })}>
          <ListItemIcon>
            <EditRounded fontSize="small" />
          </ListItemIcon>
          Edit
        </MenuItem>
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
