import { ChatLeftBar, ChatRightSection } from "components/chat";
import { useState } from "react";

const ChatSection = () => {
  const [activeProfile, setActiveProfile] = useState<{
    id?: number;
    photo?: string | undefined;
    name?: string;
    message?: string;
    type?: string;
  }>({
    id: 1,
    photo:
      "https://www.bollywoodhungama.com/wp-content/uploads/2023/01/Hrithik-Roshan-opens-up-about-620.jpg",
    name: "Loushik Giri",
    message: "Talk to you...",
    type: "person",
  });

  return (
    <section>
      <div className="h-[35rem] w-full rounded-md bg-white mt-4 shadow-md flex">
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
