import { Check, Close } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Quotation, Branch } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  data?: Quotation;
}
interface QuotationInput {
  status: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  quotationTitle: string;
  reason: string;
  quotationBranchId?: string;
}
const validationSchema = Yup.object().shape({
  status: Yup.string().required("Select status"),
  clientName: Yup.string().required("Client name is required!"),
  clientEmail: Yup.string().email().required("Client email is required!"),
  clientAddress: Yup.string().required("Client address is required!"),
  quotationTitle: Yup.string().required("Quotation title is required!"),
  quotationBranchId: Yup.string().required("Quotation branch is required!"),
});
const EditQuotationDetails = ({ open, handleClose, mutate, data }: Props) => {
  const [isStatus, setIsStatus] = useState("");
  const [isCgst, setIsCgst] = useState(true);
  const [isSgst, setIsSgst] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isGstValue, setIsGstValue] = useState(false);
  const { data: Branch } = useFetch<Branch[]>(`branches`);
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsGstValue(event.target.value === "IGST");
    setIsCgst(event.target.value !== "IGST");
    setIsSgst(event.target.value !== "IGST");
  };
  const initialValues = {
    status: `${data?.status ? data?.status : ""}`,
    clientName: `${data?.clientName ? data?.clientName : ""}`,
    clientEmail: `${data?.clientEmail ? data?.clientEmail : ""}`,
    clientAddress: `${data?.clientAddress ? data?.clientAddress : ""}`,
    quotationTitle: `${data?.quotationTitle ? data?.quotationTitle : ""}`,
    reason: "",
    quotationBranchId: `${
      data?.quotationBranchId ? data?.quotationBranchId : ""
    }`,
  };
  const { change } = useChange();
  const handleSubmit = async (values: QuotationInput) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await change(`quotations/${data?.id}`, {
        method: "PATCH",
        body: {
          status: values?.status,
          clientName: values?.clientName,
          clientEmail: values?.clientEmail,
          clientAddress: values?.clientAddress,
          quotationTitle: values?.quotationTitle,
          quotationBranchId: values?.quotationBranchId,
          reason: values?.reason,
          isIgst: isGstValue,
          isCgst: isCgst,
          isSgst: isSgst,
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
        `Quotation basic details updated successfully!`,
        `success`
      );
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
          Edit Basic Details
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
              <Form className="w-full">
                <p className="font-medium text-gray-700 mt-2">
                  Select Quotation Status
                  <span className="text-red-600">*</span>
                </p>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="status"
                  options={Status_Type || []}
                  onChange={(e: any, r: any) => {
                    setFieldValue("status", r?.value);
                    setIsStatus(r?.value);
                  }}
                  value={
                    values?.status
                      ? Status_Type?.find(
                          (option: any) => option.value === values.status
                        )
                      : {}
                  }
                  getOptionLabel={(option: any) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // placeholder="Selected Gender"
                      onBlur={handleBlur}
                      error={touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                    />
                  )}
                />
                <p className="font-medium text-gray-700 mt-2">
                  Select Quotation Branch
                  <span className="text-red-600">*</span>
                </p>
                <Autocomplete
                  fullWidth
                  size="small"
                  id="quotationBranchId"
                  options={Branch || []}
                  onChange={(e: any, r: any) => {
                    setFieldValue("quotationBranchId", r?.id);
                  }}
                  isOptionEqualToValue={(option: any, value: any) =>
                    option.id === value.quotationBranchId
                  }
                  value={
                    values?.quotationBranchId
                      ? Branch?.find(
                          (option: any) =>
                            option.id === values.quotationBranchId
                        )
                      : {}
                  }
                  getOptionLabel={(option: any) =>
                    option?.name ? option?.name : ""
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      // placeholder="Selected Gender"
                      onBlur={handleBlur}
                      error={
                        touched.quotationBranchId && !!errors.quotationBranchId
                      }
                      helperText={
                        touched.quotationBranchId && errors.quotationBranchId
                      }
                    />
                  )}
                />
                {isStatus === "Rejected" || data?.status === "Rejected" ? (
                  <div className="my-4">
                    <p className="font-medium text-gray-700">Reason</p>
                    <TextField
                      size="small"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Reason for description"
                      name="reason"
                      value={values.reason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.reason && !!errors.reason}
                      helperText={touched.reason && errors.reason}
                    />
                  </div>
                ) : null}
                <div className="my-4">
                  <p className="font-medium text-gray-700">
                    Enter Client Name<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Client Name"
                    name="clientName"
                    value={values.clientName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.clientName && !!errors.clientName}
                    helperText={touched.clientName && errors.clientName}
                  />
                </div>

                <div className="my-4">
                  <p className="font-medium text-gray-700 mt-2">
                    Enter Client Email<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Client Email"
                    name="clientEmail"
                    value={values.clientEmail}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.clientEmail && !!errors.clientEmail}
                    helperText={touched.clientEmail && errors.clientEmail}
                  />
                </div>
                <div className="my-4">
                  <p className="font-medium text-gray-700 mt-2">
                    Enter Client Address<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Client Address"
                    name="clientAddress"
                    value={values.clientAddress}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.clientAddress && !!errors.clientAddress}
                    helperText={touched.clientAddress && errors.clientAddress}
                  />
                </div>
                <div className="my-4">
                  <p className="font-medium text-gray-700 mt-2">
                    Enter Quotation Title<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Quotation Title"
                    name="quotationTitle"
                    value={values.quotationTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.quotationTitle && !!errors.quotationTitle}
                    helperText={touched.quotationTitle && errors.quotationTitle}
                  />
                </div>
                <div className="my-3 px-4">
                  <p className="text-gray-500">
                    Please choose tax option{" "}
                    <span className="text-red-600">*</span>
                  </p>
                  <RadioGroup
                    defaultValue={data?.isIgst ? "IGST" : "SGST"}
                    row
                    name="isGstValue"
                    onChange={handleOptionChange}
                  >
                    <FormControlLabel
                      value="IGST"
                      control={<Radio />}
                      label="IGST"
                    />
                    <FormControlLabel
                      value="SGST"
                      control={<Radio />}
                      label="SGST & CGST"
                    />
                  </RadioGroup>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className="!bg-theme"
                    variant="contained"
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
  );
};

export default EditQuotationDetails;
const Status_Type = [
  {
    id: 1,
    name: "Accepted",
    value: "Accepted",
  },
  {
    id: 2,
    name: "Rejected",
    value: "Rejected",
  },
  {
    id: 3,
    name: "Modified",
    value: "Modified",
  },
];
