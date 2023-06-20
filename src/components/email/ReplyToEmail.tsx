import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

const ReplyToEmail = () => {
  const { push } = useRouter();
  return (
    <div
      onClick={() => push(`/admin/email/${Date.now()}`)}
      className={`flex-col flex md:flex-row border-b cursor-pointer border-gray-200 bg-themeBlue rounded-md shadow-lg  w-full items-center `}
    >
      <div className="px-5 py-5 max-w-[22%] w-full text-sm">
        <div className="flex items-center gap-2 ">
          <Avatar />
          <div className="ml-3">
            <p className="text-gray-600 min-w-fit text-xs ">
              Lorem ipsum dolor sit amet, consectetur adipisicing.
            </p>
          </div>
        </div>
      </div>
      <div className="px-5 py-5 w-full   text-sm">
        <p className="text-gray-900 break-words">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus quia magnam eveniet voluptates natus iusto.
        </p>
      </div>
      <div className="px-5 py-5 min-w-fit   text-sm">
        <p className="text-gray-900 whitespace-nowrap">Sept 28, 2019</p>
      </div>
    </div>
  );
};

export default ReplyToEmail;
