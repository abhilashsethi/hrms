import {
  Add,
  ChevronLeft,
  ChevronRight,
  Delete,
  Refresh,
} from "@mui/icons-material";
import { Checkbox, IconButton } from "@mui/material";

const InboxHeader = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2 shadow-md rounded-lg justify-between p-4 bg-white py-4  w-full items-center ">
      <div className="flex gap-2 items-center">
        <Checkbox size="small" /> <span className="text-gray-800/20  ">|</span>
        <IconButton>
          <Delete />
        </IconButton>
        <IconButton>
          <Refresh />
        </IconButton>
        <span className="text-gray-800/20  ">|</span>
        <button className="flex ml-8 items-center gap-2 bg-blue-500 hover:bg-white border border-blue-500 text-white hover:text-blue-500 transition-all ease-in-out duration-300 justify-center px-4 py-2 rounded-md shadow-lg ">
          <Add />
          <p>Compose</p>
        </button>
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
  );
};

export default InboxHeader;
