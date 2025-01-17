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
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
  chatData?: any;
  activeProfile?: any;
}

const ChatReply = ({
  open,
  handleClose,
  mutate,
  chatData,
  activeProfile,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { socketRef } = useSocket();
  const { revalidateCurrentChat } = useChatData();
  const { user } = useAuth();
  const formik = useFormik({
    initialValues: { reply: "" },
    validationSchema: yup.object({ reply: yup.string().required("Required!") }),
    onSubmit: async (values) => {
      setLoading(true);
      if (values?.reply) {
        try {
          setLoading(true);
          const res = await change(`chat/message/${activeProfile?.id}`, {
            body: {
              message: values?.reply,
              category: "text",
              replyTo: chatData?.id,
            },
          });
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          socketRef?.emit("REFETCH_DATA", {
            groupId: activeProfile?.id,
            userId: user?.id,
          });
          revalidateCurrentChat(activeProfile?.id);

          setLoading(false);
          handleClose();
          return;
        } catch (error) {
          if (error instanceof Error) {
            Swal.fire(`Error`, error?.message, `error`);
          } else {
            Swal.fire(`Error`, "Something Went Wrong", `error`);
          }
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    },
  });

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          Reply
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
        <div className="md:w-[30rem] w-[72vw] md:px-4 px-2 tracking-wide">
          {chatData?.category === "text" ? (
            <div className="w-full bg-blue-100 p-2 tracking-wide text-sm rounded-md">
              <p>{chatData?.text}</p>
            </div>
          ) : null}
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4 mt-4"
          >
            <div className="flex gap-2">
              <div className="w-[90%]">
                <TextField
                  fullWidth
                  placeholder="Reply"
                  size="small"
                  name="reply"
                  value={formik.values.reply}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.reply && !!formik.errors.reply}
                  helperText={formik.touched.reply && formik.errors.reply}
                />
              </div>
              <div className="w-[10%]">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-4 py-[0.5rem] flex justify-center rounded-md text-white items-center bg-theme"
                >
                  {loading ? <CircularProgress size={20} /> : <Send />}
                </button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatReply;
