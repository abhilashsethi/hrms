import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";

const AttendanceList = () => {
  const { data, isLoading } = useFetch<any>(
    `attendances/preset_absent/date/${new Date().toISOString().slice(0, 10)}`
  );
  const { push } = useRouter();
  return (
    <div className="mt-4">
      <MaterialTable
        title={"Today Attendance"}
        isLoading={isLoading}
        data={
          data?.presentUsers
            ? getDataWithSL<Attendance>(data?.presentUsers)
            : []
        }
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
          },
          {
            title: "Date",
            field: "date",
            render: (data) => new Date().toISOString().slice(0, 10),
          },
          {
            title: "In Time",
            field: "createdAt",
            render: (data) => moment(data?.createdAt).format("lll"),
          },
          {
            title: "Out Time",
            field: "updatedAt",
            render: (data) => moment(data?.updatedAt).format("lll"),
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
