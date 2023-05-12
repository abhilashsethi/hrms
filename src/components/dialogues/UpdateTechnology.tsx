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
import { ErrorMessage, Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { useChange, useFetch } from "hooks";
import Swal from "sweetalert2";
import { SingleImageUpdate } from "components/core";
import { uploadFile } from "utils";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  id?: any;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  //   image: yup.string().required("Required!"),
  logo: yup
    .mixed()
    .required("Image is required")
    // .test("fileSize", "Image size is too large", (value: any) => {
    //   if (value) {
    //     const maxSize = 300 * 1024;
    //     return value.size <= maxSize;
    //   }
    //   return true;
    // })
    .test("fileType", "Invalid file type", (value: any) => {
      if (value) {
        const supportedFormats = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/svg+xml",
        ];
        return supportedFormats.includes(value.type);
      }
      return true;
    }),
});
const UpdateDepartment = ({ open, handleClose, mutate, id }: Props) => {
  const { data: technologies, isLoading } = useFetch<{
    name: string;
    logo: any;
  }>(`technologies/${id}`);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    name: `${technologies?.name ? technologies?.name : ""}`,
    logo: `${technologies?.logo ? technologies?.logo : []}`,
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const uniId = new Date().getTime();
    try {
      const url = await uploadFile(values?.logo, `${uniId}.png`);
      const name = values.name;
      const res = await change(`technologies/${id}`, {
        method: "PATCH",
        body: { logo: url, name: name },
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
      Swal.fire(`Success`, `Updated Successfully!`, `success`);
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
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "18rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          UPDATE TECHNOLOGY
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
                {!isLoading && (
                  <>
                    <SingleImageUpdate
                      values={values}
                      setImageValue={(event: any) => {
                        setFieldValue("logo", event.currentTarget.files[0]);
                      }}
                    >
                      <ErrorMessage name="logo" />
                    </SingleImageUpdate>
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
                  </>
                )}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className="!bg-emerald-500"
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} /> : <Check />
                  }
                >
                  UPDATE TECHNOLOGY
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDepartment;
