import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { Quotation, QuotationWork } from "types";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  data?: QuotationWork;
}

const validationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  sacCode: Yup.string().required("Sac Code is required!"),
  Amount: Yup.string().required("Amount is required!"),
});
const AddAdditionalBillDetails = ({
  open,
  data,
  handleClose,
  mutate,
}: Props) => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("one");
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const initialValues = {
    description: "",
    sacCode: "",
    Amount: 0,
  };

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const timestamp = Date.now();
      const id = (timestamp % 100000).toString().padStart(6, "0");
      const resData = {
        id: id,
        description: values?.description,
        Amount: Number(values?.Amount),
        SACcode: values?.sacCode,
      };
      const res = await change(`bills/add-work/${data?.id}`, {
        body: resData,
      });
      console.log("after submit", res);
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Additional details add successfully!`, `success`);
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
          Add Additional Details
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
                <div className="my-4">
                  <p className="font-medium text-gray-700">
                    Enter Description<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                  />
                </div>

                <div className="my-4">
                  <p className="font-medium text-gray-700 mt-2">
                    Enter SAC Code<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="SAC Code"
                    name="sacCode"
                    value={values.sacCode}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.sacCode && !!errors.sacCode}
                    helperText={touched.sacCode && errors.sacCode}
                  />
                </div>

                <div className="my-4">
                  <p className="font-medium text-gray-700 mt-2">
                    Enter Amount<span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Amount"
                    type="number"
                    name="Amount"
                    value={values.Amount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.Amount && !!errors.Amount}
                    helperText={touched.Amount && errors.Amount}
                  />
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

export default AddAdditionalBillDetails;
