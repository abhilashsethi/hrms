import { Groups, HowToReg, PersonOff } from "@mui/icons-material";
import { CANCEL, CHECK, GROUP } from "assets/dashboard_Icons";
import { WelcomeUser } from "components/admin";
import { AttendanceCharts } from "components/admin/attendance";
import { AdminBreadcrumbs, DashboardCard, Loader } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useMemo } from "react";
const Attendance = () => {
  // const { data: attendanceData } = useFetch<any>(
  // 	`attendances/dashboard/details/data`
  // );
  const { data: absentData } = useFetch<any>(
    `attendances/${new Date().toISOString().slice(0, 10)}/absent`
  );
  const { data: presentData } = useFetch<any>(
    `attendances/${new Date().toISOString().slice(0, 10)}/present`
  );
  const { data: dashboardDetails, isLoading } = useFetch<any>(
    `users/dashboard/details`
  );
  const cards = useMemo(
    () => [
      {
        id: 1,
        icon: (
          <HowToReg
            fontSize="large"
            className="text-theme group-hover:text-white shadow-xl rounded-lg"
          />
        ),
        count: `${presentData?.length ? presentData?.length : `0`}`,
        title: "Today Present",
        bg: "from-blue-500 to-blue-300",
        img: CHECK.src,
      },
      {
        id: 2,
        icon: (
          <PersonOff
            fontSize="large"
            className="text-theme group-hover:text-white shadow-xl rounded-lg"
          />
        ),
        count: `${absentData?.length ? absentData?.length : `0`}`,
        title: "Today Absent",
        bg: "from-purple-500 to-purple-300",
        img: CANCEL.src,
      },
      {
        id: 3,
        icon: (
          <Groups
            fontSize="large"
            className="text-theme group-hover:text-white shadow-xl rounded-lg"
          />
        ),
        count: `${
          dashboardDetails?.totalUsers ? dashboardDetails?.totalUsers : `0`
        }`,
        title: "Total Employees",
        bg: "from-yellow-500 to-yellow-300",
        img: GROUP.src,
      },
    ],
    [dashboardDetails, absentData, presentData]
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <PanelLayout title="Attendance Dashboard - Admin Panel">
      <>
        <WelcomeUser title="Welcome Superadmin!" />
        <div className="lg:px-8 px-4 pt-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <div className="lg:px-8 px-4 pt-4">
          <DashboardCard data={cards} />
          <AttendanceCharts
            absentData={absentData}
            presentData={presentData}
            dashboardDetails={dashboardDetails}
          />
        </div>
      </>
    </PanelLayout>
  );
};

export default Attendance;

const links = [{ id: 1, page: "Attendance", link: "/admin/attendances" }];
