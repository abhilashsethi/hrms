import { BorderColor } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Loader } from "components/core";
import EditMeetingDetails from "components/dialogues/EditMeetingDetails";
import { ViewNotesDrawer } from "components/drawer";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useState } from "react";
import { MEETING_DATA } from "types";

const MeetingData = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState(false);
  const [editDetails, setEditDetails] = useState<boolean>(false);
  const {
    data: meetingDetails,
    mutate,
    isLoading,
  } = useFetch<MEETING_DATA>(`meetings/${router?.query?.id}`);

  console.log(meetingDetails);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      <EditMeetingDetails
        open={editDetails}
        handleClose={() => setEditDetails(false)}
        meetingId={router?.query?.id}
        mutate={mutate}
      />

      <ViewNotesDrawer
        open={tickets}
        onClose={() => setTickets(false)}
        meetingDetails={meetingDetails}
        mutate={mutate}
        isLoading={isLoading}
      />

      <section className="mb-12 flex gap-3">
        <div className="w-full m-auto rounded-lg bg-white shadow-xl lg:p-4 p-1 px-2">
          <div className="w-full bg-blue-100/50 rounded-lg lg:p-4 p-1">
            <div className="grid lg:grid-cols-2 gap-5">
              <div>
                {user?.role?.name === "CEO" ||
                user?.role?.name === "PROJECT MANAGER" ? (
                  <div className="flex justify-end">
                    <Button
                      variant="contained"
                      className="!bg-blue-500 "
                      startIcon={<BorderColor />}
                      size="small"
                      onClick={() => setEditDetails((prev) => !prev)}
                    >
                      Edit
                    </Button>
                  </div>
                ) : null}
                <div>
                  <div className="pb-1 lg:text-base text-sm font-semibold md:flex">
                    <p>Meeting Name : </p>
                    <span className="md:text-base text-sm font-normal">
                      {meetingDetails?.title}
                    </span>
                  </div>
                  <div className="py-1 group flex items-center gap-x-2 tracking-wide">
                    {/* <p className=" font-semibold">Time</p> : <AccessTime /> */}
                    <div className="md:flex py-2 md:py-0">
                      <p className="font-semibold text-sm md:text-base">
                        Meeting Start Dt :{" "}
                      </p>
                      {/* <AccessTime /> */}
                      <span className="text-sm md:text-base">{`${moment(
                        meetingDetails?.meetingDate
                      ).format("LL")},${moment(
                        meetingDetails?.meetingStartTime
                      ).format("LT")}`}</span>
                    </div>
                  </div>
                  <div className="md:flex py-2 md:py-0">
                    <p className="font-semibold text-sm md:text-base">
                      Meeting End Dt :{" "}
                    </p>
                    {/* <AccessTime /> */}
                    <span className="text-sm md:text-base">
                      {`${moment(meetingDetails?.meetingDate).format("LL")}, ${
                        meetingDetails?.meetingEndTime
                          ? moment(meetingDetails?.meetingEndTime).format("LT")
                          : "---"
                      }`}
                    </span>
                  </div>
                  <div className="py-1 group md:flex items-center gap-x-2 tracking-wide">
                    <p className="md:text-base text-sm font-semibold">
                      Client Name :
                    </p>
                    <span className="md:text-base text-sm">
                      {meetingDetails?.clientName}
                    </span>
                  </div>
                  <div className="py-1 group md:flex items-center gap-x-2 tracking-wide">
                    <p className="lg:text-base text-sm font-semibold">
                      Client Email :
                    </p>{" "}
                    <span className="md:text-base text-sm">
                      {meetingDetails?.clientEmail
                        ? meetingDetails?.clientEmail
                        : "---"}
                    </span>
                  </div>
                  <div className="py-1 group md:flex items-center gap-x-2 tracking-wide">
                    <p className=" font-semibold md:text-base text-sm">
                      Client Phone :
                    </p>
                    <span className="md:text-base text-sm">
                      {meetingDetails?.clientPhone
                        ? meetingDetails?.clientPhone
                        : "---"}
                    </span>
                  </div>

                  <div className="py-1 group md:flex items-center gap-x-2 tracking-wide">
                    <p className=" font-semibold md:text-base text-sm">
                      Members Visited :
                    </p>
                    <span className="md:text-base text-sm">
                      {meetingDetails?.meetingPersonName}
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-end">
                      <Button
                        variant="contained"
                        className="!bg-blue-500 "
                        size="small"
                        onClick={() => setTickets(true)}
                      >
                        View Notes
                      </Button>
                    </div>
                    {/* <p className="font-semibold pb-3">Documents :</p>
                    <div className="grid grid-cols-3 w-2/3 gap-6">
                      {meetingDetails?.docs.map((item: any, i: any) => {
                        return (
                          <Tooltip title="Click to Preview">
                            <div key={i} className="cursor-pointer">
                              <a
                                target="_blank"
                                className="cursor-pointer flex flex-col items-center justify-center"
                                href={`${item?.link}`}
                              >
                                <img
                                  className="w-12"
                                  src={
                                    item?.docType === "pdf"
                                      ? PDF.src
                                      : item?.docType === "img"
                                      ? IMG.src
                                      : DOC.src
                                  }
                                  alt=""
                                />

                                <p className="text-xs">{item?.title}</p>
                              </a>
                            </div>
                          </Tooltip>
                        );
                      })}
                    </div> */}
                  </div>
                </div>
              </div>
              <Grid item lg={7}>
                <div className="w-full h-full">
                  <iframe
                    className="w-full h-full"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.0498150250405!2d85.77649581162628!3d20.25676868112798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a19a740ae304117%3A0x629ce9db127f69ef!2sSearchingYard%20Software%20Group!5e0!3m2!1sen!2sin!4v1682685199057!5m2!1sen!2sin"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default MeetingData;
