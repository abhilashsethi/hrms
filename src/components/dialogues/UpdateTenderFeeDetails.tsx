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
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  tenderData?: Tender;
}

const UpdateTenderFeeDetails = ({
  open,
  handleClose,
  mutate,
  tenderData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    tenderFees: tenderData?.tenderFees ? tenderData?.tenderFees : 0,
    feesPaymentMode: `${
      tenderData?.feesPaymentMode ? tenderData?.feesPaymentMode : ""
    }`,
  };

  const validationSchema = Yup.object().shape({
    feesPaymentMode: Yup.string().required("Payment Mode is required!"),
    tenderFees: Yup.number()
      .required("Tender Fees is required!")
      .positive("Must be a positive number"),
  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`tenders/update/${tenderData?.id}`, {
        method: "PATCH",
        body: {
          feesPaymentMode: values?.feesPaymentMode,
          tenderFees: Number(values?.tenderFees),
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(
        `Success`,
        `Tender fee details updated successfully!`,
        `success`
      );
      mutate();
      handleClose();
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
                        name="feesPaymentMode"
                        label="Select Payment Mode"
                        value={values.feesPaymentMode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={
                          touched.feesPaymentMode && !!errors.feesPaymentMode
                        }
                        helperText={
                          touched.feesPaymentMode && errors.feesPaymentMode
                        }
                      >
                        {feesPaymentMode.map((option) => (
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
const feesPaymentMode = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
const tenderStatus = [
  { id: 1, title: "Open" },
  { id: 2, title: "Pending" },
  { id: 3, title: "Closed" },
];
