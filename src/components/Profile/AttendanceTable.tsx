import MaterialTable from "@material-table/core";
import { Search } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { Attendance, User } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";

const AttendanceTable = () => {
  const [value, setValue] = useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const router = useRouter();
  const { data: employData } = useFetch<User>(`users/${router?.query?.id}`);
  const { data: userAttendance } = useFetch<Attendance[]>(
    `attendances/user/${router?.query?.id}`
  );
  console.log(userAttendance);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <TextField
          fullWidth
          id="date"
          placeholder="Date"
          sx={{ background: "#fff" }}
          name="date"
        />
        <TextField
          fullWidth
          select
          sx={{ background: "#fff" }}
          label="Select Month"
          value={value}
          onChange={handleChange}
        >
          {month.map((option) => (
            <MenuItem key={option.id} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          fullWidth
          select
          sx={{ background: "#fff" }}
          label="Select Year"
          value={value}
          onChange={handleChange}
        >
          {year.map((option) => (
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

      <MaterialTable
        title={employData?.name}
        data={
          !userAttendance
            ? []
            : (userAttendance?.map((item: any, i: number) => ({
                ...item,
                sn: i + 1,
              })) as any)
        }
        options={{ ...MuiTblOptions(), selection: false }}
        columns={[
          {
            title: "#",
            field: "sn",
            editable: "never",
            width: "2%",
          },
          {
            title: "Date",
            tooltip: "Date",
            field: "date",
            render: (data) => new Date().toISOString().slice(0, 10),
          },
          {
            title: "Punch In",
            tooltip: "Punch In",
            field: "createdAt",
            render: (data) => moment(data?.createdAt).format("lll"),
          },
          {
            title: "Punch Out",
            tooltip: "Punch Out",
            field: "updatedAt",
            render: (data) => moment(data?.updatedAt).format("lll"),
          },
        ]}
      />
    </>
  );
};

export default AttendanceTable;
const year = [
  { id: 1, value: "2019" },
  { id: 2, value: "2018" },
  { id: 3, value: "2017" },
  { id: 4, value: "2016" },
];
const month = [
  { id: 1, value: "January" },
  { id: 2, value: "February" },
  { id: 3, value: "March" },
  { id: 4, value: "April" },
  { id: 5, value: "May" },
  { id: 6, value: "June" },
  { id: 7, value: "July" },
  { id: 8, value: "August" },
  { id: 9, value: "September" },
  { id: 10, value: "October" },
  { id: 11, value: "November" },
  { id: 12, value: "December" },
];

const data = [
  {
    id: 1,
    date: "19 Feb 2019",
    punchIn: "10AM",
    punchOut: "7PM",
    production: "9 hrs",
    break: "1 hrs",
    overtime: "0",
  },
  {
    id: 2,
    date: "20 Feb 2019",
    punchIn: "10AM",
    punchOut: "7PM",
    production: "9 hrs",
    break: "1 hrs",
    overtime: "0",
  },
];
