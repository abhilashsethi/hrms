import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { useFormik } from "formik";
import { useRef } from "react";
import * as yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
}

const ChangeProfile = ({ open, handleClose }: Props) => {
  const imgRef = useRef<any>();
  const formik = useFormik({
    initialValues: { photo: "" },
    validationSchema: yup.object({ photo: yup.string().required("Required!") }),
    onSubmit: async (values) => {
      console.log(values);
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
          PROFILE PICTURE
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
        <div className="md:w-[25rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <form className="flex justify-center py-6 flex-col gap-4 items-center">
            <input className="hidden" type="file" ref={imgRef} />
            <div className="h-40 w-40 shadow-lg">
              <img
                className="h-full object-cover"
                src={DEFAULTPROFILE.src}
                alt="imagefile"
              />
            </div>
            <div className="">
              <Button
                onClick={() => imgRef.current.click()}
                className="!bg-theme"
                variant="contained"
              >
                CHANGE PROFILE
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeProfile;
