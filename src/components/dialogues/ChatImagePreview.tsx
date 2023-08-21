import { FileDownload } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import { TransitionProps } from "@mui/material/transitions";
import { downloadFile } from "utils";
import { forwardRef } from "react";
import Link from "next/link";

const Transition = forwardRef(function Transition(
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
  activePreview: string;
}

const ChatImagePreview = ({ open, handleClose, activePreview }: Props) => {
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
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {activePreview?.split("/")?.at(-1)}
          </Typography>
          <Link href={activePreview} target="_blank">
            <Button
              variant="contained"
              autoFocus
              className="!bg-emerald-600"
              startIcon={<FileDownload />}
            >
              DOWNLOAD
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <section className="h-[90vh] w-full flex justify-center items-center">
        <img className="h-[70vh] object-contain" src={activePreview} alt="" />
      </section>
    </Dialog>
  );
};

export default ChatImagePreview;
