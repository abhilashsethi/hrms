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
import moment from "moment";
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
interface TenderUpdate {
  status: string;
  tenderNo: string;
  title: string;
  portal: string;
  bidValue: string | number;
  category: string;
  submissionTime: string;
  submissionDate: string | Date;
}

const UpdateBankDetails = ({
  open,
  handleClose,
  mutate,
  tenderData,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const initialValues = {
    status: `${tenderData?.status ? tenderData?.status : ""}`,
    tenderNo: `${tenderData?.tenderNo ? tenderData?.tenderNo : ""}`,
    title: `${tenderData?.title ? tenderData?.title : ""}`,
    portal: `${tenderData?.portal ? tenderData?.portal : ""}`,
    bidValue: tenderData?.bidValue ? tenderData?.bidValue : 0,
    category: `${tenderData?.category ? tenderData?.category : ""}`,
    submissionTime: `${
      tenderData?.submissionTime ? tenderData?.submissionTime : ""
    }`,
    submissionDate: tenderData?.submissionDate
      ? moment(tenderData?.submissionDate).format("YYYY-MM-DD")
      : new Date(),
  };

  const validationSchema = Yup.object().shape({
    status: Yup.string().required("Tender Status is required!"),
    tenderNo: Yup.string().required("Tender Number is required!"),
    title: Yup.string()
      .min(2, "Tender Name must be at least 2 characters")
      .max(50, "Tender Name must be less than 50 characters")
      .required("Tender Name is required!"),
    portal: Yup.string().required("Portal Name is required!"),
    category: Yup.string().required("Tender Category is required!"),
    submissionDate: Yup.date().required("Submission date is required!"),
    submissionTime: Yup.string().required("Submission time is required!"),
    bidValue: Yup.number()
      .required("Bid Value is required!")
      .positive("Must be a positive number"),
  });
  const handleSubmit = async (values: TenderUpdate) => {
    setLoading(true);
    try {
      const res = await change(`tenders/update/${tenderData?.id}`, {
        method: "PATCH",
        body: {
          status: values?.status,
          tenderNo: values?.tenderNo,
          title: values?.title,
          portal: values?.portal,
          bidValue: Number(values?.bidValue),
          category: values?.category,
          submissionTime: values?.submissionTime,
          submissionDate: new Date(values?.submissionDate)?.toISOString(),
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Basic details updated successfully!`, `success`);
      mutate();
      handleClose();
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
                      <div className="py-2">
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
                      <div className="py-2">
                        <InputLabel htmlFor="title">
                          Tender Title <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="title"
                        // placeholder="Name"
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
                      <div className="py-2">
                        <InputLabel htmlFor="portal">
                          Tender Category{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="category"
                        name="category"
                        value={values?.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched?.category && !!errors?.category}
                        helperText={touched?.category && errors?.category}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="submissionDate">
                          Date Of Submission{" "}
                          <span className="text-red-600">*</span>
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
                        error={
                          touched.submissionDate && !!errors.submissionDate
                        }
                        helperText={
                          String(touched.submissionDate) &&
                          errors.submissionDate
                        }
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="submissionDate">
                          Time Of Submission{" "}
                          <span className="text-red-600">*</span>
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
                        error={
                          touched.submissionTime && !!errors.submissionTime
                        }
                        helperText={
                          touched.submissionTime && errors.submissionTime
                        }
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
                        type="number"
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

export default UpdateBankDetails;
