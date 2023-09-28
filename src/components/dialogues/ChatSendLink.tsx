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
import { useAuth, useChange, useChatData, useSocket } from "hooks";
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
  const [isError, setIsError] = useState(false);
  const { change } = useChange();

  const {
    handleSendNewMessage,
    currentChatProfileDetails,
    revalidateCurrentChat,
    reValidateGroupChat,
    reValidatePrivateChat,
  } = useChatData();

  const { socketRef } = useSocket();
  const { user } = useAuth();

  const handleSubmit = () => {
    if (
      isLink
        ?.trim()
        ?.match(
          "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
        )
    ) {
      setIsError(false);
      handleSend();
      return;
    }
    setIsError(true);
  };

  const handleSend = async () => {
    if (isError || !isLink?.trim()) return;
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
        socketRef?.emit("SENT_MESSAGE", {
          groupId: currentChatProfileDetails?.id,
          userId: user?.id,
        });
        revalidateCurrentChat(currentChatProfileDetails?.id);
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
        socketRef?.emit("SENT_MESSAGE", {
          groupId: currentChatProfileDetails?.id,
          userId: user?.id,
        });
        revalidateCurrentChat(currentChatProfileDetails?.id);
        setLoading(false);
        handleClose();
        setIsLink(null);
        return;
      }
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
      reValidateGroupChat();
      reValidatePrivateChat();
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
      <DialogTitle id="customized-dialog-title">
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
        <div className="md:w-[27rem] w-full md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2">
          <TextField
            fullWidth
            placeholder="Insert Link"
            value={isLink ? isLink : ""}
            onChange={(e: any) => setIsLink(e.target.value)}
            error={isError}
            helperText={isError ? "Enter a valid link" : ""}
          />
          <Button
            onClick={() => handleSubmit()}
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
