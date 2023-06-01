import { ArrowBack, Check, People } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { User } from "types";
import * as yup from "yup";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};
const initialValues = {
  title: "",
  members: [],
  description: "",
};
const validationSchema = yup.object().shape({
  title: yup.string().required("Required!"),
  description: yup.string().required("Required!"),
  members: yup
    .array()
    .of(yup.string().required("Required!"))
    .min(1, "At least include one member!"),
});
const ChatGroupCreate = ({ open, onClose }: Props) => {
  const { data: employeeData } = useFetch<User[]>(`users`);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const handleSubmit = async (values: any, { resetForm }: any) => {
    setLoading(true);
    try {
      const res = await change(`chat`, {
        body: values,
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
      // mutate();
      onClose();
      Swal.fire(`Success`, `Created Successfully!`, `success`);
      resetForm();
      return;
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
        }}
      >
        <section className="relative w-full overflow-hidden py-6">
          <div className="font-semibold flex gap-2 items-center">
            <IconButton size="small" onClick={() => onClose()}>
              <ArrowBack className="!text-red-600" />
            </IconButton>
            <span>Create Group</span>
          </div>
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
              <Form className="flex flex-col gap-4">
                <h1 className="py-4 font-semibold">Group Title</h1>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  placeholder="Group title here"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
                <h1 className="mt-4 font-semibold flex gap-2 items-center">
                  <People /> Add Group Participants
                </h1>
                <div className="mt-2">
                  <Autocomplete
                    multiple
                    options={employeeData ? employeeData : []}
                    getOptionLabel={(option) => option.name}
                    onChange={(e, r) => {
                      setFieldValue(
                        "members",
                        r.map((data) => data?.id)
                      );
                    }}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                        {...props}
                      >
                        <div className="flex gap-2 items-center">
                          <PhotoViewerSmall
                            size="2rem"
                            photo={option?.photo}
                            name={option?.name}
                          />
                          {option.name}
                        </div>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        label="Select Members"
                        placeholder="Employees"
                        name="members"
                        value={values.members}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.members && !!errors.members}
                        helperText={touched.members && errors.members}
                      />
                    )}
                  />
                </div>
                <h1 className="py-4 font-semibold">Group Description</h1>
                <TextField
                  variant="standard"
                  size="small"
                  fullWidth
                  placeholder="Group description"
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
                <div className="flex justify-center mt-8">
                  <Button
                    disabled={loading}
                    type="submit"
                    variant="contained"
                    className="!bg-theme"
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
        </section>
      </Container>
    </Drawer>
  );
};

export default ChatGroupCreate;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
