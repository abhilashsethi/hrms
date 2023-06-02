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
import { useChange, useChatData } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";

interface Props {
  open: any;
  handleClose: any;
}

const ChatDescription = ({ open, handleClose }: Props) => {
  const { currentChatProfileDetails, revalidateChatProfileDetails } =
    useChatData();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const formik = useFormik({
    initialValues: {
      description: currentChatProfileDetails?.description || "",
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      description: yup.string().required("Required!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await change(`chat/${currentChatProfileDetails?.id}`, {
          method: "PATCH",
          body: values,
        });
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
        currentChatProfileDetails?.id &&
          revalidateChatProfileDetails(currentChatProfileDetails?.id);
        handleClose();
        Swal.fire(`Success`, `Updated Successfully!`, `success`);
        return;
      } catch (error) {
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
          UPDATE DESCRIPTION
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
              multiline
              rows={4}
              placeholder="Group Decsription"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && !!formik.errors.description}
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="!bg-emerald-500"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : <Check />}
            >
              UPDATE
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDescription;
