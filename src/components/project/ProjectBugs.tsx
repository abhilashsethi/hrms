import { Add, InsertDriveFile, Person } from "@mui/icons-material";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { DEFAULTIMG, DEFAULTPROFILE } from "assets/home";
import { PhotoViewer } from "components/core";

const ProjectBugs = () => {
  return (
    <section>
      <div className="flex gap-2 pb-2 mb-2 border-b-2">
        <div className="w-[60%]">
          <Button
            size="small"
            className="!bg-cyan-500"
            variant="contained"
            startIcon={<Add />}
          >
            ADD NEW
          </Button>
        </div>
        <div className="w-[40%] h-8 flex justify-between px-4 text-sm tracking-wide items-center text-slate-600">
          <span>STATUS</span>
          <span>DOCS</span>
          <span>
            <Tooltip title="Inspector">
              <Person fontSize="small" />
            </Tooltip>
          </span>
        </div>
      </div>
      <div className=" w-full border-b-2 rounded-md py-3 flex items-start">
        <div className="w-[57%] pr-3">
          <h1 className="text-sm">
            1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum,
            corrupti!
          </h1>
        </div>
        <div className="w-[43%] h-8 flex justify-between px-4 text-sm tracking-wide items-center text-slate-600">
          <span
            className={`text-xs font-medium px-3 py-1 h-6 rounded-full text-white bg-green-400`}
          >
            COMPLETED
          </span>
          <span>
            <IconButton size="small">
              <InsertDriveFile />
            </IconButton>
          </span>
          <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
        </div>
      </div>
    </section>
  );
};

export default ProjectBugs;
