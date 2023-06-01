import { CHATDEFAULT } from "assets/home";

const DefaultChatView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <img className="h-60 object-contain" src={CHATDEFAULT.src} alt="" />
      <p className="text-center max-w-[70%] text-sm text-gray-600">
        Elevate Your Business Communication. Connect, Collaborate, Succeed.
        Empower Your Team with Seamless Chat Experience.
      </p>
    </div>
  );
};

export default DefaultChatView;