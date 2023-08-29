import { MeetingData } from "components/admin/meetings";
import { AdminBreadcrumbs } from "components/core";
import { useAuth } from "hooks";
import PanelLayout from "layouts/panel";

const MeetingDetails = () => {
  const { user } = useAuth();
  const links = [
    user?.role?.name === "CEO"
      ? { id: 1, page: "Meetings", link: "/admin/meetings" }
      : { id: 1, page: "My Meetings", link: "/admin/meetings/my-meetings" },
  ];

  return (
    <PanelLayout title="Meeting Details - Admin Panel">
      <section className="md:px-8 px-4 mx-auto p-4">
        <div className="pb-4">
          <AdminBreadcrumbs links={links} />
        </div>
        <MeetingData />
      </section>
    </PanelLayout>
  );
};

export default MeetingDetails;
