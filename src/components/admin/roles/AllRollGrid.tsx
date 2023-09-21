import { Delete, DoorSliding, Edit, Info } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { UpdateRole } from "components/dialogues";
import { RoleInformation, RoleWisePageAccess } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";

interface Props {
  data?: Role[];
  mutate: () => void;
}

const AllRollGrid = ({ data, mutate }: Props) => {
  const [assetHistory, setAssetHistory] = useState(false);
  const [roleId, setRoleId] = useState("");
  const [roleData, setRoleData] = useState<Role>();
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
    id?: string | null;
  }>({ dialogue: false, id: null });
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
        Swal.fire(`Info`, "It will take some time", "info");
        setLoading(true);
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
      <RoleWisePageAccess
        open={assetHistory}
        onClose={() => setAssetHistory(false)}
        roleId={roleId}
      />
      <UpdateRole
        id={isUpdate?.id}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        mutate={mutate}
        roleData={roleData}
      />
      <RoleInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        roleId={isInfo?.role?.id}
      />
      <div className="mt-4">
        <div className="grid xl:grid-cols-4 gap-4 lg:grid-cols-2">
          {data?.map((item) => (
            <div key={item?.id}>
              <div className="py-4 w-full bg-gradient-to-b from-theme-50/50 via-white to-white shadow-lg rounded-lg flex justify-center items-center">
                <div className="flex flex-col items-center gap-3">
                  <p className="text-lg font-semibold tracking-wide capitalize">
                    {item?.name}
                  </p>
                  <div className="w-full px-8 flex gap-2 justify-center">
                    <div className=" py-1 rounded-lg text-gray-600 flex items-center gap-2 px-4">
                      <p className="font-semibold tracking-wide text-sm">
                        Total Member :
                      </p>
                      {item?._count?.users}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 cursor-pointer hover:shadow-xl rounded-full bg-gradient-to-r from-red-600 to-red-400 flex justify-center items-center text-lg font-semibold">
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDelete(item?.id)}>
                          <Delete className="!text-white" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <div
                      onClick={() => {
                        setIsUpdate({ dialogue: true, id: item?.id }),
                          setRoleData(item);
                      }}
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
                    <div className="h-10 w-10 cursor-pointer hover:shadow-xl rounded-full bg-gradient-to-r from-green-600 to-green-400 flex justify-center items-center text-lg font-semibold">
                      <Tooltip title="Page Access">
                        <IconButton
                          onClick={() => {
                            setAssetHistory(true);
                            setRoleId(item?.id);
                          }}
                        >
                          <DoorSliding className="!text-white" />
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

export default AllRollGrid;
