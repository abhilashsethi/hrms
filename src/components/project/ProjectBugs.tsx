import {
  Add,
  ChevronRight,
  InsertDriveFile,
  Person,
} from "@mui/icons-material";
import { Avatar, Button, IconButton, Tooltip } from "@mui/material";
import { DEFAULTIMG, DEFAULTPROFILE } from "assets/home";
import { PhotoViewer } from "components/core";
import { useState } from "react";

const ProjectBugs = () => {
  const [isDescription, setIsDescription] = useState(false);
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
      <div className="flex flex-col gap-2">
        {cards.map((item, i) => (
          <div key={item?.id} className="border-b-2 ">
            <div className=" w-full rounded-md py-3 flex items-start">
              <div className="w-[57%] pr-3">
                <div className="flex gap-2">
                  <div className="h-5 w-5 bg-slate-500 rounded-full text-white flex justify-center items-center text-sm">
                    {Number(i) + 1}
                  </div>
                  <div className="w-[90%]">
                    <h1 className="text-sm font-medium text-slate-900">
                      Lorem ipsum dolor sit amet, consectetur adipisicing!
                    </h1>
                  </div>
                </div>
              </div>
              <div className="w-[43%] h-8 flex justify-between px-4 text-sm tracking-wide items-center text-slate-600">
                <span
                  className={`text-xs font-medium px-3 py-1 h-6 rounded-full text-white bg-green-400`}
                >
                  COMPLETED
                </span>
                <span>
                  <Tooltip title="Documents">
                    <IconButton size="small">
                      <InsertDriveFile />
                    </IconButton>
                  </Tooltip>
                </span>
                <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
                <IconButton
                  onClick={() => setIsDescription((prev) => !prev)}
                  size="small"
                >
                  <ChevronRight
                    fontSize="small"
                    className={`${
                      isDescription ? `!rotate-[-90deg]` : ``
                    } transition-all ease-in-out duration-200`}
                  />
                </IconButton>
              </div>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-600">
                Description :
              </h1>
              <p className="text-sm py-3 tracking-wide">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Incidunt consectetur perspiciatis officiis est necessitatibus,
                possimus aspernatur quisquam ipsam nihil voluptas!
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectBugs;

const cards = [
  { id: 1, title: "Lorem ipsum dolor sit amet, consectetur adipisicing!" },
  { id: 2, title: "Lorem ipsum dolor sit amet, consectetur adipisicing!" },
  { id: 3, title: "Lorem ipsum dolor sit amet, consectetur adipisicing!" },
  { id: 4, title: "Lorem ipsum dolor sit amet, consectetur adipisicing!" },
];
