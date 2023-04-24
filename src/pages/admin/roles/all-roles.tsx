import {
  Add,
  Delete,
  Edit,
  GridViewRounded,
  Info,
  TableRowsRounded,
} from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import { AllRollColumn, AllRollGrid } from "components/admin";
import { AdminBreadcrumbs, TextTitles } from "components/core";
import { CreateRole, UpdateRole } from "components/dialogues";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";

const AllRoles = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [isCreate, setIsCreate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const [isUpdate, setisUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const { data: roleData, mutate } =
    useFetch<[{ id: string; name: string }]>(`roles`);
  console.log(roleData);
  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        Swal.fire("", "Please Wait...", "info");
        try {
          const res = await change(`roles/${id}`, { method: "DELETE" });
          setLoading(false);
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            setLoading(false);
            return;
          }
          mutate();
          Swal.fire(`Success`, `Deleted Successfully!`, `success`);
          return;
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    });
  };
  return (
    <PanelLayout title="All Roles - Admin Panel">
      <section className="px-8 py-4">
        <CreateRole
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
              CREATE ROLE
            </Button>
          </div>
        </div>
        <TextTitles title="ALL ROLES" />

        {isGrid ? <AllRollGrid /> : <AllRollColumn />}
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
