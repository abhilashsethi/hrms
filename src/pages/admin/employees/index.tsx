import { EmployDashboard, WelcomeUser } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import { useAuth } from "hooks";
import PanelLayout from "layouts/panel";

const Employees = () => {
  const { user } = useAuth();
  return (
    <PanelLayout title="Employees Dashboard - Admin Panel">
      <>
        <div className="px-4 pt-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <EmployDashboard />
      </>
    </PanelLayout>
  );
};

export default Employees;

const links = [{ id: 1, page: "Employees", link: "/admin/employees" }];
