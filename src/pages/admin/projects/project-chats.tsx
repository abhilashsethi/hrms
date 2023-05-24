import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
import React from "react";

const ProjectChats = () => {
  return (
    <PanelLayout title="Project Chats - HRMS SY">
      <section className="px-6 py-4">
        <AdminBreadcrumbs links={links} />
        <div className="h-[30rem] w-full bg-white mt-4 shadow-md">
          <div className="w-1/4 h-full border-2"></div>
        </div>
      </section>
    </PanelLayout>
  );
};

export default ProjectChats;

const links = [
  { id: 1, page: "All projects", link: "/admin/projects/all-projects" },
  { id: 1, page: "Project Chats", link: "/admin/projects/project-chats" },
];
