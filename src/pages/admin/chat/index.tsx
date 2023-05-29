import { AdminBreadcrumbs, ChatSection } from "components/core";
import PanelLayout from "layouts/panel";

const Chats = () => {
  return (
    <PanelLayout title="Chats - Admin Panel">
      <section className="px-6 py-4">
        {/* <AdminBreadcrumbs links={links} /> */}
        <ChatSection />
      </section>
    </PanelLayout>
  );
};

export default Chats;

const links = [{ id: 1, page: "Chats", link: "/admin/chat" }];
