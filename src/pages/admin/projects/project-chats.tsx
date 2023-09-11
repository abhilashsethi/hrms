import { AdminBreadcrumbs, ChatSection } from "components/core";
import PanelLayout from "layouts/panel";

const ProjectChats = () => {
  return (
    <PanelLayout title="Project Chats ">
      <section className="px-6 py-4">
        <AdminBreadcrumbs links={links} />
        <ChatSection />
      </section>
    </PanelLayout>
  );
};

export default ProjectChats;

const links = [
  { id: 1, page: "All projects", link: "/admin/projects/all-projects" },
  { id: 1, page: "Project Chats", link: "/admin/projects/project-chats" },
];
