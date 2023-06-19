import { Inbox } from "components/email";
import PanelLayout from "layouts/panel";

const EmailInbox = () => {
  return (
    <PanelLayout title="Email | Inbox">
      <section className="w-full container mx-auto p-4">
        <Inbox />
      </section>
    </PanelLayout>
  );
};

export default EmailInbox;
