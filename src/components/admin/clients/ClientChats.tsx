import { HeadText, PhotoViewer } from "components/core";
import moment from "moment";
import { AccountTreeRounded, Add, Delete } from "@mui/icons-material";
import { RenderIconRow } from "components/common";
import { Avatar, AvatarGroup, Button, CircularProgress, Tooltip } from "@mui/material";
import { DEFAULTPROFILE, DOC, IMG, PDF, XLS } from "assets/home";
import { useRouter } from "next/router";
import { ViewTicketsDrawer } from "components/drawer";
import React, { useState } from "react";
import { useChange, useFetch } from "hooks";
import { Tickets } from "types";
import TicketDetailsSkeletonLoading from "./TicketDetailsSkeletonLoading";
import { TicketAddDocumentDialogue } from "components/dialogues";
import Swal from "sweetalert2";
interface Props {
  ticketsData?: Tickets | null;
  ticketLoading?: any;
  mutateTicket?: any;
}
const ClientChats = ({ ticketsData, mutateTicket, ticketLoading }: Props) => {
  const [getDocument, setGetDocument] = useState<boolean>(false);
  const [tickets, setTickets] = useState(false);

  return (
    <section className="w-full p-4 rounded-lg bg-white shadow-xl">
      <TicketAddDocumentDialogue
        open={getDocument}
        handleClose={() => setGetDocument(false)}
        ticketsData={ticketsData}
        mutate={mutateTicket}
      />
      <HeadText title="Requester Details" />
      {ticketLoading ? (<TicketDetailsSkeletonLoading />) : (<>
        <div className="md:flex items-center gap-4">
          <div className="my-2">
            <PhotoViewer
              photo={ticketsData?.client?.photo}
              name={ticketsData?.client?.name}
              size="5.5rem"
            />
          </div>
          <div className="tracking-wide w-full h-full">
            <p className="text-md text-slate-600 font-medium mt-1">{ticketsData?.client?.name}</p>

            <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
              <RenderIconRow value={ticketsData?.client?.email} isEmail />
            </p>
            <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
              <RenderIconRow value={ticketsData?.client?.phone} isPhone />
            </p>
          </div>
        </div>
        <div className="font-semibold my-3">
          Support Title :{"  "}
          <span className="font-medium text-gray-600">
            {ticketsData?.title}
          </span>
        </div>
        <div className="font-semibold mt-3">Support Description :</div>
        <p className="text-gray-600 font-medium text-sm">
          {ticketsData?.description}
        </p>
        <div className="flex items-center mt-3 gap-3">
          <div className="font-semibold ">Issue Resolved :</div>
          <div className={`text-xs ${ticketsData?.isResolved ? `bg-[#44bd44]` : `bg-red-600`}  text-white p-1 rounded-md font-semibold px-2`}>
            {ticketsData?.isResolved ? <p> Yes</p> : <p>No</p>}
          </div>
        </div>
        <p className="font-semibold mt-3 mb-2">Assigned Members</p>
        <div className="flex justify-start">
          {ticketsData?.assignedUserIds?.length ?
            <AvatarGroup
              className="!cursor-pointer"
              //   onClick={() => setIsMembers({ dialogue: true })}
              max={4}
            >
              <Avatar
                alt="Remy Sharp"
                src={
                  "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg" ||
                  " "
                }
              />
              <Avatar
                alt="Remy Sharp"
                src={
                  "https://image.shutterstock.com/image-photo/smiling-young-middle-eastern-man-260nw-2063524544.jpg" ||
                  " "
                }
              />
              <Avatar
                alt="Remy Sharp"
                src={
                  "https://us.123rf.com/450wm/gstockstudio/gstockstudio1702/gstockstudio170200322/71575852-how-may-i-help-you-good-looking-young-man-in-white-shirt-and-tie-working-on-his-digital-tablet-and.jpg?ver=6" ||
                  " "
                }
              />
              <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
              <Avatar alt="Remy Sharp" src={DEFAULTPROFILE.src || " "} />
            </AvatarGroup>
            : <p>Not Assigned</p>}
        </div>

        <div className="flex justify-between">
          <p className="font-semibold mt-3 mb-2">Documents</p>
          <Tooltip title="Add more">
            <button className="mt-5 bg-white text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white border border-theme rounded-lg px-4">
              <Add onClick={() => setGetDocument((prev) => !prev)} className="" />
            </button>
          </Tooltip>
        </div>
        {ticketsData?.documents?.length ? (
          <>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 w-full gap-6">
              {ticketsData?.documents?.map((docData) => (
                <div key={docData?.docId} className="cursor-pointer">
                  <img className="w-12" src={PDF.src} alt="" />
                  <p className="text-xs">doc_1002...</p>
                  <DeleteButton id={docData?.docId} mutateTicket={mutateTicket} ticketsData={ticketsData} />
                </div>
              ))}
              {/* <div className="border border-theme h-8 mt-3 flex justify-center items-center rounded-lg text-sm text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white">
              <button onClick={() => setTickets(true)}>View All</button>
            </div> */}
            </div>
          </>
        ) : <div className="grid gap-1 justify-items-center">
          <p>No Document</p>
          <Button variant="contained" startIcon={<Add />} onClick={() => setGetDocument((prev) => !prev)} className="!bg-theme text-white font-semibold tracking-wide hover:scale-95 transition duration-300 ease-in-out">Add Document</Button>
        </div>}
      </>)}
    </section>
  );
};

export default ClientChats;


interface ButtonProps {
  id?: string | null | undefined;
  mutateTicket?: any;
  ticketsData?: Tickets;
}

const DeleteButton = ({ id, mutateTicket, ticketsData }: ButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const handleDelete = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        setLoading(true);
        if (result.isConfirmed) {
          Swal.fire(`Info`, "It will take some time", "info");
          const response = await change(
            `tickets/remove-doc/${ticketsData?.id}`,
            {
              method: "DELETE",
              body: { documentId: id }
            }
          );
          setLoading(false);
          if (response?.status !== 200) {
            Swal.fire("Error", "Something went wrong!", "error");
          }
          mutateTicket();
          Swal.fire("Success", "Deleted successfully!", "success");
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    });
  };
  return (
    <Button
      onClick={() => {
        // setActiveId(item?.id);
        handleDelete(id);
      }}
      disabled={loading}
      variant="contained"
      className="!bg-red-500 text-xs"
      startIcon={loading ? <CircularProgress size={20} /> : <Delete />}
      size="small"
    >
      DELETE
    </Button>
  );
};