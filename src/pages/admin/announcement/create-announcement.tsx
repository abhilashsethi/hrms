import {
  Autocomplete,
  Button,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { Campaign, Check } from "@mui/icons-material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import router from "next/router";
const initialValues = {
  title: "",
  message: "",
  announcementStatus: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Required!"),
  message: Yup.string().required("Required!"),
  announcementStatus: Yup.string().required("Required!"),
});

const CreateAnnouncement = () => {
  // const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const [isAnnouncement, setIsAnnouncement] = useState<string>("");
  const handleSubmit = async (values: any, { resetForm }: any) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await change(`supports`, {
        body: {
          message: values?.message,
        },
      });

      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully Submitted!`, `success`);
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
    <PanelLayout title="Create Announcements">
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
                  <h1 className="text-lg uppercase md:text-xl lg:text-2xl text-theme flex justify-center font-extrabold py-2">
                    Announcements <Campaign className="ml-2" />
                  </h1>
                  <div className="grid lg:grid-cols-1">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="message">
                          Title <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Title"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="announcementStatus">
                          Select Announcement Status{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>

                      <Autocomplete
                        fullWidth
                        size="small"
                        id="announcementStatus"
                        options={Status_Type || []}
                        onChange={(e: any, r: any) => {
                          setFieldValue("announcementStatus", r?.value);
                          setIsAnnouncement(r?.value);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Announcement Status"
                            // placeholder="Selected Gender"
                            onBlur={handleBlur}
                            error={
                              touched.announcementStatus &&
                              !!errors.announcementStatus
                            }
                            helperText={
                              touched.announcementStatus &&
                              errors.announcementStatus
                            }
                          />
                        )}
                      />
                    </div>
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
                      className="!bg-theme"
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

export default CreateAnnouncement;

const links = [
  { id: 1, page: "Support", link: "/admin/support/create-support" },
];
const Status_Type = [
  {
    id: 1,
    name: "Published",
    value: "published",
  },
  {
    id: 2,
    name: "Pending",
    value: "pending",
  },
];
