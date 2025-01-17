import { Check } from "@mui/icons-material";
import { Button, CircularProgress, InputLabel, TextField } from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
const initialValues = {
  message: "",
};

const validationSchema = Yup.object().shape({
  message: Yup.string()
    .trim() // Remove leading and trailing whitespaces
    .required("Required!")
    .matches(/\S/, "Message cannot be empty or contain only whitespace"), // Ensure at least one non-whitespace character
});

const CreateSupport = () => {
  // const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();

  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    const requestBody = {
      message: values.message,
      ...(user?.isClient && { isClient: true }), // Add isClient if user?.isClient is true
    };
    try {
      const res = await change(`supports`, {
        body: requestBody,
      });

      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully submitted!`, `success`);
      resetForm();

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
    <PanelLayout title="Create Support ">
      <section className="md:px-8 px-2 md:py-4 py-2">
        <div className="px-2 md:px-0">
          <AdminBreadcrumbs links={links} />
        </div>
        <section className="w-full px-0 md:py-4 py-2 flex justify-center items-center">
          <div className="md:p-6 p-2 md:w-3/4 w-full rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
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
                  <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
                    Support
                  </h1>
                  <div className="grid lg:grid-cols-1">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="message">
                          Message <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Message"
                        id="message"
                        name="message"
                        value={values.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.message && !!errors.message}
                        helperText={touched.message && errors.message}
                      />
                    </div>
                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      type="submit"
                      variant="contained"
                      className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                      disabled={loading}
                      startIcon={
                        loading ? (
                          <CircularProgress color="secondary" size={20} />
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
        </section>
      </section>
    </PanelLayout>
  );
};

export default CreateSupport;

const links = [
  { id: 1, page: "Support", link: "/admin/support/create-support" },
];
const Status_Type = [
  {
    id: 1,
    name: "Completed",
    value: "completed",
  },
  {
    id: 2,
    name: "Pending",
    value: "pending",
  },
];
