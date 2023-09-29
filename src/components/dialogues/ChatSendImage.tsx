import { Close, CloudUpload, PermMedia, Send } from "@mui/icons-material";
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
import { uploadFile } from "utils";
import * as yup from "yup";

interface Props {
  open?: any;
  handleClose?: any;
  sendId?: string;
}

const ChatSendImage = ({ open, handleClose, sendId }: Props) => {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<any>();
  const [isFile, setIsFile] = useState<any>(null);
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

  const formik = useFormik({
    initialValues: { image: [], message: "" },
    validationSchema: yup.object().shape({
      image: yup
        .mixed()
        .required("Please select an image")
        .test(
          "fileType",
          "Only image files are allowed",
          (value: any) =>
            value?.length &&
            Array.from(value)?.every((item: any) =>
              item?.type?.startsWith("image/")
            )
        ),
    }),
    onSubmit: async (values: any) => {
      if (values?.image) {
        try {
          setLoading(true);
          await Promise.all(
            Array.from(values?.image)?.map(
              (element: any, index: number) =>
                new Promise(async (resolve, reject) => {
                  try {
                    const dtype = element?.type.split("/")[1];
                    const url = await uploadFile(
                      element,
                      `${Date.now()}.${dtype}`
                    );
                    if (currentChatProfileDetails?.isNewChat) {
                      handleSendNewMessage({
                        messageTo: currentChatProfileDetails?.id,
                        message: (index === 0 && values?.message) || undefined,
                        category: "image",
                        link: url,
                      });
                      resolve(true);
                    } else {
                      const res = await change(`chat/message/${sendId}`, {
                        body: {
                          link: url,
                          category: "image",
                          message:
                            (index === 0 && values?.message) || undefined,
                        },
                      });
                      if (res?.status !== 200) {
                        Swal.fire(`Error`, "Something went wrong!", "error");
                        return resolve(true);
                      }

                      resolve(true);
                    }
                  } catch (error) {
                    resolve(true);
                  }
                })
            )
          );

          formik.resetForm();
          handleClose();
          setLoading(false);
          socketRef?.emit("SENT_MESSAGE", {
            groupId: currentChatProfileDetails?.id,
            userId: user?.id,
          });
          revalidateCurrentChat(currentChatProfileDetails?.id);
        } catch (error) {
          setLoading(false);
        } finally {
          setLoading(false);
          reValidateGroupChat();
          reValidatePrivateChat();
          setIsFile(null);
        }
      }
    },
  });

  return (
    <Dialog
      onClose={() => {
        formik.resetForm();
        handleClose();
        setIsFile(null);
      }}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-md font-bold text-theme tracking-wide">
          UPLOAD IMAGE
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
        <form
          onSubmit={formik.handleSubmit}
          className="md:w-[27rem] w-full md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2"
        >
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            multiple
            onChange={(e: any) => {
              formik.setFieldValue("image", e?.target?.files);
              setIsFile(e?.target?.files);
            }}
          />
          <div
            onClick={() => fileRef?.current?.click()}
            className="min-h-[10rem] py-4 w-full cursor-pointer border-2 rounded-lg border-dashed border-theme-200 flex flex-col gap-2 items-center justify-center"
          >
            {formik?.values?.image?.length === 1 ? (
              <img
                className="h-32 object-contain"
                src={URL.createObjectURL(formik?.values?.image[0])}
                alt=""
              />
            ) : formik?.values?.image?.length > 1 ? (
              <PermMedia fontSize="large" />
            ) : (
              <CloudUpload fontSize="large" />
            )}

            {!isFile && <p>Upload file.</p>}
            {isFile?.length &&
              Array.from(isFile)
                ?.map((item: any) => item?.name)
                ?.join(", ")}
            <span className="text-red-500">
              {formik?.errors?.image && formik?.errors?.image?.toString()}
            </span>
          </div>
          <TextField
            fullWidth
            placeholder="Type message here"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && !!formik.errors.message}
            helperText={
              formik.touched.message && (formik.errors.message as any)
            }
          />
          <Button
            type="submit"
            variant="contained"
            className="!bg-theme"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Send />}
          >
            SEND FILE
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatSendImage;
