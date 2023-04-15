import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
const AllUsers = () => {
  const { data, isLoading } = useFetch<User[]>(`users`);
  return (
    <PanelLayout title="All Users - SY HR MS">
      <section className="container mx-auto">
        <MaterialTable
          title="All Users"
          isLoading={isLoading}
          data={data ? getDataWithSL<User>(data) : []}
          options={{ ...MuiTblOptions(), selection: true }}
          columns={[
            {
              title: "#",
              field: "sl",
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
              field: "phone",
              searchable: true,
              export: true,
              emptyValue: "Not Provided",
            },
            {
              title: "Last Updated",
              field: "updatedAt",
              render: (data) => clock(data.updatedAt).fromNow(),
            },
            {
              title: "Created",
              field: "createdAt",
              render: (data) => new Date(data.createdAt).toDateString(),
            },
          ]}
          editable={{
            onRowDelete: async (oldData) => {},
          }}
        />
      </section>
    </PanelLayout>
  );
};

export default AllUsers;
