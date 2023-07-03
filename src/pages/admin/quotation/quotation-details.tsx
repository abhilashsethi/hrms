import { MeetingData } from "components/admin/meetings";
import { QuotationData } from "components/admin/quotation";
import { AdminBreadcrumbs } from "components/core";
import PanelLayout from "layouts/panel";

const QuotationDetails = () => {
	return (
		<PanelLayout title="Quotation Details - Admin Panel">
			<section className="px-8 mx-auto p-4">
				<div className="pb-4">
					<AdminBreadcrumbs links={links} />
				</div>
				<QuotationData />
			</section>
		</PanelLayout>
	);
};

export default QuotationDetails;

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
