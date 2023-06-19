import { AdminDashboard, WelcomeUser } from "components/admin";
import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  MainEmployeeDashboardCards,
  MainEmployeeDashboardCharts,
  MainHrDashboardCards,
  MainHrDashboardCharts,
} from "components/admin/dashboardComponent";
import { useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  const { data: employeeDetails, isLoading } = useFetch<any>(
    `users/dashboard/details`
  );

  return (
    <PanelLayout title="Dashboard - Admin Panel">
      <>
        {isLoading ? (
          <DashboardSkeletonLoading />
        ) : (
          <>
            <WelcomeUser title="Welcome Superadmin!" />
            <AdminDashboard />
          </>
        )}
        {/* Dashboard for developer or employee */}

        {/* <WelcomeUser title="Welcome Developer Name!" />
        <section className="lg:px-8 px-4 py-4">
          {isLoading ? <DashboardSkeletonLoading />
            : (
              <>
                <MainEmployeeDashboardCards data={""} />
                <MainEmployeeDashboardCharts data={""} />
              </>
            )}
        </section> */}

        {/* Dashboard for HR */}

        {/* <WelcomeUser title="Welcome Hr!" />
        <section className="lg:px-8 px-4 py-4">
          {isLoading ? <DashboardSkeletonLoading />
            : (
              <>
                <MainHrDashboardCards data={""} />
                <MainHrDashboardCharts data={""} />
              </>
            )}
        </section> */}

        {/* Dashboard for Manager */}
        {/* <WelcomeUser title="Welcome Client Name!" />
        <section className="lg:px-8 px-4 py-4">
          {isLoading ? <DashboardSkeletonLoading />
            : (
              <>
                <MainHrDashboardCards data={""} />
                <MainHrDashboardCharts data={""} />
              </>
            )}
        </section> */}

        {/* Dashboard for Client */}
        {/* <WelcomeUser title="Welcome Client Name!" />
        <section className="lg:px-8 px-4 py-4">
          {isLoading ? <DashboardSkeletonLoading />
            : (
              <>
                <MainHrDashboardCards data={""} />
                <MainHrDashboardCharts data={""} />
              </>
            )}
        </section> */}
      </>
    </PanelLayout>
  );
};

export default AdminHome;
