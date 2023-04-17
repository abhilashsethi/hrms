import {
  AccountTreeRounded,
  DoNotTouchRounded,
  HourglassBottomRounded,
  People,
  PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { DEFAULTIMG } from "assets/home";
import ICONS from "assets/icons";
import React from "react";

const EmployDashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex gap-2 py-4">
      <div className="w-3/4 px-4 ">
        <Grid container spacing={2}>
          {cards?.map((item) => (
            <Grid key={item?.id} item lg={3}>
              <div className="h-56 bg-white w-full p-8 flex flex-col rounded-xl shadow-xl justify-between border-b-4 border-theme">
                <div className="flex justify-end">
                  <IconButton size="small" onClick={handleClick}>
                    <ICONS.More />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem onClick={handleClose}>All Users</MenuItem>
                    <MenuItem onClick={handleClose}>View Dashboard</MenuItem>
                  </Menu>
                </div>
                <div>{item?.icon}</div>
                <span className="text-lg">{item?.count}</span>
                <span className="font-semibold tracking-wide text-sm">
                  {item?.title}
                </span>
              </div>
            </Grid>
          ))}
        </Grid>
        <div className="w-full mt-8">
          <h1 className="font-bold text-theme">TODAY</h1>
          <div className="flex flex-col gap-1">
            <div className="py-4 w-full mt-4 rounded-xl bg-white flex justify-between items-center px-8 shadow-lg border-b-[1px] border-dashed border-theme">
              <div className="flex gap-4 items-center">
                <HourglassBottomRounded
                  fontSize="large"
                  className="!text-theme"
                />
                <span className="text-secondary-700 font-semibold">
                  John Doe is off sick today!
                </span>
              </div>
              <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-secondary-200">
                <img
                  className="h-full object-cover "
                  src={DEFAULTIMG.src}
                  alt=""
                />
              </div>
            </div>
            <div className="py-4 w-full mt-4 rounded-xl bg-white flex justify-between items-center px-8 shadow-lg border-b-[1px] border-dashed border-theme">
              <div className="flex gap-4 items-center">
                <HourglassBottomRounded
                  fontSize="large"
                  className="!text-theme"
                />
                <span className="text-secondary-700 font-semibold">
                  John Doe is off sick today!
                </span>
              </div>
              <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-secondary-200">
                <img
                  className="h-full object-cover "
                  src={DEFAULTIMG.src}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/4 p-3 bg-white rounded-xl shadow-xl flex flex-col gap-3">
        <h1 className="mt-2 font-bold text-theme">PROJECTS</h1>
        <div className="h-40 w-full border-2 rounded-xl py-4 px-6 flex tracking-wide">
          <div className="w-1/2 border-r-2 h-full flex flex-col gap-3 justify-center items-center">
            <span className="text-lg font-semibold text-theme">21</span>
            <span className="w-1/2 text-center font-semibold">Total Tasks</span>
          </div>
          <div className="w-1/2 h-full flex flex-col gap-3 justify-center items-center">
            <span className="text-lg font-semibold text-theme">21</span>
            <span className="w-1/2 text-center font-semibold">
              Pending Tasks
            </span>
          </div>
        </div>
        <h1 className="mt-2 font-bold text-theme ">UPCOMING HOLIDAY</h1>
        <div className="w-full h-16 border-2 grid place-items-center text-sm tracking-wide rounded-xl border-secondary-600">
          Mon 20 May 2023 - Ramzan
        </div>
      </div>
    </div>
  );
};

export default EmployDashboard;

const cards = [
  {
    id: 1,
    icon: <People fontSize="large" className="text-theme" />,
    count: "34",
    title: "Total Employees",
  },
  {
    id: 2,
    icon: <AccountTreeRounded fontSize="large" className="text-theme" />,
    count: "34",
    title: "Total projects",
  },
  {
    id: 3,
    icon: (
      <PlaylistAddCheckCircleRounded fontSize="large" className="text-theme" />
    ),
    count: "34",
    title: "Today's Attendance",
  },
  {
    id: 4,
    icon: <DoNotTouchRounded fontSize="large" className="text-theme" />,
    count: "34",
    title: "Absentees",
  },
];
