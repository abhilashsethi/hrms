import MaterialTable from "@material-table/core";
import { useChange, useFetch, useMutation } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
const AllUsers = () => {
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  const { push } = useRouter();
  return (
    <PanelLayout title="All Users - SY HR MS">
      <section className="w-11/12 mx-auto">
        <MaterialTable
          title="All Users"
          isLoading={isLoading || isChanging}
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
              field: "name",
            },
            {
              title: "Email",
              tooltip: "Email",
              field: "email",
            },
            {
              title: "Password",
              field: "password",
              render: () => "******",
            },
            {
              title: "Phone",
              field: "phone",
              emptyValue: "Not Provided",
            },
            {
              title: "Role",
              field: "role",
              emptyValue: "Not Provided",
            },
            {
              title: "Employee ID",
              field: "employeeID",
              emptyValue: "Not Provided",
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
          onRowDoubleClick={(e, rowData) =>
            push(`/admin/attendances/user/${rowData?.id}`)
          }
          editable={{
            onRowDelete: async (oldData) => {
              const res = await change(`users/${oldData.id}`, {
                method: "DELETE",
              });
              console.log(res);
              mutate();
            },
            async onRowAdd(newData) {
              try {
                const response = await change(`users`, { body: newData });
                console.log(response);
                mutate();
              } catch (error) {
                console.log(error);
              }
            },
          }}
        />
      </section>
    </PanelLayout>
  );
};

export default AllUsers;
