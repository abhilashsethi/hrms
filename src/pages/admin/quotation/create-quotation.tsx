import { Check, Delete } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { AddMoreField } from "components/dialogues";
import { Field, FieldArray, Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import dynamic from "next/dynamic";
import { ChangeEvent, useState } from "react";
import * as Yup from "yup";
// import PayrollInputField from "./PayrollInputField";
interface InputField {
  field1?: string;
  field2?: number;
  field3?: number;
}
interface FormValues {
  inputFields: InputField[];
}
const CreateQuotation = () => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const ReactQuill = dynamic(import("react-quill"), { ssr: false });
  const [isEmdValue, setIsEmdValue] = useState(false)
  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsEmdValue(event.target.value === 'IGST');
  };
  const initialValues = {
    inputFields: [{ field1: "", field2: 0, field3: 0 }],
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    quotationTitle: "",
    text: "",
  };
  const validationSchema = Yup.object().shape({
    clientName: Yup.string().required("Client name is required!"),
    clientEmail: Yup.string().email().required("Client Email is required!"),
    clientAddress: Yup.string().required("Client address is required!"),
    quotationTitle: Yup.string().required("Quotation title is required!"),
    inputFields: Yup.array().of(
      Yup.object()
        .shape({
          field1: Yup.string().required("Description is required"),
          field2: Yup.mixed().required("Qty is required"),
          field3: Yup.mixed().required("Cost is required"),
        })
        .nullable()
    ),
  });

  const handleSubmit = (values: any) => {
    // Access the values of all input fields
    console.log("isEmdValue", isEmdValue);
    console.log(values);
  };
  return (
    <PanelLayout title="Create Quotation - Admin Panel">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="px-2 md:px-0">
          <AdminBreadcrumbs links={links} />
        </div>
        <section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
          <div className="md:w-[60rem] w-full bg-white md:px-4 py-4 px-2 tracking-wide rounded-lg shadow-xl">
            <p className="text-center text-2xl font-bold text-theme tracking-wide">
              Create Quotation
            </p>
            <div className="w-full my-6 py-6 px-20">
              <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                enableReinitialize={true}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                }) => (
                  <Form>
                    <div className="grid lg:grid-cols-2">

                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="md:py-2 py-1">
                          <InputLabel htmlFor="clientName">
                            Client Name <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="clientName"
                          // placeholder="clientName"
                          name="clientName"
                          value={values.clientName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.clientName && !!errors.clientName}
                          helperText={touched.clientName && errors.clientName}
                        />
                      </div>

                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="clientEmail">
                            Client Email <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          // placeholder="Client Address"
                          id="clientEmail"
                          name="clientEmail"
                          value={values.clientEmail}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.clientEmail && !!errors.clientEmail}
                          helperText={touched.clientEmail && errors.clientEmail}
                        />
                      </div>
                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="clientAddress">
                            Client Address{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          // placeholder="Client Address"
                          id="clientAddress"
                          name="clientAddress"
                          value={values.clientAddress}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.clientAddress && !!errors.clientAddress
                          }
                          helperText={
                            touched.clientAddress && errors.clientAddress
                          }
                        />
                      </div>

                      <div className="md:px-4 px-2 md:py-2 py-1">
                        <div className="py-2">
                          <InputLabel htmlFor="quotationTitle">
                            Quotation Title{" "}
                            <span className="text-red-600">*</span>
                          </InputLabel>
                        </div>
                        <TextField
                          size="small"
                          fullWidth
                          // placeholder="Quotation Title"
                          id="quotationTitle"
                          name="quotationTitle"
                          value={values.quotationTitle}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched.quotationTitle && !!errors.quotationTitle
                          }
                          helperText={
                            touched.quotationTitle && errors.quotationTitle
                          }
                        />
                      </div>
                    </div>

                    <FieldArray name="inputFields">
                      {({ remove, push }) => (
                        <div className="px-4 py-2 grid gap-2 w-full">
                          {values.inputFields.map((field, index) => (
                            <div
                              className="grid grid-cols-4 gap-2 items-center"
                              key={index}
                            >
                              <Field
                                as={TextField}
                                label="Description"
                                fullWidth
                                size="small"
                                name={`inputFields[${index}].field1`}
                                onBlur={handleBlur}
                                error={
                                  touched.inputFields?.[index]?.field1 &&
                                  !!(
                                    errors.inputFields?.[
                                    index
                                    ] as InputField
                                  )?.field1
                                }
                                helperText={
                                  touched.inputFields?.[index]?.field1 &&
                                  (
                                    errors.inputFields?.[
                                    index
                                    ] as InputField
                                  )?.field1
                                }
                              />
                              <Field
                                as={TextField}
                                name={`inputFields[${index}].field2`}
                                type="number"
                                label="Qty"
                                fullWidth
                                size="small"
                                onBlur={handleBlur}
                                error={
                                  touched.inputFields?.[index]?.field2 &&
                                  !!(
                                    errors.inputFields?.[
                                    index
                                    ] as InputField
                                  )?.field2
                                }
                                helperText={
                                  touched.inputFields?.[index]?.field2 &&
                                  (
                                    errors.inputFields?.[
                                    index
                                    ] as InputField
                                  )?.field2
                                }
                              />
                              <Field
                                as={TextField}
                                name={`inputFields[${index}].field3`}
                                label="Cost"
                                type="number"
                                fullWidth
                                size="small"
                                onBlur={handleBlur}
                                error={
                                  touched.inputFields?.[index]?.field3 &&
                                  !!(
                                    errors.inputFields?.[
                                    index
                                    ] as InputField
                                  )?.field3
                                }
                                helperText={
                                  touched.inputFields?.[index]?.field3 &&
                                  (
                                    errors.inputFields?.[
                                    index
                                    ] as InputField
                                  )?.field3
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
                              push({ field1: "", field2: "", field3: "" })
                            }
                          >
                            Add Field
                          </button>
                        </div>
                      )}
                    </FieldArray>
                    <div className="my-3 px-4">
                      <p className="text-gray-500">
                        Please choose tax option{" "}
                        <span className="text-red-600">*</span>
                      </p>
                      <RadioGroup
                        defaultValue={isEmdValue ? 'IGST' : 'SGST'}
                        row
                        name="isEmdValue"
                        onChange={handleOptionChange}
                      >
                        <FormControlLabel value="IGST" control={<Radio />} label="IGST" />
                        <FormControlLabel value="SGST" control={<Radio />} label="SGST & CGST" />
                      </RadioGroup>
                    </div>
                    <div className="mt-3 text-gray-500 px-4">
                      <p>
                        Terms & Conditions{" "}
                        <span className="text-red-600">*</span>
                      </p>
                      <ReactQuill
                        placeholder="Terms & Conditions ..."
                        theme="snow"
                        value={values.text}
                        onChange={(value) => setFieldValue("text", value)}
                        onBlur={handleBlur("text")}
                        className="lg:h-[150px] w-full bg-white"
                      />
                    </div>
                    <div className="flex justify-center md:py-4 py-2 mt-10">
                      <Button
                        type="submit"
                        variant="contained"
                        className="!bg-theme"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
                      >
                        CREATE
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default CreateQuotation;
const links = [
  // { id: 1, page: "Payroll", link: "/admin/payroll" },
  {
    id: 2,
    page: "Create Quotation",
    link: "/admin/quotation/create-quotation",
  },
];
