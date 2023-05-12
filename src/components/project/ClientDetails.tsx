import { Check, Delete, Edit, Person } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { PhotoViewer } from "components/core";
import { useState } from "react";
import Swal from "sweetalert2";

const ClientDetails = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  const removeClient = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove client!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Removed!", "Client removed successfully!", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="w-full bg-white shadow-jubilation mt-4 rounded-md p-6">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600">Client Details</h1>
        <Tooltip title="Update Client">
          <IconButton onClick={() => setIsUpdate((prev) => !prev)} size="small">
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      {isUpdate && (
        <>
          <div>
            <Autocomplete
              multiple
              options={team}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Client"
                  placeholder="Clients"
                />
              )}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button
              size="small"
              variant="contained"
              className="!bg-theme"
              startIcon={<Check />}
            >
              SUBMIT
            </Button>
          </div>
        </>
      )}
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
            onClick={() => removeClient()}
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

const team = [
  { title: "Srinu Reddy", year: 1994 },
  { title: "Loushik Kumar", year: 1972 },
  { title: "Chinmay", year: 1974 },
  { title: "Abhilash", year: 2008 },
  { title: "Sunil", year: 1957 },
];
