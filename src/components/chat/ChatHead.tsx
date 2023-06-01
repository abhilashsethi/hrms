import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { ChatProfileDrawer } from "components/drawer";
import { useChatData } from "hooks";
import { MouseEvent, useState } from "react";

const ChatHead = () => {
  const [isDrawer, setIsDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { currentChatProfileDetails } = useChatData();

  console.log({ currentChatProfileDetails });

  return (
    <>
      <ChatProfileDrawer
        profileData={currentChatProfileDetails}
        open={isDrawer}
        onClose={() => setIsDrawer(false)}
      />
      <div className="py-2 px-4 w-full border-b-2 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <div className="cursor-pointer" onClick={() => setIsDrawer(true)}>
            <PhotoViewerSmall
              photo={currentChatProfileDetails?.photo}
              name={currentChatProfileDetails?.title}
              size="3.5rem"
            />
          </div>
          <div>
            <h1 className="font-semibold">
              {currentChatProfileDetails?.title}
            </h1>
            <h1 className="text-sm font-light">
              {currentChatProfileDetails?.isPrivateGroup ? (
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
    </>
  );
};

export default ChatHead;