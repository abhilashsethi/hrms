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
import { useRef, useState } from "react";
import * as yup from "yup";

interface Props {
  open?: any;
  handleClose?: any;
}

const ChatSendCode = ({ open, handleClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<any>();
  const [isFile, setIsFile] = useState<any>(null);
  const formik = useFormik({
    initialValues: { file: null },
    validationSchema: yup.object().shape({
      file: yup.mixed().required("A file is required!"),
    }),
    onSubmit: async (values) => {
      console.log(values);
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
        <div className="md:w-[27rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2">
          <TextField placeholder="Write code" multiline rows={10} />
          <Button
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
