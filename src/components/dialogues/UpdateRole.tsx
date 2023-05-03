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
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  id?: any;
}

const UpdateRole = ({ open, handleClose, mutate, id }: Props) => {
  const { data: roleData, isLoading } = useFetch<{ name: string }>(
    `roles/${id}`
  );
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: { name: `${roleData?.name ? roleData?.name : ""}` },
    enableReinitialize: true,
    validationSchema: yup.object({ name: yup.string().required("Required!") }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await change(`roles/${id}`, {
          method: "PATCH",
          body: values,
        });
        console.log(res);
        setLoading(false);
        if (res?.status !== 200) {
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
        Swal.fire(`Success`, `Updated Successfully!`, `success`);
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
          UPDATE ROLE
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
            {!isLoading && (
              <TextField
                fullWidth
                placeholder="Enter Role"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && !!formik.errors.name}
                helperText={formik.touched.name && formik.errors.name}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-emerald-500"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Check />}
            >
              UPDATE ROLE
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRole;
