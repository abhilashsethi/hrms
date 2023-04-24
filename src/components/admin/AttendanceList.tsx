import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";
const today = new Date().toISOString();

const AttendanceList = () => {
  const { data, isLoading } = useFetch<Attendance[]>(
    `attendances/user/6442769c801d963c999b31db`
  );
  const { push } = useRouter();
  return (
    <div className="mt-4">
      <MaterialTable
        title={"Today Attendance"}
        isLoading={isLoading}
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
            field: "user.name",
          },
          {
            title: "Email",
            field: "user.email",
          },
          {
            title: "Date",
            field: "date",
            render: (data) => new Date(data.date).toDateString(),
          },
          {
            title: "In Time",
            field: "createdAt",
            render: (data) => new Date(data.createdAt).toTimeString(),
          },
          {
            title: "Out Time",
            field: "updatedAt",
            render: (data) => new Date(data.updatedAt).toTimeString(),
          },
        ]}
        onRowDoubleClick={(e, rowData) =>
          push(`/admin/attendances/user/${rowData?.id}`)
        }
      />
    </div>
  );
};

export default AttendanceList;
