import { Reply } from "@mui/icons-material";
import React from "react";

const EmailReplyContainer = () => {
  return (
    <div className="w-full bg-themeBlue ">
      <div className="w-full flex items-center container mx-auto p-4 justify-between">
        <div className="flex gap-4 items-center">
          <button className="flex gap-4 items-center hover:scale-95 transition-all border border-blue-500 ease-in-out duration-300 hover:bg-blue-600 justify-center bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg ">
            <Reply />
            <span className="text-sm">Reply</span>
          </button>
          <button className="flex gap-4 items-center border border-gray-300/50 hover:scale-95 transition-all ease-in-out duration-300 hover:bg-gray-700/10 justify-center bg-gray-200 text-gray-700 px-4 py-2 rounded-md shadow-lg ">
            <span className="text-sm">Forward</span>
            <Reply className="scale-x-[-1]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailReplyContainer;
