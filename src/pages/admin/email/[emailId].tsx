import { EmailContainer, EmailDetailsHeader } from "components/email";
import PanelLayout from "layouts/panel";

const ViewEmail = () => {
  return (
    <PanelLayout title="Email | View">
      <EmailDetailsHeader />
      <section className="w-full my-4 container mx-auto p-4 rounded-md bg-gray-700/10 ">
        <EmailContainer />
      </section>
    </PanelLayout>
  );
};

export default ViewEmail;
