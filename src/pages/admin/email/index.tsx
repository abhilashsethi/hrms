import { Inbox } from "components/email";
import PanelLayout from "layouts/panel";

const EmailInbox = () => {
  return (
    <PanelLayout title="Email | Inbox">
      <section className="w-full container mx-auto md:p-4 p-2">
        <Inbox />
      </section>
    </PanelLayout>
  );
};

export default EmailInbox;
