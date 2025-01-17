import { Delete, Edit, Info } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { UpdateDepartment } from "components/dialogues";
import { DepartmentInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";
interface Props {
  data?: Role[];
  mutate: () => void;
}
const AllDepartmentGrid = ({ data, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isInfo, setIsInfo] = useState<{
    dialogue?: boolean;
    role?: Role | null;
  }>({
    dialogue: false,
    role: null,
  });
  const { change } = useChange();
  const [isUpdate, setIsUpdate] = useState<{
    dialogue?: boolean;
    departmentData?: string | null;
  }>({ dialogue: false, departmentData: null });

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
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    });
  };

  return (
    <>
      <UpdateDepartment
        departmentData={isUpdate?.departmentData}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
      />
      <DepartmentInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        roleId={isInfo?.role?.id}
      />
      <div className="my-4">
        <div className="grid xl:grid-cols-4 gap-4 lg:grid-cols-2">
          {data?.map((item: any) => (
            <div key={item?.id}>
              <div className="px-4 h-48 w-full hover:scale-105 ease-in-out transition-all duration-200 bg-white border-b-4 border-cyan-600 shadow-lg rounded-xl flex justify-center items-center">
                <div className="grid justify-items-center items-center gap-4">
                  <p className="text-lg font-semibold tracking-wide text-center capitalize">
                    {item?.name}
                  </p>
                  <div className="w-full px-2 flex gap-2 justify-center">
                    <div className=" py-1 rounded-lg text-gray-600 flex items-center gap-2 px-4">
                      <p className="font-semibold tracking-wide text-sm">
                        Total Member :
                      </p>
                      {item?._count?.users}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 cursor-pointer hover:scale-105 ease-in-out transition-all duration-200 hover:shadow-xl rounded-full bg-gradient-to-r from-red-600 to-red-400 flex justify-center items-center text-lg font-semibold hover:from-red-400 hover:to-red-600">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(item?.id)}>
                          <Delete className="!text-white" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div
                      onClick={() => {
                        setIsUpdate({ dialogue: true, departmentData: item });
                      }}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllDepartmentGrid;
