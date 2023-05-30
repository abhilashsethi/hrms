import {
  DriveFileRenameOutline,
  MoreVert,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatProfileDrawer } from "components/drawer";
import { useAuth } from "hooks";
import moment from "moment";
import React, { useState } from "react";

interface Props {
  id?: number;
  photo?: string;
  name?: string;
  message?: string;
}

const ChatRightSection = ({ activeProfile }: any) => {
  const [isDrawer, setIsDrawer] = useState(false);
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <ChatProfileDrawer
        profileData={activeProfile}
        open={isDrawer}
        onClose={() => setIsDrawer(false)}
      />
      <div className="w-[70%] h-full">
        <div className="py-2 px-4 w-full border-b-2 flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="cursor-pointer" onClick={() => setIsDrawer(true)}>
              <PhotoViewerSmall
                photo={
                  activeProfile?.type === "person" ? activeProfile?.photo : null
                }
                name={activeProfile?.name}
                size="3.5rem"
              />
            </div>
            <div>
              <h1 className="font-semibold">{activeProfile?.name}</h1>
              <h1 className="text-sm font-light">
                {activeProfile?.type === "person" ? (
                  <span className="">Active Now</span>
                ) : (
                  <span className="">Srinu, Loushik, Abhilash,You</span>
                )}
              </h1>
            </div>
          </div>
          <div>
            <Tooltip title="Menu">
              <IconButton onClick={handleClick} size="small">
                <MoreVert />
              </IconButton>
            </Tooltip>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  setIsDrawer(true);
                  handleClose();
                }}
              >
                Details
              </MenuItem>
              <MenuItem onClick={handleClose}>Clear Messages</MenuItem>
              <MenuItem onClick={handleClose}>Delete Chat</MenuItem>
              <MenuItem onClick={handleClose}>Block</MenuItem>
            </Menu>
          </div>
        </div>
        <div className="h-[25.5rem] overflow-y-auto">
          <div className="px-4">
            {chats?.map((item) => (
              <div
                key={item?.id}
                className={`mt-4 flex ${
                  item?.sendBy === "sender" ? `justify-start` : `justify-end`
                }`}
              >
                <div className="max-w-[50%] flex gap-1">
                  <div className="w-[10%] h-10 flex justify-center items-start">
                    <div className="h-8 w-8 bg-slate-200 rounded-full overflow-hidden shadow-md">
                      {item?.sendBy === "sender" ? (
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
                        {item?.sendBy === "sender"
                          ? activeProfile?.name
                          : `You`}
                      </span>
                      ,
                      <span className="text-xs">
                        {moment(new Date()).format("ll")}
                      </span>
                    </div>
                    <div className="w-full bg-blue-100 py-2 px-4 tracking-wide rounded-md text-sm">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Asperiores animi ratione omnis aliquid magnam ipsa dolore,
                      laborum illo nostrum! Veniam incidunt animi amet nostrum
                      dignissimos.
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-20 w-full border-2 flex items-center px-8">
          <div className="h-10 px-3 rounded-full w-4/5 border-2 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <SentimentSatisfiedAlt className="!cursor-pointer" />
              <input
                className="bg-white text-sm"
                placeholder="Type a message"
                type="text"
              />
            </div>
            <DriveFileRenameOutline className="!cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRightSection;

const chats = [
  { id: 1, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
  { id: 2, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
  { id: 3, text: "Hey! Where are you ri8 now?", sendBy: "you" },
  { id: 4, text: "Hey! Where are you ri8 now?", sendBy: "you" },
  { id: 5, text: "Hey! Where are you ri8 now?", sendBy: "you" },
  { id: 6, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
  { id: 7, text: "Hey! Where are you ri8 now?", sendBy: "sender" },
];
