import { Close, Info } from "@mui/icons-material";
import { Container, Drawer, IconButton, Tooltip } from "@mui/material";
import { PDF } from "assets/home";
import { DocPreview } from "components/dialogues";
import moment from "moment";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { useFetch } from "hooks";

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
  const { data: myData } = useFetch(`leaves/${data?.id}`);
  console.log(myData);

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
              {docs?.map((item) => (
                <Tooltip title="Click to preview">
                  <div
                    onClick={() =>
                      setIsPreview({ dialogue: true, title: item?.title })
                    }
                    key={item?.id}
                    className="h-28 w-28 border-2 rounded-md flex flex-col gap-2 items-center justify-center cursor-pointer hover:bg-slate-200 transition-all ease-in-out duration-200"
                  >
                    <img className="w-12" src={item?.img} alt="photo" />
                    <p className="text-xs">
                      {item?.title?.slice(0, 9)}
                      {item?.title?.length > 9 ? "..." : null}
                    </p>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
          <div>
            <h1 className="mt-4 font-semibold">Approved By</h1>
            <p className="mt-2">No Members approved.</p>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default LeaveDocuments;

const docs = [{ id: 1, title: "Doc 53426", img: PDF.src }];
