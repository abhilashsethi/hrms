import MaterialTable from "@material-table/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";
const today = new Date().toISOString();
const TodayAttendance = () => {
  const { data, isLoading } = useFetch<Attendance[]>(
    `attendances/date/${today}`
  );
  return (
    <PanelLayout title="Today Attendance - SY HR MS">
      <section className="container mx-auto">
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
        />
      </section>
    </PanelLayout>
  );
};

export default TodayAttendance;
