import { Avatar } from "@mui/material";
import moment from "moment";

interface Props {
  title?: string;
}

const WelcomeUser = ({ title }: Props) => {
  return (
    <div className="w-full bg-white py-4 px-4 border-t-[1px] shadow-sm">
      <div className="flex gap-4 tracking-wide items-center">
        <div className="h-20 w-20 rounded-xl flex justify-center items-center shadow-lg">
          <Avatar src="" className="cursor-pointer !bg-theme" />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xl font-semibold text-gray-900">{title}</span>
          <span>{moment(new Date()).format("lll")}</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUser;
