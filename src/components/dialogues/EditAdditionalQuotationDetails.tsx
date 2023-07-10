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
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Quotation, QuotationWork } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  data?: QuotationWork;
  billData?: Quotation;
}

const validationSchema = Yup.object().shape({
  gst: Yup.number()
    .positive("Must be a positive number")
    .required("% For GST is required !"),
  cgst: Yup.number()
    .positive("Must be a positive number")
    .required("% For CGST is required !"),
  sgst: Yup.number()
    .positive("Must be a positive number")
    .required("% For SGST is required !"),
});
const EditAdditionalQuotationDetails = ({
  open,
  data,
  handleClose,
  mutate,
  billData,
}: Props) => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    gst: "",
    cgst: "",
    sgst: "",
  };

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        sx={{ p: 2, minWidth: "40rem !important" }}
      >
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          Edit Additional Details
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
        <div className="md:w-[40rem] w-[72vw] md:px-4 px-2 tracking-wide">
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
                  <div className="lg:px-4 px-2 lg:py-2 py-1">
                    <div className="lg:py-2 py-1">
                      <InputLabel htmlFor="gst">
                        IGST % <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      fullWidth
                      size="small"
                      id="gst"
                      type="number"
                      // placeholder="% for basic salary"
                      name="gst"
                      value={values.gst}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.gst && !!errors.gst}
                      helperText={touched.gst && errors.gst}
                    />
                  </div>
                  <div className="lg:px-4 px-2 lg:py-2 py-1">
                    <div className="py-2">
                      <InputLabel htmlFor="cgst">
                        CGST % <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      type="number"
                      // placeholder="% for cgst"
                      id="cgst"
                      name="cgst"
                      value={values.cgst}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.cgst && !!errors.cgst}
                      helperText={touched.cgst && errors.cgst}
                    />
                  </div>
                  <div className="lg:px-4 px-2 lg:py-2 py-1">
                    <div className="py-2">
                      <InputLabel htmlFor="sgst">
                        SGST % <span className="text-red-600">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      size="small"
                      fullWidth
                      type="number"
                      // placeholder="% for PF"
                      id="sgst"
                      name="sgst"
                      value={values.sgst}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.sgst && !!errors.sgst}
                      helperText={touched.sgst && errors.sgst}
                    />
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

export default EditAdditionalQuotationDetails;
