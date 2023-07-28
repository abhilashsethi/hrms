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
import { Check, Close, CloudUpload, Upload } from "@mui/icons-material";
import { useRef, useState } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import router from "next/router";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { useChange } from "hooks";

interface Props {
  open?: any;
  handleClose: () => void;
  mutate: () => void;
}
const initialValues = {
  files: null,
};

const validationSchema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
});

const UploadEmployData = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<any>();
  const [isFile, setIsFile] = useState<any>(null);
  const { change, isChanging } = useChange();
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("files", values?.files);

      const res: any = await change(`users/upload`, {
        isFormData: true,
        body: formData,
      });
      setLoading(false);
      console.log(res);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "info");
        setLoading(false);
        return;
      }
      handleClose();
      mutate();
      Swal.fire(
        `Success!`,
        `${res?.results?.msg || `Employee Created Successfully`}`,
        `success`
      );
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
      maxWidth="lg"
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "27rem !important" }}
      >
        <p className="text-center text-md font-bold text-theme tracking-wide">
          UPLOAD EMPLOYEES DATA
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
      <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
        <div className="md:w-[27rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-2">
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
                <TextField
                  type="file"
                  name="files"
                  size="small"
                  fullWidth
                  placeholder="Choose Document"
                  //   value={values?.files}
                  onChange={(e: any) => {
                    setFieldValue("files", e?.target?.files[0]);
                    setIsFile(e?.target?.files[0]);
                  }}
                  onBlur={handleBlur}
                  error={touched.files && !!errors.files}
                  helperText={touched.files && errors.files}
                />
                {/* <EmployeeDataUpload
                    values={values}
                    setImageValue={(event: any) => {
                      setFieldValue("image", event.currentTarget.files[0]);
                    }}
                  >
                    <ErrorMessage name="image" />
                  </EmployeeDataUpload> */}
                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className="!bg-theme"
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <Upload />
                    }
                  >
                    Upload
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

export default UploadEmployData;
