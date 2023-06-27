import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import {
  AssignMembers,
  TenderCreateDocuments,
  TenderCreateLaststep,
  TenderDetailsCreate,
} from "components/tender";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const CreateTender = () => {
  const steps = ["BASIC DETAILS", "DOCUMENTS", "ASSIGN MEMBERS", "LAST STEP"];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        return <TenderDetailsCreate handleNext={handleNext} />;
      case 1:
        return (
          <TenderCreateDocuments
            handleNext={handleNext} />
        );

      case 2:
        return (
          <AssignMembers handleNext={handleNext} />
        );

      case 3:
        return <TenderCreateLaststep />;

      default:
        break;
    }
  };
  return (
    <PanelLayout title="Create Tender - Admin Panel">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section>
          <div className="w-full">
            <Container maxWidth="lg" className="!py-5">
              <Box sx={{ width: "100%" }}>
                <Typography
                  align="center"
                  variant="h5"
                  sx={{ fontWeight: "bold" }}
                  marginBottom={"6vh"}
                  className="!text-theme "
                >
                  CREATE TENDER
                </Typography>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps?.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                {handleSteps(activeStep)}
              </Box>
            </Container>
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default CreateTender;

const links = [
  { id: 1, page: "Tenders", link: "/admin/tenders/all-tenders" },
  {
    id: 2,
    page: "Create Tender",
    link: "/admin/tenders/create-tender",
  },
];
