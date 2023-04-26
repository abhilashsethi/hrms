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
import { ProjectUpdate } from "components/dialogues";
import { useFetch } from "hooks";
import moment from "moment";
import { MouseEvent, useEffect, useState } from "react";
import { Projects } from "types";

const MeetingsGrid = () => {
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
  //   const { data: projectData, mutate } = useFetch<Projects[]>(`projects`);
  //   console.log(projectData);
  return (
    <>
      <div className="grid py-4 gap-6 lg:grid-cols-3">
        {projectData?.map((items: any) => (
          <div className="relative bg-white w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
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
            <div className="px-4">
              <span className="py-1 pr-4 text-xl font-semibold capitalize tracking-wide">
                {items?.name}
              </span>
              <span className="bg-green-400 px-4 py-1 text-green-700 font-semibold rounded-full">
                {items?.mode}{" "}
              </span>
              <div className="text-sm py-1 text-gray-400 ">
                <span>Start Date -</span>{" "}
                <span>{moment(items?.startDate).format("ll")}</span>
              </div>
              <div className="py-2 text-md text-gray-400 tracking-wide">
                <p>{items?.description}</p>
              </div>
              <div className="py-2 text-md">
                <h2>Deadline :</h2>
                <span className="text-gray-400 text-sm">{items.deadLine}</span>
              </div>
              <div className="py-2 text-md">
                <h2>Team :</h2>
                <div className="py-2 flex justify-start">
                  <AvatarGroup max={5}>
                    {items?.team?.map((teams: any) => (
                      <>
                        <Avatar alt={teams?.name} src={teams?.photo || " "} />
                      </>
                    ))}
                  </AvatarGroup>
                </div>
              </div>
              <div className="py-2 text-md">
                <h2>Location : {items?.location} </h2>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MeetingsGrid;

const projectData = [
  {
    name: "Univer Smart Educaton",
    startLine: "25th April 10:00:00 AM",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    deadLine: "26th April 4:00:00 PM",
    team: [
      {
        name: "Kumar",
        photo: "https://source.unsplash.com/100x100/?portrait?0",
      },
      {
        name: "Srinu",
        photo: "https://source.unsplash.com/100x100/?portrait?2",
      },
    ],
    location: "SY Office",
    mode: "Virtual",
  },
  {
    name: "Study In Rusia",
    startLine: "20th April 10:00:00 AM",
    description:
      " Lorem ipsum dolor sit, amet consectetur ipsum dolor sit, amet consectetur adipisicing elit. ",
    deadLine: "28th April 4:00:00 PM",
    team: [
      {
        name: "Kumar",
        photo: "https://source.unsplash.com/100x100/?portrait?10",
      },
      {
        name: "Srinu",
        photo: "https://source.unsplash.com/100x100/?portrait?20",
      },
      {
        name: "Kumar",
        photo: "https://source.unsplash.com/100x100/?portrait?3",
      },
      {
        name: "Srinu",
        photo: "https://source.unsplash.com/100x100/?portrait?4",
      },
      {
        name: "Kumar",
        photo: "https://source.unsplash.com/100x100/?portrait?5",
      },
      {
        name: "Srinu",
        photo: "https://source.unsplash.com/100x100/?portrait?6",
      },
    ],
    location: "SY Office",
    mode: "Virtual",
  },
  {
    name: "Political Web Application",
    startLine: "26th April 10:00:00 AM",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    deadLine: "26th April 4:00:00 PM",
    team: [
      {
        name: "Kumar",
        photo: "https://source.unsplash.com/100x100/?portrait?100",
      },
      {
        name: "Srinu",
        photo: "https://source.unsplash.com/100x100/?portrait?99",
      },
    ],
    location: "SY Office",
    mode: "Physical",
  },
];
