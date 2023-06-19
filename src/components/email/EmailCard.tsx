import { Avatar, Checkbox, IconButton } from "@mui/material";
import moment from "moment";

const EmailCard = ({
  className,
  isRead,
  email,
  subject,
}: {
  className?: string;
  isRead?: boolean;
  email?: string;
  subject?: string;
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center gap-4 pr-4 justify-between md:flex-row  border-b border-l border-r ${className} `}
    >
      <div className="flex flex-col md:flex-row items-center gap-8 ">
        <div className="flex">
          <IconButton>
            <Checkbox size="small" />
          </IconButton>

          <div className="flex items-center gap-4">
            <Avatar sx={{ width: 28, height: 28 }} />
            <h3 className="font-medium tracking-wide text-black">User 001</h3>
          </div>
        </div>
        <span className="flex items-center ">
          <p className="tracking-wide font-medium text-black ">New Subject</p>
          <p className="tracking-wide font-medium text-black ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum
            dolor sit amet consectetur adipisicing. Lorem ipsum dolor sit amet.
          </p>
        </span>
      </div>
      <p className="text-black font-medium tracking-wide">
        {moment().format("LLL")}
      </p>
    </div>
  );
};

export default EmailCard;
