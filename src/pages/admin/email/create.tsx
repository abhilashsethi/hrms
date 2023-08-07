import { CreateEmail, CreateHeader } from "components/email";
import PanelLayout from "layouts/panel";
import React, { useState } from "react";

const CreateEmailPage = () => {
  const [templateId, setTemplateId] = useState("normal");
  return (
    <PanelLayout title="Email | Create">
      <CreateHeader setTemplateId={setTemplateId} />
      <section className="container mx-auto px-4">
        <CreateEmail templateId={templateId} />
      </section>
    </PanelLayout>
  );
};

export default CreateEmailPage;
