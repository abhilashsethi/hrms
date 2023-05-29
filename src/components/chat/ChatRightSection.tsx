import {
  DriveFileRenameOutline,
  SentimentSatisfiedAlt,
} from "@mui/icons-material";
import { PhotoViewerSmall } from "components/core";
import { ChatProfileDrawer } from "components/drawer";
import moment from "moment";
import { useState } from "react";

const ChatRightSection = () => {
  const [isDrawer, setIsDrawer] = useState(false);
  return (
    <>
      <ChatProfileDrawer open={isDrawer} onClose={() => setIsDrawer(false)} />
      <div className="w-[70%] h-full">
        <div className="py-2 px-4 w-full border-b-2">
          <div className="flex gap-3 items-center">
            <div className="cursor-pointer" onClick={() => setIsDrawer(true)}>
              <PhotoViewerSmall name="Srinu Reddy" size="3.5rem" />
            </div>
            <div>
              <h1 className="font-semibold">Srinu Reddy</h1>
              <h1 className="text-sm font-light">
                <span className="">Active Now</span>
              </h1>
            </div>
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
                <div className="max-w-[50%] bg-blue-100 py-2 px-4 tracking-wide rounded-md text-sm">
                  <div className="flex justify-end">
                    <span className="text-xs">
                      {moment(new Date()).format("ll")}
                    </span>
                  </div>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Asperiores animi ratione omnis aliquid magnam ipsa dolore,
                  laborum illo nostrum! Veniam incidunt animi amet nostrum
                  dignissimos.
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
