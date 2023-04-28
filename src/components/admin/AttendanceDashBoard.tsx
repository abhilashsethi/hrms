import { Groups, HowToReg, MoreVert, PersonOff } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import DailyAttendance from "components/analytics/DailyAttendance";
import GenderRation from "components/analytics/GenderRation";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import RolewiseStrength from "components/analytics/RolewiseStrength";
import React from "react";
import { HeadText, UpcomingLeaves } from "components/core";
import EmployeeAllAttendance from "./EmployeeAllAttendance";

const AttendanceDashBoard = () => {
  function renderEventContent(eventInfo: any) {
    return (
      <>
        {eventInfo.event.title === "PRESENT" && (
          <div className="flex flex-col">
            <div className="flex justify-center bg-green-300 text-green-600">
              <span className="font-semibold">PRESENT</span> : 24
            </div>
            <div className="flex justify-center bg-red-300 text-red-600">
              <span className="font-semibold">ABSENT</span> : 04
            </div>
          </div>
        )}
      </>
    );
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="flex gap-2 py-4">
        <Grid container spacing={1}>
          <Grid item lg={8}>
            <div className="w-full px-4 ">
              <Grid container spacing={2}>
                {cards?.map((item) => (
                  <Grid key={item?.id} item lg={4}>
                    <div className="group card1 h-36 bg-white w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
                      <div className="flex justify-end">
                        <IconButton size="small" onClick={handleClick}>
                          <MoreVert className="group-hover:text-white" />
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
                          <MenuItem onClick={handleClose}>
                            View Dashboard
                          </MenuItem>
                        </Menu>
                      </div>
                      <div className="flex justify-around items-center">
                        <div>{item?.icon}</div>
                        <span className="text-xl text-theme font-semibold group-hover:text-white">
                          {item?.count}
                        </span>
                      </div>
                      <span className="group-hover:text-white text-theme font-semibold text-center tracking-wide text-lg">
                        {item?.title}
                      </span>
                    </div>
                  </Grid>
                ))}
              </Grid>
              <div className="mt-6">
                <div className="mb-4">
                  <HeadText title="Monthwise attendance" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xl">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    eventContent={renderEventContent}
                    events={attendance}
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className="w-full h-full">
              <div className="w-full h-full">
                <EmployeeAllAttendance />
                <UpcomingLeaves />
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className="grid grid-cols-12 content-between gap-6  m-5 !mb-6">
        <div className="col-span-12 pt-9 w-full  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
          <DailyAttendance text="Attendance from last week" type="area" />
        </div>
        <div className="col-span-12 pt-9 w-full flex flex-col justify-center gap-5 md:col-span-12 lg:col-span-5 !border-gray-500 rounded-xl !shadow-xl">
          <GenderRation text="Today's Attendance" type="donut" />
        </div>
      </div>
    </>
  );
};

export default AttendanceDashBoard;

const cards = [
  {
    id: 1,
    icon: (
      <HowToReg
        fontSize="large"
        className="text-theme group-hover:text-white shadow-xl rounded-lg"
      />
    ),
    count: "34",
    title: "Today Present",
  },
  {
    id: 2,
    icon: (
      <PersonOff
        fontSize="large"
        className="text-theme group-hover:text-white shadow-xl rounded-lg"
      />
    ),
    count: "10",
    title: "Today Absent",
  },
  {
    id: 3,
    icon: (
      <Groups
        fontSize="large"
        className="text-theme group-hover:text-white shadow-xl rounded-lg"
      />
    ),
    count: "44",
    title: "Total Employees",
  },
];

const attendance = [
  { title: "PRESENT", date: "2023-04-03" },
  { title: "PRESENT", date: "2023-04-04" },
  { title: "PRESENT", date: "2023-04-05" },
  { title: "PRESENT", date: "2023-04-06" },
  { title: "PRESENT", date: "2023-04-07" },
  { title: "PRESENT", date: "2023-04-10" },
  { title: "PRESENT", date: "2023-04-11" },
  { title: "PRESENT", date: "2023-04-12" },
  { title: "PRESENT", date: "2023-04-13" },
  { title: "PRESENT", date: "2023-04-14" },
  { title: "PRESENT", date: "2023-04-17" },
  { title: "PRESENT", date: "2023-04-18" },
  { title: "PRESENT", date: "2023-04-19" },
  { title: "PRESENT", date: "2023-04-20" },
  { title: "PRESENT", date: "2023-04-21" },
  { title: "PRESENT", date: "2023-04-24" },
  { title: "PRESENT", date: "2023-04-25" },
  { title: "PRESENT", date: "2023-04-26" },
];
