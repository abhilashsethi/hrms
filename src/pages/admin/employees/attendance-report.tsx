import MaterialTable from "@material-table/core";
import { Checklist } from "@mui/icons-material";
import {
  AdminBreadcrumbs,
  HeadStyle,
  Loader,
  LoaderAnime,
} from "components/core";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import moment from "moment";
import { useRouter } from "next/router";
import { Attendance, AttendanceData } from "types";
import { MuiTblOptions } from "utils";

const AttendanceReport = () => {
  const router = useRouter();
  const { user } = useAuth();
  const getMonthName = (monthNumber: any) => {
    const date = new Date(2000, monthNumber, 1); // Creating a Date object with the year 2000 and the given month number
    const monthName = date.toLocaleString("default", { month: "long" }); // Getting the month name using the 'long' option
    return monthName;
  };
  const links = [
    { id: 2, page: "All Employee", link: "/admin/employees/all-employees" },
    {
      id: 3,
      page: "Employee Profile",
      link: `/admin/employees/profile/${router?.query?.empId}`,
    },
  ];
  const nextLinks = [
    {
      id: 3,
      page: "My Profile",
      link: `/admin/employees/my-profile`,
    },
  ];
  const { data: attendanceData, isLoading } = useFetch<Attendance[]>(
    `attendances/${router?.query?.empId}?month=${router?.query?.month}`
  );
  return (
    <PanelLayout title="Monthly Report ">
      <section className="md:px-8 px-2 py-4">
        <div className="pb-4">
          {user?.role?.name === "CEO" || user?.role?.name === "HR" ? (
            <AdminBreadcrumbs links={links} />
          ) : (
            <AdminBreadcrumbs links={nextLinks} />
          )}
        </div>
        <div>
          {isLoading ? <Loader /> : null}
          {attendanceData?.length ? (
            <>
              <MaterialTable
                title={
                  <HeadStyle
                    name={`Attendance report for ${getMonthName(
                      router?.query?.month
                    )}`}
                    icon={<Checklist />}
                  />
                }
                isLoading={!attendanceData}
                data={
                  !attendanceData
                    ? []
                    : attendanceData?.map((_: Attendance, i: number) => ({
                        ..._,
                        sl: i + 1,
                        in: moment(_?.inTime).format("hh:mm A"),
                        out: moment(_?.outTime).format("hh:mm A"),
                        date: moment(_?.date).format(""),
                      }))
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
            </>
          ) : (
            <LoaderAnime text={`No Employee Attendance`} />
          )}
        </div>
      </section>
    </PanelLayout>
  );
};

export default AttendanceReport;
