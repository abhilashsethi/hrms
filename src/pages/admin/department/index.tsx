import { DepartmentDashboard } from "components/admin";
import PanelLayout from "layouts/panel";

const index = () => {
	return (
		<PanelLayout title="All Departments - Admin Panel">
			<>
				<DepartmentDashboard />
			</>
		</PanelLayout>
	);
};

export default index;
