import { makeStyles } from "@material-ui/core";
import { Close, Info } from "@mui/icons-material";
import { Container, Drawer, IconButton, Tooltip } from "@mui/material";
import { CHATDOC, PDF } from "assets/home";
import { DocPreview } from "components/dialogues";
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
  const classes = useStyles();
  const [isPreview, setIsPreview] = useState<{
    dialogue?: boolean;
    title?: string;
  }>({
    dialogue: false,
    title: "Preview",
  });
  // const { data: myData } = useFetch(`leaves/${data?.id}`);
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
            {/* <h1 className="font-semibold">Team Manager</h1>
            <div className="h-20 w-full mt-2 flex gap-4 items-center">
              <PhotoViewer name="Srinu Reddy" />
              <div>
                <h2 className="font-semibold tracking-wide">Srinu Reddy</h2>
                <h2 className="text-gray-600">Developer</h2>
              </div>
            </div> */}
            <h1 className="font-semibold mt-4">Leave Type</h1>
            <h2 className="text-gray-600">{data?.type}</h2>
            {data?.variant === "MultipleDays" ? (
              <>
                <h1 className="font-semibold mt-4">Starts From</h1>
                <h2 className="text-gray-600 tracking-wide">
                  {moment(data?.startDate).format("ll")}
                </h2>
                <h1 className="font-semibold mt-4">Ends At</h1>
                <h2 className="text-gray-600 tracking-wide">
                  {moment(data?.endDate).format("ll")}
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
                  <Tooltip title="Click to download">
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
            <h1 className="mt-4 font-semibold">Approved By</h1>
            {data?.approvedBy?.name ? (
              <div className="w-full mt-4 border-[1px]  rounded-md p-4 text-sm">
                <h1 className="font-semibold"> {data?.approvedBy?.name}</h1>
                <h1> {data?.approvedBy?.role}</h1>
                <h1>
                  Approved on :{" "}
                  {moment(data?.approvedBy?.createdAt).format("lll")}
                </h1>
              </div>
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

const docs = [{ id: 1, title: "Doc 53426", img: PDF.src }];
