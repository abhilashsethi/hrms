import MaterialTable from "@material-table/core";
import { Avatar } from "@mui/material";
import { RenderIconRow } from "components/common";
import { CopyClipboard } from "components/core";
import moment from "moment";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";

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
          data
            ? data?.map((_: any, i: number) => ({
                ..._,
                sl: i + 1,
                intime: moment(_?.createdAt).format("HH:MM A"),
                outtime: moment(_?.updatedAt).format("HH:MM A"),
                status: _?.status === "present" ? `PRESENT` : `ABSENT`,
              }))
            : []
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
            render: (item: any) => {
              return (
                <span
                  className={`px-4 py-1 rounded-lg ${
                    item?.status === "present"
                      ? `bg-green-300 border-[1px] text-green-600 border-green-400`
                      : `bg-red-300 border-[1px] border-red-500 text-red-600`
                  }`}
                >
                  {item?.status === "present" ? `PRESENT` : `ABSENT`}
                </span>
              );
            },
          },
          {
            title: "In Time",
            field: "intime",
            render: (data) => moment(data?.createdAt).format("HH:MM A"),
          },
          {
            title: "Out Time",
            field: "outtime",
            render: (data) => moment(data?.updatedAt).format("HH:MM A"),
          },
        ]}
      />
    </div>
  );
};

export default AttendanceList;
