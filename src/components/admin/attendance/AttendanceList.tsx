import MaterialTable from "@material-table/core";
import { CopyClipboard } from "components/core";
import moment from "moment";
import { MuiTblOptions } from "utils";

interface Props {
  data: any;
}

const AttendanceList = ({ data }: Props) => {
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
                intime:
                  _?.status === "present"
                    ? moment(_?.createdAt).format("hh:mm A")
                    : "---",
                outtime:
                  _?.status === "present"
                    ? moment(_?.updatedAt).format("hh:mm A")
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
