import MaterialTable from "@material-table/core";
import { Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { Attendance } from "types";
import { MuiTblOptions, getDataWithSL } from "utils";
const UserAttendance = ({ id }: { id: string }) => {
  const { data, isLoading } = useFetch<Attendance[]>(`attendances/user/${id}`);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout title="User Attendance - SY HR MS">
      <section className="w-11/12 mx-auto">
        <MaterialTable
          title={"User Attendance"}
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

UserAttendance.getInitialProps = function (reqOrContext: any) {
  const { id } = reqOrContext.query;
  return { id };
};

export default UserAttendance;
