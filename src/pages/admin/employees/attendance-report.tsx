import MaterialTable from "@material-table/core";
import { Checklist } from "@mui/icons-material";
import { AdminBreadcrumbs, HeadStyle } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRouter } from "next/router";
import { MuiTblOptions } from "utils";

const AttendanceReport = () => {
  const router = useRouter();
  const getMonthName = (monthNumber: any) => {
    const date = new Date(2000, monthNumber, 1); // Creating a Date object with the year 2000 and the given month number
    const monthName = date.toLocaleString("default", { month: "long" }); // Getting the month name using the 'long' option
    return monthName;
  };
  const links = [
    { id: 1, page: "Employee", link: "/admin/employees" },
    { id: 2, page: "All Employee", link: "/admin/employees/all-employees" },
    {
      id: 3,
      page: "Employee Profile",
      link: `/admin/employees/profile/${router?.query?.empId}`,
    },
    {
      id: 4,
      page: "Monthly Attendance",
      link: `/admin/employees/attendance-report?empId=${router?.query?.empId}?month=${router?.query?.month}`,
    },
  ];
  const { data: attendanceData } = useFetch<any>(
    `attendances/${router?.query?.empId}?month=${router?.query?.month}`
  );
  return (
    <PanelLayout title="Monthly Report - Admin Panel">
      <section className="px-8 py-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <div>
          <MaterialTable
            title={
              <HeadStyle
                name={`Employee Attendance for ${getMonthName(
                  router?.query?.month
                )}`}
                icon={<Checklist />}
              />
            }
            isLoading={!attendanceData}
            data={
              !attendanceData
                ? []
                : (attendanceData?.map((_: any, i: number) => ({
                  ..._,
                  sl: i + 1,
                  in: moment(_?.inTime).format("hh:MM A"),
                  out: moment(_?.outTime).format("hh:MM A"),
                })) as any)
            }
            options={{ ...MuiTblOptions() }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "Date",
                tooltip: "Date",
                field: "date",
                editable: "never",
                render: (item) => {
                  return <span>{moment(item?.date).format("ll")}</span>;
                },
              },
              {
                title: "Status",
                tooltip: "Status",
                field: "status",
                editable: "never",
                render: (item) => {
                  return <span className="capitalize">{item?.status}</span>;
                },
              },
              {
                title: "In Time",
                tooltip: "In Time",
                field: "in",
                editable: "never",
              },

              {
                title: "Out Time",
                tooltip: "Out Time",
                field: "out",
                editable: "never",
              },
            ]}
          />
        </div>
      </section>
    </PanelLayout>
  );
};

export default AttendanceReport;
