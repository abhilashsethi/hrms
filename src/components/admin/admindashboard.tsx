import {
  People,
  PlaylistAddCheckCircleRounded,
  QrCodeScannerRounded,
} from "@mui/icons-material";
import {
  Grid,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import ICONS from "assets/icons";
import React from "react";

const AdminDashboard = () => {
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
      </div>
      <div className="w-1/4 p-2 rounded-xl shadow-xl flex flex-col gap-3">
        {stats.map((item) => (
          <div
            key={item?.id}
            className="h-40 w-full border-2 rounded-xl py-4 px-6 flex flex-col justify-between tracking-wide"
          >
            <div className="flex justify-between items-center">
              <span className="text-theme font-semibold">New Employees</span>
              <span className="font-semibold text-emerald-600">+10%</span>
            </div>
            <span className="text-xl font-bold">10</span>
            <div>
              <LinearProgress variant="determinate" value={20} />
              <span className="text-sm pt-6">Overall Employees 218</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

const cards = [
  {
    id: 1,
    icon: <People fontSize="large" className="text-theme" />,
    count: "34",
    title: "Total Users",
  },
  {
    id: 2,
    icon: <QrCodeScannerRounded fontSize="large" className="text-theme" />,
    count: "34",
    title: "Scanned Cards",
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
    icon: <People fontSize="large" className="text-theme" />,
    count: "34",
    title: "Other",
  },
];

const stats = [
  {
    id: 1,
    title: "New Employees",
    growth: "+10%",
    value: "10",
    sub: "Overall Employees 218",
  },
  {
    id: 2,
    title: "New Employees",
    growth: "+10%",
    value: "10",
    sub: "Overall Employees 218",
  },
  {
    id: 3,
    title: "New Employees",
    growth: "+10%",
    value: "10",
    sub: "Overall Employees 218",
  },
];