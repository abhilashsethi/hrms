import { Check, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AdminBreadcrumbs } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import PanelLayout from "layouts/panel";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as Yup from "yup";
const initialValues = {
  id: "",
  name: "",
  description: "",
  devURL: "",
  prodURL: "",
  gmail: "",
  github: "",
  startDate: "",
  userIDs: "",
};

const validationSchema = Yup.object().shape({
  devURL: Yup.string().required("Dev URL is required!"),
  prodURL: Yup.string().required("Prod URL is required!"),
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Name must only contain alphabetic characters")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required!"),

  gmail: Yup.string()
    .email("Invalid gmail address")
    .required("Gmail is required!"),
});

const CreateProjects = () => {
  const [loading, setLoading] = useState(false);
  const { data, isLoading, mutate } = useFetch<User[]>(`users`);
  const { change, isChanging } = useChange();

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    return;
    try {
      Swal.fire(`Info`, `Please Wait..., It will take Some Time!`, `info`);
      delete values.confirmPassword;
      const res = await change(`projects`, {
        body: values,
      });
      setLoading(false);
      if (res?.status !== 201) {
        Swal.fire("Error", res?.results?.msg || "Unable to Submit", "error");
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
    <PanelLayout title="Projects - SY HR MS">
      <section className="px-8 py-4">
        <AdminBreadcrumbs links={links} />
        <section className="w-full px-2 py-4 flex justify-center items-center">
          <div className="p-6 w-3/4 rounded-xl border-b-4 bg-white shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur }) => (
                <Form>
                  <h1 className="text-2xl uppercase md:text-xl lg:text-2xl text-slate-600 flex justify-center font-extrabold py-2">
                    Create Project
                  </h1>
                  <div className="grid lg:grid-cols-2">
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="name">
                          Project Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        id="name"
                        placeholder="Project Name"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="gmail">
                          Gmail <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Gmail"
                        id="gmail"
                        name="gmail"
                        value={values.gmail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.gmail && !!errors.gmail}
                        helperText={touched.gmail && errors.gmail}
                      />
                    </div>

                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="devURL">
                          Dev URL <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Dev URL"
                        id="devURL"
                        name="devURL"
                        value={values.devURL}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.devURL && !!errors.devURL}
                        helperText={touched.devURL && errors.devURL}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="prodURL">Prod URL</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Prod URL"
                        id="prodURL"
                        name="prodURL"
                        value={values.prodURL}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.prodURL && !!errors.prodURL}
                        helperText={touched.prodURL && errors.prodURL}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="github">Github Link</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Github Link"
                        id="github"
                        name="github"
                        value={values.github}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.github && !!errors.github}
                        helperText={touched.github && errors.github}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="startDate">Start Date</InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        placeholder="Start Date"
                        id="startDate"
                        name="startDate"
                        value={values.startDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.startDate && !!errors.startDate}
                        helperText={touched.startDate && errors.startDate}
                      />
                    </div>
                    <div className="px-4 py-2">
                      <div className="py-2">
                        <InputLabel htmlFor="employee">
                          Employee Name <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        select
                        fullWidth
                        name="userIDs"
                        value={values.userIDs}
                        onChange={handleChange}
                      >
                        {data?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                  <div className="flex justify-center py-4">
                    <Button
                      type="submit"
                      variant="contained"
                      className="!bg-theme !px-10 !py-3 hover:!bg-sky-800 hover:!shadow-xl"
                      startIcon={<Check />}
                    >
                      Submit
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

export default CreateProjects;
const links = [
  { id: 1, page: "Projects", link: "/admin/projects" },
  { id: 2, page: "All Projects", link: "/admin/projects/all-projects" },
];
