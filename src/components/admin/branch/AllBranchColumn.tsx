import MaterialTable from "@material-table/core";
import {
  BorderColor,
  Delete,
  Info,
  PeopleRounded,
  Visibility,
} from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { RenderIconRow } from "components/common";
import { HeadStyle, IOSSwitch } from "components/core";
import { UpdateBranch } from "components/dialogues";
import { useAuth, useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Branch } from "types";
import { MuiTblOptions, clock, deleteFile } from "utils";
interface Props {
  data?: Branch[];
  mutate: () => void;
}

const AllBranchColumn = ({ data, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();

  const [isUpdate, setIsUpdate] = useState<{
    dialogue: boolean;
    branchId?: string;
  }>({ dialogue: false, branchId: "" });
  const handleDelete = async (item?: any) => {
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
        try {
          Swal.fire("", "Please Wait...", "info");
          const res = await change(`branches/${item?.id}`, {
            method: "DELETE",
          });
          const photoPaths = item?.photos;
          if (photoPaths && photoPaths.length > 0) {
            photoPaths.forEach(async (path: any) => {
              await deleteFile(String(path));
            });
          }
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
          Swal.fire(`Success`, `Deleted Successfully!`, `success`);
          mutate();
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
          setLoading(false);
        }
      }
    });
  };
  const handleBlock = async (e: ChangeEvent<HTMLInputElement>, id?: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to update status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await change(`branches/${id}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "Branch status update successfully!!", "success");
        return;
      }
    });
  };
  return (
    <section className="mt-8">
      <UpdateBranch
        branchId={isUpdate?.branchId}
        open={isUpdate?.dialogue}
        handleClose={() => setIsUpdate({ dialogue: false })}
        MainMutate={mutate}
      />
      <MaterialTable
        title={<HeadStyle name="All Branch" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={
          data
            ? data?.map((item, i: number) => ({
                ...item,
                sl: i + 1,
                updatedAt: item?.updatedAt
                  ? new Date(item.updatedAt).toLocaleString()
                  : "",
                createdAt: item?.createdAt
                  ? new Date(item.createdAt).toLocaleString()
                  : "",
                manager: item?.manager?.name,
              }))
            : []
        }
        options={{ ...MuiTblOptions(), selection: false, paging: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Branch Name",
            tooltip: "Branch Name",
            field: "name",
          },
          {
            title: "Manager",
            tooltip: "Manager",
            field: "manager",
          },
          {
            title: "Email",
            tooltip: "Email",
            field: "email",
            render: (data) => {
              return <RenderIconRow value={data?.email || "---"} isEmail />;
            },
          },
          {
            title: "Phone",
            tooltip: "Phone",
            field: "phone",
            render: (data) => {
              return <RenderIconRow value={data?.phone || "---"} isPhone />;
            },
          },
          {
            title: "Country",
            tooltip: "Country",
            field: "country",
          },
          {
            title: "Location",
            tooltip: "Location",
            field: "location",
          },
          {
            title: "Status",
            tooltip: "Status",
            render: (data) => {
              return (
                <IOSSwitch
                  size="small"
                  disabled={user?.role?.name === "MANAGER"}
                  checked={data?.isBlocked}
                  onChange={(e) => handleBlock(e, data?.id)}
                />
              );
            },
            editable: "never",
          },

          {
            title: "Last Updated",
            field: "updatedAt",
            hidden: true,
            render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Created",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
          {
            title: "Actions",
            tooltip: "Actions",
            render: (data) => {
              return (
                <div className="flex gap-1">
                  <Tooltip title="Details">
                    <div className="text-sm bg-blue-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                      <IconButton
                        onClick={() =>
                          setIsUpdate({ dialogue: true, branchId: data?.id })
                        }
                      >
                        <BorderColor className="!text-white" />
                      </IconButton>
                    </div>
                  </Tooltip>
                  {user?.role?.name === "MANAGER" ? null : (
                    <Tooltip title="Delete">
                      <div className="text-sm bg-red-500 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                        <IconButton onClick={() => handleDelete(data)}>
                          <Delete className="!text-white" />
                        </IconButton>
                      </div>
                    </Tooltip>
                  )}
                </div>
              );
            },
            editable: "never",
          },
        ]}
        detailPanel={[
          {
            tooltip: "info",
            icon: () => <Info />,
            openIcon: () => <Visibility />,
            render: ({ rowData }) => (
              <>
                <div className="w-full">
                  {rowData?.photos?.length ? (
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-8 py-4">
                      {rowData?.photos?.map((pic: any, i: any) => (
                        <div
                          key={i}
                          className="bg-white rounded-lg shadow-lg px-2 py-2"
                        >
                          <img
                            className="lg:h-48 md:h-36 w-full cursor-pointer object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                            src={pic}
                            alt="Branch"
                            onClick={() => window.open(pic)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 px-8 py-4">
                        <div className="bg-white rounded-lg shadow-lg px-2 py-2">
                          <img
                            className="lg:h-48 md:h-36 w-full object-cover object-center 
                        transition duration-500 ease-in-out transform group-hover:scale-105"
                            src="/no_IMG.jpg"
                            alt="Branch"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            ),
          },
        ]}
      />
    </section>
  );
};

export default AllBranchColumn;
