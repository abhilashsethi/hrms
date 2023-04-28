import { AttendanceDashBoard, WelcomeUser } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";
import React from "react";

const Attendance = () => {
	return (
		<PanelLayout title="Employees Dashboard - Admin Panel">
			<>
				<WelcomeUser title="Welcome Superadmin!" />
				<div className="px-4 pt-4">
					<AdminBreadcrumbs links={links} />
				</div>
				<AttendanceDashBoard />
			</>
		</PanelLayout>
	);
};

export default Attendance;

const links = [{ id: 1, page: "Attendance", link: "/admin/attendance" }];
