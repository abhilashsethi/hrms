import { Avatar } from "@mui/material";
import { PhotoViewer } from "components/core";
import { useAuth } from "hooks";
import moment from "moment";

interface Props {
  title?: string;
}

const WelcomeUser = ({ title }: Props) => {
  const { user } = useAuth();
  return (
    <div className="w-full bg-white py-4 px-4 border-t-[1px] shadow-sm">
      <div className="flex gap-4 tracking-wide items-center">
        <div className="md:h-20 h-14 md:w-20 w-14 rounded-xl flex justify-center items-center shadow-lg">
          {/* <Avatar
            src={user?.photo || " "}
            className="cursor-pointer !bg-theme"
          /> */}
          <PhotoViewer size="3.5rem" name={user?.name} photo={user?.photo} />
        </div>
        <div className="flex flex-col md:gap-2 gap-1">
          <span className="md:text-xl text-lg font-semibold text-gray-900">
            {title}
          </span>
          <span className="text-sm md:text-base">
            {moment(new Date()).format("lll")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeUser;
