import { AdminDashboard, WelcomeUser } from "components/admin";
import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  AccountantDashboardCards,
  AccountantDashboardCharts,
  BidManagerDashboardCards,
  BidManagerDashboardCharts,
  MainClientDashboardCards,
  MainClientDashboardCharts,
  MainEmployeeDashboardCards,
  MainEmployeeDashboardCharts,
  MainHrDashboardCards,
  MainHrDashboardCharts,
  MainManagerDashboardCards,
  MainManagerDashboardCharts,
  ProjectManagerDashboardCards,
  ProjectManagerDashboardCharts,
} from "components/admin/dashboardComponent";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  const { user } = useAuth();
  const { data: employeeDetails, isLoading } = useFetch<any>(
    `users/dashboard/details`
  );
  const { data: developerDetails, isLoading: devIsLoading } = useFetch<any>(
    `dashboards/developer-dashInfo/${user?.id}`
  );
  const { data: hrDetails, isLoading: hrIsLoading } = useFetch<any>(
    `dashboards/hr-dashInfo?branchId=${user?.employeeOfBranchId}`
  );
  return (
    <PanelLayout title={`Dashboard - ${user?.role?.name}`}>
      <>
        {user?.role?.name === "CEO" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <AdminDashboard />
              </>
            )}
          </>
        ) : user?.role?.name === "DEVELOPER" ||
          user?.role?.name === "TESTER" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <MainEmployeeDashboardCards data={developerDetails} />
                  <MainEmployeeDashboardCharts data={developerDetails} />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "HR" ? (
          <>
            {hrIsLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <MainHrDashboardCards data={hrDetails} />
                  <MainHrDashboardCharts data={hrDetails} />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "MANAGER" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <MainManagerDashboardCards data={""} />
                  <MainManagerDashboardCharts data={""} />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "DIRECTOR" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <AdminDashboard />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "PROJECT MANAGER" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <ProjectManagerDashboardCards data={""} />
                  <ProjectManagerDashboardCharts data={""} />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "BID MANAGER" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <BidManagerDashboardCards data={""} />
                  <BidManagerDashboardCharts data={""} />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "ACCOUNTANT" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <AccountantDashboardCards data={""} />
                  <AccountantDashboardCharts data={""} />
                </section>
              </>
            )}
          </>
        ) : user?.isClient ? (
          <>
            {/* Dashboard for Client */}
            <WelcomeUser title="Welcome Client Name!" />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <MainClientDashboardCards data={""} />
                  <MainClientDashboardCharts data={""} />
                </>
              )}
            </section>
          </>
        ) : (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <MainEmployeeDashboardCards data={developerDetails} />
                  <MainEmployeeDashboardCharts data={developerDetails} />
                </section>
              </>
            )}
          </>
        )}
      </>
    </PanelLayout>
  );
};

export default AdminHome;
