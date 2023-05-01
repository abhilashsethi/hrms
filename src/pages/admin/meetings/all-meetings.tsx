import {
  Add,
  ChevronLeftRounded,
  ChevronRightRounded,
  GridViewRounded,
  InsertInvitationRounded,
  Search,
  TableRowsRounded,
  Upload,
} from "@mui/icons-material";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import {
  EmployeesColumn,
  EmplyeesGrid,
  MeetingsColumn,
  MeetingsGrid,
} from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import { UploadEmployData } from "components/dialogues";
import PanelLayout from "layouts/panel";
import moment from "moment";
import Link from "next/link";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const AllMeetings = () => {
  const dateRef = useRef<any>();
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [isGrid, setIsGrid] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [value, setValue] = useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  function handleDateChange(date: any) {
    setSelectedDate(date);
    console.log(date);
  }
  return (
    <>
      <PanelLayout title="Meetings - Admin Panel">
        <section className="px-8">
          <UploadEmployData
            open={isUpload}
            handleClose={() => setIsUpload(false)}
          />
          <div className="flex justify-between items-center py-4">
            <AdminBreadcrumbs links={links} />
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
                    <TableRowsRounded
                      className={`${!isGrid && `!text-theme`}`}
                    />
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
                      className="hidden"
                    />
                  </div>
                </div>
                <ChevronRightRounded />
              </div>
              {/* <Link href="/admin/employees/create-employee">
                <Button
                  className="!bg-theme"
                  variant="contained"
                  startIcon={<Add />}
                >
                  ADD MEETINGS
                </Button>
              </Link> */}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              id="employeeId"
              placeholder="Employee Id"
              name="employeeId"
            />
            <TextField
              fullWidth
              size="small"
              id="employeeName"
              placeholder="Employee Name"
              name="employeeName"
            />
            <TextField
              fullWidth
              select
              label="Select Role"
              size="small"
              value={value}
              onChange={handleChange}
            >
              {roles.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.value}
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
          {isGrid ? <MeetingsGrid /> : <MeetingsColumn />}
        </section>
      </PanelLayout>
    </>
  );
};

export default AllMeetings;

const roles = [
  { id: 1, value: "Web Developer" },
  { id: 2, value: "IOS Developer" },
  { id: 3, value: "Android Developer" },
  { id: 4, value: "Team Leader" },
];

const links = [
  { id: 1, page: "Meetings", link: "/admin/meetings" },
  { id: 2, page: "All Meetings", link: "/admin/meetings/all-meetings" },
];
