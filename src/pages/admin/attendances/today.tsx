import {
  Add,
  ChevronLeftRounded,
  ChevronRightRounded,
  CreditCardRounded,
  GridViewRounded,
  InsertInvitationRounded,
  Search,
  TableRowsRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { AttendanceGrid, AttendanceList } from "components/admin";
import { AdminBreadcrumbs, TextTitles } from "components/core";
import PanelLayout from "layouts/panel";
import moment from "moment";
const today = new Date().toISOString();
const TodayAttendance = () => {
  const [isGrid, setIsGrid] = useState(true);
  // const { data, isLoading } = useFetch<Attendance[]>(
  //   `attendances/date/${today}`
  // );
  // const { push } = useRouter();
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
              <p className="tracking-wide flex gap-4 items-center font-semibold">
                {moment(new Date().toISOString()).format("ll")}{" "}
                <InsertInvitationRounded className="!cursor-pointer" />
              </p>
              <ChevronRightRounded />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Grid container spacing={2}>
            {cards?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="w-full tracking-wide border-b-4 hover:bg-theme hover:text-white hover:border-white border-theme h-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-2 justify-center items-center">
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
          />
          <TextField
            fullWidth
            size="small"
            placeholder="Employee Name"
            name="employeeName"
          />
          <TextField
            fullWidth
            size="small"
            placeholder="Role"
            name="employeeName"
          />
          <Button
            fullWidth
            startIcon={<Search />}
            variant="contained"
            className="!bg-theme"
          >
            Search
          </Button>
        </div>
        {isGrid ? <AttendanceGrid /> : <AttendanceList />}
        {/* <MaterialTable
          title={"Today Attendance"}
          isLoading={isLoading}
          data={data ? getDataWithSL<Attendance>(data) : []}
          options={{ ...MuiTblOptions(), selection: true }}
          columns={[
            {
              title: "#",
              field: "sl",
              editable: "never",
              width: "2%",
            },
            {
              title: "Name",
              field: "user.name",
            },
            {
              title: "Email",
              field: "user.email",
            },
            {
              title: "Date",
              field: "date",
              render: (data) => new Date(data.date).toDateString(),
            },
            {
              title: "In Time",
              field: "createdAt",
              render: (data) => new Date(data.createdAt).toTimeString(),
            },
            {
              title: "Out Time",
              field: "updatedAt",
              render: (data) => new Date(data.updatedAt).toTimeString(),
            },
          ]}
          onRowDoubleClick={(e, rowData) =>
            push(`/admin/attendances/user/${rowData?.id}`)
          }
        /> */}
      </section>
    </PanelLayout>
  );
};

export default TodayAttendance;

const links = [
  { id: 1, page: "Attendances", link: "/admin/attendances" },
  {
    id: 2,
    page: "Datewise",
    link: "/admin/attendances/today",
  },
];

const cards = [
  {
    id: 1,

    title: "Total Users",
    value: "12",
  },
  {
    id: 2,

    title: "Present",
    value: "1",
  },
  {
    id: 3,

    title: "Absent",
    value: "2",
  },
  {
    id: 4,

    title: "Leave",
    value: "3",
  },
];
