import { WelcomeUser } from "components/admin";
import { AttendanceCard, AttendanceCharts } from "components/admin/attendance";
import { AdminBreadcrumbs } from "components/core";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const Attendance = () => {
  const { data: attendanceData } = useFetch<any>(`attendances/dashboard`);
  const { data: absentData } = useFetch<any>(
    `attendances/${new Date().toISOString().slice(0, 10)}/absent`
  );
  const { data: presentData } = useFetch<any>(
    `attendances/${new Date().toISOString().slice(0, 10)}/present`
  );
  const { data: allData } = useFetch<any>(
    `attendances/${new Date().toISOString().slice(0, 10)}/all`
  );
  console.log("dashboard", attendanceData);
  return (
    <PanelLayout title="Attendance Dashboard - Admin Panel">
      <>
        <WelcomeUser title="Welcome Superadmin!" />
        <div className="px-4 pt-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <AttendanceCard
          absentData={absentData}
          presentData={presentData}
          allData={allData}
        />
        <AttendanceCharts
          absentData={absentData}
          presentData={presentData}
          allData={allData}
        />
      </>
    </PanelLayout>
  );
};

export default Attendance;

const links = [{ id: 1, page: "Attendance", link: "/admin/attendances" }];
