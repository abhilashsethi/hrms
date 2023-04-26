import PanelLayout from "layouts/panel";
import { CardHead, ProfileTabs } from "components/Profile";
import { AdminBreadcrumbs } from "components/core";
import { EmployeeDetails } from "components/admin";

const EmployeeProfile = () => {
  return (
    <PanelLayout title="User Profile - SY HR MS">
      <section className="px-8 mx-auto p-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <EmployeeDetails />
        <CardHead />
        <ProfileTabs />
      </section>
    </PanelLayout>
  );
};

export default EmployeeProfile;
const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  {
    id: 2,
    page: "Employee Profile",
    link: "/admin/employees/employee-profile",
  },
];
