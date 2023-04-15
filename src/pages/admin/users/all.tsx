import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
const AllUsers = () => {
  const { data, isLoading } = useFetch<User[]>(`users`);
  const { push } = useRouter();
  return (
    <PanelLayout title="All Users - SY HR MS">
      <section className="w-11/12 mx-auto">
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
          onRowDoubleClick={(e, rowData) =>
            push(`/admin/attendances/user/${rowData?.id}`)
          }
          editable={{
            onRowDelete: async (oldData) => {},
          }}
        />
      </section>
    </PanelLayout>
  );
};

export default AllUsers;
