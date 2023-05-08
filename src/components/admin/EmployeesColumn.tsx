import MaterialTable from "@material-table/core";
import { PeopleRounded, PersonRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle, IOSSwitch } from "components/core";
import { useChange } from "hooks";
import Link from "next/link";
import Swal from "sweetalert2";
import { MuiTblOptions, clock, getDataWithSL } from "utils";
interface ARRAY {
  id?: string;
}
interface Props {
  data?: ARRAY[];
  mutate?: any;
}
const EmployeesColumn = ({ data, mutate }: Props) => {
  const { change, isChanging } = useChange();
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
        Swal.fire(`Success`, "Status updated successfully!", "success");
        return;
      }
    });
  };
  console.log(data);
  return (
    <section className="mt-8">
      <MaterialTable
        title={<HeadStyle name="All Employees" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={data ? getDataWithSL<any>(data) : []}
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
            render: ({ email }) => <CopyClipboard value={email} />,
          },
          {
            title: "Employee ID",
            field: "employeeID",
            emptyValue: "Not Provided",
            render: ({ employeeID }) => (
              <div className="font-semibold">
                <CopyClipboard value={employeeID} />
              </div>
            ),
            editable: "never",
          },
          {
            title: "Role",
            field: "role",
            emptyValue: "Not Provided",
            render: ({ role }) => {
              return (
                <span className="text-sm text-gray-500">{role?.name}</span>
              );
            },
            editable: "never",
          },
          {
            title: "Details",
            field: "name",
            render: (item) => {
              return (
                <Link href={`/admin/employees/employee-profile?id=${item?.id}`}>
                  <Tooltip title="Details">
                    <div className="text-sm bg-gradient-to-r from-blue-500 to-blue-400 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
                      <PersonRounded className="!text-white" />
                    </div>
                  </Tooltip>
                </Link>
              );
            },
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
          // {
          //   title: "Office Access",
          //   field: "isOfficeAccessGranted",
          //   lookup: { true: "Granted", false: "Not Granted" },
          //   // editable: "never",
          // },
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
          // onRowUpdate: async (newData: any) => {
          //   const res = await change(`users/${newData?.id}`, {
          //     method: "PATCH",
          //     body: {
          //       isOfficeAccessGranted:
          //         newData?.isOfficeAccessGranted === "true" ? true : false,
          //     },
          //   });
          //   console.log(res);
          //   mutate();
          //   if (res?.status !== 200) {
          //     Swal.fire(`Error`, "Something went wrong!", "error");
          //     return;
          //   }
          //   Swal.fire(`Success`, "Updated Successfully!", "success");
          //   return;
          // },
        }}
      />
    </section>
  );
};

export default EmployeesColumn;
