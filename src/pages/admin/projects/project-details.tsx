import { AdminBreadcrumbs, ProjectDetails } from "components/core";
import { useAuth } from "hooks";
import PanelLayout from "layouts/panel";

const ProjectDetailpage = () => {
	const { user } = useAuth();
	const links = [
		user?.role?.name === "PROJECT MANAGER" ||
		user?.role?.name === "DEVELOPER" ||
		user?.role?.name === "TESTER"
			? { id: 1, page: "My projects", link: "/admin/projects/my-projects" }
			: user?.isClient
			? { id: 1, page: "My projects", link: "/admin/projects/client-projects" }
			: { id: 1, page: "All projects", link: "/admin/projects/all-projects" },
	];
	return (
		<PanelLayout title="Project details - Admin Panel">
			<section className="md:px-8 px-2 py-4">
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
