import { AdminDashboard, WelcomeUser } from "components/admin";
import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  AccountantDashboardCards,
  AccountantDashboardCharts,
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
    `dashboards/hr-dashInfo`
  );
  return (
    <PanelLayout title={`Dashboard - ${user?.role?.name}`}>
      <>
        {user?.role?.name == "CEO" ? (
          <>
            {isLoading ? (
              <DashboardSkeletonLoading />
            ) : (
              <>
                <WelcomeUser title="Welcome Superadmin!" />
                <AdminDashboard />
              </>
            )}
          </>
        ) : user?.role?.name == "DEVELOPER" || user?.role?.name === "TESTER" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.role?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <MainEmployeeDashboardCards data={developerDetails} />
                  <MainEmployeeDashboardCharts data={developerDetails} />
                </>
              )}
            </section>
          </>
        ) : user?.role?.name == "HR" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.role?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <MainHrDashboardCards data={hrDetails} />
                  <MainHrDashboardCharts data={hrDetails} />
                </>
              )}
            </section>
          </>
        ) : user?.role?.name == "MANAGER" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.role?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <MainManagerDashboardCards data={""} />
                  <MainManagerDashboardCharts data={""} />
                </>
              )}
            </section>
          </>
        ) : user?.role?.name == "DIRECTOR" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.role?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <AdminDashboard />
                </>
              )}
            </section>
          </>
        ) : user?.role?.name == "PROJECT MANAGER" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.role?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? (
                <DashboardSkeletonLoading />
              ) : (
                <>
                  <ProjectManagerDashboardCards data={""} />
                  <ProjectManagerDashboardCharts data={""} />
                </>
              )}
            </section>
          </>
        )
          : user?.role?.name == "ACCOUNTANT" ? (
            <>
              <WelcomeUser title={`Welcome ${user?.role?.name}`} />
              <section className="lg:px-8 px-4 py-4">
                {isLoading ? (
                  <DashboardSkeletonLoading />
                ) : (
                  <>
                    <AccountantDashboardCards data={""} />
                    <AccountantDashboardCharts data={""} />
                  </>
                )}
              </section>
            </>
          ) : (
            // client
            <>
              <WelcomeUser title={`Welcome client ${user?.name}`} />
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
          )}

        {/* Dashboard for Client */}
        {/* <WelcomeUser title="Welcome Client Name!" />
				<section className="lg:px-8 px-4 py-4">
					{isLoading ? (
						<DashboardSkeletonLoading />
					) : (
						<>
							<MainClientDashboardCards data={""} />
							<MainClientDashboardCharts  data={""} />
						</>
					)}
				</section> */}
      </>
    </PanelLayout>
  );
};

export default AdminHome;
