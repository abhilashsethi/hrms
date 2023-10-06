import { Check, Close, Delete } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";
import { Field, FieldArray, Form, Formik } from "formik";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { DatePicker } from "@mui/lab";
interface Props {
  open: boolean;
  handleClose: any;
  userId?: any;
  mutate?: any;
}
interface InputField {
  title?: string;
  value?: number;
}

const AddBonos = ({ open, handleClose, userId, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const [selectMonth, setSelectMonth] = useState(
    new Date().getMonth().toString()
  );
  const handleMonthChange = (event: any) => {
    setSelectMonth(event.target.value);
  };
  const { change } = useChange();
  const router = useRouter();

  const initialValues = {
    grossSalary: "",
    kpi: 0,
    tds: "",
    salaryInfoNewFields: null,
    month: "",
  };
  const validationSchema = Yup.object().shape({
    grossSalary: Yup.number().required("Required"),
    kpi: Yup.number().required("Required"),
    tds: Yup.number()
      .positive("Value must be a positive number")
      .integer("Value must be an integer")
      .min(0, "Value must be greater than or equal to 0")
      .max(99, "Value must be less than or equal to 99")
      .required("This field is required"),
  });
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const ticketText = {
        grossSalary: values?.grossSalary,
        kpi: values?.kpi,
        tds: values?.tds,
        userId: userId,
        month: selectMonth ? selectMonth : new Date()?.getMonth(),
        year: new Date()?.getFullYear(),
      };
      const res = await change(`user-salaryInfo`, {
        method: "POST",
        body: ticketText,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      console.log(res);
      Swal.fire(`Success`, `Gross salary added successfully`, `success`);
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
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          ADD SALARY INFO
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
                <p className="font-medium text-gray-700 mb-2">Select Month</p>
                <TextField
                  fullWidth
                  name="month"
                  select
                  label="Select Month"
                  size="small"
                  value={selectMonth ? selectMonth : ""}
                  onChange={handleMonthChange}
                >
                  {monthSelect?.map((option: any) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <DatePicker label={'"year"'} openTo="year" />
                <DatePicker
                  label={'"month"'}
                  openTo="month"
                  views={["year", "month", "day"]}
                />
                <p className="font-medium text-gray-700 mb-2">
                  Add Bonos <span className="text-red-600">*</span>
                </p>
                <TextField
                  size="small"
                  fullWidth
                  type="number"
                  placeholder="Gross Salary"
                  name="grossSalary"
                  value={values.grossSalary}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.grossSalary && !!errors.grossSalary}
                  helperText={touched.grossSalary && errors.grossSalary}
                />

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className="!bg-theme"
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
                      ) : (
                        <Check />
                      )
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

export default AddBonos;

const monthSelect = [
  { id: 1, value: "Jan", label: "Jan" },
  { id: 2, value: "Feb", label: "Feb" },
  { id: 3, value: "Mar", label: "Mar" },
  { id: 4, value: "Apr", label: "Apr" },
  { id: 5, value: "May", label: "May" },
  { id: 6, value: "Jun", label: "Jun" },
  { id: 7, value: "Jul", label: "Jul" },
  { id: 8, value: "Aug", label: "Aug" },
  { id: 9, value: "Sep", label: "Sep" },
  { id: 10, value: "Oct", label: "Oct" },
  { id: 11, value: "Nov", label: "Nov" },
  { id: 12, value: "Dec", label: "Dec" },
  // { id: 4, value: null, label: "All" },
];
