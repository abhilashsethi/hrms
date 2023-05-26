import { Button, CircularProgress } from "@mui/material";
import { Loader, PhotoViewer } from "components/core";
import { useAuth, useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Tickets, TicketsConversations, User } from "types";
import ClientChats from "./ClientChats";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { Send } from "@mui/icons-material";
import moment from "moment";
import Swal from "sweetalert2";
interface Props {
  ticketsData?: Tickets | null;
  ticketLoading?: any;
  mutateTicket?: any
}
const initialValues = {
  text: "",
};
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const TicketDetails = ({ ticketsData, mutateTicket, ticketLoading }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { change, isChanging } = useChange();
  const { user } = useAuth();
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      const ticketText = { text: values?.text, ticketId: router?.query?.id, userInfo: { id: user?.id, name: user?.name } }
      const res = await change(`ticket-conversations`, {
        body: ticketText,
      });
      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      mutateTicket()
      Swal.fire(`Success`, `You have successfully Created!`, `success`);
      resetForm();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="mb-12 flex gap-3">
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="w-full bg-white shadow-xl rounded-lg p-8 mt-4">
            <div className="flex items-center gap-2 -ml-5">
              <div className="h-3 w-3 rounded-sm bg-theme"></div>
              <p className="font-bold tracking-wide">Conversations</p>
            </div>
            <div className="grid">
              <div className="flex flex-col gap-1 mt-4 max-h-[20rem] overflow-y-auto">
                {ticketLoading ? <p>Loading Please wait .....</p> : (
                  <>

                    {ticketsData?.conversations?.length ? (
                      <>
                        {ticketsData?.conversations?.map((item, i) => (
                          <div
                            key={i}
                            className="flex gap-3 py-3 px-1 border-b-[1px]"
                          >
                            <div className="flex justify-start items-center">
                              <div className=" bg-theme-100 rounded-full flex justify-center items-center">
                                <PhotoViewer photo={"https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"} size="3rem" />
                              </div>
                            </div>
                            <div className="w-full">
                              <div className="flex w-full justify-between pr-3 items-center">
                                <p className="text-sm font-semibold tracking-wide">
                                  {item?.userInfo?.name}
                                </p>
                                <p className="pr-3 text-xs font-semibold text-gray-500 tracking-wide">
                                  {moment(item?.createdAt).format('ll')}
                                </p>
                              </div>
                              <p className="text-sm tracking-wide">
                                {/* Deadline : {moment(new Date()).format("ll")} */}
                                <div dangerouslySetInnerHTML={{ __html: `${item?.text}` }}></div>

                              </p>
                            </div>
                          </div>
                        ))} </>) : <p>No conversation</p>}
                  </>
                )}
              </div>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({
              values,
              handleBlur,
              setFieldValue,
            }) => (
              <Form>
                <div className="mt-8 bg-white">

                  <ReactQuill
                    placeholder="Reply message ..."
                    theme="snow"
                    value={values.text}
                    onChange={(value) => setFieldValue('text', value)}
                    onBlur={handleBlur('text')}
                    className="h-[150px] "
                  />
                  <div className="flex justify-end items-end w-full pr-2">
                    <Button
                      type="submit"
                      variant="contained"
                      className="!bg-emerald-500 "
                      disabled={loading}
                      startIcon={
                        loading ? <CircularProgress size={20} /> : <Send />
                      }
                      size="small"
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <div className="w-full h-full">
            <ClientChats ticketsData={ticketsData} ticketLoading={ticketLoading} />
          </div>
        </div>
      </div>
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
