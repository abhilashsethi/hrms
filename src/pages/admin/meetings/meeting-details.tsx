import PanelLayout from "layouts/panel";
import { AdminBreadcrumbs } from "components/core";
import { ClientDetails } from "components/admin/clients";
import { MeetingData } from "components/admin/meetings";
// import { MeetingData } from "components/admin/meetings";

const MeetingDetails = () => {
	return (
		<PanelLayout title="User Profile - SY HR MS">
			<section className="px-8 mx-auto p-4">
				<div className="pb-4">
					<AdminBreadcrumbs links={links} />
				</div>
				<MeetingData />
			</section>
		</PanelLayout>
	);
};

export default MeetingDetails;

const links = [
	{ id: 1, page: "Meetings", link: "/admin/meetings" },
	{
		id: 2,
		page: "Meeting Details",
		link: "/admin/meetings/meeting-details",
	},
];

// const attendance = [
//   { title: "PRESENT", date: "2023-04-03" },
//   { title: "ABSENT", date: "2023-04-04" },
//   { title: "PRESENT", date: "2023-04-05" },
// ];
