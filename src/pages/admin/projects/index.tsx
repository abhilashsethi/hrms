import { ProjectDashBoard } from "components/admin";
import PanelLayout from "layouts/panel";
const Projects = () => {
  return (
    <PanelLayout title="Projects - Admin Panel">
      <ProjectDashBoard />
    </PanelLayout>
  );
};

export default Projects;
