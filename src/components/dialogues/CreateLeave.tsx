import { Check, Close } from "@mui/icons-material";
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
  Autocomplete,
  Box,
} from "@mui/material";
import { FileUpload, PhotoViewerSmall } from "components/core";
import { Formik, Form, ErrorMessage } from "formik";
import { useFetch } from "hooks";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
}
const initialValues = {
  name: "",
  type: "",
  startDate: "",
  endDate: "",
  variant: "",
  status: "",
  reason: "",
  userId: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  message: Yup.string().required("Message is required"),
});
const CreateLeave = ({ open, handleClose }: Props) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("one");
  const { data: usersData } = useFetch(`users`);
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
      <DialogTitle id="customized-dialog-title" sx={{ p: 2 }}>
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
                <Autocomplete
                  options={usersData as any}
                  fullWidth
                  autoHighlight
                  getOptionLabel={(option: any) => option.name}
                  onChange={(e, r) => {
                    setFieldValue("userId", r?.id);
                  }}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <div className="mr-2">
                        <PhotoViewerSmall
                          size="2rem"
                          name={option.name}
                          photo={option.photo}
                        />
                      </div>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Employee"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <h1 className="mt-4">Leave Variant</h1>
                <div className="flex justify-center pt-2">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="leave"
                    value={value}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="HalfDay"
                      control={<Radio />}
                      label="Half Day"
                    />
                    <FormControlLabel
                      value="FullDay"
                      control={<Radio />}
                      label="Full Day"
                    />
                    <FormControlLabel
                      value="multiple"
                      control={<Radio />}
                      label="Multiple Days"
                    />
                  </RadioGroup>
                </div>
                {value == "FullDay" ? (
                  <>
                    <p className="font-medium text-gray-700 my-2">Date</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="From"
                      type="date"
                      //   name="date"
                      //   value={values.date}
                      //   onChange={handleChange}
                      //   onBlur={handleBlur}
                      //   error={touched.date && !!errors.date}
                      //   helperText={touched.date && errors.date}
                    />
                  </>
                ) : value == "multiple" ? (
                  <>
                    <p className="font-medium text-gray-700 my-2">Start Date</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Start Date"
                      type="date"
                      name="startDate"
                      value={values.startDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.startDate && !!errors.startDate}
                      helperText={touched.startDate && errors.startDate}
                    />
                    <p className="font-medium text-gray-700 my-2">End Date</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="End Date"
                      type="date"
                      name="endDate"
                      value={values.endDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.endDate && !!errors.endDate}
                      helperText={touched.endDate && errors.endDate}
                    />
                  </>
                ) : (
                  <>
                    <p className="font-medium text-gray-700 my-2">Leave for</p>
                    <div className="w-full">
                      <TextField
                        size="small"
                        select
                        fullWidth
                        name="leavesType"
                        placeholder="Select leave type"
                        // value={values.leavesType}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        // error={touched.leavesType && !!errors.leavesType}
                        // helperText={touched.leavesType && errors.leavesType}
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
                <p className="font-medium text-gray-700 my-2">Reason</p>
                <TextField
                  size="small"
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="Reason"
                  name="reason"
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.reason && !!errors.reason}
                  helperText={touched.reason && errors.reason}
                />
                <h1 className="py-1 mt-1">Upload Document</h1>
                <input
                  className="w-full border-2 py-2 px-2 cursor-pointer"
                  placeholder="Upload document"
                  type="file"
                  onChange={(event: any) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
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
