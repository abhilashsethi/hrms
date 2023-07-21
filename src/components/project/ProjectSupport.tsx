import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoaderAnime } from "components/core";
import { ProjectCreateTicket } from "components/dialogues";
import { useAuth, useFetch } from "hooks";
import Link from "next/link";
import { useState } from "react";
import { TicketsConversations } from "types";
import { clock } from "utils";

const ProjectSupport = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { user } = useAuth();
  const {
    data: ticketsData,
    mutate,
    isLoading,
  } = useFetch<TicketsConversations[]>(`ticket-conversations`);
  console.log({ ticketsData });
  return (
    <section className="">
      <ProjectCreateTicket
        open={isCreate}
        mutate={mutate}
        handleClose={() => setIsCreate(false)}
      />
      {isLoading && <p className="text-center">Please wait...</p>}
      <div className="flex justify-end mb-4">
        {user?.isClient ? (
          <Button
            className="!bg-theme"
            size="small"
            onClick={() => setIsCreate(true)}
            variant="contained"
            startIcon={<Add />}
          >
            Create ticket
          </Button>
        ) : null}
      </div>
      <div className="grid gap-3">
        {ticketsData
          ?.sort(
            (a: any, b: any) =>
              (new Date(b?.createdAt) as any) - (new Date(a?.createdAt) as any)
          )
          ?.map((data) => (
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
              <div className="flex justify-between">
                <h1 className="text-sm font-semibold text-theme mt-2">
                  User Info :
                </h1>
                <Link
                  href={`/admin/clients/view-ticket-details?id=${data?.ticket?.id}`}
                >
                  <button className="bg-theme-400 hover:bg-theme-500 px-3 py-1 rounded-lg shadow-md text-white font-semibold hover:translate-x-1 delay-75 transition-all">
                    View details
                  </button>
                </Link>
              </div>
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
