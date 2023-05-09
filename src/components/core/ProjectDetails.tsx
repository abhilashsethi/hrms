import { Edit } from "@mui/icons-material";
import { Button, Chip, Grid } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  ClientDetails,
  ProjectDescription,
  ProjectTabs,
} from "components/project";

const ProjectDetails = () => {
  return (
    <div className="mt-2">
      <Grid container spacing={2}>
        <Grid item lg={8}>
          <div className="w-full bg-white rounded-md shadow-jubilation p-6">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold tracking-wide text-lg text-secondary">
                HRMS - Searchingyard
              </h1>
              <Button
                size="small"
                variant="contained"
                className="!bg-theme"
                startIcon={<Edit />}
              >
                Edit
              </Button>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <span className="text-sm font-semibold">Status : </span>
              <Chip label="Progress" color="warning" size="small" />
            </div>
            <div className="mt-4 w-1/3 flex items-center gap-4">
              <div className="w-1/2">
                <p className="text-sm font-semibold text-slate-600">
                  Created :{" "}
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">
                  {moment(new Date().toISOString()).format("ll")}
                </p>
              </div>
            </div>
            <div className="mt-2 w-1/3 flex items-center gap-4">
              <div className="w-1/2">
                <p className="text-sm font-semibold text-slate-600">
                  Deadline :
                </p>
              </div>
              <div className="w-1/2">
                <p className="text-sm">
                  {moment(new Date().toISOString()).format("ll")}
                </p>
              </div>
            </div>
            <ProjectTabs />
          </div>
        </Grid>
        <Grid item lg={4}>
          <div className="w-full">
            <ProjectDescription />
            <ClientDetails />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProjectDetails;
