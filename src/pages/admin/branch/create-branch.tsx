import {
  Check,
  CloudUpload,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  InputLabel,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { countries } from "schemas/Countries";
const initialValues = {
  name: "",
  phone: "",
  email: "",
  country: "",
  location: "",
  managerId: "",
  photos: [],
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required!"),
  phone: Yup.string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    )
    .min(6)
    .max(15),
  email: Yup.string()
    .email("Invalid email address"),

});

const CreateBranch = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: userData } = useFetch<any>(`users`);
  const { change } = useChange();
  const handleSubmit = async (values: any) => {
    try {
      console.log(values);
      const imagesWithUniIds = values?.photos?.map((img: any) => ({
        ...img,
        uniId: img.type.split("/")[1].split("+")[0]
      }));
      console.log(imagesWithUniIds);
      return
      setLoading(true);
      const res: any = await change(`branches`, {
        body: values,
      });
      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire("Error", res?.results?.message || "Unable to Submit", "info");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `You have successfully Created!`, `success`);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PanelLayout title="Create Employee - Admin Panel">
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
                    Create Branch
                  </h1>
                  <div className="grid lg:grid-cols-2">
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
                        <InputLabel htmlFor="name">
                          Branch Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="name"
                        placeholder="Branch Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
                        <InputLabel htmlFor="location">
                          Branch Location{" "}
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="location"
                        placeholder="Branch Location"
                        name="location"
                        value={values.location}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.location && !!errors.location}
                        helperText={touched.location && errors.location}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="md:py-2 py-1">
                        <InputLabel htmlFor="location">
                          Country
                          <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <Autocomplete
                        size="small"
                        options={countries}
                        autoHighlight
                        value={values?.country as any}
                        fullWidth
                        onChange={(e, r: any) =>
                          setFieldValue("country", r?.label)
                        }
                        renderOption={(props, option: any) => (
                          <Box
                            component="li"
                            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                            {...props}
                          >
                            <img
                              loading="lazy"
                              width="20"
                              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                              alt=""
                            />
                            {option?.label}
                          </Box>
                        )}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Choose a country"
                            name="country"
                            error={touched?.country && Boolean(errors?.country)}
                            onBlur={handleBlur}
                            helperText={touched?.country && errors?.country}
                            inputProps={{
                              ...params.inputProps,
                            }}
                          />
                        )}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="email">Email</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Phone"
                        id="phone"
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                      />
                    </div>

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="manager">
                          Assign Manager
                        </InputLabel>
                      </div>
                      <Autocomplete
                        fullWidth
                        size="small"
                        id="managerId"
                        options={userData || []}
                        onChange={(e: any, r: any) => {
                          setFieldValue("managerId", r?.id);
                        }}
                        getOptionLabel={(option: any) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Manager Name"
                            onBlur={handleBlur}
                            error={touched.managerId && !!errors.managerId}
                            helperText={touched.managerId && errors.managerId}
                          />
                        )}
                      />
                    </div>

                  </div>
                  {/* ----------------------------multiple image component------------------ */}
                  <div className="md:px-4 px-2 md:py-2 py-1">
                    <div className="py-2">
                      <InputLabel htmlFor="image">
                        Upload Images
                      </InputLabel>
                    </div>
                    <div
                      onClick={() => imageRef?.current?.click()}
                      className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
                    >
                      <input
                        className="hidden"
                        ref={imageRef}
                        type="file"
                        multiple
                        onChange={(event: any) => {
                          const files = Array.from(event.target.files);
                          const fileObjects = files.map((file: any) => ({
                            file,
                            previewURL: URL.createObjectURL(file),
                          }));
                          setFieldValue("photos", fileObjects);
                        }}
                      />
                      <div className="flex justify-center items-center gap-2 flex-wrap">
                        {values.photos.map((image: any, index) => (
                          <div className="" key={index}>
                            <img
                              className="w-40 object-contain"
                              src={image.previewURL}
                              alt={`Image ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <p>Upload Images</p>
                      <CloudUpload fontSize="large" color="primary" />
                      <ErrorMessage
                        name="photos"
                        component="div"
                        className="error"
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
        </section>
      </section>
    </PanelLayout>
  );
};

export default CreateBranch;

const links = [
  { id: 1, page: "branches", link: "/admin/branch" },
  { id: 2, page: "Create Branch", link: "/admin/branch/create-branch" },
];
