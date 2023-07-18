import { MeetingData } from "components/admin/meetings";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const MeetingDetails = () => {
	return (
		<PanelLayout title="User Profile - Admin Panel">
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
	// {
	//   id: 2,
	//   page: "Meeting Details",
	//   link: "/admin/meetings/meeting-details",
	// },
];

// const attendance = [
//   { title: "PRESENT", date: "2023-04-03" },
//   { title: "ABSENT", date: "2023-04-04" },
//   { title: "PRESENT", date: "2023-04-05" },
// ];
