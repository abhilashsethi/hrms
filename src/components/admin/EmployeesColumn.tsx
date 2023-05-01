import MaterialTable from "@material-table/core";
import { PeopleRounded } from "@mui/icons-material";
import { RenderIconRow } from "components/common";
import { HeadStyle, IOSSwitch, Loader, RoleComponent } from "components/core";
import { useChange, useFetch } from "hooks";
// import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { User } from "types";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: ARRAY[];
}
const EmployeesColumn = ({ data }: Props) => {
  const { data: employees, isLoading, mutate } = useFetch<User[]>(`users`);
  const sortData: any = data?.sort(
    (a: any, b: any) =>
      (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
  );
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
  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Employees" icon={<PeopleRounded />} />}
        isLoading={isLoading || isChanging}
        data={sortData ? getDataWithSL<User>(sortData) : []}
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
            render: ({ email }) => <RenderIconRow value={email} isEmail />,
          },
          {
            title: "Phone",
            field: "phone",
            emptyValue: "Not Provided",
            editable: "never",
            render: ({ phone }) => <RenderIconRow value={phone} isPhone />,
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
            render: ({ employeeID }) => (
              <RenderIconRow value={employeeID} isId />
            ),
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
