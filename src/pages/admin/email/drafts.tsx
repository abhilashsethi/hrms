import { DraftEmail } from "components/email";
import PanelLayout from "layouts/panel";

const DraftEmailsPage = () => {
  return (
    <PanelLayout title="Email | Draft">
      <section className="w-full container mx-auto p-4">
        <DraftEmail />
      </section>
    </PanelLayout>
  );
};

export default DraftEmailsPage;
