import { Avatar, Checkbox, AvatarGroup } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { EmailUser } from "types";

const EmailCard = ({
  className,
  isRead,
  subject,
  messageDate,
  onclick,
  messages,
  selected,
  onSelect,
  receiver,
}: {
  className?: string;
  isRead?: boolean;
  subject?: string;
  messageDate?: any;
  onclick?: () => void;
  messages?: string;
  selected?: boolean;
  onSelect?: () => any;
  receiver: EmailUser[];
}) => {
  const { push } = useRouter();

  return (
    <>
      <tr
        className={`flex-col md:flex hidden lg:flex-row border-b cursor-pointer border-gray-200 w-full items-center ${
          isRead ? "bg-white" : "bg-theme/20"
        } `}
      >
        <td
          className="px-5 py-5  w-full text-sm"
          onClick={() => {
            onclick && onclick();
          }}
        >
          <div className="flex items-center gap-2 w-full ">
            <Checkbox size="small" checked={selected} onClick={onSelect} />
            <AvatarGroup total={receiver?.length}>
              {receiver?.length > 2
                ? receiver.slice(0, 2)?.map((item) => (
                    <Avatar
                      src={item?.photo}
                      alt={item?.username}
                      onClick={() => {
                        onclick?.();
                      }}
                    >
                      {item?.name?.[0]}
                    </Avatar>
                  ))
                : receiver?.map((item) => (
                    <Avatar
                      src={item?.photo}
                      alt={item?.username}
                      onClick={() => {
                        onclick?.();
                      }}
                    >
                      {item?.name?.[0]}
                    </Avatar>
                  ))}
            </AvatarGroup>

            <div className="ml-3 min-w-[200px]">
              <p className="text-gray-900 text-xs ">
                {receiver?.length > 2
                  ? `${receiver
                      ?.slice(0, 2)
                      .map((item) => item?.name)
                      ?.join(", ")} and ${receiver?.length - 2} more. `
                  : receiver?.map((item) => item?.name)?.join(", ")}
              </p>
              <p className="text-gray-600 min-w-fit text-xs break-all">
                {moment(messageDate).format("LL")}
              </p>
            </div>
          </div>
        </td>
        <td className="px-5 lg:py-5 w-full text-sm">
          <p className="text-gray-900 break-words">
            {(subject && subject) || "No subject"}
          </p>
        </td>
        <td className="px-5 lg:py-5 min-w-fit w-full lg:w-fit  text-sm">
          <p className="text-gray-900 whitespace-nowrap">
            {moment(messageDate).format("HH:mm A")}
          </p>
        </td>
      </tr>
      {/* Mobile Screen Start */}
      <div
        className={`flex-col md:hidden flex lg:flex-row border-b cursor-pointer border-gray-200 w-full items-center ${
          isRead ? "bg-white" : "bg-theme/20"
        } `}
      >
        <div className="md:px-5 py-5 lg:max-w-[25%] w-full text-sm">
          <div className="flex items-center gap-2 w-full ">
            <Checkbox size="small" checked={selected} onClick={onSelect} />
            <AvatarGroup total={receiver?.length}>
              {receiver?.length > 2
                ? receiver.slice(0, 2)?.map((item) => (
                    <Avatar
                      src={item?.photo}
                      alt={item?.username}
                      onClick={() => {
                        onclick?.();
                      }}
                      sx={{ width: 24, height: 24 }}
                    >
                      {item?.name?.[0]}
                    </Avatar>
                  ))
                : receiver?.map((item) => (
                    <Avatar
                      src={item?.photo}
                      alt={item?.username}
                      onClick={() => {
                        onclick?.();
                      }}
                      sx={{ width: 24, height: 24 }}
                    >
                      {item?.name?.[0]}
                    </Avatar>
                  ))}
            </AvatarGroup>
            <div className="min-w-[100px] w-full">
              <p className="text-gray-900 text-xs ">
                {receiver?.length > 2
                  ? `${receiver
                      ?.slice(0, 2)
                      .map((item) => item?.name)
                      ?.join(", ")} and ${receiver?.length - 2} more. `
                  : receiver?.map((item) => item?.name)?.join(", ")}
              </p>
              <p className="text-gray-600 min-w-fit text-xs break-all">
                {moment(messageDate).format("ll")}
              </p>
            </div>
            <div
              className="px-5 w-full text-xs"
              onClick={() => {
                onclick ? onclick() : push(`/admin/email/${Date.now()}`);
              }}
            >
              <p className="text-gray-900 break-words">
                {(subject && subject) || "No subject"}
              </p>
            </div>
            <div className="px-5 min-w-fit w-full lg:w-fit  text-xs">
              <p className="text-gray-900 whitespace-nowrap">
                {moment(messageDate).format("HH:mm A")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Screen End */}
    </>
  );
};

export default EmailCard;
