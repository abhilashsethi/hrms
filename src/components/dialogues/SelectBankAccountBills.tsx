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
import { downloadFile, useChange, useFetch } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Bills, QuotationBank, QuotationWork } from "types";
import { NumInWords } from "utils";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  data?: Bills[];
  item?: any;
}
interface Signature {
  id?: string;
  name?: string;
  link?: string;
}

const SelectBankAccountBills = ({
  open,
  data,
  handleClose,
  mutate,
  item,
}: Props) => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState<string | undefined>("");
  const [value, setValue] = useState("one");
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const validationSchema = Yup.object().shape({
    account: Yup.string().required("Bank account is required!"),
    // signature: Yup.string().required("Signature is required!"),
  });
  const initialValues = {
    account: "",
    signature: "",
  };

  const { data: bankData, isLoading } = useFetch<QuotationBank[]>(
    `quotations/get-all/accounts`
  );
  const { data: signature } = useFetch<Signature[]>(`signatures/get-all`);
  const handleSubmit = async (values: any) => {
    console.log({ item });
    console.log(values);
    setLoading(true);
    setIsActive(item?.id);
    try {
      if (item?.billType === "Paid" || item?.billType === "Advance") {
        if (values?.signature === "") {
          Swal.fire("Info", "Signature is required!", "info");
          setLoading(false);
          return;
        }
      }
      const res = await downloadFile({
        url: `/bills/generate/bill/pdf`,
        method: "POST",
        body: {
          invoiceNumber: item?.billNumber,
          invoiceDate: moment(item?.invoiceDate).format("DD/MM/YYYY"),
          clientGstNumber: item?.clientGstNumber,
          billType: item?.billType,
          status: item?.status,
          dueDate: item?.dueDate
            ? moment(item?.dueDate).format("DD/MM/YYYY")
            : "---",
          clientName: item?.clientName,
          clientAddress: item?.clientAddress,
          gstNumber: "18JAKSDAJ45",
          works: item?.works,
          gst: item?.gst,
          igstVal: item?.igstVal,
          cgstVal: item?.cgstVal,
          sgstVal: item?.sgstVal,
          isIgst: item?.isIgst,
          isCgst: item?.isCgst,
          isSgst: item?.isSgst,
          isGst: item?.isGst,
          total: item?.total,
          igstPercent: item?.igstPercent,
          cgstPercent: item?.cgstPercent,
          sgstPercent: item?.sgstPercent,
          grandTotal: item?.grandTotal,
          termsAndConditions: item?.termsAndConditions,
          bankAccount1: values?.account,
          signatureId: values?.signature,
          cinNumber: "U72501OR2018PTC029550",
          companyName: "SearchingYard Software Private Limited",
          address: "House No - MIG III, 423, LaneNumber-20",
          nearBy: "Near AMRI Hospital Road",
          place: "Khandagiri,Bhubaneswar-751030",
          panNumber: "ABACS8623B",
          gstVal: item?.gstVal,
          grandTotalInWord: NumInWords(item?.grandTotal ? item?.grandTotal : 0),
        },
      });
      console.log(res);
      setLoading(false);
      // if (res?.status !== 200) throw new Error("Something went wrong");
      Swal.fire(`Success`, "Download successfully!!", "success");
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
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          Select Bank Account
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
                <div className="px-4 py-2">
                  <div className="py-2">
                    <InputLabel htmlFor="account">
                      Choose Bank
                      <span className="text-red-500">*</span>
                    </InputLabel>
                  </div>
                  <TextField
                    size="small"
                    select
                    fullWidth
                    name="account"
                    placeholder="Document Type"
                    value={values.account}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.account && !!errors.account}
                    helperText={touched.account && errors.account}
                  >
                    {bankData?.length
                      ? bankData.map((option) => (
                          <MenuItem key={option.bankName} value={option.id}>
                            {option.bankName}, <span>{option?.branchName}</span>
                          </MenuItem>
                        ))
                      : "Please Add Bank Details..."}
                  </TextField>
                </div>
                {item?.billType === "Unpaid" ? null : (
                  <div className="px-4 py-2">
                    <div className="py-2">
                      <InputLabel htmlFor="signature">
                        Choose Signature
                        <span className="text-red-500">*</span>
                      </InputLabel>
                    </div>
                    <TextField
                      size="small"
                      select
                      fullWidth
                      name="signature"
                      placeholder="Choose Signature"
                      value={values.signature}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.signature && !!errors.signature}
                      helperText={touched.signature && errors.signature}
                    >
                      {signature?.length
                        ? signature.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.name}
                            </MenuItem>
                          ))
                        : "Please Add Bank Details..."}
                    </TextField>
                  </div>
                )}

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Check />
                      )
                    }
                    // onClick={() => handleSubmit}
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

export default SelectBankAccountBills;
