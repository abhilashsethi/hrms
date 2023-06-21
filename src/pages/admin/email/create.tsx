import { CreateEmail, CreateHeader } from "components/email";
import PanelLayout from "layouts/panel";
import React from "react";

const CreateEmailPage = () => {
  return (
    <PanelLayout title="Email | Create">
      <CreateHeader />
      <section className="container mx-auto px-4">
        <CreateEmail />
      </section>
    </PanelLayout>
  );
};

export default CreateEmailPage;
