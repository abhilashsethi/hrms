import { AdminDashboard, WelcomeUser } from "components/admin";
import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  AccountantDashboardCards,
  AccountantDashboardCharts,
  BidDashboardCards,
  BidDashboardCharts,
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
  SalesDashboardCards,
  SalesDashboardCharts,
  UserDashboardCards,
  UserDashboardCharts,
} from "components/admin/dashboardComponent";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  const { user } = useAuth();

  const { data: developerDetails, isLoading } = useFetch<any>(
    `dashboards/developer-dashInfo/${user?.id}`
  );

  return (
    <PanelLayout
      title={`Dashboard - ${user?.isClient ? "CLIENT" : user?.role?.name}`}
    >
      <>
        {user?.role?.name === "CEO" ||
        user?.role?.name === "DIRECTOR" ||
        user?.role?.name === "COO" ? (
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
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <MainHrDashboardCards />
                  <MainHrDashboardCharts />
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
                  <MainManagerDashboardCards />
                  <MainManagerDashboardCharts />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "SALES" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <SalesDashboardCards />
                  <SalesDashboardCharts />
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
                  <ProjectManagerDashboardCards />
                  <ProjectManagerDashboardCharts />
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
                  <BidManagerDashboardCards />
                  <BidManagerDashboardCharts />
                </section>
              </>
            )}
          </>
        ) : user?.role?.name === "BID" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <BidDashboardCards />
                  <BidDashboardCharts />
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
                  <AccountantDashboardCards />
                  <AccountantDashboardCharts />
                </section>
              </>
            )}
          </>
        ) : user?.isClient ? (
          <>
            {/* Dashboard for Client */}
            <WelcomeUser title="Welcome Client !" />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <MainClientDashboardCards />
                  <MainClientDashboardCharts />
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
                {/* Dashboard Default  */}
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <UserDashboardCards />
                  <UserDashboardCharts />
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
