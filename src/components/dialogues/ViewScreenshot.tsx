import { Close } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DEFAULTIMG } from "assets/home";
import { useRouter } from "next/router";

interface Props {
  open?: any;
  handleClose?: any;
  link?: any;
}

const ViewScreenshot = ({ open, handleClose, link }: Props) => {
  const router = useRouter();
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "35rem !important" }}
      >
        <p className="text-center text-xl text-theme tracking-wide">
          Screenshot
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
        <div className="md:w-full w-full md:px-4 px-2 tracking-wide">
          <section>
            {link && (
              <img
                className="h-[20rem] object-contain"
                src={link ? link : DEFAULTIMG.src}
                alt="img"
              />
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewScreenshot;
