import { Add, FilterListRounded, Upload } from "@mui/icons-material";
import { Button, MenuItem, Pagination, Stack, TextField } from "@mui/material";
import { EmployeesColumn, EmplyeesGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  FiltersContainer,
  GridAndList,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { User } from "types";

const AllEmployees = () => {
  const [pageNumber, setPageNumber] = useState<number | null>(1);
  const [isGrid, setIsGrid] = useState(true);
  const [userName, setUsername] = useState<string | null>(null);
  const [isRole, setIsRole] = useState<string | null>(null);
  const [isDepartment, setIsDepartment] = useState<string | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [empId, setEmpId] = useState("");
  const { data: roleData } = useFetch<any>(`roles`);
  const {
    data: employees,
    mutate,
    isLoading,
    pagination,
  } = useFetch<User[]>(
    `users?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
      empId ? `&employeeID=${empId}` : ""
    }${isRole ? `&role=${isRole}` : ""}`
  );
  // console.log(
  //   `users?page=${pageNumber}&limit=8${userName ? `&name=${userName}` : ""}${
  //     empId ? `&employeeID=${empId}` : ""
  //   }${isRole ? `&role=${isRole}` : ""}`
  // );
  // useEffect(() => {
  //   if (employees) {
  //     const filtered = employees.filter((user: any) => {
  //       return user?.name?.toLowerCase().includes(userName?.toLowerCase());
  //     });
  //     setSearchedUser(filtered);
  //   }
  // }, [employees, userName]);
  // useEffect(() => {
  //   if (employees) {
  //     const filtered = employees.filter((user: any) => {
  //       return user?.employeeID?.toLowerCase().includes(empId?.toLowerCase());
  //     });
  //     setSearchedUser(filtered);
  //   }
  // }, [employees, empId]);
  // useEffect(() => {
  //   if (isRole) {
  //     const filtered = employees?.filter((user: any) => {
  //       return user?.roleId === isRole;
  //     });
  //     setSearchedUser(filtered);
  //   }
  // }, [isRole]);
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
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
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
        <FiltersContainer>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <TextField
              fullWidth
              size="small"
              placeholder="Employee Id"
              onChange={(e) => setEmpId(e.target.value)}
            />
            <TextField
              fullWidth
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Employee Name"
            />
            <TextField
              fullWidth
              select
              label="Select Role"
              size="small"
              value={isRole ? isRole : ""}
              onChange={(e) => setIsRole(e?.target?.value)}
            >
              {roleData?.roles?.map((option: any) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              select
              label="Select Department"
              size="small"
              value={isDepartment ? isDepartment : ""}
              onChange={(e) => setIsDepartment(e.target.value)}
            >
              {roleData?.roles?.map((option: any) => (
                <MenuItem key={option.id} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </FiltersContainer>

        <section>
          {isGrid ? (
            <>
              {isLoading && <SkeletonLoader />}
              <EmplyeesGrid data={employees} mutate={mutate} />
            </>
          ) : (
            <>
              {isLoading && <Loader />}
              <EmployeesColumn data={employees} mutate={mutate} />
            </>
          )}
        </section>
        {!employees?.length && <LoaderAnime />}
        {employees?.length ? (
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
        ) : null}
      </section>
    </PanelLayout>
  );
};

export default AllEmployees;

const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  { id: 2, page: "All Employees", link: "/admin/employees/all-employees" },
];
