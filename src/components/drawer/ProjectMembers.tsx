import { Check, Close, Edit, PeopleRounded } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import { EmployeesListDrawer, PhotoViewer } from "components/core";
import { useState } from "react";
import Swal from "sweetalert2";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ProjectMembers = ({ open, onClose }: Props) => {
  const [isMembers, setIsMembers] = useState(false);
  const removeManager = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove manager!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Removed!", "Manager removed successfully!", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <PeopleRounded />
            Project Members
          </p>
          <div>
            <h4 className="font-semibold">Project Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              HRMS - SearchingYard
            </h4>
            <h4 className="font-semibold mt-4">Team Manager : </h4>
            <div className="h-32 w-32 relative mt-3 rounded-md flex flex-col gap-2 items-center justify-center shadow-jubilation">
              <div
                onClick={() => removeManager()}
                className="absolute right-[5px] top-[4px] cursor-pointer bg-red-500 h-6 w-6 rounded-full flex justify-center items-center"
              >
                <Close className="!text-[1rem] !text-white" />
              </div>
              <PhotoViewer />
              <h3 className="text-sm font-semibold">Srinu Reddy</h3>
            </div>
            <div className="flex justify-between">
              <h4 className="font-semibold mt-4">Team Members : </h4>
              <IconButton
                onClick={() => setIsMembers((prev) => !prev)}
                size="small"
              >
                <Edit />
              </IconButton>
            </div>
            {isMembers && (
              <div className="mt-4">
                <Autocomplete
                  multiple
                  options={team}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Team Members"
                      placeholder="Select Members"
                    />
                  )}
                />
                <div className="flex justify-end mt-3">
                  <Button
                    size="small"
                    variant="contained"
                    className="!bg-theme"
                    startIcon={<Check />}
                  >
                    UPDATE
                  </Button>
                </div>
              </div>
            )}
            <EmployeesListDrawer data={reqData} />
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectMembers;

const reqData = [
  { id: 1, name: "Abhilash Sethi", email: "abhilash@sy.com" },
  { id: 2, name: "Sunil Mishra", email: "sunil@sy.com" },
];

const team = [
  { title: "Srinu Reddy", year: 1994 },
  { title: "Loushik Kumar", year: 1972 },
  { title: "Chinmay", year: 1974 },
  { title: "Abhilash", year: 2008 },
  { title: "Sunil", year: 1957 },
];
