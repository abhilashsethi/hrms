import {
  Add,
  GridViewRounded,
  Home,
  Search,
  TableRowsRounded,
  Whatshot,
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { EmployeesColumn, EmplyeesGrid } from "components/admin";
import PanelLayout from "layouts/panel";
import React, { useState } from "react";

const AllEmployees = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [value, setValue] = React.useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  return (
    <PanelLayout title="All Users - SY HR MS">
      <section className="px-8">
        <div className="flex justify-between items-center my-4">
          <div className="col-start-1 col-end-3">
            <Breadcrumbs aria-label="breadcrumb" className="!py-4">
              <Typography
                sx={{ display: "flex", alignItems: "center" }}
                color="inherit"
              >
                <Home sx={{ mr: 0.5 }} fontSize="inherit" />
                EMPLOYEES
              </Typography>
              <Typography
                color="text.primary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Whatshot sx={{ mr: 0.5 }} fontSize="inherit" />
                ALL EMPLOYEES
              </Typography>
            </Breadcrumbs>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <IconButton
                onClick={() => setIsGrid((prev) => !prev)}
                size="small"
              >
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    isGrid && `border-2 border-theme`
                  }`}
                >
                  <GridViewRounded className={`${isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
              <IconButton
                onClick={() => setIsGrid((prev) => !prev)}
                size="small"
              >
                <div
                  className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
                    !isGrid && `border-2 border-theme`
                  }`}
                >
                  <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
            </div>
            <Button
              className="!bg-theme"
              variant="contained"
              startIcon={<Add />}
            >
              ADD EMPLOYEE
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
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
        {isGrid ? <EmplyeesGrid /> : <EmployeesColumn />}
      </section>
    </PanelLayout>
  );
};

export default AllEmployees;

const roles = [
  { id: 1, value: "Web Developer" },
  { id: 2, value: "IOS Developer" },
  { id: 3, value: "Android Developer" },
  { id: 4, value: "Team Leader" },
];
