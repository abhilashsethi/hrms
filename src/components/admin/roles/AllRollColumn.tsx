import MaterialTable from "@material-table/core";
import { Info, PeopleRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { HeadStyle } from "components/core";
import { RoleInformation } from "components/drawer";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Role } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface Props {
  data?: any;
  mutate?: any;
}
const AllRollColumn = ({ data, mutate }: Props) => {
  const [isInfo, setIsInfo] = useState<{ dialogue?: boolean; role?: any }>({
    dialogue: false,
    role: null,
  });
  const { change, isChanging } = useChange();
  const [loading, setLoading] = useState(false);
  return (
    <section className="mt-8">
      <RoleInformation
        open={isInfo?.dialogue}
        onClose={() => setIsInfo({ dialogue: false })}
        roleId={isInfo?.role?.id}
      />
      <MaterialTable
        title={<HeadStyle name="All Roles" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={data?.roles ? getDataWithSL<any>(data?.roles) : []}
        options={{ ...MuiTblOptions(), selection: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Role",
            tooltip: "Role",
            field: "name",
          },
          {
            title: "Total Members",
            tooltip: "Total Members",
            // field: "data._count?.users",
            render: (data) => {
              return <div className="">{data?._count?.users}</div>;
            },
          },
          {
            title: "Details",
            field: "name",
            render: (data) => {
              return (
                <Tooltip title="Details">
                  <div className="text-sm bg-gradient-to-r from-blue-500 to-blue-400 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                    <IconButton
                      onClick={() => setIsInfo({ dialogue: true, role: data })}
                    >
                      <Info className="!text-white" />
                    </IconButton>
                  </div>
                </Tooltip>
              );
            },
            editable: "never",
          },
          {
            title: "Last Updated",
            field: "updatedAt",
            render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Created",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            setLoading(true);
            Swal.fire("", "Please Wait...", "info");
            try {
              const res = await change(`roles/${oldData.id}`, {
                method: "DELETE",
              });
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
          },
          onRowUpdate: async (newData) => {
            const res = await change(`roles/${newData?.id}`, {
              method: "PATCH",
              body: { name: newData?.name },
            });
            mutate();
            if (res?.status !== 200) {
              Swal.fire(`Error`, "Something went wrong!", "error");
              return;
            }
            Swal.fire(`Success`, "Updated Successfully!", "success");
            return;
          },
        }}
      />
    </section>
  );
};

export default AllRollColumn;