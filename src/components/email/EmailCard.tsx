import { Avatar, Checkbox } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { parseTextFromHtml } from "utils";

const EmailCard = ({
  className,
  isRead,
  email,
  subject,
  messageDate,
  userName,
  onclick,
  photo,
  messages,
  selected,
  onSelect,
}: {
  className?: string;
  isRead?: boolean;
  email?: string;
  subject?: string;
  messageDate?: any;
  userName?: string;
  onclick?: () => void;
  photo?: string;
  messages?: string;
  selected?: boolean;
  onSelect?: () => any;
}) => {
  const { push } = useRouter();

  return (
    <tr
      className={`flex-col flex lg:flex-row border-b cursor-pointer border-gray-200   w-full items-center ${
        isRead ? "bg-white" : "bg-theme/20"
      } `}
    >
      <td className="px-5 py-5 lg:max-w-[22%] w-full text-sm">
        <div className="flex items-center gap-2 ">
          <Checkbox size="small" checked={selected} onClick={onSelect} />
          <Avatar
            src={photo}
            alt={userName}
            onClick={() => {
              onclick ? onclick() : push(`/admin/email/${Date.now()}`);
            }}
          >
            {userName?.[0]}
          </Avatar>
          <div className="ml-3">
            <p className="text-gray-900 text-xs whitespace-nowrap">
              {userName}
            </p>
            <p className="text-gray-600 min-w-fit text-xs ">{subject}</p>
          </div>
        </div>
      </td>
      <td
        className="px-5 lg:py-5 w-full   text-sm"
        onClick={() => {
          onclick ? onclick() : push(`/admin/email/${Date.now()}`);
        }}
      >
        <p className="text-gray-900 break-words">
          {messages &&
            (messages?.length > 100
              ? parseTextFromHtml(messages?.slice(0, 100)) + "... "
              : parseTextFromHtml(messages))}
        </p>
      </td>
      <td className="px-5 lg:py-5 min-w-fit w-full lg:w-fit  text-sm">
        <p className="text-gray-900 whitespace-nowrap">
          {moment(messageDate).format("LL")}
        </p>
      </td>
    </tr>
  );
};

export default EmailCard;
