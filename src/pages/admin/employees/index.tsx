import { EmployDashboard, WelcomeUser } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const Employees = () => {
  return (
    <PanelLayout title="Employees Dashboard - Admin Panel">
      <>
        <WelcomeUser title="Welcome Superadmin!" />
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
