import { Close, Settings } from "@mui/icons-material";
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
import { SingleImageUpload } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
}
const initialValues = {
  name: "",
  image: null,
};
const validationSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  //   image: yup.string().required("Required!"),
  image: yup
    .mixed()
    .required("Image is required!")
    .test("fileSize", "Image size is too large", (value: any) => {
      if (value) {
        const maxSize = 5 * 1024 * 1024; // Maximum size in bytes (5MB)
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
const AddSignatureConfig = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const uniId = values?.image?.type.split("/")[1].split("+")[0];
    try {
      const url = await uploadFile(values?.image, `${Date.now()}.${uniId}`);
      console.log(values?.image);
      const name = values.name;
      const res = await change(`signatures`, {
        body: { link: url, name: name.charAt(0).toUpperCase() + name.slice(1) },
      });
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
      Swal.fire(`Success`, `Created Successfully!`, `success`);
      return;
    } catch (error) {
      if (error instanceof Error) {
        Swal.fire(`Error`, error?.message, `error`);
      } else {
        Swal.fire(`Error`, "Something Went Wrong", `error`);
      }
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
        <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
          Signature Configuration
        </h1>
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
        <div className="md:w-[30rem] w-[65vw] md:px-4 px-2 tracking-wide">
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
              <Form>
                <div className="grid lg:grid-cols-1">
                  <div className="px-2 md:py-2 py-1">
                    <div className="md:py-2 py-1">
                      <InputLabel htmlFor="name">
                        Name<span className="text-red-500"> *</span>{" "}
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      size="small"
                      id="name"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                    />
                  </div>
                  <div className="px-2 md:py-2 py-1">
                    <div className="md:py-2 py-1">
                      <InputLabel htmlFor="name">
                        Upload Signature{" "}
                        <span className="text-red-500"> *</span>
                      </InputLabel>
                    </div>
                    <SingleImageUpload
                      values={values}
                      message={"Max Size - 5MB"}
                      setImageValue={(event: any) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    >
                      <ErrorMessage name="image" />
                    </SingleImageUpload>
                  </div>
                </div>
                <div className="flex justify-center lg:py-4 py-2">
                  <Button
                    type="submit"
                    variant="contained"
                    className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Settings />
                      )
                    }
                  >
                    CONFIGURE
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddSignatureConfig;
