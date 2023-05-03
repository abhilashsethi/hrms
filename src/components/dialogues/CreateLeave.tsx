import { Check, CheckCircle, Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
  FormControlLabel,
  Radio,
  RadioGroup,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { Formik, Form } from "formik";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
}
const initialValues = {
  name: "",
  leavesType: "",
  to: "",
  from: "",
  date: "",
  message: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  message: Yup.string().required("Message is required"),
});
const CreateLeave = ({ open, handleClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("one");
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const handleSubmit = async (values: any) => {
    console.log(values);
    return;
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
          ADD LEAVE
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
                <p className="font-medium text-gray-700 mb-2">
                  Select Employee
                </p>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Select Employee"
                />

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="leave"
                  value={value}
                  onChange={handleRadioChange}
                >
                  <FormControlLabel
                    value="one"
                    control={<Radio />}
                    label="One Day Leave"
                  />
                  <FormControlLabel
                    value="multiple"
                    control={<Radio />}
                    label="Multiple Day Leave"
                  />
                  <FormControlLabel
                    value="half"
                    control={<Radio />}
                    label="Half Day Leave"
                  />
                </RadioGroup>
                {value == "one" ? (
                  <>
                    <p className="font-medium text-gray-700 my-2">Date</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="From"
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.date && !!errors.date}
                      helperText={touched.date && errors.date}
                    />
                  </>
                ) : value == "multiple" ? (
                  <>
                    <p className="font-medium text-gray-700 my-2">From</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="From"
                      type="date"
                      name="from"
                      value={values.from}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.from && !!errors.from}
                      helperText={touched.from && errors.from}
                    />
                    <p className="font-medium text-gray-700 my-2">To</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="To"
                      type="date"
                      name="to"
                      value={values.to}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.to && !!errors.to}
                      helperText={touched.to && errors.to}
                    />
                  </>
                ) : (
                  <>
                    <p className="font-medium text-gray-700 my-2">
                      Select Leave Type
                    </p>
                    <div className="w-full">
                      <TextField
                        size="small"
                        select
                        fullWidth
                        name="leavesType"
                        placeholder="Select leave type"
                        value={values.leavesType}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.leavesType && !!errors.leavesType}
                        helperText={touched.leavesType && errors.leavesType}
                      >
                        {leavesType.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.value}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </>
                )}
                <p className="font-medium text-gray-700 my-2">Message</p>
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Message"
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.message && !!errors.message}
                  helperText={touched.message && errors.message}
                />
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

export default CreateLeave;
const leavesType = [
  { id: 1, value: "First_Half" },
  { id: 2, value: "Second_Half" },
];
