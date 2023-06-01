import { DoneAll } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatSeen } from "components/drawer";
import { useAuth } from "hooks";
import moment from "moment";
import { useState } from "react";

interface imageProps {
  data?: any;
  activeProfile?: any;
}
const ImageMessage = ({ data, activeProfile }: imageProps) => {
  const [isSeen, setIsSeen] = useState(false);
  const { user } = useAuth();
  return (
    <>
      <ChatSeen open={isSeen} onClose={() => setIsSeen(false)} />
      <div className="w-[35%] flex gap-1">
        <div className="w-[3rem] h-10 flex justify-center items-start">
          <div className="h-8 w-8 bg-slate-200 rounded-full overflow-hidden shadow-md">
            {data?.sendBy === "sender" ? (
              <PhotoViewerSmall
                size="2rem"
                photo={activeProfile?.photo}
                name={activeProfile?.name}
              />
            ) : (
              <PhotoViewerSmall
                size="2rem"
                photo={user?.photo}
                name={user?.name}
              />
            )}
          </div>
        </div>
        <div className="w-[85%]">
          <div className="flex gap-1 items-center text-slate-600">
            <span className="text-xs">
              {data?.sendBy === "sender" ? activeProfile?.name : `You`}
            </span>
            ,<span className="text-xs">{moment(new Date()).format("ll")}</span>
          </div>
          <div className="w-full bg-blue-100 py-2 px-2 tracking-wide rounded-md text-sm">
            <img
              className="h-40 w-full rounded-md object-cover"
              src={data?.link}
              alt=""
            />
            {data?.sendBy === "you" && (
              <div className="flex justify-end">
                <IconButton onClick={() => setIsSeen(true)} size="small">
                  <DoneAll className="text-emerald-600" fontSize="small" />
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageMessage;
