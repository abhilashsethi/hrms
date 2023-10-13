import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { Announcement } from "types";
interface Props {
  open: boolean;
  handleClose: () => void;
  notificationMsg?: Announcement;
}

const AnnouncementData = ({ open, handleClose, notificationMsg }: Props) => {
  console.log(notificationMsg);
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
          {notificationMsg?.isAll ? (
            <>
              <div className="py-1">
                <span className="text-lg font-semibold px-1">
                  This announcement send to all{" "}
                </span>
              </div>
            </>
          ) : (
            <>
              {notificationMsg?.departmentName ? (
                <div className="py-1">
                  <span className="text-lg font-semibold px-1">
                    Department:{" "}
                  </span>
                  <span className="">
                    {notificationMsg?.departmentName
                      ? notificationMsg?.departmentName
                      : "---"}
                  </span>
                </div>
              ) : null}
              {notificationMsg?.roleName ? (
                <div className="py-1">
                  <span className="text-lg font-semibold px-1">Role: </span>
                  <span className="">
                    {notificationMsg?.roleName
                      ? notificationMsg?.roleName
                      : "---"}
                  </span>
                </div>
              ) : null}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnnouncementData;
