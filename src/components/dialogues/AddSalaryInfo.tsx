import { Check, Close, Delete } from "@mui/icons-material";
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
import { Field, FieldArray, Form, Formik } from "formik";
import { useChange } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";
import Swal from "sweetalert2";
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

const AddSalaryInfo = ({ open, handleClose, userId, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();

  const initialValues = {
    grossSalary: "",
    kpi: 0,
    tds: "",
    salaryInfoNewFields: null,
    // inputFields: [{ title: "", value: 0 }],
  };
  const validationSchema = Yup.object().shape({
    // inputFields: Yup.array().of(
    // 	Yup.object()
    // 		.shape({
    // 			title: Yup.string().required("Document Title is required"),
    // 			value: Yup.mixed().required("File is required"),
    // 		})
    // 		.nullable()
    // ),
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
        month: new Date()?.getMonth(),
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
      Swal.fire(`Success`, `Gross Salary added successfully`, `success`);
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
      <DialogTitle
        id="customized-dialog-title"
        // sx={{ p: 2, minWidth: "40rem !important" }}
      >
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
                <p className="font-medium text-gray-700 mb-2">
                  Enter Gross Salary <span className="text-red-600">*</span>
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
                <p className="font-medium text-gray-700 my-2">
                  KPI <span className="text-red-600">*</span>
                </p>
                <div className="w-full">
                  <TextField
                    size="small"
                    type="number"
                    fullWidth
                    name="kpi"
                    placeholder="Document kpi"
                    value={values.kpi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.kpi && !!errors.kpi}
                    helperText={touched.kpi && errors.kpi}
                  />
                </div>

                <p className="font-medium text-gray-700 my-2">
                  TDS (%) <span className="text-red-600">*</span>
                </p>
                <div className="w-full">
                  <TextField
                    size="small"
                    fullWidth
                    type="number"
                    name="tds"
                    placeholder="Document tds"
                    value={values.tds}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.tds && !!errors.tds}
                    helperText={touched.tds && errors.tds}
                  />
                </div>
                <>
                  {/* <p className="font-medium text-gray-700 my-2">More</p>
								<FieldArray name="inputFields">
									{({ remove, push }) => (
										<div className="grid gap-2 w-full">
											{values.inputFields.map((field, index) => (
												<div className="grid gap-2 items-center" key={index}>
													<Field
														as={TextField}
														label="Payroll Name"
														fullWidth
														size="small"
														name={`inputFields[${index}].title`}
														onBlur={handleBlur}
														error={
															touched.inputFields?.[index]?.title &&
															!!(errors.inputFields?.[index] as InputField)
																?.title
														}
														helperText={
															touched.inputFields?.[index]?.title &&
															(errors.inputFields?.[index] as InputField)?.title
														}
													/>

													<Field
														as={TextField}
														name={`inputFields[${index}].value`}
														label="value"
														type="number"
														fullWidth
														size="small"
														onBlur={handleBlur}
														error={
															touched.inputFields?.[index]?.value &&
															!!(errors.inputFields?.[index] as InputField)
																?.value
														}
														helperText={
															touched.inputFields?.[index]?.value &&
															(errors.inputFields?.[index] as InputField)?.value
														}
													/>

													<Tooltip title="Remove Field">
														<div className="text-sm bg-red-500 h-8 w-8 rounded-md flex justify-center items-center cursor-pointer">
															<IconButton>
																<Delete
																	onClick={() => remove(index)}
																	className="!text-white"
																/>
															</IconButton>
														</div>
													</Tooltip>
												</div>
											))}
											<button
												className="w-32 mt-2 bg-white text-theme hover:scale-95 transition duration-300 ease-in-out hover:bg-theme hover:text-white border border-theme rounded-lg px-2 py-1"
												type="button"
												onClick={() =>
													push({ description: "", sac: "", value: "" })
												}
											>
												Add Field
											</button>
										</div>
									)}
								</FieldArray> */}
                </>

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

export default AddSalaryInfo;
const variants = [
  { id: 1, value: "FirstHalf" },
  { id: 2, value: "SecondHalf" },
];
const types = [
  { id: 1, value: "Casual" },
  { id: 2, value: "Sick" },
];
