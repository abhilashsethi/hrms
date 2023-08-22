import { Avatar } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import { EmailType, EmailUser } from "types";

const ReplyToEmail = ({ data }: { data?: EmailType }) => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/admin/email/${data?.replyTo?.id}`)}
      className={`flex-col flex md:flex-row border-b cursor-pointer border-gray-200 bg-themeBlue rounded-md shadow-lg  w-full items-center `}
    >
      <div className="px-5 py-5 max-w-[22%] w-full text-sm">
        <div className="flex items-center gap-2 ">
          <Avatar
            alt={data?.isSenderUser ? data?.sender?.name : data?.receiver?.name}
            src={
              data?.isSenderUser ? data?.sender?.photo : data?.receiver?.photo
            }
          >
            {data?.isSenderUser
              ? data?.sender?.name[0]
              : data?.receiver?.name[0]}
          </Avatar>
          <div className="ml-3 flex flex-col ">
            <p className="text-gray-800 min-w-fit text-sm font-bold ">
              {data?.isSenderUser ? data?.sender?.name : data?.receiver?.name}
            </p>
            <p className="text-gray-600 min-w-fit text-xs ">{data?.subject}</p>
          </div>
        </div>
      </div>
      <div className="px-5 py-5 w-full   text-sm">
        <p
          className="text-gray-900 break-words"
          dangerouslySetInnerHTML={{
            __html: data?.replyTo?.content || "",
          }}
        ></p>
      </div>
      <div className="px-5 py-5 min-w-fit   text-sm">
        <p className="text-gray-900 whitespace-nowrap">
          {moment(data?.sentAt).format("LLL")}
        </p>
      </div>
    </div>
  );
};

export default ReplyToEmail;
