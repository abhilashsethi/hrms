import { Add } from "@mui/icons-material";
import { Avatar, AvatarGroup, Button } from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { LoaderAnime } from "components/core";
import { ProjectCreateTicket } from "components/dialogues";
import { useFetch } from "hooks";
import moment from "moment";
import React, { useState } from "react";
import { TicketsConversations } from "types";
import { clock } from "utils";

const ProjectSupport = () => {
  const [isCreate, setIsCreate] = useState(false);
  const {
    data: ticketsData,
    mutate,
    isLoading,
  } = useFetch<TicketsConversations[]>(`ticket-conversations`);
  console.log(ticketsData);
  return (
    <section className="">
      <ProjectCreateTicket
        open={isCreate}
        mutate={mutate}
        handleClose={() => setIsCreate(false)}
      />
      {isLoading && <p className="text-center">Please wait...</p>}
      <div className="flex justify-end mb-4">
        <Button
          className="!bg-theme"
          onClick={() => setIsCreate(true)}
          variant="contained"
          startIcon={<Add />}
        >
          Create ticket
        </Button>
      </div>
      <div className="grid gap-3">
        {ticketsData?.map((data) => (
          <div
            key={data?.id}
            className="w-full rounded-md p-6 shadow-jubilation"
          >
            <div className="flex justify-end">
              <span className="text-xs mb-1">
                {clock(data?.createdAt).fromNow()}
              </span>
            </div>
            <div dangerouslySetInnerHTML={{ __html: `${data?.text}` }}></div>
            <h1 className="text-sm font-semibold text-theme mt-2">
              Ticket Title :
            </h1>
            <h1 className="font-semibold text-slate-700 text-sm">
              {data?.ticket?.title}
            </h1>
            <h1 className="text-sm font-semibold text-theme mt-2">
              User Info :
            </h1>
            <p>{data?.userInfo?.name}</p>
          </div>
        ))}
        {ticketsData?.length === 0 ? (
          <LoaderAnime text="No support Found" />
        ) : null}
      </div>
    </section>
  );
};

export default ProjectSupport;
