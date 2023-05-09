import { Delete, Edit, Person } from "@mui/icons-material";
import { Button, IconButton, Tooltip } from "@mui/material";
import { PhotoViewer } from "components/core";
import React from "react";

const ClientDetails = () => {
  return (
    <section className="w-full bg-white shadow-jubilation mt-4 rounded-md p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600">Client Details</h1>
        <Tooltip title="Update Client">
          <IconButton size="small">
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      <div className="w-full rounded-md border-2 mt-3 p-4">
        <div className=" flex gap-4">
          <div className="w-1/4">
            <PhotoViewer />
          </div>
          <div className="text-sm tracking-wide w-3/4">
            <p className="font-semibold">Name : </p>
            <p>Prashanth Kumar</p>
            <p className="font-semibold">Email : </p>
            <p>prashanth@sy.com</p>
          </div>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          <Button
            variant="contained"
            className="!bg-theme"
            size="small"
            startIcon={<Person />}
          >
            View Details
          </Button>
          <Button
            variant="contained"
            className="!bg-youtube"
            size="small"
            startIcon={<Delete />}
          >
            Remove
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ClientDetails;
