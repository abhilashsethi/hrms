import { MeetingDashBoard } from "components/admin";
import PanelLayout from "layouts/panel";
const Meetings = () => {
  return (
    <PanelLayout title="Home - Admin Panel">
      <>
        <MeetingDashBoard />
      </>
    </PanelLayout>
  );
};

export default Meetings;
