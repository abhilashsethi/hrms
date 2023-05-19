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
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
  mutate?: any;
}

const validationSchema = Yup.object().shape({
  userId: Yup.string().required("Select an employee"),
  startDate: Yup.string().required("Please enter date"),
  variant: Yup.string().required("Please select a variant!"),
});
const CreateLeave = ({ open, handleClose, mutate }: Props) => {
  const initialValues = {
    type: "",
    startDate: "",
    endDate: null,
    variant: "",
    status: "pending",
    reason: "",
    userId: "",
    leaveMonth: `${moment(new Date().toISOString()).format("MMMM")}`,
    leaveYear: `${moment(new Date().toISOString()).format("YYYY")}`,
  };
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("one");
  const { data: usersData } = useFetch(`users`);
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      const res = await change(`leaves`, {
        body: {
          ...values,
          startDate: new Date(values?.startDate).toISOString(),
        },
      });
      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Something went wrong!",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Created Successfully!`, `success`);
      mutate();
      resetForm();
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
                      onBlur={handleBlur}
                      error={touched.userId && !!errors.userId}
                      helperText={touched.userId && errors.userId}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "", // disable autocomplete and autofill
                      }}
                    />
                  )}
                />
                <p className="font-medium text-gray-700 my-2">Leave Type</p>
                <div className="w-full">
                  <TextField
                    size="small"
                    select
                    fullWidth
                    name="type"
                    placeholder="Leave Type"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.type && !!errors.type}
                    helperText={touched.type && errors.type}
                  >
                    {types.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.value}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
                <h1 className="mt-4">Leave Variant</h1>
                <div className="flex justify-center pt-2">
                  <RadioGroup
                    row
                    name="leave"
                    value={value}
                    onChange={(e: any) => {
                      handleRadioChange(e);
                      setFieldValue("variant", e.target.value);
                    }}
                  >
                    <FormControlLabel
                      value="FirstHalf"
                      control={<Radio />}
                      label="Half Day"
                    />
                    <FormControlLabel
                      value="FullDay"
                      control={<Radio />}
                      label="Full Day"
                    />
                    <FormControlLabel
                      value="MultipleDays"
                      control={<Radio />}
                      label="Multiple Days"
                    />
                  </RadioGroup>
                </div>
                {errors?.variant && (
                  <h1 className="text-red-500 text-sm text-center">
                    {errors?.variant}
                  </h1>
                )}
                {value == "FullDay" ? (
                  <>
                    <p className="font-medium text-gray-700 my-2">Date</p>
                    <TextField
                      size="small"
                      fullWidth
                      placeholder="Date"
                      type="date"
                      name="startDate"
                      value={values.startDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.startDate && !!errors.startDate}
                      helperText={touched.startDate && errors.startDate}
                    />
                  </>
                ) : value == "MultipleDays" ? (
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
                      value={
                        values.endDate
                          ? moment(values?.endDate).format("YYYY-MM-DD")
                          : ``
                      }
                      onChange={(e) => {
                        setFieldValue(
                          "endDate",
                          new Date(e.target.value).toISOString()
                        );
                      }}
                      onBlur={handleBlur}
                      error={touched.endDate && !!errors.endDate}
                      helperText={touched.endDate && errors.endDate}
                    />
                  </>
                ) : (
                  <>
                    <p className="font-medium text-gray-700 my-2">Date</p>
                    <div className="w-full">
                      <TextField
                        size="small"
                        fullWidth
                        name="startDate"
                        type="date"
                        placeholder="Date"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                      />
                    </div>
                    <p className="font-medium text-gray-700 my-2">Leave for</p>
                    <div className="w-full">
                      <TextField
                        size="small"
                        select
                        fullWidth
                        name="variant"
                        placeholder="Select"
                        value={values.variant}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.variant && !!errors.variant}
                        helperText={touched.variant && errors.variant}
                      >
                        {variants.map((option) => (
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
const variants = [
  { id: 1, value: "FirstHalf" },
  { id: 2, value: "SecondHalf" },
];
const types = [
  { id: 1, value: "Casual" },
  { id: 2, value: "Sick" },
];
