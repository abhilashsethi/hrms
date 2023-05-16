import {
  AccountTree,
  Add,
  Check,
  ContentCopy,
  Delete,
  Edit,
  Visibility,
} from "@mui/icons-material";
import {
  Button,
  Container,
  Drawer,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const ProjectURLS = ({ open, onClose }: Props) => {
  const [isCreate, setIsCreate] = useState(false);
  const removeURL = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to remove!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Removed!", "URL removed successfully!", "success");
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
            <AccountTree />
            Project URLs
          </p>
          <div>
            <h4 className="font-semibold">Project Name : </h4>
            <h4 className="text-theme font-semibold tracking-wide">
              HRMS - Searchingyard
            </h4>
            <div className="flex justify-between items-center">
              <h4 className="font-semibold mt-4 underline">Project URLs : </h4>
              <span>
                <Button
                  onClick={() => setIsCreate((prev) => !prev)}
                  variant="contained"
                  className="!bg-theme"
                  size="small"
                  startIcon={<Add />}
                >
                  CREATE
                </Button>
              </span>
            </div>
            {isCreate && (
              <div className=" w-full border-2 mt-4 rounded-md p-4 shadow-sleek">
                <h1 className="mb-2 font-semibold">Url Title</h1>
                <TextField placeholder="Url Title" size="small" fullWidth />
                <h1 className="mb-2 mt-2 font-semibold">Url</h1>
                <TextField placeholder="Url" size="small" fullWidth />
                <div className="flex justify-end mt-3">
                  <Button
                    variant="contained"
                    className="!bg-emerald-600"
                    size="small"
                    startIcon={<Check />}
                  >
                    SUBMIT
                  </Button>
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-col gap-4">
              {urls?.map((item, i) => (
                <div
                  key={item?.id}
                  className="p-2 rounded-md shadow-jubilation border-b-2 border-theme"
                >
                  <div className="flex justify-between">
                    <h1 className="flex items-center gap-2">
                      <span>{Number(i) + 1}.</span>
                      <span className="font-semibold">{item?.title}</span>
                    </h1>
                    <div>
                      <Tooltip title="Edit">
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => removeURL()} size="small">
                          <Delete className="!text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center mt-3">
                    <span className="custom-button bg-green-500">
                      <Visibility fontSize="small" /> CLICK TO VIEW
                    </span>
                    <Tooltip title="Copy to clipboard">
                      <span className="custom-button bg-slate-800">
                        <ContentCopy fontSize="small" /> COPY LINK
                      </span>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default ProjectURLS;

const urls = [
  { id: 1, title: "Dev Url" },
  { id: 2, title: "Github" },
  { id: 3, title: "API" },
  { id: 4, title: "Github" },
];
