import SentEmail from "components/email/SentEmail";
import PanelLayout from "layouts/panel";

const SentEmailPage = () => {
  return (
    <PanelLayout title="Email | Sent">
      <section className="w-full container mx-auto p-4">
        <SentEmail />
      </section>
    </PanelLayout>
  );
};

export default SentEmailPage;
