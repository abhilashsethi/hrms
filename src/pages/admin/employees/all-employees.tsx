import { Add, Close, FilterListRounded, Upload } from "@mui/icons-material";
import {
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { EmployeesColumn, EmplyeesGrid } from "components/admin";
import {
  AdminBreadcrumbs,
  GridAndList,
  Loader,
  LoaderAnime,
  SkeletonLoader,
} from "components/core";
import { UploadEmployData } from "components/dialogues";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";
import { User } from "types";

const AllEmployees = () => {
  const { user } = useAuth();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isGrid, setIsGrid] = useState(true);
  const [userName, setUsername] = useState<string | null>(null);
  const [isRole, setIsRole] = useState<string | null>(null);
  const [isDepartment, setIsDepartment] = useState<string | null>(null);
  const [isUpload, setIsUpload] = useState(false);
  const [empId, setEmpId] = useState<string | null>(null);
  const { data: roleData } = useFetch<any>(`roles`);
  const { data: departmentData } = useFetch<any>(`departments`);
  const {
    data: employees,
    mutate,
    isLoading,
    pagination,
  } = useFetch<User[]>(
    `users?page=${pageNumber}&limit=8&orderBy=createdAt:desc${
      userName ? `&name=${userName}` : ""
    }${
      user?.role?.name === "CEO" ? `` : `&branchId=${user?.employeeOfBranchId}`
    }${empId ? `&employeeID=${empId}` : ""}${isRole ? `&role=${isRole}` : ""}${
      isDepartment ? `&departmentName=${isDepartment}` : ""
    }${
      user?.role?.name === "CEO" || user?.role?.name === "HR"
        ? ``
        : `&userId=${user?.id}`
    }`
  );
  const links =
    user?.role?.name === "CEO"
      ? [
          { id: 1, page: "Employees", link: "/admin/employees" },
          {
            id: 2,
            page: "All Employees",
            link: "/admin/employees/all-employees",
          },
        ]
      : user?.role?.name === "HR"
      ? [
          {
            id: 2,
            page: "All Employees",
            link: "/admin/employees/all-employees",
          },
        ]
      : [
          {
            id: 3,
            page: "My Profile",
            link: "/admin/employees/all-employees",
          },
        ];

  return (
    <PanelLayout title="All Users - Admin Panel">
      <section className="md:px-8 px-4">
        <UploadEmployData
          open={isUpload}
          mutate={mutate}
          handleClose={() => setIsUpload(false)}
        />
        <div className="flex flex-col md:flex-row w-full md:justify-between justify-start items-start md:items-center md:py-4 py-2">
          <div className="md:w-auto w-full">
            <AdminBreadcrumbs links={links as any} />
          </div>
          <div className="flex gap-4 md:items-center md:flex-row flex-col-reverse md:w-auto w-full items-end">
            <GridAndList isGrid={isGrid} setIsGrid={setIsGrid} />
            {user?.role?.name === "CEO" ||
            user?.role?.name === "HR" ||
            user?.role?.name === "COO" ? (
              <div className="flex md:gap-4 gap-2 mt-2 flex-row items-center">
                <Link href="/admin/employees/create-employee">
                  <Button
                    fullWidth
                    className="!bg-theme text-xs md:!text-sm w-full"
                    variant="contained"
                    startIcon={<Add />}
                  >
                    ADD EMPLOYEE
                  </Button>
                </Link>
                <Button
                  onClick={() => setIsUpload(true)}
                  className="!bg-slate-600 !text-xs md:!text-sm"
                  variant="contained"
                  startIcon={<Upload />}
                >
                  UPLOAD EMPLOYEES DATA
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {user?.role?.name === "CEO" ||
        user?.role?.name === "HR" ||
        user?.role?.name === "COO" ? (
          <div className="md:flex gap-4 justify-between w-full py-2">
            <div
              className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg bg-theme
                `}
            >
              <IconButton
                onClick={() => {
                  setEmpId(null);
                  setUsername(null);
                  setIsRole(null);
                  setIsDepartment(null);
                }}
              >
                <Tooltip
                  title={
                    isDepartment != null ||
                    empId != null ||
                    isRole != null ||
                    userName != null
                      ? `Remove Filters`
                      : `Filter`
                  }
                >
                  {isDepartment != null ||
                  empId != null ||
                  isRole != null ||
                  userName != null ? (
                    <Close className={"!text-white"} />
                  ) : (
                    <FilterListRounded className={"!text-white"} />
                  )}
                </Tooltip>
              </IconButton>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 gap-2">
              <TextField
                fullWidth
                size="small"
                value={empId ? empId : ""}
                placeholder="Employee Id"
                onChange={(e) => {
                  setPageNumber(1), setEmpId(e.target.value);
                }}
              />
              <TextField
                fullWidth
                size="small"
                value={userName ? userName : ""}
                onChange={(e) => {
                  setPageNumber(1), setUsername(e.target.value);
                }}
                placeholder="Employee Name"
              />
              <TextField
                fullWidth
                select
                label="Select Role"
                size="small"
                value={isRole ? isRole : ""}
                onChange={(e) => {
                  setPageNumber(1), setIsRole(e?.target?.value);
                }}
              >
                {roleData?.map((option: any) => (
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
                onChange={(e) => {
                  setPageNumber(1), setIsDepartment(e.target.value);
                }}
              >
                {departmentData?.map((option: any) => (
                  <MenuItem key={option.id} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
        ) : null}
        {isGrid ? (
          <>
            {isLoading && <SkeletonLoader />}
            <EmplyeesGrid userDetails={user} data={employees} mutate={mutate} />
          </>
        ) : (
          <>
            {isLoading && <Loader />}
            <EmployeesColumn
              userDetails={user}
              data={employees}
              mutate={mutate}
            />
          </>
        )}
        {employees?.length === 0 ? <LoaderAnime /> : null}
        <section className="mb-6">
          {Math.ceil(
            Number(pagination?.total || 1) / Number(pagination?.limit || 1)
          ) > 1 ? (
            <div className="flex justify-center md:py-8 py-4">
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

export default AllEmployees;
