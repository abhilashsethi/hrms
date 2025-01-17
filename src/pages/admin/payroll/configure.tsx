import { Settings } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
const initialValues = {
  basicSalary: "",
  hra: "",
  employeePf: "",
  employerPf: "",
  employeeEsi: "",
  employerEsi: "",
  conveyance: "",
  medical: "",
  startGrossSalary1: "",
  endGrossSalary1: "",
  startGrossSalary2: "",
  endGrossSalary2: "",
  startGrossSalary3: "",
  professionalTax1: "",
  professionalTax2: "",
  professionalTax3: "",
};

const validationSchema = Yup.object().shape({
  basicSalary: Yup.number().required("% For Basic Salary is required !"),
  hra: Yup.number().required("% For HRA is required !"),
  employeePf: Yup.number().required(
    "% For PF (Employee contribution) is required !"
  ),
  employerPf: Yup.number().required(
    "% For PF (Employer contribution) is required !"
  ),
  employerEsi: Yup.number().required(
    "% For ESI(Employer contribution) is required !"
  ),
  employeeEsi: Yup.number().required(
    "% For ESI(Employee contribution) is required !"
  ),
  conveyance: Yup.number().required("Conveyance allowances is required !"),
  medical: Yup.number().required("Medical allowances is required !"),
  startGrossSalary1: Yup.number().required("Fill this field !"),
  endGrossSalary1: Yup.number().required("Fill this field !"),
  professionalTax1: Yup.number().required("Fill this field !"),
  professionalTax2: Yup.number().required("Fill this field !"),
  professionalTax3: Yup.number().required("Fill this field !"),
});

