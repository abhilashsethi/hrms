import MaterialTable from "@material-table/core";
import {
  ExitToApp,
  PeopleRounded,
  PersonRounded,
  Receipt,
  Savings,
} from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CopyClipboard, HeadStyle, IOSSwitch } from "components/core";
import { AddBonos, EmployeeExitForm } from "components/dialogues";
import AddSalaryInfo from "components/dialogues/AddSalaryInfo";
import { useChange } from "hooks";
import Link from "next/link";
import { useState } from "react";
import Swal from "sweetalert2";
import { MuiTblOptions, clock } from "utils";

interface ARRAY {
  id?: string;
}
interface Props {
  data?: ARRAY[];
  mutate?: any;
  userDetails?: any;
}
const EmployeesColumn = ({ data, mutate, userDetails }: Props) => {
  const [userId, setUserId] = useState("");
  const [salaryInfoModal, setSalaryInfoModal] = useState<boolean>(false);
  const [isAddBonos, setIsAddBonos] = useState<boolean>(false);
  const [employeeExitModal, setEmployeeExitModal] = useState<boolean>(false);
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

  return (
    <section className="mt-8">
      <AddBonos
        userId={userId}
        mutate={mutate}
        open={isAddBonos}
        handleClose={() => setIsAddBonos(false)}
      />
      <AddSalaryInfo
        userId={userId}
        mutate={mutate}
        open={salaryInfoModal}
        handleClose={() => setSalaryInfoModal(false)}
      />
      <EmployeeExitForm
        userId={userId}
        mutate={mutate}
        open={employeeExitModal}
        handleClose={() => setEmployeeExitModal(false)}
      />
      <MaterialTable
        title={<HeadStyle name="All Employees" icon={<PeopleRounded />} />}
        isLoading={!data}
        data={
          !data
            ? []
            : (data?.map((_: any, i: number) => ({
                ..._,
                sl: i + 1,
                roleName: _?.role?.name,
                email: _?.username,
                personalEmail: _?.email,
              })) as any)
        }
        options={{ ...MuiTblOptions("All Employees"), paging: false }}
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
            field: "roleName",
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
            export: false,
            render: (item) => {
              return (
                <Link href={`/admin/employees/profile/${item?.id}`}>
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
            title: "Salary Info",
            field: "salaryInfo",
            hidden:
              userDetails?.role?.name === "CEO" ||
              userDetails?.role?.name === "DIRECTOR" ||
              userDetails?.role?.name === "COO" ||
              userDetails?.role?.name === "HR"
                ? false
                : true,
            export: false,
            render: (item) => {
              return (
                <div className="flex gap-4">
                  <Tooltip title="Add Salary Info">
                    <div
                      onClick={() => {
                        setUserId(item?.id);
                        setSalaryInfoModal((prev) => !prev);
                      }}
                      className="text-sm bg-gradient-to-r from-blue-500 to-blue-400 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer"
                    >
                      <Receipt className="!text-white" />
                    </div>
                  </Tooltip>
                  <Tooltip title="Add Bonus ">
                    <div
                      onClick={() => {
                        setUserId(item?.id);
                        setIsAddBonos((prev) => !prev);
                      }}
                      className="text-sm bg-gradient-to-r from-blue-500 to-blue-400 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer"
                    >
                      <Savings className="!text-white" />
                    </div>
                  </Tooltip>
                </div>
              );
            },
            editable: "never",
          },
          {
            title: "Employee Exit",
            field: "employeeExit",
            hidden:
              userDetails?.role?.name === "CEO" ||
              userDetails?.role?.name === "DIRECTOR" ||
              userDetails?.role?.name === "COO" ||
              userDetails?.role?.name === "HR"
                ? false
                : true,
            export: false,
            render: (item) => {
              return (
                <Tooltip title="Employee Exit">
                  <div
                    onClick={() => {
                      setUserId(item?.id);
                      setEmployeeExitModal((prev) => !prev);
                    }}
                    className="text-sm bg-purple-600 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer"
                  >
                    <ExitToApp className="!text-white" />
                  </div>
                </Tooltip>
              );
            },
            editable: "never",
          },
          {
            title: "Unblock/Block",
            field: "isBlocked",
            hidden:
              userDetails?.role?.name === "CEO" ||
              userDetails?.role?.name === "DIRECTOR" ||
              userDetails?.role?.name === "COO" ||
              userDetails?.role?.name === "HR"
                ? false
                : true,
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
          onRowDelete:
            userDetails?.role?.name === "CEO" ||
            userDetails?.role?.name === "HR" ||
            userDetails?.role?.name === "DIRECTOR" ||
            userDetails?.role?.name === "COO"
              ? async (oldData) => {
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
                }
              : undefined,
        }}
      />
    </section>
  );
};

export default EmployeesColumn;
