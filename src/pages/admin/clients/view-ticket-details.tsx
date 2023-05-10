import {
	Add,
	GridViewRounded,
	Search,
	TableRowsRounded,
	Upload,
} from "@mui/icons-material";
import { Button, IconButton, MenuItem, TextField } from "@mui/material";
import { ClientsGrid, EmployeesColumn } from "components/admin";
import { AdminBreadcrumbs } from "components/core";
import { UploadEmployData } from "components/dialogues";
import PanelLayout from "layouts/panel";
import Link from "next/link";
import { useState } from "react";

const ViewTicketDetails = () => {
	const [isGrid, setIsGrid] = useState(true);
	const [isUpload, setIsUpload] = useState(false);
	const [value, setValue] = useState("Web Developer");
	const handleChange = (event: any) => {
		setValue(event.target.value);
	};
	return (
		<>
			<PanelLayout title="Ticket Details - SY HR MS">
				<section className="px-8">
					<div className="pb-4">
						<AdminBreadcrumbs links={links} />
					</div>
				</section>
			</PanelLayout>
		</>
	);
};

export default ViewTicketDetails;

const roles = [
	{ id: 1, value: "CEO" },
	{ id: 2, value: "Manager" },
	{ id: 3, value: "Director" },
	{ id: 4, value: "Founder" },
];

const links = [
	{ id: 1, page: "Clients", link: "/admin/clients" },
	// {
	// 	id: 2,
	// 	page: "Client Profile",
	// 	link: "/admin/clients/client-profile",
	// },
	{
		id: 3,
		page: "View Ticket Details",
		link: "/admin/clients/view-ticket-details",
	},
];
