import { FileDownload, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ChatImagePreview } from "components/dialogues";
import Link from "next/link";
import { useState } from "react";
import { IChatMessages } from "types";
import { downloadFile } from "utils";

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
        activePreview={String(data?.link)}
      />
      <div className="h-52 w-full relative group min-w-fit py-2 px-4 bg-blue-100 rounded-md">
        <img
          className="h-full w-full rounded-md object-cover"
          src={data?.link}
          alt="image"
        />
        <div
          onClick={() => setIsPreview(true)}
          className="h-52 hidden transition-all cursor-pointer ease-in-out duration-200 w-full absolute group-hover:flex top-0 left-0 bg-[#0000008b] justify-center items-center rounded-md"
        >
          <Visibility className="!text-white" />
        </div>
      </div>
      <div className="flex min-w-fit justify-between px-2 mt-1">
        <p className="tracking-wide ">{data?.text}</p>
        <Tooltip title="Download">
          <Link href={data?.link} target="_blank">
            <IconButton size="small">
              <FileDownload />
            </IconButton>
          </Link>
        </Tooltip>
      </div>
    </>
  );
};

export default ImageMessage;
