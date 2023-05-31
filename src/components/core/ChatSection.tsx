import { ChatLeftBar, ChatRightSection } from "components/chat";
import { useState } from "react";

const ChatSection = () => {
  const [activeProfile, setActiveProfile] = useState<{
    id?: number;
    photo?: string | undefined;
    name?: string;
    message?: string;
    type?: string;
  }>({});
  return (
    <section>
      <div className="h-[85vh] w-full rounded-md bg-white mt-4 shadow-md flex">
        <ChatLeftBar
          activeProfile={activeProfile}
          setActiveProfile={setActiveProfile}
        />
        <ChatRightSection activeProfile={activeProfile} />
      </div>
    </section>
  );
};

export default ChatSection;
