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
import { QuotationBank, QuotationWork } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  data?: QuotationWork;
  item?: any;
}

const SelectBankAccount = ({
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
  });
  const initialValues = {
    account: "",
  };

  const { data: bankData, isLoading } = useFetch<QuotationBank[]>(
    `quotations/get-all/accounts`
  );
  const { data: bankAccountsDetails, mutate: bankAccountMutate } =
    useFetch<any>(`quotations/get-all/accounts`);

  const handleSubmit = async (values?: any) => {
    setLoading(true);
    setIsActive(item?.id);
    // console.log(item);
    try {
      const res = await downloadFile({
        url: `/quotations/generate/pdf`,
        method: "POST",
        body: {
          quotationNumber: item?.quotationNumber,
          cinNumber: "U72501OR2018PTC029550",
          date: moment(new Date()).format("DD/MM/YYYY"),
          clientName: item?.clientName,
          clientEmail: item?.clientEmail,
          clientAddress: item?.clientAddress,
          quotationTitle: item?.quotationTitle,
          works: item?.works,
          termsAndConditions: item?.termsAndConditions,
          status: item?.status,
          igstPercent: item?.igstPercent,
          cgstPercent: item?.cgstPercent,
          sgstPercent: item?.sgstPercent,
          igstVal: item?.igstVal,
          cgstVal: item?.cgstVal,
          sgstVal: item?.sgstVal,
          isIgst: item?.isIgst,
          isCgst: item?.isCgst,
          isSgst: item?.isSgst,
          reason: item?.reason,
          total: item?.total,
          grandTotal: item?.grandTotal,
          bankAccount1: values?.account,
          // bankAccount2: bankAccountsDetails[1],
        },
      });

      setLoading(false);

      Swal.fire(`Success`, `You have successfully Downloaded!`, `success`);
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

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className={`${loading ? "bg-gray-100" : "bg-theme"}`}
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? <CircularProgress size={20} /> : <Check />
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

export default SelectBankAccount;
