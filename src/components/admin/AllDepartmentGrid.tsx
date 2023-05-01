import { Delete, Edit, Info } from "@mui/icons-material";
import { Grid, IconButton, Tooltip } from "@mui/material";
import { Loader } from "components/core";
import { UpdateDepartment } from "components/dialogues";
import { RoleInformation } from "components/drawer";
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
  const [isUpdate, setisUpdate] = useState<{
    dialogue?: boolean;
    id?: string | null;
  }>({ dialogue: false, id: null });
  const {
    data: roleData,
    isLoading,
    mutate,
  } = useFetch<[{ id: string; name: string }]>(`department`);
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
          const res = await change(`department/${id}`, { method: "DELETE" });
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
        handleClose={() => setisUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <RoleInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        role={isInfo?.role}
      />
      <div className="mt-4">
        <Grid container spacing={2}>
          {department?.map((item) => (
            <Grid key={item?.id} item lg={3}>
              <div className="h-40 w-full bg-gradient-to-b from-theme-50/50 via-white to-white shadow-lg rounded-lg flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    {item?.name}
                  </p>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 cursor-pointer hover:shadow-xl rounded-full bg-gradient-to-r from-red-600 to-red-400 flex justify-center items-center text-lg font-semibold">
                      <Tooltip title="Delete">
                        <IconButton
                        //     onClick={() => handleDelete(item?.id)}
                        >
                          <Delete className="!text-white" />
                        </IconButton>
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

const department = [
  {
    id: "0",
    name: "Web Development",
    lastUpdated: "25th Aug",
    lastCreated: "25th Aug",
  },
  {
    id: "1",
    name: "Application Development",
    lastUpdated: "25th Aug",
    lastCreated: "25th Aug",
  },
  {
    id: "2",
    name: "IT Management",
    lastUpdated: "25th Aug",
    lastCreated: "25th Aug",
  },
  {
    id: "3",
    name: "Accounts Management",
    lastUpdated: "25th Aug",
    lastCreated: "25th Aug",
  },
];
