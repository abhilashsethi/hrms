import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Check, Close, CloudUpload, Upload } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

interface Props {
  open?: any;
  handleClose?: () => void;
}

const UploadEmployData = ({ open, handleClose }: Props) => {
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
      onClose={handleClose}
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "27rem !important" }}
      >
        <p className="text-center text-md font-bold text-theme tracking-wide">
          UPLOAD EMPLOYEES DATA
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
          <input
            type="file"
            className="hidden"
            ref={fileRef}
            onChange={(e: any) => {
              formik.setFieldValue("file", e?.target?.files[0]);
              setIsFile(e?.target?.files[0]);
            }}
          />
          <div
            onClick={() => fileRef?.current?.click()}
            className="h-40 w-full cursor-pointer border-2 rounded-lg border-dashed border-theme-200 flex flex-col gap-2 items-center justify-center"
          >
            <CloudUpload fontSize="large" />
            {!isFile && <p>Upload employees data.</p>}
            {isFile && isFile?.name}
          </div>
          <Button
            variant="contained"
            className="!bg-theme"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Check />}
          >
            SUBMIT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadEmployData;
