import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const CreateTender = () => {
  return (
    <PanelLayout title="Create Tender - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section>Page in progress...</section>
      </section>
    </PanelLayout>
  );
};

export default CreateTender;

const links = [
  { id: 1, page: "Tenders", link: "/admin/tenders/all-tenders" },
  {
    id: 2,
    page: "All Tenders",
    link: "/admin/tenders/all-tenders",
  },
];