const Configure = () => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      const res = await change(`payrolls/createPayrollConfig`, {
        body: {
          basicSalary: values?.basicSalary,
          hra: values?.hra,
          pfEmployee: values?.employeePf,
          pfEmployer: values?.employerPf,
          esiEmployee: values?.employeeEsi,
          esiEmployer: values?.employerEsi,
          conveyanceAllowances: values?.conveyance,
          medicalAllowances: values?.medical,
          variant: values?.variant,
          ptTaxes: [
            {
              startGrossSalary: values?.startGrossSalary1,
              endGrossSalary: values?.endGrossSalary1,
              tax: values?.professionalTax1,
            },
            {
              startGrossSalary: values?.startGrossSalary2,
              endGrossSalary: values?.endGrossSalary2,
              tax: values?.professionalTax2,
            },
            {
              startGrossSalary: values?.startGrossSalary3,
              tax: values?.professionalTax3,
            },
          ],
        },
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Something went wrong!",
          "error"
        );
        setLoading(false);
        return;
      }
      Swal.fire(
        `Success`,
        `Payroll Configuration Set Successfully !`,
        `success`
      );
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
    <PanelLayout title="Payroll configure ">
      <section className="lg:px-8 px-2 lg:py-4 py-2">
        <div className="px-2 lg:px-0">
          <AdminBreadcrumbs links={links} />
        </div>
        <section className="w-full px-0 lg:py-4 py-2 flex justify-center items-center">
          <div className="lg:p-6 p-2 lg:w-3/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
                <Form>
                  <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
                    Payroll Configuration
                  </h1>
                  {/* <div className="flex justify-end">
										<Button variant="outlined" startIcon={<Add />}>
											Add New Field
										</Button>
									</div> */}
                  <div className="grid lg:grid-cols-2">
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="lg:py-2 py-1">
                        <InputLabel htmlFor="basicSalary">
                          Basic Salary % <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="basicSalary"
                        type="number"
                        // placeholder="% for basic salary"
                        name="basicSalary"
                        value={values.basicSalary}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.basicSalary && !!errors.basicSalary}
                        helperText={touched.basicSalary && errors.basicSalary}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="hra">
                          HRA % <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for HRA"
                        id="hra"
                        name="hra"
                        value={values.hra}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.hra && !!errors.hra}
                        helperText={touched.hra && errors.hra}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="employeePf">
                          PF %(Employee Contribution){" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for PF"
                        id="employeePf"
                        name="employeePf"
                        value={values.employeePf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.employeePf && !!errors.employeePf}
                        helperText={touched.employeePf && errors.employeePf}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="employerPf">
                          PF %(Employer Contribution){" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for PF"
                        id="employerPf"
                        name="employerPf"
                        value={values.employerPf}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.employerPf && !!errors.employerPf}
                        helperText={touched.employerPf && errors.employerPf}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="employeeEsi">
                          ESI %(Employee Contribution){" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for ESI"
                        id="employeeEsi"
                        name="employeeEsi"
                        value={values.employeeEsi}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.employeeEsi && !!errors.employeeEsi}
                        helperText={touched.employeeEsi && errors.employeeEsi}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="employerEsi">
                          ESI %(Employer Contribution){" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for ESI"
                        id="employerEsi"
                        name="employerEsi"
                        value={values.employerEsi}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.employerEsi && !!errors.employerEsi}
                        helperText={touched.employerEsi && errors.employerEsi}
                      />
                    </div>

                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="conveyance">
                          Conveyance allowances
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for ESI"
                        id="conveyance"
                        name="conveyance"
                        value={values.conveyance}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.conveyance && !!errors.conveyance}
                        helperText={touched.conveyance && errors.conveyance}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="medical">
                          Medical allowances
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        type="number"
                        // placeholder="% for ESI"
                        id="medical"
                        name="medical"
                        value={values.medical}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.medical && !!errors.medical}
                        helperText={touched.medical && errors.medical}
                      />
                    </div>

                    {/* Profession tax range */}

                    <div className="lg:flex w-full lg:px-4 px-2 lg:py-2 py-1 lg:col-span-2 justify-evenly">
                      <div>
                        <p className="text-center py-2 text-gray-500">
                          Gross Salary
                          <span className="text-red-600">*</span>
                        </p>
                        <div className="lg:flex grid gap-2 mb-2">
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="From"
                            id="startGrossSalary1"
                            name="startGrossSalary1"
                            value={values.startGrossSalary1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.startGrossSalary1 &&
                              !!errors.startGrossSalary1
                            }
                            helperText={
                              touched.startGrossSalary1 &&
                              errors.startGrossSalary1
                            }
                          />
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="TO"
                            id="endGrossSalary1"
                            name="endGrossSalary1"
                            value={values.endGrossSalary1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.endGrossSalary1 &&
                              !!errors.endGrossSalary1
                            }
                            helperText={
                              touched.endGrossSalary1 && errors.endGrossSalary1
                            }
                          />
                        </div>
                        <div className="lg:flex grid gap-2 mb-2">
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="From"
                            id="startGrossSalary2"
                            name="startGrossSalary2"
                            value={values.startGrossSalary2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.startGrossSalary2 &&
                              !!errors.startGrossSalary2
                            }
                            helperText={
                              touched.startGrossSalary2 &&
                              errors.startGrossSalary2
                            }
                          />
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="TO"
                            id="endGrossSalary2"
                            name="endGrossSalary2"
                            value={values.endGrossSalary2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.endGrossSalary2 &&
                              !!errors.endGrossSalary2
                            }
                            helperText={
                              touched.endGrossSalary2 && errors.endGrossSalary2
                            }
                          />
                        </div>
                        <div className="lg:flex grid gap-2">
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="Above last range"
                            id="startGrossSalary3"
                            name="startGrossSalary3"
                            value={values.startGrossSalary3}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.startGrossSalary3 &&
                              !!errors.startGrossSalary3
                            }
                            helperText={
                              touched.startGrossSalary3 &&
                              errors.startGrossSalary3
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <p className="text-center py-2 text-gray-500">
                          Professional Tax
                          <span className="text-red-600">*</span>
                        </p>
                        <div className="mb-2">
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="Tax Amount"
                            id="professionalTax1"
                            name="professionalTax1"
                            value={values.professionalTax1}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.professionalTax1 &&
                              !!errors.professionalTax1
                            }
                            helperText={
                              touched.professionalTax1 &&
                              errors.professionalTax1
                            }
                          />
                        </div>
                        <div className="mb-2">
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="Tax Amount"
                            id="professionalTax2"
                            name="professionalTax2"
                            value={values.professionalTax2}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.professionalTax2 &&
                              !!errors.professionalTax2
                            }
                            helperText={
                              touched.professionalTax2 &&
                              errors.professionalTax2
                            }
                          />
                        </div>
                        <div>
                          <TextField
                            size="small"
                            fullWidth
                            type="number"
                            placeholder="Tax Amount"
                            id="professionalTax3"
                            name="professionalTax3"
                            value={values.professionalTax3}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={
                              touched.professionalTax3 &&
                              !!errors.professionalTax3
                            }
                            helperText={
                              touched.professionalTax3 &&
                              errors.professionalTax3
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center lg:py-4 py-2">
                    <Button
                      type="submit"
                      variant="contained"
                      className="!bg-theme"
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="warning" />
                        ) : (
                          <Settings />
                        )
                      }
                    >
                      CONFIGURE
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
      </section>
    </PanelLayout>
  );
};

export default Configure;

const links = [
  { id: 1, page: "Payroll", link: "/admin/payroll" },
  { id: 2, page: "Configure", link: "/admin/employees/configure" },
];
