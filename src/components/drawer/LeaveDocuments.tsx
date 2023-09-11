import { makeStyles } from "@material-ui/core";
import { Close, Info } from "@mui/icons-material";
import { Container, Drawer, IconButton, Tooltip } from "@mui/material";
import { CHATDOC, PDF } from "assets/home";
import { PhotoViewer } from "components/core";
import { DocPreview } from "components/dialogues";
import { useAuth } from "hooks";
import moment from "moment";
import { useState } from "react";
import { downloadFile } from "utils";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  data?: any;
};
const useStyles = makeStyles((theme) => ({
  container: {
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "50vw",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "80vw",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "30vw",
    },
  },
}));

const LeaveDocuments = ({ open, onClose, data }: Props) => {
  const { user } = useAuth();
  const classes = useStyles();
  const [isPreview, setIsPreview] = useState<{
    dialogue?: boolean;
    title?: string;
  }>({
    dialogue: false,
    title: "Preview",
  });
  return (
    <>
      <DocPreview
        open={isPreview?.dialogue}
        handleClose={() => setIsPreview({ dialogue: false })}
        title={isPreview?.title}
      />
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container style={{ marginTop: "1rem" }} className={classes.container}>
          <div className="flex justify-between">
            <h1 className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
              <Info />
              Leave Details
            </h1>
            <IconButton onClick={() => onClose()}>
              <Close fontSize="small" className="text-red-500" />
            </IconButton>
          </div>
          <div>
            <h1 className="font-semibold mt-4">Leave Type</h1>
            <h2 className="text-gray-600">{data?.type}</h2>
            <h1 className="font-semibold mt-4">Paid Leave</h1>
            <h2 className="text-gray-600">
              {data?.isPaidLeave ? "Yes" : "No"}
            </h2>
            <h1 className="font-semibold mt-4">Sandwich Leave</h1>
            <h2 className="text-gray-600">
              {data?.isSandWitch ? "Yes" : "No"}
            </h2>
            <h1 className="font-semibold mt-4">Leave Variant</h1>
            <h2 className="text-gray-600">{data?.variant}</h2>
            {data?.status === "Approved" ? (
              <>
                <h1 className="font-semibold mt-4">Total Paid Leave</h1>
                <h2 className="text-gray-600">
                  {data?.paidLeaveCount ? data?.paidLeaveCount : 0}
                </h2>
                <h1 className="font-semibold mt-4">Total Unpaid Leave</h1>
                <h2 className="text-gray-600">
                  {data?.unpaidLeaveCount ? data?.unpaidLeaveCount : 0}
                </h2>
              </>
            ) : null}

            {user?.role?.name === "PROJECT MANAGER" ? null : (
              <>
                <h1 className="font-semibold mt-4">
                  Leave Casual Credit Remaining
                </h1>
                <h2 className="text-gray-600">{data?.casualCreditRemaining}</h2>
                <h1 className="font-semibold mt-4">
                  Sick Leave Credit Remaining
                </h1>
                <h2 className="text-gray-600">{data?.sickCreditRemaining}</h2>
                <h1 className="font-semibold mt-4">Total Approved Leave</h1>
                <h2 className="text-gray-600">{data?.totalLeaveThisMonth}</h2>
                <h1 className="font-semibold mt-4">Total Leave This Year</h1>
                <h2 className="text-gray-600">{data?.totalLeaveThisYear}</h2>
              </>
            )}
            {data?.variant === "MultipleDays" ? (
              <>
                <h1 className="font-semibold mt-4">Starts From</h1>
                <h2 className="text-gray-600 tracking-wide">
                  {moment(data?.startDate).format("ll")}
                </h2>
                <h1 className="font-semibold mt-4">Ends At</h1>
                <h2 className="text-gray-600 tracking-wide">
                  {moment.utc(data?.endDate).format("ll")}
                </h2>
              </>
            ) : (
              <>
                <h1 className="font-semibold mt-4">Leave On</h1>
                <h2 className="text-gray-600 tracking-wide">
                  {moment(data?.startDate).format("ll")}
                </h2>
              </>
            )}

            <h1 className="font-semibold mt-4">Reason </h1>
            {data?.reason ? (
              <p className="tracking-wide">{data?.reason}</p>
            ) : (
              <p className="tracking-wide">Not specified.</p>
            )}
          </div>
          <h1 className="font-semibold my-4">Documents </h1>
          <div className="flex w-full">
            <div className="flex gap-2 flex-wrap">
              {data?.docs?.length ? (
                data?.docs?.map((item: any) => (
                  <Tooltip key={item?.id} title="Click to download">
                    <div
                      onClick={() =>
                        downloadFile(
                          item?.link,
                          item?.link?.split("/")?.at(-1) as any
                        )
                      }
                      key={item?.id}
                      className="h-28 w-28 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
                    >
                      <img
                        className="h-12 object-contain"
                        src={CHATDOC.src}
                        alt="photo"
                      />
                      <p className="text-xs">file</p>
                    </div>
                  </Tooltip>
                ))
              ) : (
                <p>No documents Uploaded</p>
              )}
            </div>
          </div>
          <div className="pb-8">
            <h1 className="mt-4 font-semibold">Request Status</h1>
            {data?.requests?.length || data?.approvedBy ? (
              <>
                {data?.requests?.map((item: any) => (
                  <div
                    key={item?.id}
                    className="w-full mt-4 border-[1px]  rounded-md p-4 text-sm"
                  >
                    <div className="flex gap-4">
                      <div>
                        <PhotoViewer
                          name={item?.approvedBy?.name}
                          photo={item?.approvedBy?.photo}
                          size="5rem"
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold">
                          {" "}
                          {item?.approvedBy?.name}
                        </h1>
                        <h1 className="break-all">
                          {" "}
                          {item?.approvedBy?.username}
                        </h1>
                        <h1 className="py-2">
                          Status :{" "}
                          <span
                            className={`px-2 py-1 rounded-lg text-white ${
                              item?.status === `Pending`
                                ? `bg-yellow-500`
                                : item?.status === `Approved`
                                ? `bg-green-500`
                                : `bg-red-500`
                            }`}
                          >
                            {item?.status}
                          </span>
                        </h1>
                      </div>
                    </div>
                  </div>
                ))}
                {data?.approvedBy ? (
                  <>
                    <div className="w-full mt-4 border-[1px]  rounded-md p-4 text-sm">
                      <div className="flex gap-4">
                        <div>
                          <PhotoViewer
                            name={data?.approvedBy?.name}
                            photo={data?.approvedBy?.photo}
                            size="5rem"
                          />
                        </div>
                        <div>
                          <h1 className="font-semibold">
                            {" "}
                            {data?.approvedBy?.name}
                          </h1>
                          <h1> {data?.approvedBy?.role}</h1>
                          <h1 className="py-2">
                            Status :{" "}
                            <span
                              className={`px-2 py-1 rounded-lg text-white ${
                                data?.status === `Pending`
                                  ? `bg-yellow-500`
                                  : data?.status === `Approved`
                                  ? `bg-green-500`
                                  : `bg-red-500`
                              }`}
                            >
                              {data?.status}
                            </span>
                          </h1>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <p className="mt-4">No members approved yet!</p>
            )}
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default LeaveDocuments;
