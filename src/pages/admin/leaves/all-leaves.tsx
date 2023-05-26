import { AllLeaveRequests } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
const AllLeaves = () => {
  return (
    <PanelLayout title="All Leave Requests - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <AllLeaveRequests />
      </section>
    </PanelLayout>
  );
};

export default AllLeaves;

const links = [
  { id: 1, page: "Leaves", link: "/admin/leaves" },
  { id: 2, page: "All Leaves", link: "/admin/leaves/all-leaves" },
];
