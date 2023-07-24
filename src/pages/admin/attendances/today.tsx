import {
  Close,
  FilterListRounded,
  InsertInvitationRounded,
} from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { AttendanceGrid, AttendanceList } from "components/admin/attendance";
import {
  AdminBreadcrumbs,
  GridAndList,
  Loader,
  LoaderAnime,
} from "components/core";
import { addDays } from "date-fns";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TodayAttendance = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState<string | null>(null);
  const [userName, setUsername] = useState<string | null>(null);
  const [empId, setEmpId] = useState<string | null>(null);
  const { user } = useAuth();
  const dateRef = useRef<any>();
  function handleDateChange(date: any) {
    setSelectedDate(date);
  }
  const links = [
    { id: 1, page: "Attendances", link: "/admin/attendances" },
    {
      id: 2,
      page: "Date Wise",
      link: "/admin/attendances/today",
    },
  ];

  const {
    data: attendance,
    isLoading,
    pagination,
  } = useFetch<any>(
    `attendances/${selectedDate
      .toISOString()
      .slice(0, 10)}/${status}?page=${pageNumber}&limit=8${
      userName ? `&employeeName=${userName}` : ""
    }${
      user?.role?.name === "CEO" || user?.role?.name === "HR"
        ? ""
        : `&userId=${user?.id}`
    }${empId ? `&employeeId=${empId}` : ""}${order ? `&orderBy=${order}` : ""}`
  );

  const { data: absentData } = useFetch<any>(
    `attendances/${selectedDate.toISOString().slice(0, 10)}/absent`
  );
  const { data: presentData } = useFetch<any>(
    `attendances/${selectedDate.toISOString().slice(0, 10)}/present`
  );
  const { data: allUser } = useFetch<any>(
    `attendances/${selectedDate.toISOString().slice(0, 10)}/all`
  );

  const cards = [
    {
      id: 1,
      title: "Total Users",
      value: `${allUser?.length ? allUser?.length : `0`}`,
    },
    {
      id: 2,
      title: "Present",
      value: `${presentData?.length ? presentData?.length : `0`}`,
    },
    {
      id: 3,
      title: "Absent",
      value: `${absentData?.length ? absentData?.length : `0`}`,
    },
  ];
  const tomorrow = addDays(new Date(), 1);
  const disabledDates = [];
  for (let i = 0; i < 365; i++) {
    disabledDates.push(addDays(tomorrow, i));
  }
  return (
    <PanelLayout title="Today Attendance - Admin Panel">
      <section className="px-8 py-4">
        <div className="mt-4 lg:flex justify-between">
          <AdminBreadcrumbs links={links} />
          <div className="lg:flex gap-4 items-center">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
            {/* -----------------Date select section---------------- */}
            <div className="md:flex gap-3 items-center">
              {/* <ChevronLeftRounded /> */}
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
              {/* <ChevronRightRounded /> */}
            </div>
          </div>
        </div>

        <>
          <div className="mt-4">
            <div className="grid lg:grid-cols-3 gap-4">
              {cards?.map((item) => (
                <div key={item?.id}>
                  <div className="w-full tracking-wide border-b-4 hover:bg-theme hover:text-white hover:border-white border-theme h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center transition-all ease duration-300">
                    <p className="text-base font-semibold text-center">
                      {item?.title}
                    </p>
                    <p className="text-lg font-bold">{item?.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-4">
            <div className="md:flex gap-4 justify-between w-full py-2">
              <div
                className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
              >
                <IconButton
                  onClick={() => {
                    setEmpId(null);
                    setUsername(null);
                    setOrder(null);
                    setStatus("all");
                  }}
                >
                  <Tooltip
                    title={
                      order != null ||
                      status != "all" ||
                      empId != null ||
                      userName != null
                        ? `Remove Filters`
                        : `Filter`
                    }
                  >
                    {order != null ||
                    status != "all" ||
                    empId != null ||
                    userName != null ? (
                      <Close className={"!text-white"} />
                    ) : (
                      <FilterListRounded className={"!text-white"} />
                    )}
                  </Tooltip>
                </IconButton>
              </div>

              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <TextField
                  fullWidth
                  size="small"
                  value={empId ? empId : ""}
                  placeholder="Employee Id"
                  name="employeeId"
                  onChange={(e) => {
                    setPageNumber(1), setEmpId(e.target.value);
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  value={userName ? userName : ""}
                  placeholder="Employee Name"
                  onChange={(e) => {
                    setPageNumber(1), setUsername(e.target.value);
                  }}
                  name="employeeName"
                />
                <TextField
                  size="small"
                  fullWidth
                  select
                  value={status != "null" ? status : "null"}
                  label="Status"
                  defaultValue="all"
                  onChange={(e: any) => {
                    setPageNumber(1), setStatus(e.target.value);
                  }}
                >
                  {selects.map((option: any) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  size="small"
                  fullWidth
                  select
                  value={order ? order : ""}
                  label="Order By"
                  // defaultValue="all"
                  onChange={(e: any) => {
                    setPageNumber(1), setOrder(e.target.value);
                  }}
                >
                  {orderBy.map((option: any) => (
                    <MenuItem key={option.id} value={option.value}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </div>
          </section>
        </>

        <section>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isGrid ? (
                <AttendanceGrid data={attendance} />
              ) : (
                <AttendanceList data={attendance} />
              )}
            </>
          )}
          {attendance?.length === 0 ? <LoaderAnime /> : null}
          {Math.ceil(
            Number(pagination?.total || 1) / Number(pagination?.limit || 1)
          ) > 1 ? (
            <div className="flex justify-center py-8">
              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(
                    Number(pagination?.total || 1) /
                      Number(pagination?.limit || 1)
                  )}
                  onChange={(e, v: number) => {
                    setPageNumber(v);
                  }}
                  page={pageNumber}
                  variant="outlined"
                />
              </Stack>
            </div>
          ) : null}
        </section>
      </section>
    </PanelLayout>
  );
};

export default TodayAttendance;

const selects = [
  { id: 1, value: "present", label: "Present" },
  { id: 2, value: "absent", label: "Absent" },
  { id: 3, value: "all", label: "All" },
];
const orderBy = [
  { id: 1, value: "createdAt:asc", name: "Created Ascending" },
  { id: 2, value: "createdAt:desc", name: "Created Descending" },
];
