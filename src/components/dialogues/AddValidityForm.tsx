import { Check, Close } from "@mui/icons-material";
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
import { useChange } from "hooks";
import Swal from "sweetalert2";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
  userId?: string | null;
  cardId?: string | null;
}

const AddValidity = ({ open, handleClose, mutate, userId, cardId }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: { start: "", end: "" },
    validationSchema: yup.object({ start: yup.string().required("Required!") }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await change(`cards/${cardId}`, {
          method: "PATCH",
          body: {
            validFrom: new Date(values?.start).toISOString(),
            validTill: new Date(values?.end).toISOString(),
            userId: userId,
            // guestId: "string",
          },
        });
        setLoading(false);
        if (res?.status !== 200) {
          Swal.fire(
            "Error",
            res?.results?.error?.message || "Something went wrong!",
            "error"
          );
          return;
        }
        Swal.fire("Success", "Guest assigned successfully!", "success");
        mutate();
        handleClose();
        return;
      } catch (err) {
        console.log(err);
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
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          ADD VALIDITY
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
        <div className="md:w-[22rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
            <h1>Starts From</h1>
            <TextField
              fullWidth
              placeholder="Start From"
              type="datetime-local"
              size="small"
              name="start"
              value={formik.values.start}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.start && !!formik.errors.start}
              helperText={formik.touched.start && formik.errors.start}
            />
            <h1>Ends At</h1>
            <TextField
              fullWidth
              placeholder="Ends At"
              type="datetime-local"
              size="small"
              name="end"
              value={formik.values.end}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.end && !!formik.errors.end}
              helperText={formik.touched.end && formik.errors.end}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-theme"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Check />}
            >
              SUBMIT
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddValidity;
