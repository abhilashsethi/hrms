import { AllLeaveRequests } from "components/admin";
import PanelLayout from "layouts/panel";
const AllLeaves = () => {
  return (
    <PanelLayout title="All Leave Requests - SY HR MS">
      <section className="px-8 py-4">
        <AllLeaveRequests />
      </section>
    </PanelLayout>
  );
};

export default AllLeaves;

const links = [
  { id: 1, page: "Employees", link: "/admin/employees" },
  { id: 2, page: "All Employees", link: "/admin/employees/all-employees" },
];
