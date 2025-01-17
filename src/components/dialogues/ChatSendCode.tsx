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

const ChatSendCode = ({ open, handleClose, sendId }: Props) => {
  const [loading, setLoading] = useState(false);
  const [isCode, setIsCode] = useState<string | null>(null);
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

  const handleSend = async () => {
    if (isCode) {
      try {
        setLoading(true);

        if (currentChatProfileDetails?.isNewChat) {
          handleSendNewMessage({
            messageTo: currentChatProfileDetails?.id,
            message: isCode,
            category: "code",
          });
          handleClose();
          setLoading(false);
          setIsCode(null);
          socketRef?.emit("SENT_MESSAGE", {
            groupId: currentChatProfileDetails?.id,
            userId: user?.id,
          });
          revalidateCurrentChat(currentChatProfileDetails?.id);
          return;
        } else {
          const res = await change(`chat/message/${sendId}`, {
            body: {
              message: isCode,
              category: "code",
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
          setIsCode(null);
          return;
        }
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
        reValidateGroupChat();
        reValidatePrivateChat();
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
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-md font-bold text-theme tracking-wide">
          SEND CODE
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
            placeholder="Write code"
            multiline
            rows={10}
            value={isCode ? isCode : ""}
            onChange={(e: any) => setIsCode(e.target.value)}
          />
          <Button
            onClick={() => handleSend()}
            variant="contained"
            className="!bg-theme"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          >
            SEND CODE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSendCode;
