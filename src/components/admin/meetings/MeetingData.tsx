import { BorderColor, LocationOn } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Loader, LocationLoaderAnime } from "components/core";
import EditMeetingDetails from "components/dialogues/EditMeetingDetails";
import { ViewNotesDrawer } from "components/drawer";
import { useAuth, useFetch } from "hooks";
import moment from "moment";
import GoogleMapReact from "google-map-react";
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
  const AnyReactComponent = ({ icon }: any) => <div>{icon}</div>;

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
                        Meeting Date :{" "}
                      </p>
                      {/* <AccessTime /> */}
                      <span className="text-sm md:text-base">{`${moment(
                        meetingDetails?.meetingDate
                      ).format("DD/MM/YYYY")}`}</span>
                    </div>
                  </div>
                  <div className="md:flex py-2 md:py-0">
                    <p className="font-semibold text-sm md:text-base">
                      Meeting Start time :{" "}
                    </p>
                    {/* <AccessTime /> */}
                    <span className="text-sm md:text-base">{`${meetingDetails?.meetingStartTime}`}</span>
                  </div>
                  <div className="md:flex py-2 md:py-0">
                    <p className="font-semibold text-sm md:text-base">
                      Meeting End time :{" "}
                    </p>
                    {/* <AccessTime /> */}
                    <span className="text-sm md:text-base">{`${meetingDetails?.meetingEndTime}`}</span>
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
                  </div>
                </div>
              </div>
              <Grid item lg={7}>
                <div className="w-full h-full">
                  {meetingDetails?.lat && meetingDetails?.lng ? (
                    <div style={{ height: "250px", width: "100%" }}>
                      <GoogleMapReact
                        bootstrapURLKeys={{
                          key: "AIzaSyAIoFnxvF-KrCNFgP3-_LcTnBSAuQ3iqfA",
                        }}
                        defaultCenter={{
                          lat: meetingDetails?.lat,
                          lng: meetingDetails?.lng,
                        }}
                        defaultZoom={15}
                      >
                        <AnyReactComponent
                          icon={
                            <LocationOn className="!text-red-600 h-10 w-10" />
                          }
                        />
                      </GoogleMapReact>
                    </div>
                  ) : (
                    <LocationLoaderAnime />
                  )}
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
