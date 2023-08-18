import { useTheme } from "@material-ui/core";
import { Pagination, Stack } from "@mui/material";
import { ExEmployeesGrid } from "components/admin";
import { AdminBreadcrumbs, LoaderAnime, SkeletonLoader } from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const ExEmployees = () => {
  const { user } = useAuth();
  // console.log(user);
  const theme = useTheme();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const {
    data: employeeExitData,
    mutate,
    isLoading,
    pagination,
  } = useFetch<any>(
    `employee-exit?page=${pageNumber}&limit=8&orderBy=createdAt:desc`
  );
  // console.log(employeeExitData);

  const links = [
    {
      id: 2,
      page: "All Ex Employees",
      link: "/admin/employees/ex-employees",
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
