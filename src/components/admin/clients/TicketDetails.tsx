import { Button, Grid, IconButton, Tooltip } from "@mui/material";
import ICONS from "assets/icons";
import { RenderIconRow } from "components/common";
import { HeadText, Loader, PhotoViewer } from "components/core";
import { useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { TicketsConversations, User } from "types";
import ClientChats from "./ClientChats";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Send } from "@mui/icons-material";
import { ViewTicketsDrawer } from "components/drawer";
interface Props  {
  ticketsData?: TicketsConversations[] | null;
}
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const TicketDetails = ({ticketsData}:Props) => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [viewTickets, setViewTickets] = useState<any>(null);
  const {
    data: employData,
    mutate,
    isLoading,
  } = useFetch<User>(`users/${router?.query?.id}`);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section>
      <section className="mb-12 flex gap-3">
        <Grid container spacing={2}>
          <Grid item lg={8}>
            <div className="w-full bg-white shadow-xl rounded-lg p-8 mt-4">
              <div className="flex items-center gap-2 -ml-5">
                <div className="h-3 w-3 rounded-sm bg-theme"></div>
                <p className="font-bold tracking-wide">Conversations</p>
              </div>
              <Grid container spacing={3}>
                <Grid item lg={12}>
                  <div className="flex flex-col gap-1 mt-4 max-h-[20rem] overflow-y-auto">
                    {chats?.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-3 py-3 px-1 border-b-[1px]"
                      >
                        <div className="flex justify-start items-center">
                          <div className=" bg-theme-100 rounded-full flex justify-center items-center">
                            {item?.icon}
                          </div>
                        </div>
                        <div className="">
                          <div className="flex relative pr-3 items-center">
                            <p className="text-sm font-semibold tracking-wide">
                              {item?.name}
                            </p>
                            <p className="pr-3 text-xs font-semibold text-gray-500 place-content-end tracking-wide absolute right-0">
                              {item?.time}
                            </p>
                          </div>
                          <p className="text-sm tracking-wide">
                            {/* Deadline : {moment(new Date()).format("ll")} */}
                            {item?.details}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Grid>
              </Grid>
            </div>
            <div className="mt-8">
              <ReactQuill
                placeholder="Reply message ..."
                theme="snow"
                value={value}
                // onChange={(e: any) => {
                //   setValue(e);
                //   formik.setFieldValue("content", e);
                // }}
                style={{
                  height: "150px",
                  lineHeight: "0px",
                }}
              />
              <div className="flex justify-end items-end w-full pr-2">
                <Button
                  variant="contained"
                  className="!bg-emerald-500 "
                  startIcon={<Send />}
                  size="small"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item lg={4}>
            <div className="w-full h-full">
              <ClientChats />
            </div>
          </Grid>
        </Grid>
      </section>
    </section>
  );
};

export default TicketDetails;

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
    time: "Today at 9:00 AM",
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
    time: "Today at 9:00 AM",
    name: "Shrinu Readdy",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, deserunt aliquam accusantium porro eligendi iusto expedita fuga veritatis consequuntur exercitationem!",
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
    time: "Today at 9:00 AM",
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
    time: "Today at 9:00 AM",
    name: "Shrinu Readdy",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, deserunt aliquam accusantium porro eligendi iusto expedita fuga veritatis consequuntur exercitationem!",
    status: "COMPLETED",
  },
  {
    id: 5,
    icon: (
      <PhotoViewer
        photo={
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
        }
        size="3rem"
      />
    ),
    time: "Today at 9:00 AM",
    name: "John Smith",
    details:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas nobis id tempora impedit facere cupiditate rem officiis repellendus quasi delectus!",
    status: "COMPLETED",
  },
  {
    id: 6,
    icon: (
      <PhotoViewer
        photo={
          "https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg"
        }
        size="3rem"
      />
    ),
    time: "Today at 9:00 AM",
    name: "Shrinu Readdy",
    details:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odit, deserunt aliquam accusantium porro eligendi iusto expedita fuga veritatis consequuntur exercitationem!",
    status: "COMPLETED",
  },
];
