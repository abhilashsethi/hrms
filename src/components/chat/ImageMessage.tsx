import { FileDownload, Visibility } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ChatImagePreview } from "components/dialogues";
import { useState } from "react";
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
        activePreview={data?.link}
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
              downloadFile(data?.link, data?.link?.split("/")?.at(-1) as any)
            }
            size="small"
          >
            <FileDownload />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default ImageMessage;
