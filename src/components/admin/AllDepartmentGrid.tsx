import { Delete, Edit, Info } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Loader } from "components/core";
import { UpdateDepartment } from "components/dialogues";
import { DepartmentInformation, RoleInformation } from "components/drawer";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
const AllDepartmentGrid = () => {
  const [loading, setLoading] = useState(false);
  const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
    dialogue: false,
    role: null,
  });
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const {
    data: departmentsData,
    isLoading,
    mutate,
  } = useFetch<any>(`departments`);
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
          const res = await change(`departments/${id}`, { method: "DELETE" });
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <UpdateDepartment
        id={isUpdate?.id}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <DepartmentInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        roleId={isInfo?.role?.id}
      />
      <div className="mt-4">
        <Grid container spacing={3}>
          {departmentsData?.departments?.map((item: any) => (
            <Grid key={item?.id} item lg={3}>
              <div className="h-40 w-full hover:scale-105 ease-in-out transition-all duration-200 bg-white border-b-4 border-cyan-600 shadow-lg rounded-xl flex justify-center items-center">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    {item?.name}
                  </p>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out transition-all duration-200 hover:shadow-xl rounded-full bg-gradient-to-r from-red-600 to-red-400 flex justify-center items-center text-lg font-semibold hover:from-red-400 hover:to-red-600">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(item?.id)}>
                          <Delete className="!text-white" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div
                      onClick={() =>
                        setIsUpdate({ dialogue: true, id: item?.id })
                      }
                      className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out transition-all duration-200 hover:shadow-xl rounded-full bg-gradient-to-r from-blue-600 to-blue-400 flex justify-center items-center text-lg font-semibold hover:from-blue-400 hover:to-blue-600"
                    >
                      <Tooltip title="Edit">
                        <Edit className="!text-white" />
                      </Tooltip>
                    </div>
                    <div className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out transition-all duration-200 hover:shadow-xl rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 flex justify-center items-center text-lg font-semibold hover:from-yellow-400 hover:to-yellow-600">
                      <Tooltip title="Information">
                        <IconButton
                          onClick={() =>
                            setIsInfo({ dialogue: true, role: item })
                          }
                        >
                          <Info className="!text-white" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
};

export default AllDepartmentGrid;
