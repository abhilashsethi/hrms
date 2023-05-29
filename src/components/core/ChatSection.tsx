import { ChatLeftBar, ChatRightSection } from "components/chat";

const ChatSection = () => {
  return (
    <section>
      <div className="h-[35rem] w-full rounded-md bg-white mt-4 shadow-md flex">
        <ChatLeftBar />
        <ChatRightSection />
      </div>
    </section>
  );
};

export default ChatSection;
