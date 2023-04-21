import MaterialTable from "@material-table/core";
import { PeopleRounded } from "@mui/icons-material";
import { HeadStyle, IOSSwitch, RoleComponent } from "components/core";
import { useChange, useFetch } from "hooks";
// import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";

const EmployeesColumn = () => {
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();
  // const { push } = useRouter();
  const handleBlock = async (e: any, userId: string) => {
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
        const res = await change(`users/${userId}`, {
          method: "PATCH",
          body: { isBlocked: !e.target?.checked },
        });
        mutate();
        if (res?.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire(`Success`, "User Blocked successfully!!", "success");
        return;
      }
    });
  };
  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Employees" icon={<PeopleRounded />} />}
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
            editable: "never",
          },
          {
            title: "Email",
            tooltip: "Email",
            field: "email",
            editable: "never",
          },
          {
            title: "Phone",
            field: "phone",
            emptyValue: "Not Provided",
            editable: "never",
          },
          {
            title: "Role",
            field: "roleId",
            emptyValue: "Not Provided",
            render: (item) => <RoleComponent roleId={item?.roleId} />,
            editable: "never",
          },
          {
            title: "Employee ID",
            field: "employeeID",
            emptyValue: "Not Provided",
            editable: "never",
          },
          {
            title: "UNBLOCK/BLOCK",
            field: "isBlocked",
            emptyValue: "Not Provided",
            align: "center",
            render: (data) => (
              <IOSSwitch
                checked={data?.isBlocked}
                onChange={(e) => handleBlock(e, data?.id)}
              />
            ),
            editable: "never",
          },
          {
            title: "Last Updated",
            field: "updatedAt",
            render: (data) => clock(data.updatedAt).fromNow(),
            editable: "never",
          },
          {
            title: "Office Access",
            field: "isOfficeAccessGranted",
            lookup: { true: "Granted", false: "Not Granted" },
            // editable: "never",
          },
          {
            title: "Created",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toDateString(),
            editable: "never",
          },
        ]}
        // onRowDoubleClick={(e, rowData) =>
        //   push(`/admin/attendances/user/${rowData?.id}`)
        // }
        editable={{
          onRowDelete: async (oldData) => {
            const res = await change(`users/${oldData.id}`, {
              method: "DELETE",
            });
            if (res?.status !== 200) {
              Swal.fire(`Error`, "Something went wrong!", "error");
              return;
            }
            Swal.fire(`Success`, "Deleted Successfully!", "success");
            mutate();
            return;
          },
          onRowUpdate: async (newData: any) => {
            const res = await change(`users/${newData?.id}`, {
              method: "PATCH",
              body: {
                isOfficeAccessGranted:
                  newData?.isOfficeAccessGranted === "true" ? true : false,
              },
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

export default EmployeesColumn;
