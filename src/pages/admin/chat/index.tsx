import { useAuth, useChatData, useSocket } from "hooks";

import { ChatLeftBar, ChatRightSection } from "components/chat";
import PanelLayout from "layouts/panel";
import { useEffect } from "react";

const Chats = () => {
  //calling context on index page to get all the data at first
  const { reValidatePrivateChat, reValidateGroupChat } = useChatData();

  useEffect(() => {
    (() => {
      reValidatePrivateChat();
      reValidateGroupChat();
    })();
  }, []);

  return (
    <PanelLayout title="Chats - Admin Panel">
      <section className="p-2">
        <div className="h-[calc(100vh-70px)] overflow-hidden  w-full rounded-md bg-white  shadow-md md:flex">
          <ChatLeftBar />
          <ChatRightSection />
        </div>
      </section>
    </PanelLayout>
  );
};

export default Chats;

const links = [{ id: 1, page: "Chats", link: "/admin/chat" }];
