import { AdminBreadcrumbs, ChatSection } from "components/core";
import { useChatData } from "hooks";
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
      <section className="px-6 py-4">
        {/* <AdminBreadcrumbs links={links} /> */}
        <ChatSection />
      </section>
    </PanelLayout>
  );
};

export default Chats;

const links = [{ id: 1, page: "Chats", link: "/admin/chat" }];
