import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  tenderData?: Tender;
}

const UpdateTenderFeeDetails = ({ open, handleClose, mutate, tenderData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    tenderFees: tenderData?.tenderFees ? tenderData?.tenderFees : 0,
    tenderPaymentMode: `${tenderData?.tenderPaymentMode ? tenderData?.tenderPaymentMode : ""}`,
  };

  const validationSchema = Yup.object().shape({
    tenderPaymentMode: Yup.string().required("Payment Mode is required!"),
    tenderFees: Yup.number().required('Tender Fees is required!')
      .positive('Must be a positive number'),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    try {
      const res = await change(`tenders/update/${tenderData?.id}`, {
        method: "PATCH",
        body: {
          tenderPaymentMode: values?.tenderPaymentMode,
          tenderFees: Number(values?.tenderFees),
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully updated!`, `success`);
      mutate()
      handleClose()
      return;
    } catch (error) {
      console.log(error);
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
            UPDATE FEES
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
                        <InputLabel htmlFor="portal">
                          Payment Mode <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        select
                        name="tenderPaymentMode"
                        label="Select Payment Mode"
                        value={values.tenderPaymentMode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.tenderPaymentMode && !!errors.tenderPaymentMode}
                        helperText={touched.tenderPaymentMode && errors.tenderPaymentMode}
                      >
                        {tenderPaymentMode.map((option) => (
                          <MenuItem key={option.id} value={option.title}>
                            {option.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="tenderFees">
                          Tender Fees <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="tenderFees"
                        name="tenderFees"
                        value={values.tenderFees}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.tenderFees && !!errors.tenderFees}
                        helperText={touched.tenderFees && errors.tenderFees}
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

export default UpdateTenderFeeDetails;
const tenderPaymentMode = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
const tenderStatus = [
  { id: 1, title: "Open" },
  { id: 2, title: "Pending" },
  { id: 3, title: "Closed" },
];