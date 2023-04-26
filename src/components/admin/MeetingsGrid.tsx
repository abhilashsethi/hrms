import {
  DeleteRounded,
  EditRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import {
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { MouseEvent, useState } from "react";

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
  return (
    <>
      <div className="grid py-4 gap-6 lg:grid-cols-3">
        {projectData?.map((items: any) => (
          <div className="relative py-4 bg-white w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-xl">
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
                <span>{items?.startLine}</span>
              </div>
              <div className="py-2 text-md text-gray-400 tracking-wide">
                <p>{items?.description}</p>
              </div>
              <div className="py-2 text-md tracking-wide">
                <p className="">Longitude :</p>
                <Link href="#">{items?.longitude}</Link>
              </div>
              <div className="py-2 text-md tracking-wide">
                <p className="">Latitude :</p>
                <Link href="#">{items?.latitude}</Link>
              </div>
              <div className="flex gap-2 py-1 justify-center">
                <div className="text-md hover:scale-105 ease-in-out transition-all duration-200 rounded-lg shadow-lg border-2 px-10 py-2 grid justify-items-center">
                  <h1 className="text-md pb-2 font-semibold">Client</h1>
                  <img
                    alt=""
                    className="self-center flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-full bg-gray-500"
                    src={items?.photo}
                  />
                  <span className="text-sm pt-2 text-slate-400 font-medium">
                    {items?.client}
                  </span>
                </div>
                <div className="text-md hover:scale-105 ease-in-out transition-all duration-200 rounded-lg shadow-lg border-2 px-10 py-2 grid justify-items-center">
                  <h1 className="text-md pb-2 font-semibold">Member</h1>
                  <img
                    alt=""
                    className="self-center flex-shrink-0 w-24 h-24 bg-center bg-cover rounded-full bg-gray-500"
                    src={items?.memberPhoto}
                  />
                  <span className="text-sm pt-2 text-slate-400 font-medium">
                    {items?.member}
                  </span>
                </div>
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
    name: "Kendriya Vidyalaya",
    startLine: "10:00:00 AM - 12:00:01 PM",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    photo: "https://source.unsplash.com/100x100/?portrait?30",
    mode: "Virtual",
    client: "John Done",
    longitude: "https://source.unsplash.com/100x100/?portrait?300",
    latitude: "https://source.unsplash.com/100x100/?portrait?300",
    memberPhoto: "https://source.unsplash.com/100x100/?portrait?300",
    member: "Srinu Ready",
  },
  {
    name: "Trident Academy",
    startLine: "10:00:00 AM - 12:00:01 PM",
    description:
      " Lorem ipsum dolor sit, amet consectetur ipsum dolor sit, amet consectetur adipisicing elit. ",
    mode: "Virtual",
    photo: "https://source.unsplash.com/100x100/?portrait?20",
    memberPhoto: "https://source.unsplash.com/100x100/?portrait?200",
    client: "John Done",
    member: "Srinu Ready",
    longitude: "https://source.unsplash.com/100x100/?portrait?300",
    latitude: "https://source.unsplash.com/100x100/?portrait?300",
  },
  {
    name: "Litu Bittle Shop",
    startLine: "10:00:00 AM - 12:00:01 PM",
    description: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. ",
    mode: "Physical",
    photo: "https://source.unsplash.com/100x100/?portrait?10",
    memberPhoto: "https://source.unsplash.com/100x100/?portrait?28",
    client: "John Done",
    member: "Srinu Ready",
    longitude: "https://source.unsplash.com/100x100/?portrait?300",
    latitude: "https://source.unsplash.com/100x100/?portrait?300",
  },
];
