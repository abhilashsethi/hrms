import MaterialTable from "@material-table/core";
import { Avatar } from "@mui/material";
import { RenderIconRow } from "components/common";
import moment from "moment";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";

interface Props {
  data: any;
}

const AttendanceList = ({ data }: Props) => {
  console.log(data);
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
            // field: "name",
            render: ({ data }: any) => (
              <>
                <Avatar alt={data?.name} src={data?.photo} />
                <p>{data?.name}</p>
              </>
            ),
          },
          {
            title: "Email",
            field: "email",
            render: ({ email }: any) => <RenderIconRow value={email} isEmail />,
          },
          {
            title: "Employee ID",
            field: "employeeID",
            render: ({ employeeID }: any) => (
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
