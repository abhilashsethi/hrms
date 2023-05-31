import { ChatLeftBar, ChatRightSection } from "components/chat";
import PanelLayout from "layouts/panel";
import { useState } from "react";

const Chats = () => {
  const [activeProfile, setActiveProfile] = useState<{
    id?: number;
    photo?: string | undefined;
    name?: string;
    message?: string;
    type?: string;
  }>({});
  return (
    <PanelLayout title="Chats - Admin Panel">
      <section className="px-6 py-4">
        {/* <AdminBreadcrumbs links={links} /> */}
        <section>
          <div className="h-[80vh] w-full rounded-md bg-white mt-4 shadow-md flex">
            <ChatLeftBar
              activeProfile={activeProfile}
              setActiveProfile={setActiveProfile}
            />
            <ChatRightSection activeProfile={activeProfile} />
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default Chats;

const links = [{ id: 1, page: "Chats", link: "/admin/chat" }];
