import MaterialTable from "@material-table/core";
import { PeopleRounded } from "@mui/icons-material";
import { HeadStyle, Loader } from "components/core";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const AllDepartmentColumn = () => {
  const [loading, setLoading] = useState(false);
  const {
    data: roleData,
    isLoading,
    mutate,
  } = useFetch<[{ id: string; name: string }]>(`department`);
  const { change, isChanging } = useChange();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Department" icon={<PeopleRounded />} />}
        isLoading={isLoading || isChanging}
        data={department ? getDataWithSL<any>(department) : []}
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
            //   render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Created",
            field: "createdAt",
            //   render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
        ]}
        editable={{
          onRowDelete: async (oldData) => {
            setLoading(true);
            Swal.fire("", "Please Wait...", "info");
            try {
              const res = await change(`department/${oldData.id}`, {
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

            const res = await change(`department/${newData?.id}`, {
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

export default AllDepartmentColumn;
const department = [
  {
    id: 0,
    name: "Web Development",
    updatedAt: "25th Aug",
    createdAt: "25th Aug",
  },
  {
    id: 1,
    name: "Application Development",
    updatedAt: "25th Aug",
    createdAt: "25th Aug",
  },
  {
    id: 2,
    name: "IT Management",
    updatedAt: "25th Aug",
    createdAt: "25th Aug",
  },
  {
    id: 3,
    name: "Accounts Management",
    updatedAt: "25th Aug",
    createdAt: "25th Aug",
  },
];
