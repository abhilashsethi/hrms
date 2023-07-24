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
                  <MainManagerDashboardCards data={""} />
                  <MainManagerDashboardCharts data={""} />
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
                  <SalesDashboardCards data={""} />
                  <SalesDashboardCharts data={""} />
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
        ) : user?.role?.name === "BID" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title={`Welcome ${user?.role?.name}`} />
                <section className="lg:px-8 px-4 py-4">
                  <BidDashboardCards data={""} />
                  <BidDashboardCharts data={""} />
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
                  <UserDashboardCards data={developerDetails} />
                  <UserDashboardCharts data={developerDetails} />
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
