import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DEFAULTPROFILE } from "assets/home";
import { useFormik } from "formik";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import { uploadFile } from "utils";
import * as yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
}

const ChangeProfile = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: employData } = useFetch<User>(`users/${router?.query?.id}`);
  const { change } = useChange();
  const imgRef = useRef<any>();
  const formik = useFormik({
    initialValues: { photo: null },
    enableReinitialize: true,
    validationSchema: yup.object().shape({
      photo: yup
        .mixed()
        .test(
          "fileSize",
          "File size is too large",
          (value: any) => value && value.size <= 5000000
        )
        .test(
          "fileType",
          "Unsupported file format",
          (value: any) =>
            value &&
            ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
              value.type
            )
        ),
    }),
    onSubmit: async (values: any) => {
      setLoading(true);
      const uniId = new Date().getTime();
      try {
        const url = await uploadFile(values?.photo, `${uniId}.png`);
        console.log(url);
        const res = await change(`users/${router?.query?.id}`, {
          method: "PATCH",
          body: { photo: url },
        });
        mutate();
        setLoading(false);
        if (res.status !== 200) {
          Swal.fire(`Error`, "Something went wrong!", "error");
          return;
        }
        Swal.fire("Success", "Profile updated successfully!", "success");
        handleClose();
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
          UPDATE PICTURE
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
          <form
            onSubmit={formik.handleSubmit}
            className="flex justify-center py-6 flex-col gap-4 items-center"
          >
            <input
              name="photo"
              onChange={(e: any) => {
                formik.setFieldValue("photo", e.target.files[0]);
              }}
              className="hidden"
              type="file"
              ref={imgRef}
            />
            <div
              className="h-40 w-40 shadow-lg cursor-pointer overflow-hidden rounded-md"
              onClick={() => imgRef?.current?.click()}
            >
              {formik?.values?.photo ? (
                <img
                  className="h-full w-full object-cover"
                  src={URL.createObjectURL(formik?.values?.photo as any)}
                  alt="Preview"
                />
              ) : (
                <img
                  className="h-full w-full object-cover"
                  src={employData?.photo || DEFAULTPROFILE.src}
                  alt="Preview"
                />
              )}
            </div>
            {/* <ErrorMessage name="photo" /> */}
            {formik.errors.photo && (
              <p className="text-red-600">{formik.errors.photo}</p>
            )}
            <div className="">
              <Button
                // onClick={() => imgRef.current.click()}
                type="submit"
                className="!bg-theme"
                variant="contained"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Check />}
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangeProfile;
