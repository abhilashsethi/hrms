import { MeetingDashBoard } from "components/admin";
import PanelLayout from "layouts/panel";
const Meetings = () => {
	return (
		<PanelLayout title="Meetings - Admin Panel">
			<>
				<MeetingDashBoard />
			</>
		</PanelLayout>
	);
};

export default Meetings;
