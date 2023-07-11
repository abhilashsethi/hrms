import { Check, Close, Settings } from "@mui/icons-material";
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
import {
  FileUpload,
  SingleImageUpdateBranch,
  SingleImageUpload,
} from "components/core";
import { deleteFile, uploadFile } from "utils";
interface Data {
  id?: string;
  name?: string;
  link?: string;
}
interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  data?: Data;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Required!"),
  //   image: yup.string().required("Required!"),
  image: yup.mixed().required("Image is required!"),
});
const AddSignatureConfig = ({ open, handleClose, mutate, data }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      if (values?.image != data?.link) {
        if (data?.link) {
          await deleteFile(String(data?.link?.split("/").reverse()[0]));
        }
        const uniId = values?.image?.type.split("/")[1].split("+")[0];
        const url = await uploadFile(values?.image, `${Date.now()}.${uniId}`);
        console.log(values?.image);
        const name = values.name;
        const res = await change(`signatures/${data?.id}`, {
          method: "PATCH",
          body: {
            link: url,
            name: name,
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
      const res = await change(`signatures/${data?.id}`, {
        method: "PATCH",
        body: {
          link: data?.link,
          name: values?.name,
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
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const initialValues = {
    name: `${data?.name ? data?.name : ""}`,
    image: data?.link ? data?.link : null,
  };
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "20rem !important" }}
      >
        <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
          Update Signature
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
        <div className="px-2 w-[30rem] ">
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
                      <InputLabel htmlFor="name">Name </InputLabel>
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
                      <InputLabel htmlFor="name">Upload Signature</InputLabel>
                    </div>
                    <SingleImageUpdateBranch
                      values={values}
                      setImageValue={(event: any) => {
                        setFieldValue("image", event.currentTarget.files[0]);
                      }}
                    >
                      <ErrorMessage name="image" />
                    </SingleImageUpdateBranch>
                  </div>
                </div>
                <div className="flex justify-center lg:py-4 py-2">
                  <Button
                    type="submit"
                    variant="contained"
                    className="!bg-theme"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="warning" />
                      ) : (
                        <Check />
                      )
                    }
                  >
                    UPDATE
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
