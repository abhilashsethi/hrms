import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { NotificationData } from "types";
interface Props {
  open: boolean;
  handleClose: () => void;
  notificationMsg?: NotificationData;
}

const NotificationInfo = ({ open, handleClose, notificationMsg }: Props) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle id="customized-dialog-title" sx={{ p: 2 }}>
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          DETAIL
        </p>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            top: 10,
            right: 10,
            position: "absolute",
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Tooltip title="Close">
            <Close />
          </Tooltip>
        </IconButton>
      </DialogTitle>
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        <div className="md:w-[40rem] w-[72vw] md:px-4 px-2 text-justify">
          <div className="py-1">
            <span className="text-lg font-semibold px-1">Title: </span>
            <span>{notificationMsg?.title}</span>
          </div>
          <div className="py-1">
            <span className="text-lg font-semibold px-1">Description: </span>
            <span className="">{notificationMsg?.description}</span>
          </div>
          <div className="py-1">
            <span className="text-lg font-semibold px-1">Sent At: </span>
            <span className="">
              {notificationMsg?.createdAt
                ? moment(notificationMsg?.createdAt).format("LLL")
                : "---"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationInfo;
const variants = [
  { id: 1, value: "FirstHalf" },
  { id: 2, value: "SecondHalf" },
];
const types = [
  { id: 1, value: "Casual" },
  { id: 2, value: "Sick" },
];
