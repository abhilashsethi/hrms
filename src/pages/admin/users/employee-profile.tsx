import { Home, Person2 } from "@mui/icons-material";
import { Breadcrumbs, Typography } from "@mui/material";
import PanelLayout from "layouts/panel";
import React from "react";
import { CardHead, ProfileTabs } from "components/Profile";

const UserProfile = () => {
  return (
    <PanelLayout title="User Profile - SY HR MS">
      <div className="bg-gray-200">
        <section className="w-11/12 mx-auto p-4">
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
          <ProfileTabs />
        </section>
      </div>
    </PanelLayout>
  );
};

export default UserProfile;
