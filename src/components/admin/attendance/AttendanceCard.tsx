import { Groups, HowToReg, MoreVert, PersonOff } from "@mui/icons-material";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
// import RolewiseStrength from "components/analytics/RolewiseStrength";
import React, { useEffect, useState } from "react";
import { HeadText, UpcomingLeaves } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import { DailyAttendance, DonutChart } from "components/analytics";
import ICONS from "assets/icons";
import EmployeeAllAttendance from "../EmployeeAllAttendance";

const AttendanceDashBoard = () => {
  const [attendances, setAttendances] = useState([]);
  function renderEventContent(eventInfo: any) {
    return (
      <>
        {eventInfo.event.title === "PRESENT" && (
          <div className="flex flex-col">
            <div className="flex justify-center bg-green-300 text-green-600">
              <span className="font-semibold">PRESENT</span> :{" "}
              {eventInfo?.event?.extendedProps?.present}
            </div>
            <div className="flex justify-center bg-red-300 text-red-600">
              <span className="font-semibold">ABSENT</span> :{" "}
              {eventInfo?.event?.extendedProps?.absent}
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

  const { data: attendanceData } = useFetch<any>(
    `attendances/get-by-month?month=3`
  );
  useEffect(() => {
    let reqData = attendanceData?.map((item: any) => {
      return {
        ...item,
        date: `${moment(item?.date).format("YYYY-MM-DD")}`,
        title: "PRESENT",
        present: item?.present,
        absent: item?.absent,
      };
    });
    const myData = reqData?.filter((item: any) => item?.present);
    setAttendances(myData);
  }, [attendanceData]);

  console.log(attendances);

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

  return (
    <>
      <div className="flex gap-2 py-4">
        <Grid container spacing={1}>
          <Grid item lg={8}>
            <div className="w-full px-4 ">
              <Grid container spacing={2}>
                {cards?.map((item) => (
                  <Grid key={item?.id} item lg={4}>
                    <div className="hover:scale-105 transition duration-300 ease-in-out border-2 border-b-theme h-28 w-full p-2 flex flex-col rounded-xl shadow-xl justify-between cursor-pointer">
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
                          <MenuItem onClick={handleClose}>
                            View Dashboard
                          </MenuItem>
                        </Menu>
                      </div>
                      <div className="flex justify-around items-center">
                        <div>{item?.icon}</div>
                        <span className="text-xl text-theme font-semibold ">
                          {item?.count}
                        </span>
                      </div>
                      <span className="pt-2 text-theme font-semibold text-center tracking-wide text-md">
                        {item?.title}
                      </span>
                    </div>
                  </Grid>
                ))}
              </Grid>
              <div className="mt-6">
                <div className="mb-4">
                  <HeadText title="Month-wise attendance" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xl">
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    eventContent={renderEventContent}
                    events={attendances}
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
    </>
  );
};

export default AttendanceDashBoard;
