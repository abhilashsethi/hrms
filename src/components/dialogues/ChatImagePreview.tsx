import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { FileDownload } from "@mui/icons-material";

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
}

const ChatImagePreview = ({ open, handleClose }: Props) => {
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
            imgwallpaper.png
          </Typography>
          <Button
            variant="contained"
            autoFocus
            className="!bg-emerald-600"
            onClick={handleClose}
            startIcon={<FileDownload />}
          >
            DOWNLOAD
          </Button>
        </Toolbar>
      </AppBar>
      <section className="h-[90vh] w-full flex justify-center items-center">
        <img
          className="h-[70vh] object-contain"
          src="https://w0.peakpx.com/wallpaper/1008/1001/HD-wallpaper-tiger-black-look-thumbnail.jpg"
          alt=""
        />
      </section>
    </Dialog>
  );
};

export default ChatImagePreview;
