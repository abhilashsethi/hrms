import SentEmail from "components/email/SentEmail";
import PanelLayout from "layouts/panel";

const SentEmailPage = () => {
  return (
    <PanelLayout title="Email | Sent">
      <section className="w-full container mx-auto md:p-4 p-2">
        <SentEmail />
      </section>
    </PanelLayout>
  );
};

export default SentEmailPage;
