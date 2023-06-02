import { FileDownload } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import { DEFAULTIMG } from "assets/home";
import moment from "moment";
import * as React from "react";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  open?: any;
  handleClose?: () => void;
  imageData?: any;
}

const ChatImagePreview = ({ open, handleClose, imageData }: Props) => {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <span>{imageData?.sender?.name}</span>,
              <span> {moment(imageData?.createdAt).format("ll")}</span>
            </div>
            <Button
              variant="contained"
              autoFocus
              className="!bg-emerald-600"
              onClick={handleClose}
              startIcon={<FileDownload />}
            >
              DOWNLOAD
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <section className="h-[90vh] w-full flex justify-center items-center">
        <img
          className="h-[70vh] object-contain"
          src={imageData?.link ? imageData?.link : DEFAULTIMG.src}
          alt=""
        />
      </section>
    </Dialog>
  );
};

export default ChatImagePreview;
