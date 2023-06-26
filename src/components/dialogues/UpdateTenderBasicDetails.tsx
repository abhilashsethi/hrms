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

const UpdateTenderBasicDetails = ({ open, handleClose, mutate, tenderData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: branchData } = useFetch<any>(`branches`);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();

  const initialValues = {
    tenderStatus: `${tenderData?.assetOfBranch?.id ? tenderData?.assetOfBranch?.id : ""}`,
    tenderNo: `${tenderData?.tenderNo ? tenderData?.tenderNo : ""}`,
    tenderTitle: `${tenderData?.name ? tenderData?.name : ""}`,
    portal: `${tenderData?.modelName ? tenderData?.modelName : ""}`,
    bidValue: `${tenderData?.bidValue ? tenderData?.bidValue : ""}`,
    tenderCategory: `${tenderData?.tenderCategory ? tenderData?.tenderCategory : ""}`,
    submissionTime: `${tenderData?.submissionTime ? tenderData?.submissionTime : ""}`,
    submissionDate: `${tenderData?.dateOfPurchase
      ? moment(tenderData?.dateOfPurchase).format("YYYY-MM-DD")
      : ""
      }`,

  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Status is required!"),
    tenderNo: Yup.string().required("Tender Number is required!"),
    tenderTitle: Yup.string()
      .matches(
        /^[A-Za-z ]+$/,
        "Asset Name must only contain alphabetic characters"
      )
      .min(2, "Asset Name must be at least 2 characters")
      .max(50, "Asset Name must be less than 50 characters")
      .required("Asset Name is required!"),
    portal: Yup.string().required("Portal Name is required!"),
    tenderCategory: Yup.string().required("Tender Category is required!"),
    submissionDate: Yup.string().required("Submission date is required!"),
    submissionTime: Yup.string().required("Submission time is required!"),
    bidValue: Yup.string().required("Bid Value is required!"),

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
            UPDATE BASIC DETAILS
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
                  <div className="grid lg:grid-cols-2">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <InputLabel htmlFor="portal">
                          Tender Status <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        select
                        name="tenderStatus"
                        label="Select Status"
                        value={values.tenderStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.tenderStatus && !!errors.tenderStatus}
                        helperText={touched.tenderStatus && errors.tenderStatus}
                      >
                        {tenderStatus.map((option) => (
                          <MenuItem key={option.id} value={option.title}>
                            {option.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <InputLabel htmlFor="tenderNo">
                          Tender No. <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="tenderNo"
                        // placeholder="Name"
                        name="tenderNo"
                        value={values.tenderNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.tenderNo && !!errors.tenderNo}
                        helperText={touched.tenderNo && errors.tenderNo}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <InputLabel htmlFor="tenderTitle">
                          Tender Title <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="tenderTitle"
                        // placeholder="Name"
                        name="tenderTitle"
                        value={values.tenderTitle}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.tenderTitle && !!errors.tenderTitle}
                        helperText={touched.tenderTitle && errors.tenderTitle}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="portal">
                          Portal Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="portal"
                        name="portal"
                        value={values.portal}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.portal && !!errors.portal}
                        helperText={touched.portal && errors.portal}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <InputLabel htmlFor="portal">
                          Tender Category <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        select
                        name="tenderCategory"
                        label="Select Tender Category"
                        value={values.tenderCategory}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.tenderCategory && !!errors.tenderCategory}
                        helperText={touched.tenderCategory && errors.tenderCategory}
                      >
                        {tenderCategory.map((option) => (
                          <MenuItem key={option.id} value={option.title}>
                            {option.title}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="submissionDate">
                          Date Of Submission <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="date"
                        // placeholder="Employee ID"
                        id="submissionDate"
                        name="submissionDate"
                        value={values.submissionDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.submissionDate && !!errors.submissionDate}
                        helperText={touched.submissionDate && errors.submissionDate}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="submissionDate">
                          Time Of Submission <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="time"
                        // placeholder="Employee ID"
                        id="submissionTime"
                        name="submissionTime"
                        value={values.submissionTime}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.submissionTime && !!errors.submissionTime}
                        helperText={touched.submissionTime && errors.submissionTime}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="bidValue">
                          Bid Value <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="bidValue"
                        name="bidValue"
                        value={values.bidValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bidValue && !!errors.bidValue}
                        helperText={touched.bidValue && errors.bidValue}
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

export default UpdateTenderBasicDetails;
const tenderCategory = [
  { id: 1, title: "Online" },
  { id: 2, title: "Offline" },
];
const tenderStatus = [
  { id: 1, title: "Open" },
  { id: 2, title: "Pending" },
  { id: 3, title: "Closed" },
];