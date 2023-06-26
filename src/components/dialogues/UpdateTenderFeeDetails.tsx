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
import * as Yup from "yup";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  tenderData?: any;
}

const UpdateTenderFeeDetails = ({ open, handleClose, mutate, tenderData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: branchData } = useFetch<any>(`branches`);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();

  const initialValues = {
    tenderFees: `${tenderData?.tenderFees ? tenderData?.tenderFees : ""}`,
    paymentMode: `${tenderData?.paymentMode ? tenderData?.paymentMode : ""}`,


  };

  const validationSchema = Yup.object().shape({
    paymentMode: Yup.string().required("Payment Mode is required!"),
    tenderFees: Yup.string().required("Tender Fees is required!"),

  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    return
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
                        name="paymentMode"
                        label="Select Payment Mode"
                        value={values.paymentMode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.paymentMode && !!errors.paymentMode}
                        helperText={touched.paymentMode && errors.paymentMode}
                      >
                        {paymentMode.map((option) => (
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
const paymentMode = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
const tenderStatus = [
  { id: 1, title: "Open" },
  { id: 2, title: "Pending" },
  { id: 3, title: "Closed" },
];