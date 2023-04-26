import MaterialTable from "@material-table/core";
import {
  GridView,
  Home,
  TableRows,
  Upload,
  Whatshot,
} from "@mui/icons-material";
import {
  Breadcrumbs,
  Button,
  ButtonGroup,
  Divider,
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useChange, useFetch, useMutation } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { useState } from "react";
import { User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
const AllUsers = () => {
  const [designation, setDesignation] = useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setDesignation(event.target.value as string);
  };
  const [open, setOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const { push } = useRouter();
  return (
    <PanelLayout title="All Users - SY HR MS">
      <section className="w-11/12 mx-auto">
        <span className="text-xl font-bold">ALL EMPLOYEES</span>
        <div className="grid grid-cols-6 gap-4 py-4">
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
          <div className="right-0 col-end-9 flex gap-3">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-lg bg-blue-700 px-5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
            >
              <Upload /> Add Employee
            </button>
            <ButtonGroup disableElevation variant="outlined" color="info">
              <Divider orientation="vertical" variant="middle" flexItem />

              <Button
                type="button"
                variant="outlined"
                className={
                  showTable ? "" : "bg-blue-600 text-white hover:bg-blue-600"
                }
                onClick={() => setShowTable(true)}
              >
                <TableRows />
              </Button>
              <Button
                type="button"
                className={
                  showTable ? "bg-blue-600 text-white hover:bg-blue-600" : ""
                }
                onClick={() => setShowTable(false)}
              >
                <GridView />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
          <div>
            <TextField
              fullWidth
              id="employeeId"
              placeholder="Employee Id"
              name="employeeId"
            />
          </div>
          <div>
            <TextField
              fullWidth
              id="employeeName"
              placeholder="Employee Name"
              name="employeeName"
            />
          </div>
          <div>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Designation</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={designation}
                label="Designation"
                onChange={handleChange}
              >
                <MenuItem value={"Web Developer"}>Web Developer</MenuItem>
                <MenuItem value={"Web Designer"}>Web Designer</MenuItem>
                <MenuItem value={"Android Developer"}>
                  Android Developer
                </MenuItem>
                <MenuItem value={"Iso Developer"}>Iso Developer</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <button className="w-full py-3 rounded bg-theme-400 text-xl uppercase hover:bg-theme-500 text-white">
              Search
            </button>
          </div>
        </div>
        {showTable ? (
          <MaterialTable
            title="All Users"
            isLoading={isLoading || isChanging}
            data={data ? getDataWithSL<User>(data) : []}
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
                tooltip: "Name",
                field: "name",
              },
              {
                title: "Email",
                tooltip: "Email",
                field: "email",
              },
              {
                title: "Password",
                field: "password",
                render: () => "******",
              },
              {
                title: "Phone",
                field: "phone",
                emptyValue: "Not Provided",
              },
              {
                title: "Role",
                field: "role",
                emptyValue: "Not Provided",
              },
              {
                title: "Employee ID",
                field: "employeeID",
                emptyValue: "Not Provided",
              },
              {
                title: "Last Updated",
                field: "updatedAt",
                render: (data) => clock(data.updatedAt).fromNow(),
                editable: "never",
              },
              {
                title: "Created",
                field: "createdAt",
                render: (data) => new Date(data.createdAt).toDateString(),
                editable: "never",
              },
            ]}
            // onRowDoubleClick={(e, rowData) =>
            //   push(`/admin/attendances/user/${rowData?.id}`)
            // }
            editable={{
              onRowDelete: async (oldData) => {
                const res = await change(`users/${oldData.id}`, {
                  method: "DELETE",
                });
                console.log(res);
                mutate();
              },
              async onRowAdd(newData) {
                try {
                  const response = await change(`users`, { body: newData });
                  console.log(response);
                  mutate();
                } catch (error) {
                  console.log(error);
                }
              },
            }}
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-12">
            <h1> this is for card view</h1>
          </div>
        )}
      </section>
    </PanelLayout>
  );
};

export default AllUsers;
