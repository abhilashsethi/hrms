import MaterialTable from "@material-table/core";
import { Button } from "@mui/material";
import { CopyClipboard } from "components/core";
import { useChange } from "hooks";
import moment from "moment";
import Swal from "sweetalert2";
import { MuiTblOptions } from "utils";

interface Props {
  data: any;
  mutate: () => void;
  absentMutate: () => void;
  presentMutate: () => void;
  allMutate: () => void;
}

const AttendanceList = ({
  data,
  mutate,
  absentMutate,
  presentMutate,
  allMutate,
}: Props) => {
  const { change } = useChange();
  const handleWorkFromHome = (userId: any) => {
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
        const res = await change(`attendances`, {
          body: {
            isWFH: true,
            userId: userId,
          },
        });
        mutate();
        presentMutate();
        absentMutate();
        allMutate();
        if (res?.status !== 201) {
          Swal.fire(
            `Error`,
            res?.results?.msg || "Something went wrong!",
            "error"
          );
          return;
        }
        Swal.fire(`Success`, "Status updated successfully!", "success");
        return;
      }
    });
  };
  return (
    <div className="mt-4">
      <MaterialTable
        title={"Today Attendance"}
        isLoading={!data}
        data={
          !data
            ? []
            : data?.map((_: any, i: number) => ({
                ..._,
                sl: i + 1,
                email: _?.username,
                intime:
                  _?.status === "present"
                    ? moment(_?.inTime).format("hh:mm A")
                    : "---",
                outtime:
                  _?.status === "present"
                    ? moment(_?.outTime).format("hh:mm A")
                    : "---",
                status: _?.status === "present" ? `PRESENT` : `ABSENT`,
              }))
        }
        options={{ ...MuiTblOptions(), selection: false, paging: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Name",
            field: "name",
          },
          {
            title: "Email",
            field: "email",
            render: ({ email }: any) => (
              <CopyClipboard value={email} isCut={false} />
            ),
          },
          {
            title: "Employee ID",
            field: "employeeID",
            render: ({ employeeID }: any) => (
              <CopyClipboard value={employeeID} isCut={false} />
            ),
          },
          {
            title: "Status",
            field: "status",
            render: (item) => {
              return (
                <span
                  className={`px-4 py-1 rounded-lg ${
                    item?.status === "PRESENT"
                      ? `bg-green-300 border-[1px] text-green-600 border-green-400`
                      : `bg-red-300 border-[1px] border-red-500 text-red-600`
                  }`}
                >
                  {item?.status === "PRESENT" ? `PRESENT` : `ABSENT`}
                </span>
              );
            },
          },
          {
            title: "Work From Home",
            field: "WFH",
            render: (item) => {
              return item?.status === "ABSENT" ? (
                <Button
                  onClick={() => handleWorkFromHome(item?.userId)}
                  className="!bg-theme rounded-md p-2 cursor-pointer text-white text-sm"
                >
                  Work From Home
                </Button>
              ) : (
                "---"
              );
            },
          },
          {
            title: "In Time",
            field: "intime",
          },
          {
            title: "Out Time",
            field: "outtime",
          },
        ]}
      />
    </div>
  );
};

export default AttendanceList;
