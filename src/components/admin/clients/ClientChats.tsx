import { HeadText, PhotoViewer } from "components/core";
import moment from "moment";
import { AccountTreeRounded, Add } from "@mui/icons-material";
import { RenderIconRow } from "components/common";
import { Avatar, AvatarGroup, Button, Tooltip } from "@mui/material";
import { DEFAULTPROFILE, DOC, IMG, PDF, XLS } from "assets/home";
import { useRouter } from "next/router";
import { ViewTicketsDrawer } from "components/drawer";
import React, { useState } from "react";
import { useFetch } from "hooks";

const ClientChats = () => {
  const [tickets, setTickets] = useState(false);
  const router = useRouter();
  const [viewTickets, setViewTickets] = useState<any>(null);
  const { data: ticketsData, isLoading } = useFetch<any>(
    `tickets?${router?.query?.id ? `&clientId=${router?.query?.id}` : ""}`
  );
  return (
    <section className="w-full p-6 rounded-lg bg-white shadow-xl mt-4">
      <ViewTicketsDrawer
        open={tickets}
        onClose={() => setTickets(false)}
        setViewTickets={setViewTickets}
        ticket={ticketsData}
        isLoading={isLoading}
      />

      <HeadText title="Requester Details" />
      <div className="flex items-center gap-4">
        <div className="mt-2">
          <PhotoViewer
            photo={
              "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
            size="5.5rem"
          />
        </div>
        <div className="tracking-wide w-full h-full">
          <p className="text-md text-slate-600 font-medium mt-1">John Smith"</p>

          <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
            <RenderIconRow value={"johnsmith@gmail.com"} isEmail />
          </p>
          <p className="text-sm text-slate-600 font-medium mt-1 flex items-center gap-3">
            <RenderIconRow value={"9974521485" || "---"} isPhone />
          </p>
        </div>
      </div>
      <div className="font-semibold my-3">
        Support Title :{"  "}
        <span className="font-medium text-gray-600">
          {"  "}Arrange a Meeting
        </span>
      </div>
      <div className="font-semibold mt-3">Support Description :</div>
      <p className="text-gray-600 font-medium text-sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
        adipisci a facere voluptatum debitis totam asperiores temporibus cumque
        commodi .
      </p>
      <div className="flex items-center mt-3 gap-3">
        <div className="font-semibold ">Issue Resolved :</div>
        <div className="text-xs bg-[#44bd44] text-white p-1 rounded-md font-semibold px-2">
          Yes
        </div>
      </div>
      <p className="font-semibold mt-3 mb-2">Assigned Members</p>
      <div className="flex justify-start">
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
      </div>

      <div className="flex justify-between">
        <p className="font-semibold mt-3 mb-2">Documents</p>
        <Tooltip title="Add more">
          <button className="mt-5 bg-white text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white border border-theme rounded-lg px-4">
            <Add className="" />
          </button>
        </Tooltip>
      </div>
      <div className="grid grid-cols-3 w-2/3 gap-6">
        <div className="cursor-pointer">
          <img className="w-12" src={PDF.src} alt="" />
          <p className="text-xs">doc_1002...</p>
        </div>
        <div className="cursor-pointer">
          <img className="w-12" src={DOC.src} alt="" />
          <p className="text-xs">doc_1003...</p>
        </div>
        <div className="cursor-pointer">
          <img className="w-12" src={XLS.src} alt="" />
          <p className="text-xs">doc_1004...</p>
        </div>
        <div className="cursor-pointer">
          <img className="w-12" src={IMG.src} alt="" />
          <p className="text-xs">doc_1005...</p>
        </div>
        <div className="cursor-pointer">
          <img className="w-12" src="/docs.png" alt="" />
          <p className="text-xs">doc_1006...</p>
        </div>
        <div className="border border-theme h-8 mt-3 flex justify-center items-center rounded-lg text-sm text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white">
          <button onClick={() => setTickets(true)}>View All</button>
        </div>
      </div>
    </section>
  );
};

export default ClientChats;

const chats = [
  {
    id: 1,
    icon: (
      <PhotoViewer
        photo={
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
        size="3rem"
      />
    ),
    name: "John Smith",
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas nobis id tempora impedit facere cupiditate rem officiis repellendus quasi delectus!",
    status: "COMPLETED",
  },
  {
    id: 2,
    icon: (
      <PhotoViewer
        photo={
          "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
        }
        size="3rem"
      />
    ),
    name: "Shrinu Readdy",
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas ",
    status: "COMPLETED",
  },
  {
    id: 3,
    icon: (
      <PhotoViewer
        photo={
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
        size="3rem"
      />
    ),
    name: "John Smith",
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas nobis id tempora impedit facere cupiditate rem officiis repellendus quasi delectus!",
    status: "COMPLETED",
  },
  {
    id: 4,
    icon: (
      <PhotoViewer
        photo={
          "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
        }
        size="3rem"
      />
    ),
    name: "Shrinu Readdy",
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas ",
    status: "COMPLETED",
  },
];
