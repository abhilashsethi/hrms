import MaterialTable from "@material-table/core";
import { PeopleRounded } from "@mui/icons-material";
import { HeadStyle, IOSSwitch, RoleComponent } from "components/core";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const AllRollColumn = () => {
  const [loading, setLoading] = useState(false);
  const {
    data: roleData,
    isLoading,
    mutate,
  } = useFetch<[{ id: string; name: string }]>(`roles`);
  const { change, isChanging } = useChange();

  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Roles" icon={<PeopleRounded />} />}
        isLoading={isLoading || isChanging}
        data={roleData ? getDataWithSL<any>(roleData) : []}
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
          onRowUpdate: async (oldData, newData) => {
            console.log("new", newData);
            console.log(oldData);

            const res = await change(`roles/${newData?.id}`, {
              method: "PATCH",
              body: { name: newData?.name },
            });
            console.log(res);
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
