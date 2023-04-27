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
import { useFetch } from "hooks";
import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import { Projects } from "types";

const Projects = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [isUpdate, setisUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const { data: projectData, mutate } = useFetch<Projects[]>(`projects`);
  console.log(projectData);
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <ProjectUpdate
        id={isUpdate?.id}
        open={isUpdate?.dialogue}
        handleClose={() => setisUpdate({ dialogue: false })}
        mutate={mutate}
      />
      {projectData?.map((items: any) => (
        <div className="relative bg-white w-full rounded-xl flex flex-col gap-2 tracking-wide shadow-xl">
          <div className="absolute right-[10px] top-[10px]">
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
              <div
                onClick={() => setisUpdate({ dialogue: true, id: items?.id })}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <EditRounded fontSize="small" />
                  </ListItemIcon>
                  Edit
                </MenuItem>
              </div>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteRounded fontSize="small" />
                </ListItemIcon>
                Delete
              </MenuItem>
            </Menu>
          </div>
          <div className="px-4 py-2">
            <h1 className="py-1 text-xl font-semibold capitalize tracking-wide">
              {items?.name}
            </h1>
            <div className="text-sm text-gray-400 ">
              <span>Start Date -</span>{" "}
              <span>{moment(items?.startDate).format("ll")}</span>
            </div>
            <div className="py-4 text-md text-gray-400 tracking-wide">
              <p>{items?.description}</p>
            </div>
            <div className="py-2 text-md">
              <h2>Deadline :</h2>
              <span className="text-gray-400 text-sm">{"null"}</span>
            </div>
            <div className="py-2 text-md">
              <h2>Team :</h2>
              <ProfilesView item={items?.userIDs} />
            </div>
            <div className="py-2 text-md">
              <h2>Github :</h2>
              <Link href="#">{items?.github}</Link>
            </div>
            <div className="py-2 text-md">
              <h2>Developing URL :</h2>
              <Link href="#">{items?.devURL} </Link>
            </div>
            <div className="py-2 text-md">
              <h2>Production URL :</h2>
              <Link href="#">{items?.prodURL} </Link>
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
