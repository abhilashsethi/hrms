import { AdminDashboard, WelcomeUser } from "components/admin";
import { DashboardSkeletonLoading } from "components/admin/assets";
import { MainEmployeeDashboardCards, MainEmployeeDashboardCharts } from "components/admin/employee";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  const { data: employeeDetails, isLoading } = useFetch<any>(`users/dashboard/details`);

  return (
    <PanelLayout title="Dashboard - Admin Panel">
      <>
        {/* <WelcomeUser title="Welcome Superadmin!" />
        <AdminDashboard /> */}
        <WelcomeUser title="Welcome Developer Name!" />
        <section className="lg:px-8 px-4 py-4">
          {isLoading ? <DashboardSkeletonLoading />
            : (
              <>
                <MainEmployeeDashboardCards data={""} />
                <MainEmployeeDashboardCharts data={""} />
              </>
            )}
        </section>
      </>
    </PanelLayout>
  );
};

export default AdminHome;
