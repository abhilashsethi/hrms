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
import { Check, Close, CloudUpload, Send, Upload } from "@mui/icons-material";
import { useRef, useState } from "react";
import { ErrorMessage, useFormik } from "formik";
import * as yup from "yup";
import { useChange } from "hooks";
import { uploadFile } from "utils";
import Swal from "sweetalert2";

interface Props {
  open?: any;
  handleClose?: any;
  sendId?: string;
}

const ChatSendFiles = ({ open, handleClose, sendId }: Props) => {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<any>();
  const [isFile, setIsFile] = useState<any>(null);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: { image: null, message: "" },
    validationSchema: yup.object().shape({
      image: yup
        .mixed()
        .required("Please select an image")
        .test(
          "fileType",
          "Only image files are allowed",
          (value: any) => value && value.type.startsWith("image/")
        ),
    }),
    onSubmit: async (values: any) => {
      if (values?.image) {
        try {
          setLoading(true);
          const dtype = values?.image?.type.split("/")[1];
          const url = await uploadFile(values?.image, `${Date.now()}.${dtype}`);
          const res = await change(`chat/message/${sendId}`, {
            body: {
              link: url,
              category: "image",
              message: values?.message,
            },
          });
          if (res?.status !== 200) {
            Swal.fire(`Error`, "Something went wrong!", "error");
            return;
          }
          Swal.fire(`Success`, "Sent Sccessfully!", "success");
          handleClose();
          setLoading(false);
          formik.resetForm();
          return;
        } catch (error) {
          console.log(error);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      }
    },
  });
  return (
    <Dialog
      onClose={() => {
        handleClose();
        setIsFile(null);
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
          UPLOAD FILE
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
          className="md:w-[27rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2"
        >
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={(e: any) => {
              formik.setFieldValue("image", e?.target?.files[0]);
              setIsFile(e?.target?.files[0]);
            }}
          />
          <div
            onClick={() => fileRef?.current?.click()}
            className="min-h-[10rem] py-4 w-full cursor-pointer border-2 rounded-lg border-dashed border-theme-200 flex flex-col gap-2 items-center justify-center"
          >
            {formik?.values?.image ? (
              <img
                className="h-32 object-contain"
                src={URL.createObjectURL(formik?.values?.image)}
                alt=""
              />
            ) : (
              <CloudUpload fontSize="large" />
            )}

            {!isFile && <p>Upload file.</p>}
            {isFile && isFile?.name}
            {formik.errors?.image && formik?.errors?.image}
          </div>
          <TextField
            fullWidth
            placeholder="Type message here"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.message && !!formik.errors.message}
            helperText={formik.touched.message && formik.errors.message}
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

export default ChatSendFiles;
