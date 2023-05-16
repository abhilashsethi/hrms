import {
  ChevronLeftRounded,
  ChevronRightRounded,
  GridViewRounded,
  InsertInvitationRounded,
  Search,
  TableRowsRounded,
} from "@mui/icons-material";
import { useState, useRef } from "react";
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
} from "@mui/material";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  GridAndList,
  Loader,
  LoaderAnime,
  TextTitles,
} from "components/core";
import PanelLayout from "layouts/panel";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFetch } from "hooks";
import { addDays } from "date-fns";
import { AttendanceGrid, AttendanceList } from "components/admin/attendance";

const TodayAttendance = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const [searchedUser, setSearchedUser] = useState<any>([]);
  const [status, setStatus] = useState("all");
  const [order, setOrder] = useState("all");
  const [userName, setUsername] = useState("");
  const [empId, setEmpId] = useState<string | null>(null);
  const dateRef = useRef<any>();
  function handleDateChange(date: any) {
    setSelectedDate(date);
  }
  const {
    data: attendance,
    isLoading,
    pagination,
  } = useFetch<any>(
    `attendances/${selectedDate
      .toISOString()
      .slice(0, 10)}/${status}?page=${pageNumber}&limit=8${
      userName ? `&employeeName=${userName}` : ""
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
      value: `${allUser?.results?.length ? allUser?.results?.length : `0`}`,
    },
    {
      id: 2,
      title: "Present",
      value: `${
        presentData?.results?.length ? presentData?.results?.length : `0`
      }`,
    },
    {
      id: 3,
      title: "Absent",
      value: `${
        absentData?.results?.length ? absentData?.results?.length : `0`
      }`,
    },
  ];
  const tomorrow = addDays(new Date(), 1);
  const disabledDates = [];
  for (let i = 0; i < 365; i++) {
    disabledDates.push(addDays(tomorrow, i));
  }
  return (
    <PanelLayout title="Today Attendance - SY HR MS">
      <section className="px-8 py-4">
        <div className="mt-4 flex justify-between">
          <AdminBreadcrumbs links={links} />
          <div className="flex gap-4 items-center">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
            {/* -----------------Date select section---------------- */}
            <div className="flex gap-3 items-center">
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
        <FiltersContainer>
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
              defaultValue="all"
              onChange={(e: any) => setStatus(e.target.value)}
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
              label="Order By"
              // defaultValue="all"
              onChange={(e: any) => setOrder(e.target.value)}
            >
              {orderBy.map((option: any) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            {/* <Button
              fullWidth
              startIcon={<Search />}
              variant="contained"
              className="!bg-theme"
            >
              Search
            </Button> */}
          </div>
        </FiltersContainer>
        <section>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {isGrid ? (
                <AttendanceGrid data={attendance?.results} />
              ) : (
                <AttendanceList data={attendance?.results} />
              )}
            </>
          )}
          {!attendance?.results?.length && <LoaderAnime />}
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
                variant="outlined"
              />
            </Stack>
          </div>
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
  { id: 1, value: "createdAt:asc", name: "New" },
  { id: 2, value: "createdAt:desc", name: "Old" },
  { id: 3, value: "", name: "None" },
];
const links = [
  { id: 1, page: "Attendances", link: "/admin/attendances" },
  {
    id: 2,
    page: "Datewise",
    link: "/admin/attendances/today",
  },
];
