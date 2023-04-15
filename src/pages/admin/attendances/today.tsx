import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";
const today = new Date().toISOString();
const TodayAttendance = () => {
  const { data, isLoading } = useFetch<Attendance[]>(
    `attendances/date/${today}`
  );
  const { push } = useRouter();
  return (
    <PanelLayout title="Today Attendance - SY HR MS">
      <section className="w-11/12 mx-auto">
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
      </section>
    </PanelLayout>
  );
};

export default TodayAttendance;
