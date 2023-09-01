import { useChatData } from "hooks";

import { ChatLeftBar, ChatRightSection } from "components/chat";
import PanelLayout from "layouts/panel";
import { useEffect, useState } from "react";

const Chats = () => {
  //calling context on index page to get all the data at first
  const { reValidatePrivateChat, reValidateGroupChat } = useChatData();
  const [isChatLeftBar, setChatLeftBar] = useState(true);

  useEffect(() => {
    (() => {
      reValidatePrivateChat();
      reValidateGroupChat();
    })();
  }, []);

  return (
    <PanelLayout title="Chats - Admin Panel">
      <section className="p-2">
        <div className="h-[calc(100vh-70px)] overflow-hidden w-full rounded-md bg-white  shadow-md lg:flex hidden">
          <ChatLeftBar setChatLeftBar={setChatLeftBar} />
          <ChatRightSection setChatLeftBar={setChatLeftBar} />
        </div>

        {/* MOBILE SCREEN */}
        <div className="h-[calc(100vh)] py-3 overflow-hidden  w-full rounded-md bg-white  shadow-md  lg:hidden block">
          <span className={`${isChatLeftBar ? "hidden" : ""}`}>
            <ChatLeftBar setChatLeftBar={setChatLeftBar} />
          </span>
          <span className={`${isChatLeftBar ? "" : "hidden"}`}>
            <ChatRightSection setChatLeftBar={setChatLeftBar} />
          </span>
        </div>
      </section>
    </PanelLayout>
  );
};

export default Chats;

const links = [{ id: 1, page: "Chats", link: "/admin/chat" }];
