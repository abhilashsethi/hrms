import { Search } from "@mui/icons-material";
import { Button, MenuItem, TextField } from "@mui/material";
import { AdminBreadcrumbs, TextTitles } from "components/core";
import PanelLayout from "layouts/panel";
import "react-datepicker/dist/react-datepicker.css";

const month = () => {
  return (
    <PanelLayout title="Today Attendance - SY HR MS">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="mt-4 flex justify-between">
          <TextTitles title="ATTENDANCE" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 mb-4">
          <TextField
            fullWidth
            size="small"
            placeholder="Employee Id"
            name="employeeId"
            //   onChange={(e) => setEmpId(e.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            placeholder="Employee Name"
            //   onChange={(e) => setUsername(e.target.value)}
            name="employeeName"
          />
          <TextField
            size="small"
            fullWidth
            select
            label="Status"
            defaultValue="EUR"
          >
            {selects.map((option) => (
              <MenuItem key={option.value} value={option.value}>
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
        <h1>In progress</h1>
      </section>
    </PanelLayout>
  );
};

export default month;

const selects = [
  { id: 1, value: "Present" },
  { id: 2, value: "Absent" },
  { id: 3, value: "All" },
];

const links = [
  { id: 1, page: "Attendances", link: "/admin/attendances" },
  {
    id: 2,
    page: "Month Wise",
    link: "/admin/attendances/month",
  },
];
