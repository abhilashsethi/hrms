import {
  AccountTreeRounded,
  People,
  PlaylistAddCheckCircleRounded,
} from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import ICONS from "assets/icons";
import { useState, MouseEvent } from "react";
import {
  ClientLineCharts,
  ClientMultiDataChart,
  ClientPolarAreaCharts,
} from "components/analytics";

const ClientDashboard = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex gap-2 py-4">
        <div className="w-3/4 px-4 ">
          <Grid container spacing={2}>
            {cards?.map((item) => (
              <Grid key={item?.id} item lg={4}>
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
          <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
            <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-12 !border-grey-500 rounded-xl !shadow-xl">
              <ClientLineCharts text="Unblock/Block Report" type="area" />
            </div>
          </div>
        </div>
        <div className="w-1/4 p-3 bg-white rounded-xl shadow-xl flex flex-col gap-3">
          <h1 className="mt-2 font-bold text-theme">PROJECTS</h1>
          <div className="h-40 w-full border-2 rounded-xl py-4 px-6 flex tracking-wide">
            <div className="w-1/2 border-r-2 h-full flex flex-col gap-3 justify-center items-center">
              <span className="text-lg font-semibold text-theme">21</span>
              <span className="w-1/2 text-center font-semibold">
                Total Tasks
              </span>
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
      <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
        <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
          <ClientMultiDataChart text="Client Strength" type="bar" />
        </div>
        <div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
          <ClientPolarAreaCharts text="Contact Ratio" type="polarArea" />
        </div>
      </div>
    </>
  );
};

export default ClientDashboard;

const cards = [
  {
    id: 1,
    icon: <People fontSize="large" className="text-theme" />,
    count: "34",
    title: "Total Clients",
  },
  {
    id: 2,
    icon: <AccountTreeRounded fontSize="large" className="text-theme" />,
    count: "34",
    title: "Active Clients",
  },
  {
    id: 3,
    icon: (
      <PlaylistAddCheckCircleRounded fontSize="large" className="text-theme" />
    ),
    count: "34",
    title: "Inactive Clients",
  },
];
