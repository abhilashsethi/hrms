import { Add, Delete, Edit, Info } from "@mui/icons-material";
import { Button, Grid, Tooltip } from "@mui/material";
import { AdminBreadcrumbs, TextTitles } from "components/core";
import { CreateRole, UpdateRole } from "components/dialogues";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const AllRoles = () => {
  const [isCreate, setIsCreate] = useState(false);
  const [isUpdate, setisUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const { data: roleData, mutate } =
    useFetch<[{ id: string; name: string }]>(`roles`);
  console.log(roleData);
  return (
    <PanelLayout title="All Roles - Admin Panel">
      <section className="px-8 py-4">
        <CreateRole
          open={isCreate}
          handleClose={() => setIsCreate(false)}
          mutate={mutate}
        />
        <UpdateRole
          id={isUpdate?.id}
          open={isUpdate?.dialogue}
          handleClose={() => setisUpdate({ dialogue: false })}
          mutate={mutate}
        />
        <AdminBreadcrumbs links={links} />
        <div className="mt-4 flex justify-between">
          <TextTitles title="ALL ROLES" />
          <Button
            onClick={() => setIsCreate(true)}
            variant="contained"
            className="!bg-theme"
            startIcon={<Add />}
          >
            CREATE ROLE
          </Button>
        </div>
        <div className="mt-4">
          <Grid container spacing={2}>
            {roleData?.map((item) => (
              <Grid key={item?.id} item lg={3}>
                <div className="h-40 w-full bg-gradient-to-b from-theme-50/50 via-white to-white shadow-lg rounded-lg flex justify-center items-center">
                  <div className="flex flex-col items-center gap-3">
                    <p className="text-lg font-semibold tracking-wide capitalize">
                      {item?.name}
                    </p>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 cursor-pointer hover:shadow-xl rounded-full bg-gradient-to-r from-red-600 to-red-400 flex justify-center items-center text-lg font-semibold">
                        <Tooltip title="Delete">
                          <Delete className="!text-white" />
                        </Tooltip>
                      </div>
                      <div
                        onClick={() =>
                          setisUpdate({ dialogue: true, id: item?.id })
                        }
                        className="h-10 w-10 cursor-pointer hover:shadow-xl rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex justify-center items-center text-lg font-semibold"
                      >
                        <Tooltip title="Edit">
                          <Edit className="!text-white" />
                        </Tooltip>
                      </div>
                      <div className="h-10 w-10 cursor-pointer hover:shadow-xl rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 flex justify-center items-center text-lg font-semibold">
                        <Tooltip title="Information">
                          <Info className="!text-white" />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </section>
    </PanelLayout>
  );
};

export default AllRoles;

const links = [
  { id: 1, page: "Roles", link: "/admin/roles" },
  {
    id: 2,
    page: "All Roles",
    link: "/admin/roles/all-roles",
  },
];
