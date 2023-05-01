import { Add, GridViewRounded, TableRowsRounded } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { AllDepartmentColumn, AllDepartmentGrid } from "components/admin";
import { AdminBreadcrumbs, Loader } from "components/core";
import { CreateDepartment } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const AllDepartment = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isCreate, setIsCreate] = useState(false);

  const {
    data: roleData,
    mutate,
    isLoading,
  } = useFetch<[{ id: string; name: string }]>(`department`);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout title="All Roles - Admin Panel">
      <section className="px-8 py-4">
        <CreateDepartment
          open={isCreate}
          handleClose={() => setIsCreate(false)}
          mutate={mutate}
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
            <Button
              onClick={() => setIsCreate(true)}
              variant="contained"
              className="!bg-theme"
              startIcon={<Add />}
            >
              CREATE DEPARTMENT
            </Button>
          </div>
        </div>

        {isGrid ? <AllDepartmentGrid /> : <AllDepartmentColumn />}
      </section>
    </PanelLayout>
  );
};

export default AllDepartment;

const links = [
  { id: 1, page: "Department", link: "/admin/department" },
  {
    id: 2,
    page: "All Department",
    link: "/admin/department/all-department",
  },
];
