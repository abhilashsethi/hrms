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
  bankName: "",
  branchName: "",
  acNo: "",
  companyName: "",
  ifscCode: "",
  swiftCode: "",
};

const validationSchema = Yup.object().shape({
  // bankName: Yup.string()
  // 	.required("Bank name is required")
  // 	.min(2, "Bank name is too short")
  // 	.max(50, "Bank name is too long")
  // 	.matches(/^[a-zA-Z\s]+$/, "Bank name can only contain letters and spaces"),
  // branchName: Yup.string().required("Branch name is required"),
  // acNo: Yup.string()
  // 	.required("Account number is required")
  // 	.matches(/^[0-9]{9,18}$/, "Invalid account number"),
  // companyName: Yup.string().required("Company name is required"),
  // ifscCode: Yup.string()
  // 	.required("IFSC code is required")
  // 	.matches(/^[A-Z]{4}[0][A-Z0-9]{6}$/, "Invalid IFSC code"),
  // swiftCode: Yup.string()
  // 	.matches(/^[A-Z]{6}[A-Z0-9]{2}([A-Z0-9]{3})?$/, "Invalid Swift code")
  // 	.required("Swift code is required"),
});

const BankAccountConfig = () => {
  const { change } = useChange();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    console.log(values);
    try {
      const res = await change(`quotations/create-bank-account`, {
        body: {
          bankName: values?.bankName,
          branchName: values?.branchName,
          accountNumber: values?.acNo,
          companyName: values?.companyName,
          ifscCode: values?.ifscCode,
          swiftCode: values?.swiftCode,
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
        `Bank account created Successfully !`,
        `success`
      );
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PanelLayout title="Account configure - Admin Panel">
      <section className="lg:px-8 px-2 lg:py-4 py-2">
        <div className="px-2 lg:px-0">
          <AdminBreadcrumbs links={links} />
        </div>
        <section className="w-full px-0 lg:py-4 py-2 flex justify-center items-center">
          <div className="lg:p-6 p-2 lg:w-2/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
                    Account Config
                  </h1>

                  <div className="grid lg:grid-cols-1">
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="lg:py-2 py-1">
                        <InputLabel htmlFor="bankName">
                          Bank Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="bankName"
                        // placeholder="% for basic salary"
                        name="bankName"
                        value={values.bankName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.bankName && !!errors.bankName}
                        helperText={touched.bankName && errors.bankName}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="branchName">
                          Branch Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="% for cgst"
                        id="branchName"
                        name="branchName"
                        value={values.branchName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.branchName && !!errors.branchName}
                        helperText={touched.branchName && errors.branchName}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="acNo">
                          Account Number <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="% for PF"
                        id="acNo"
                        name="acNo"
                        value={values.acNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.acNo && !!errors.acNo}
                        helperText={touched.acNo && errors.acNo}
                      />
                    </div>

                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="companyName">
                          Company Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="% for PF"
                        id="companyName"
                        name="companyName"
                        value={values.companyName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.companyName && !!errors.companyName}
                        helperText={touched.companyName && errors.companyName}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="ifscCode">
                          IFSC Code <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="% for PF"
                        id="ifscCode"
                        name="ifscCode"
                        value={values.ifscCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.ifscCode && !!errors.ifscCode}
                        helperText={touched.ifscCode && errors.ifscCode}
                      />
                    </div>
                    <div className="lg:px-4 px-2 lg:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="swiftCode">
                          SWIFT Code <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="% for PF"
                        id="swiftCode"
                        name="swiftCode"
                        value={values.swiftCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.swiftCode && !!errors.swiftCode}
                        helperText={touched.swiftCode && errors.swiftCode}
                      />
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

export default BankAccountConfig;

const links = [
  // { id: 1, page: "Payroll", link: "/admin/payroll" },
  {
    id: 2,
    page: "Account Configure",
    link: "/admin/quotation/bank-account-config",
  },
];
