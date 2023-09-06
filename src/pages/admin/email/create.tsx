import { CreateEmail, CreateHeader } from "components/email";
import PanelLayout from "layouts/panel";
import React, { useState } from "react";

const CreateEmailPage = () => {
  const [templateId, setTemplateId] = useState("normal");
  return (
    <PanelLayout title="Email | Create">
      <CreateHeader setTemplateId={setTemplateId} />
      <section className="container mx-auto md:px-4 px-2">
        <CreateEmail templateId={templateId} />
      </section>
    </PanelLayout>
  );
};

export default CreateEmailPage;
