import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { LoaderAnime } from "components/core";
import { ProjectCreateTicket } from "components/dialogues";
import { useAuth, useFetch } from "hooks";
import Link from "next/link";
import router from "next/router";
import { useState } from "react";
import { Tickets } from "types";
import { clock } from "utils";

const ProjectSupport = () => {
  const [isCreate, setIsCreate] = useState(false);
  const { user } = useAuth();
  const {
    data: ticketsData,
    mutate,
    isLoading,
  } = useFetch<Tickets[]>(
    `projects/all-tickets/of-projects?projectId=${router?.query?.id}&orderBy=createdAt:desc`
  );
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
        {ticketsData?.map((data) => (
          <div
            key={data?.id}
            className="w-full rounded-md p-6 shadow-jubilation"
          >
            <div className="flex justify-between">
              <div>
                <h1 className="text-sm font-semibold text-theme mt-2">
                  Ticket Issue isResolved :
                </h1>
                <span
                  className={`${
                    data?.isResolved ? `bg-green-500` : `bg-red-500`
                  }  font-semibold text-white px-4 rounded-md`}
                >
                  {data?.isResolved ? "Yes" : "No"}
                </span>
              </div>
              <span className="text-xs mb-1">
                {clock(data?.createdAt).fromNow()}
              </span>
            </div>
            <h1 className="text-sm font-semibold text-theme mt-2">
              Ticket Title :
            </h1>
            <h1 className="font-semibold text-slate-700 text-sm">
              {data?.title}
            </h1>
            <div className="flex justify-between">
              <h1 className="text-sm font-semibold text-theme mt-2">
                User Info :
              </h1>
              <Link href={`/admin/clients/view-ticket-details?id=${data?.id}`}>
                <button className="bg-theme-400 hover:bg-theme-500 px-3 py-1 rounded-lg shadow-md text-white font-semibold hover:translate-x-1 delay-75 transition-all">
                  View details
                </button>
              </Link>
            </div>
            <p>{data?.description}</p>
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
