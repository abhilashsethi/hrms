import { Close, Send } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { useFormik } from "formik";
import { useChange, useChatData } from "hooks";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";

interface Props {
  open?: any;
  handleClose?: any;
  sendId?: string;
}

const ChatSendLink = ({ open, handleClose, sendId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isLink, setIsLink] = useState<string | null>(null);
  const { change } = useChange();

  const { handleSendNewMessage, currentChatProfileDetails } = useChatData();

  const handleSend = async () => {
    if (isLink) {
      try {
        setLoading(true);
        if (currentChatProfileDetails?.isNewChat) {
          handleSendNewMessage({
            messageTo: currentChatProfileDetails?.id,
            message: isLink,
            category: "link",
          });
          handleClose();
          setLoading(false);
          setIsLink(null);
          return;
        } else {
          const res = await change(`chat/message/${sendId}`, {
            body: {
              message: isLink,
              category: "link",
            },
          });
          if (res?.status !== 200) {
            Swal.fire(
              "Error",
              res?.results?.msg || "Something went wrong!",
              "error"
            );
            setLoading(false);
            return;
          }
          Swal.fire(`Success`, `Link sent successfully!`, `success`);
          setLoading(false);
          handleClose();
          setIsLink(null);
          return;
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <Dialog
      onClose={() => {
        handleClose();
      }}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "27rem !important" }}
      >
        <p className="text-center text-md font-bold text-theme tracking-wide">
          SEND LINK
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
      <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
        <div className="md:w-[27rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2">
          <TextField
            fullWidth
            placeholder="InsertLink"
            value={isLink ? isLink : ""}
            onChange={(e: any) => setIsLink(e.target.value)}
          />
          <Button
            onClick={() => handleSend()}
            variant="contained"
            className="!bg-theme"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          >
            SEND
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSendLink;
