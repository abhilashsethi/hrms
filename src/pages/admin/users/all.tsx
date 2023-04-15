import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import Swal from "sweetalert2";
import { User } from "types";
import { MuiTblOptions } from "utils";
const AllUsers = () => {
  const { data, msg, success } = useFetch<User[]>(`users`);
  return (
    <PanelLayout title="All Users - SY HR MS">
      <>
        <MaterialTable
          data={[] as User[]}
          options={{ ...MuiTblOptions(), selection: true }}
          columns={[
            {
              title: "#",
              field: "sn",
              editable: "never",
              width: "2%",
            },
            {
              title: "Name",
              tooltip: "Name",
              searchable: true,
              field: "name",
            },
            {
              title: "Email",
              tooltip: "Email",
              searchable: true,
              field: "email",
            },
            {
              title: "Phone",
              field: "phoneNumber",
              searchable: true,
              export: true,
              emptyValue: "Not Provided",
            },
            {
              title: "Timestamp",
              tooltip: "timestamp",
              field: "createdAt",
            },
          ]}
          editable={{
            onRowDelete: async (oldData) => {
              await Swal.fire(
                `Success`,
                `Students data removed successfully!`,
                `success`
              );
            },
          }}
        />
      </>
    </PanelLayout>
  );
};

export default AllUsers;
