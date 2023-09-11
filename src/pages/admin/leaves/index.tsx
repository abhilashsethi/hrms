import LeaveDashboard from "components/admin/LeaveDashboard";
import PanelLayout from "layouts/panel";

const index = () => {
  return (
    <PanelLayout title="All Leaves ">
      <>
        <LeaveDashboard />
      </>
    </PanelLayout>
  );
};

export default index;
