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
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
}

const CreateDepartment = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: yup.object({
      name: yup
        .string()
        .required("Required!")
        .test("is-uppercase", "Must contain only capital letters", (value) => {
          return /^[A-Z]+$/.test(value);
        }),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await change(`departments`, { body: values });
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
        console.log(error);
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
          CREATE DEPARTMENT
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
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
            <TextField
              fullWidth
              placeholder="Enter Department"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-theme"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Check />}
            >
              CREATE DEPARTMENT
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDepartment;
