import {
  Add,
  GridViewRounded,
  Search,
  TableRowsRounded,
  Upload,
} from "@mui/icons-material";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { EmployeesColumn, EmplyeesGrid } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "types";

const AllEmployees = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [userName, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState<any>([]);
  const [isUpload, setIsUpload] = useState(false);
  const [empId, setEmpId] = useState("");
  const [value, setValue] = useState("Web Developer");
  const handleChange = (event: any) => {
    setValue(event.target.value);
  };
  const { data: employees, mutate } = useFetch<User[]>(`users`);
  useEffect(() => {
    if (employees) {
      const filtered = employees.filter((user: any) => {
        return user?.name?.toLowerCase().includes(userName?.toLowerCase());
      });
      setSearchedUser(filtered);
    }
  }, [employees, userName]);
  useEffect(() => {
    if (employees) {
      const filtered = employees.filter((user: any) => {
        return user?.employeeID?.toLowerCase().includes(empId?.toLowerCase());
      });
      setSearchedUser(filtered);
    }
  }, [employees, empId]);

  return (
    <PanelLayout title="All Users - SY HR MS">
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
                  <TableRowsRounded className={`${!isGrid && `!text-theme`}`} />
                </div>
              </IconButton>
            </div>
            <Link href="/admin/employees/create-employee">
              <Button
                className="!bg-theme"
                variant="contained"
                startIcon={<Add />}
              >
                ADD EMPLOYEE
              </Button>
            </Link>
            <Button
              onClick={() => setIsUpload(true)}
              className="!bg-slate-600"
              variant="contained"
              startIcon={<Upload />}
            >
              UPLOAD EMPLOYEES DATA
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <TextField
            fullWidth
            size="small"
            id="employeeId"
            placeholder="Employee Id"
            onChange={(e) => setEmpId(e.target.value)}
            name="employeeId"
          />
          <TextField
            fullWidth
            size="small"
            id="employeeName"
            onChange={(e) => setUsername(e.target.value)}
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
        {isGrid ? (
          <EmplyeesGrid data={searchedUser} />
        ) : (
          <EmployeesColumn data={searchedUser} />
        )}
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

const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  { id: 2, page: "All Employees", link: "/admin/employees/all-employees" },
];
