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
  techData?: any;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  logo: yup.mixed().required("Image is required"),
});
const UpdateDepartment = ({ open, handleClose, mutate, techData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    name: `${techData?.name ? techData?.name : ""}`,
    logo: `${techData?.logo ? techData?.logo : ""}`,
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    const uniId = initialValues?.logo?.substring(
      initialValues?.logo?.lastIndexOf("/") + 1
    );
    try {
      if (techData?.logo !== values?.logo) {
        const url = await uploadFile(values?.logo, `${uniId}`);
        const name = values.name;
        const res = await change(`technologies/${techData?.id}`, {
          method: "PATCH",
          body: {
            logo: url,
            name: name.charAt(0).toUpperCase() + name.slice(1),
          },
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
      }
      const res = await change(`technologies/${techData?.id}`, {
        method: "PATCH",
        body: {
          name: values.name.charAt(0).toUpperCase() + values.name.slice(1),
        },
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
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          UPDATE
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
