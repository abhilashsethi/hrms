import {
  EmailContainer,
  EmailDetailsHeader,
  EmailReplyContainer,
} from "components/email";
import PanelLayout from "layouts/panel";

const ViewEmail = () => {
  return (
    <PanelLayout title="Email | View">
      <EmailDetailsHeader />
      <section className="w-full my-4 container mx-auto  rounded-md ">
        <EmailContainer />
      </section>
      <EmailReplyContainer />
    </PanelLayout>
  );
};

export default ViewEmail;
