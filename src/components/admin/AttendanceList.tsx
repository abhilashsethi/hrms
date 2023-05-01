import MaterialTable from "@material-table/core";
import { RenderIconRow } from "components/common";
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
        data={data ? getDataWithSL<Attendance>(data) : []}
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
            field: "name",
          },
          {
            title: "Email",
            field: "email",
            render: ({ email }) => <RenderIconRow value={email} isEmail />,
          },
          {
            title: "Employee ID",
            field: "employeeID",
            render: ({ employeeID }) => (
              <RenderIconRow value={employeeID} isId />
            ),
          },
          {
            title: "Status",
            field: "isPresent",
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
            title: "Date",
            field: "date",
            render: (data) => new Date().toISOString().slice(0, 10),
          },
          {
            title: "In Time",
            field: "createdAt",
            render: (data) => moment(data?.createdAt).format("HH:MM A"),
          },
          {
            title: "Out Time",
            field: "updatedAt",
            render: (data) => moment(data?.updatedAt).format("HH:MM A"),
          },
        ]}
      />
    </div>
  );
};

export default AttendanceList;
