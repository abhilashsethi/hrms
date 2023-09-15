import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useChange } from "hooks";
import Swal from "sweetalert2";
import { SingleImageUpload } from "components/core";
import { uploadFile } from "utils";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
  resetForm?: any;
}
const initialValues = {
  name: "",
  image: null,
};
const validationSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  image: yup
    .mixed()
    .required("Image is required!")
    .test("fileSize", "Image size is too large", (value: any) => {
      if (value) {
        const maxSize = 300 * 1024; // Maximum size in bytes (300KB)
        return value.size <= maxSize;
      }
      return true;
    })
    .test("fileType", "Invalid file type", (value: any) => {
      if (value) {
        const supportedFormats = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/svg+xml",
        ];
        return supportedFormats.includes(value.type);
      }
      return true;
    }),
});
const CreateTechnology = ({ open, handleClose, mutate, resetForm }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const uniId = values?.image?.type.split("/")[1].split("+")[0];
    try {
      const url = await uploadFile(values?.image, `${Date.now()}.${uniId}`);
      const name = values.name;
      const res = await change(`technologies`, {
        body: { logo: url, name: name.charAt(0).toUpperCase() + name.slice(1) },
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
      mutate();
      handleClose();
      Swal.fire(`Success`, `Created Successfully!`, `success`);
      resetForm();
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          ADD TECHNOLOGY
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
        <div className="md:w-[26rem] w-[72vw] md:px-4 px-2 tracking-wide">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
            }) => (
              <Form className="flex flex-col gap-4">
                <InputLabel htmlFor="name">
                  Logo <span className="text-red-600 px-1">*</span>
                </InputLabel>
                <SingleImageUpload
                  values={values}
                  setImageValue={(event: any) => {
                    setFieldValue("image", event?.target?.files[0]);
                  }}
                >
                  <ErrorMessage name="image" />
                </SingleImageUpload>
                <InputLabel htmlFor="name">
                  Technology Name <span className="text-red-600 px-1">*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  placeholder="Enter Technology"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="!bg-theme"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  CREATE TECHNOLOGY
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTechnology;
