import {
  ChevronLeft,
  ChevronRight,
  Delete,
  MoreVert,
  Refresh,
} from "@mui/icons-material";
import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import EmailCard from "./EmailCard";

const DraftEmail = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-2 shadow-md rounded-lg justify-between p-4 bg-white py-4  w-full items-center ">
        <div className="flex gap-2 items-center">
          <Checkbox size="small" /> <span className="text-gray-800/20">|</span>
          <IconButton>
            <Delete />
          </IconButton>
          <IconButton>
            <Refresh />
          </IconButton>
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Has Attachments</MenuItem>
            <MenuItem onClick={handleClose}>Newest First</MenuItem>
            <MenuItem onClick={handleClose}>Oldest First</MenuItem>
          </Menu>
        </div>

        <div className="flex gap-2 items-center">
          <IconButton>
            <ChevronLeft />
          </IconButton>
          <IconButton>
            <ChevronRight />
          </IconButton>
          <span>|</span>
          <span className="text-gray-400 flex gap-2 text-sm whitespace-nowrap">
            Show <p className="text-black font-bold">1-25</p> of{" "}
            <p className="text-black font-bold">2290</p>
          </span>
        </div>
      </div>

      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal table-fixed ">
            <tbody>
              {Array(25)
                .fill("lk")
                .map((_, i) => (
                  <EmailCard
                    key={i}
                    isRead={i % 3 === 0 || i % 7 === 0}
                    userName={`User SY${Math.floor(
                      (i + 2) * Math.random() * 1000
                    )}`}
                    subject={`Project delivery status ${Math.floor(
                      (i + 2) * Math.random() * 1000
                    )}`}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DraftEmail;
