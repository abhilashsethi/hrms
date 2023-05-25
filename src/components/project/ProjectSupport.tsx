import { Avatar, AvatarGroup } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { useFetch } from "hooks";
import moment from "moment";
import React from "react";
import { TicketsConversations } from "types";

const ProjectSupport = () => {
  const { data: ticketsData, mutate, isLoading } = useFetch<TicketsConversations[]>(
    `ticket-conversations`
  );
  console.log(ticketsData);
  return (
    <section className="">
      {isLoading && <p className="text-center">Please wait...</p>}
      <div className="grid gap-3">
      {ticketsData?.map((data)=>(
      <div key={data?.id} className="w-full rounded-md p-6 shadow-jubilation">
        <div className="flex justify-end">
          <span className="text-xs mb-1">
          {moment(data?.createdAt).format("ll")}
          </span>
        </div>

        <h1 className="font-semibold text-slate-700 text-sm">
          {data?.ticket?.title}
        </h1>
        <p className="mt-2 text-sm tracking-wide text-slate-500">
          {data?.ticket?.description}
        </p>
        <h1 className="text-sm font-semibold text-theme mt-2">User Info :</h1>
         <p>{data?.userInfo?.name}</p>
      </div>
      ))}
      </div>
    </section>
  );
};

export default ProjectSupport;
