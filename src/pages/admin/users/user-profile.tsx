import { Home, Person2 } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import PanelLayout from "layouts/panel";
import React from "react";
import { BankInfo, CardHead, PersonalInfo } from "components/Profile";

const UserProfile = () => {
  return (
    <PanelLayout title="User Profile - SY HR MS">
      <section className="w-11/12 mx-auto bg-gray-200 p-4">
        <div className="py-4">
          <Breadcrumbs aria-label="breadcrumb" className="!py-4">
            <Typography
              sx={{ display: "flex", alignItems: "center" }}
              color="inherit"
            >
              <Home sx={{ mr: 0.5 }} fontSize="inherit" />
              EMPLOYEES
            </Typography>
            <Typography
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <Person2 sx={{ mr: 0.5 }} fontSize="inherit" />
              ALL EMPLOYEES
            </Typography>
          </Breadcrumbs>
        </div>
        <CardHead />
        <PersonalInfo />
        <BankInfo />
      </section>
    </PanelLayout>
  );
};

export default UserProfile;
