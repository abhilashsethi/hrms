import { useChatData } from "hooks";

import { ChatLeftBar, ChatRightSection } from "components/chat";
import PanelLayout from "layouts/panel";
import { useEffect } from "react";

const Chats = () => {
  //calling context on index page to get all the data at first
  const {
    reValidatePrivateChat,
    reValidateGroupChat,
    currentChatProfileDetails,
  } = useChatData();

  useEffect(() => {
    (() => {
      reValidatePrivateChat();
      reValidateGroupChat();
    })();
  }, []);

  return (
    <PanelLayout title="Chats - Admin Panel">
      <section className="px-6 py-4">
        {/* <AdminBreadcrumbs links={links} /> */}
        <section>
          <div className="h-[80vh] w-full rounded-md bg-white mt-4 shadow-md flex">
            <ChatLeftBar />

            <ChatRightSection />
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default Chats;

const links = [{ id: 1, page: "Chats", link: "/admin/chat" }];
