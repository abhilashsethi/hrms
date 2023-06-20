import { Avatar, Checkbox } from "@mui/material";

const EmailCard = ({
  className,
  isRead,
  email,
  subject,
  messageDate,
  userName,
}: {
  className?: string;
  isRead?: boolean;
  email?: string;
  subject?: string;
  messageDate?: any;
  userName?: string;
}) => {
  return (
    <tr
      className={`flex-col flex md:flex-row border-b cursor-pointer border-gray-200 bg-white  w-full items-center ${
        isRead ? "bg-white" : "bg-theme/20"
      } `}
    >
      <td className="px-5 py-5 max-w-[22%] w-full text-sm">
        <div className="flex items-center gap-2 ">
          <Checkbox size="small" />
          <Avatar />
          <div className="ml-3">
            <p className="text-gray-900 whitespace-nowrap">{userName}</p>
            <p className="text-gray-600 min-w-fit ">{subject}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 w-full   text-sm">
        <p className="text-gray-900 break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus quia magnam eveniet voluptates natus iusto, sed quas
          dolore illo excepturi sit dicta laudantium, iure rem!
        </p>
      </td>
      <td className="px-5 py-5 min-w-fit   text-sm">
        <p className="text-gray-900 whitespace-nowrap">Sept 28, 2019</p>
      </td>
    </tr>
  );
};

export default EmailCard;
