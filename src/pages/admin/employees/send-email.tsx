import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
import { useRouter } from "next/router";

const SendEmail = () => {
  const router = useRouter();
  const links = [
    { id: 1, page: "All Employees", link: "/admin/all-employees" },
    {
      id: 2,
      page: "Employee Profile",
      link: `/admin/employees/employee-profile?id=${router?.query?.empId}`,
    },
  ];
  return (
    <PanelLayout title="Send Email - Admin Panel">
      <section className="px-8 py-4">
        <div className="md:w-auto w-full">
          <AdminBreadcrumbs links={links} />
        </div>
      </section>
    </PanelLayout>
  );
};

export default SendEmail;
