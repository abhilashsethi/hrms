import { FileDownload, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ChatImagePreview } from "components/dialogues";
import React, { useState } from "react";

interface Props {
  data?: any;
}

const ImageMessage = ({ data }: Props) => {
  const [isPreview, setIsPreview] = useState(false);
  return (
    <>
      <ChatImagePreview
        open={isPreview}
        handleClose={() => setIsPreview(false)}
      />
      <div className="h-52 w-full relative group">
        <img
          className="h-full w-full rounded-md object-cover"
          src={data?.link}
          alt=""
        />
        <div
          onClick={() => setIsPreview(true)}
          className="h-52 hidden transition-all cursor-pointer ease-in-out duration-200 w-full absolute group-hover:flex top-0 left-0 bg-[#0000008b] justify-center items-center rounded-md"
        >
          <Visibility className="!text-white" />
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Tooltip title="Download">
          <IconButton size="small">
            <FileDownload />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default ImageMessage;
