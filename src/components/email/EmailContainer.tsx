import { FileDownload, InsertDriveFile } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import ReplyToEmail from "./ReplyToEmail";
import { EmailType } from "types";
import { downloadFile } from "utils";

const EmailContainer = ({
  data,
  printRef,
}: {
  data?: EmailType;
  printRef: any;
}) => {
  return (
    <div className="w-full flex flex-col  gap-4" ref={printRef}>
      {data?.replyTo?.id && <ReplyToEmail />}

      <div className="p-4 flex w-full bg-secondary-600 rounded-t-lg items-center gap-4 border-b border-white justify-start">
        <Avatar
          src={data?.isSenderUser ? data?.receiver?.photo : data?.sender?.photo}
          alt={data?.isSenderUser ? data?.receiver?.name : data?.sender?.name}
        >
          {data?.isSenderUser ? data?.receiver?.name[0] : data?.sender?.name[0]}
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-bold text-white tracking-wide">
            {data?.isSenderUser ? data?.receiver?.name : data?.sender?.name}
          </h3>
          <h3 className="font-medium text-xs text-gray-200">
            {data?.isSenderUser
              ? data?.receiver?.username
              : data?.sender?.username}
          </h3>
        </div>
      </div>
      <div className="flex flex-col px-4 gap-4">
        <h3 className="font-bold tracking-wide text-gray-900 text-2xl">
          {data?.subject}
        </h3>
        <p
          className="font-medium text-gray-600 tracking-wide text-sm"
          dangerouslySetInnerHTML={{
            __html: String(data?.content),
          }}
        ></p>
      </div>
      {data?.attachments?.length && (
        <h3 className="font-medium tracking-wide px-4">Attachments -</h3>
      )}

      <div className="flex flex-wrap gap-4 px-4 pb-4 ">
        {data?.attachments?.map((item, i) => (
          <div
            className="flex flex-col items-center p-4 rounded-md bg-themeBlue shadow-lg"
            key={i}
          >
            <a href={item} target="_blank" rel="noopener noreferrer">
              <InsertDriveFile className="!text-7xl !text-theme" />
            </a>
            <p className="text-center py-2 text-xs font-medium  break-words">
              {item?.split("/")?.at(-1)}
            </p>
            <IconButton
              className=" !bg-secondary  shadow-lg p-2 "
              onClick={() =>
                downloadFile(
                  item,
                  item?.split("/")?.at(-1) || Date.now()?.toString()
                )
              }
            >
              <FileDownload className="!text-white" />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailContainer;
