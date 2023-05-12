import { AdminBreadcrumbs, ProjectDetails } from "components/core";
import { ProjectBasicDetailsUpdate } from "components/dialogues";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const ProjectDetailpage = () => {
  return (
    <PanelLayout title="Project details - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <h1 className="font-semibold py-2 text-theme text-lg pt-2">
          Project Details
        </h1>
        <ProjectDetails />
      </section>
    </PanelLayout>
  );
};

export default ProjectDetailpage;
const links = [
  { id: 1, page: "All projects", link: "/admin/projects/all-projects" },
];
