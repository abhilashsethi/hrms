import { useTheme } from "@material-ui/core";
import { Close, FilterListRounded } from "@mui/icons-material";
import {
  IconButton,
  MenuItem,
  Pagination,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { ExEmployeesGrid } from "components/admin";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const ExEmployees = () => {
  const exitStatus = [
    { id: 1, value: "Resigned", name: "Resigned" },
    { id: 2, value: "Terminated", name: "Terminated" },
    { id: 3, value: "Absconded", name: "Absconded" },
    { id: 4, value: "LaidOff", name: "Laid Off" },
  ];

  const { user } = useAuth();
  // console.log(user);
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [userName, setUsername] = useState<string | null>(null);
  const [isRole, setIsRole] = useState<string | null>(null);
  const [isDepartment, setIsDepartment] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const { data: departmentData } = useFetch<any>(`departments`);
  const {
    data: employeeExitData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any>(
    `employee-exit?page=${pageNumber}&limit=8${
      userName ? `&name=${userName}` : ""
    }${status ? `&status=${status}` : ""}`
  );
  // console.log(employeeExitData);

  const links =
    user?.role?.name === "CEO" || user?.role?.name === "HR"
      ? [
          { id: 1, page: "Employees", link: "/admin/employees" },
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
        <div className="flex flex-col md:flex-row w-full md:justify-between justify-start items-start md:items-center md:py-4 py-2">
          <div className="md:w-auto w-full">
            <AdminBreadcrumbs links={links as any} />
          </div>
        </div>

        <>
          {isLoading && <SkeletonLoader />}
          <ExEmployeesGrid
            userDetails={user}
            data={employeeExitData}
            mutate={mutate}
          />
        </>

        {employeeExitData?.length === 0 ? <LoaderAnime /> : null}
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

export default ExEmployees;
