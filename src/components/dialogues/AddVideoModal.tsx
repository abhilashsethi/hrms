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
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Video title is Required"),
  link: Yup.string().required("Video file is Required"),
});
const AddVideoModal = ({ open, handleClose, mutate }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    title: "",
    link: "",
    type: "",
  };

  const { change } = useChange();
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const dtype = values?.link?.type.split("/")[1];
      const url = await uploadFile(values?.link, `${Date.now()}.${dtype}`);
      const res: any = await change(`projects/add-doc/${router?.query?.id}`, {
        method: "POST",
        body: {
          title: values.title,
          link: url,
          docType: "video",
        },
      });

      if (res?.status !== 200) {
        Swal.fire(
          `Error`,
          res?.results?.message || "Something went wrong!",
          "error"
        );
        setLoading(false);
        return;
      }
      mutate();
      Swal.fire(`Success`, "Video Added Successfully!!", "success");
      setLoading(false);
      handleClose();
      return;
    } catch (error) {}
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          ADD VIDEOS
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
        <div className="md:w-[40rem] w-full md:px-4 px-2 tracking-wide">
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
              <Form className="w-full">
                <p className="font-medium text-gray-700 mb-2">Video Title*</p>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />

                <p className="font-medium text-gray-700 mt-4">
                  Choose Video File
                </p>
                <TextField
                  type="file"
                  fullWidth
                  name="link"
                  size="small"
                  placeholder="Choose Video File"
                  onChange={(e: any) =>
                    setFieldValue("link", e?.target?.files[0])
                  }
                  onBlur={handleBlur}
                  error={touched.link && !!errors.link}
                  helperText={touched.link && errors.link}
                />

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className="!bg-theme"
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Check />
                      )
                    }
                  >
                    SUBMIT
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

export default AddVideoModal;
