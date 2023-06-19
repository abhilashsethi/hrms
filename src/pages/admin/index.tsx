import { AdminDashboard, WelcomeUser } from "components/admin";
import { DashboardSkeletonLoading } from "components/admin/assets";
import {
  MainManagerDashboardCards,
  MainManagerDashboardCharts,
  MainClientDashboardCards,
  MainClientDashboardCharts,
  MainEmployeeDashboardCards,
  MainEmployeeDashboardCharts,
  MainHrDashboardCards,
  MainHrDashboardCharts,
  MainDirectorDashboardCards,
} from "components/admin/dashboardComponent";
import { useAuth, useFetch } from "hooks";
import PanelLayout from "layouts/panel";

const AdminHome = () => {
  const { user } = useAuth();
  const { data: employeeDetails, isLoading } = useFetch<any>(
    `users/dashboard/details`
  );


  return (
    <PanelLayout title="Dashboard - Admin Panel">
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
        ) : user?.role?.name == "DEVELOPER" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.name}`} />
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
        ) : user?.role?.name == "HR" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? <DashboardSkeletonLoading />
                : (
                  <>
                    <MainHrDashboardCards data={""} />
                    <MainHrDashboardCharts data={""} />
                  </>
                )}
            </section>
          </>
        ) : user?.role?.name == "MANAGER" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? <DashboardSkeletonLoading />
                : (
                  <>
                    <MainManagerDashboardCards data={""} />
                    <MainManagerDashboardCharts data={""} />
                  </>
                )}
            </section>
          </>
        ) : user?.role?.name == "DIRECTOR" ? (
          <>
            <WelcomeUser title={`Welcome ${user?.name}`} />
            <section className="lg:px-8 px-4 py-4">
              {isLoading ? <DashboardSkeletonLoading />
                : (
                  <>
                    <AdminDashboard />
                  </>
                )}
            </section>
          </>
        ) : (
          // client
          <>
            <WelcomeUser title={`Welcome ${user?.name}`} />
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
