import { Check, Close, Email } from "@mui/icons-material";
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
import * as yup from "yup";
import { useState } from "react";
import { useAuth, useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { User } from "types";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
}

const UseTemplate = ({ open, handleClose, mutate }: Props) => {
  const router = useRouter();
  const { user } = useAuth();
  const { data: userData } = useFetch<User>(`users/${router?.query?.empId}`);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: { subject: "" },
    validationSchema: yup.object({
      subject: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      return;
      setLoading(true);
      try {
        const res = await change(`roles`, { body: values });
        setLoading(false);
        if (res?.status !== 201) {
          Swal.fire(
            "Error",
            res?.results?.msg || "Something went wrong!",
            "error"
          );
          setLoading(false);
          return;
        }
        mutate();
        handleClose();
        Swal.fire(`Success`, `Created Successfully!`, `success`);
        formik.resetForm();
        return;
      } catch (error) {
        // if (error instanceof Error) {
        //   Swal.fire(`Error`, error?.message, `error`);
        // } else {
        //   Swal.fire(`Error`, "Something Went Wrong", `error`);
        // }
        setLoading(false);
      } finally {
        setLoading(false);
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
        sx={{ minWidth: "18rem !important" }}
      >
        <div className="flex justify-center">
          <h1 className="text-center text-lg font-bold text-theme tracking-wide flex gap-2 items-center">
            <Email /> SEND EMAIL
          </h1>
        </div>
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
        <div className="md:w-[22rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <div className="mb-4">
            <h1 className="font-semibold">Send to</h1>
            <span className="">{userData?.email}</span>
            <h1 className="font-semibold mt-4">From</h1>
            <span className="">{user?.email}</span>
          </div>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <div>
              <h1 className="font-semibold mb-4">Enter Subject</h1>
              <TextField
                size="small"
                fullWidth
                placeholder="Enter Subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.subject && !!formik.errors.subject}
                helperText={formik.touched.subject && formik.errors.subject}
              />
            </div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-theme"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Email />}
            >
              SEND MAIL
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UseTemplate;
