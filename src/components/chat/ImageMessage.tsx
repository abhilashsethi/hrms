import { FileDownload, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ChatImagePreview } from "components/dialogues";
import { useState } from "react";
import { IChatMessages } from "types";
import { downloadFile } from "utils";

interface Props {
  data?: IChatMessages;
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
      <div className="h-52 w-full relative group">
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
      <div className="flex justify-end mt-2">
        <Tooltip title="Download">
          <IconButton
            onClick={() =>
              downloadFile(
                String(data?.link),
                data?.link?.split("/")?.at(-1) as any
              )
            }
            size="small"
          >
            <FileDownload />
          </IconButton>
        </Tooltip>
      </div>
      <p className="tracking-wide whitespace-pre-line break-words ">
        {data?.text}
      </p>
    </>
  );
};

export default ImageMessage;
