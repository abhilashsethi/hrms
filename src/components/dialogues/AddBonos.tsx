import { Check, Close } from "@mui/icons-material";
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
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
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

const AddBonus = ({ open, handleClose, userId, mutate }: Props) => {
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
    bonus: "",
    month: "",
    year: new Date().getFullYear(),
  };
  const validationSchema = Yup.object().shape({
    bonus: Yup.number()
      .required("Required")
      .positive("Bonus must be a positive number")
      .moreThan(0, "Bonus must be greater than zero"),
  });
  const currentYear = new Date().getFullYear();
  const recentYears = Array.from(
    { length: 10 },
    (_, index) => currentYear - index
  );

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const ticketText = {
        salaryBonus: Number(values?.bonus),
        month: selectMonth ? Number(selectMonth) : new Date()?.getMonth(),
        year: new Date()?.getFullYear(),
        userId: userId,
      };
      const res = await change(`bonus`, {
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
      Swal.fire(`Success`, `Bonus added successfully`, `success`);
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
          ADD BONUS INFO
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
                <div className="py-1">
                  <p className="font-medium text-gray-700 mb-2">
                    Select Month <span className="text-red-600">*</span>
                  </p>
                  <TextField
                    fullWidth
                    name="month"
                    select
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
                </div>
                <div className="py-1">
                  <p className="font-medium text-gray-700 mb-2">
                    Select Year <span className="text-red-600">*</span>
                  </p>
                  <TextField
                    fullWidth
                    name="year"
                    select
                    size="small"
                    value={values.year || ""}
                    onChange={(event) =>
                      setFieldValue("year", event.target.value)
                    }
                  >
                    {recentYears.map((year) => (
                      <MenuItem key={year} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>

                <div className="py-1">
                  <p className="font-medium text-gray-700 mb-2">
                    Add Bonus <span className="text-red-600">*</span>
                  </p>
                  <TextField
                    size="small"
                    fullWidth
                    placeholder="Add Bonus"
                    name="bonus"
                    value={values.bonus}
                    onChange={(e) => {
                      // Allow only numeric input
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      handleChange({
                        target: {
                          name: "bonus",
                          value,
                        },
                      });
                    }}
                    InputProps={{
                      inputProps: {
                        min: 0,
                      },
                      onPaste: (e) => {
                        // Prevent paste action
                        e.preventDefault();
                      },
                    }}
                    onBlur={handleBlur}
                    error={touched.bonus && !!errors.bonus}
                    helperText={touched.bonus && errors.bonus}
                  />
                </div>

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

export default AddBonus;

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
