import { Avatar } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { EmailType } from "types";

const ReplyToEmail = ({ data }: { data?: EmailType }) => {
  const { push } = useRouter();

  return (
    <div
      onClick={() => push(`/admin/email/${data?.id}`)}
      className={`flex-col flex md:flex-row border-b cursor-pointer border-gray-200 bg-themeBlue rounded-md shadow-lg  w-full items-center `}
    >
      <div className="md:px-5 px-3 py-5 md:max-w-[22%] w-full text-sm">
        <div className="flex items-center gap-2 ">
          <Avatar alt={data?.sender?.name} src={data?.sender?.photo}>
            {data?.sender?.name[0]}
          </Avatar>
          <div className="md:ml-3 flex flex-col ">
            <p className="text-gray-800 min-w-fit text-sm font-bold ">
              {data?.sender?.name}
            </p>
            <p className="text-gray-600 min-w-fit text-xs ">
              {" "}
              {moment(data?.sentAt).format("lll")}
            </p>
          </div>
        </div>
      </div>

      <div className="md:px-5 md:py-5 pb-2 min-w-fit text-sm">
        <p className="text-gray-900 whitespace-nowrap">{data?.subject}</p>
      </div>
    </div>
  );
};

export default ReplyToEmail;
