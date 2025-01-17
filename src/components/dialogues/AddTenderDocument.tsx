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
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  tenderData?: Tender;
}

const AddTenderDocument = ({
  open,
  handleClose,
  mutate,
  tenderData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  interface InputField {
    title: string;
    photo: any;
  }
  const initialValues = {
    title: "",
    photo: null,
  };

  const validationSchema = Yup.object().shape({
    photo: Yup.mixed().test(
      "fileSize",
      "File size is too large",
      (value: any) => value && value.size <= 5000000
    ),
    title: Yup.string().required("Document Name is required!"),
  });
  const handleSubmit = async (values: InputField) => {
    setLoading(true);
    try {
      const url = values?.photo
        ? await uploadFile(
            values?.photo,
            `${Date.now()}.${values?.photo?.name.split(".").at(-1)}`
          )
        : undefined;
      const res = await change(`tenders/add-doc/to-tender`, {
        body: { title: values?.title, link: url, tenderId: tenderData?.id },
      });
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      setLoading(false);
      Swal.fire(`Success`, `Document added successfully!`, `success`);
      mutate();
      handleClose();
      setLoading(false);
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
    <>
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
            ADD DOCUMENT
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
          <div className="md:px-4 px-2 tracking-wide">
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
                  <div className="grid">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="title">
                          Document Title <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="portal">
                          Upload file <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        type="file"
                        name="photo"
                        onChange={(e: any) => {
                          setFieldValue("photo", e.target.files[0]);
                        }}
                        // onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.photo && !!errors.photo}
                        helperText={touched.photo && errors.photo}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="!bg-green-500"
                      disabled={loading}
                      startIcon={
                        loading ? <CircularProgress size={20} /> : <Check />
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
    </>
  );
};

export default AddTenderDocument;
const link = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
const exemption = [
  { id: 1, title: "Yes" },
  { id: 2, title: "No" },
];
