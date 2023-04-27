import {
  ChevronLeftRounded,
  ChevronRightRounded,
  GridViewRounded,
  InsertInvitationRounded,
  Search,
  TableRowsRounded,
} from "@mui/icons-material";
import { useState, useRef, useEffect } from "react";
import { Button, Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { AttendanceGrid, AttendanceList } from "components/admin";
import { AdminBreadcrumbs, Empty, TextTitles } from "components/core";
import PanelLayout from "layouts/panel";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFetch } from "hooks";
import { addDays } from "date-fns";
import { DOCUMENT_NOT_FOUND } from "assets/animations";
import LoaderAnimeLarge from "components/core/LoaderAnime";

const TodayAttendance = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [searchedUser, setSearchedUser] = useState<any>([]);
  const [status, setStatus] = useState(false);
  const [userName, setUsername] = useState("");
  const [empId, setEmpId] = useState("");
  const dateRef = useRef<any>();
  function handleDateChange(date: any) {
    setSelectedDate(date);
    console.log(date);
  }
  const { data: attendance } = useFetch<any>(
    `attendances/isPresent/date/${selectedDate.toISOString().slice(0, 10)}${
      status ? `?isPresent=true` : ``
    }`
  );
  useEffect(() => {
    if (attendance) {
      const filtered = attendance.filter((user: any) => {
        return user?.name?.toLowerCase().includes(userName?.toLowerCase());
      });
      setSearchedUser(filtered);
    }
  }, [attendance, userName]);

  useEffect(() => {
    if (attendance) {
      const filtered = attendance.filter((user: any) => {
        return user?.employeeID?.toLowerCase().includes(empId?.toLowerCase());
      });
      setSearchedUser(filtered);
    }
  }, [attendance, empId]);

  const cards = [
    {
      id: 1,
      title: "Total Users",
      value: `${attendance?.length ? attendance?.length : `0`}`,
    },
    {
      id: 2,
      title: "Present",
      value: `${
        attendance?.length
          ? attendance?.filter((item: any) => item?.isPresent)?.length
          : `0`
      }`,
    },
    {
      id: 3,
      title: "Absent",
      value: `${
        attendance?.length
          ? attendance?.filter((item: any) => !item?.isPresent)?.length
          : `0`
      }`,
    },
  ];
  const tomorrow = addDays(new Date(), 1);
  const disabledDates = [];
  for (let i = 0; i < 365; i++) {
    // disable dates for the next year
    disabledDates.push(addDays(tomorrow, i));
  }

  return (
    <PanelLayout title="Today Attendance - SY HR MS">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="mt-4 flex justify-between">
          <TextTitles title="ATTENDANCE" />
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <IconButton onClick={() => setIsGrid(true)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    isGrid && `border-2 border-theme`
                  }`}
                >
                  <GridViewRounded className={`${isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
              <IconButton onClick={() => setIsGrid(false)} size="small">
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    !isGrid && `border-2 border-theme`
                  }`}
                >
                  <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
            </div>
            <div className="flex gap-3 items-center">
              <ChevronLeftRounded />
              <div className="tracking-wide flex gap-4 items-center font-semibold">
                {moment(selectedDate).format("ll")}
                <IconButton onClick={() => dateRef.current.setOpen(true)}>
                  <InsertInvitationRounded className="!cursor-pointer" />
                </IconButton>
                <div className="">
                  <DatePicker
                    ref={dateRef}
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="dd/MM/yyyy"
                    // isClearable
                    showYearDropdown
                    excludeDates={disabledDates}
                    className="hidden"
                  />
                </div>
              </div>
              <ChevronRightRounded />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Grid container spacing={2}>
            {cards?.map((item) => (
              <Grid key={item?.id} item lg={4}>
                <div className="w-full tracking-wide border-b-4 hover:bg-theme hover:text-white hover:border-white border-theme h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center transition-all ease duration-300">
                  <p className="text-base font-semibold text-center">
                    {item?.title}
                  </p>
                  <p className="text-lg font-bold">{item?.value}</p>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-4">
          <TextField
            fullWidth
            size="small"
            placeholder="Employee Id"
            name="employeeId"
            onChange={(e) => setEmpId(e.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            placeholder="Employee Name"
            onChange={(e) => setUsername(e.target.value)}
            name="employeeName"
          />
          <TextField
            size="small"
            fullWidth
            select
            label="Status"
            defaultValue="EUR"
            onChange={(e: any) => setStatus(e.target.value)}
          >
            {selects.map((option: any) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            fullWidth
            startIcon={<Search />}
            variant="contained"
            className="!bg-theme"
          >
            Search
          </Button>
        </div>
        {isGrid ? (
          searchedUser.length > 0 ? (
            <AttendanceGrid data={searchedUser} />
          ) : (
            <>
              <div>
                <LoaderAnimeLarge />
              </div>
            </>
          )
        ) : (
          <AttendanceList data={searchedUser} />
        )}
      </section>
    </PanelLayout>
  );
};

export default TodayAttendance;

const selects = [
  { id: 1, value: true, label: "Present" },
  { id: 2, value: false, label: "All" },
];

const links = [
  { id: 1, page: "Attendances", link: "/admin/attendances" },
  {
    id: 2,
    page: "Datewise",
    link: "/admin/attendances/today",
  },
];
