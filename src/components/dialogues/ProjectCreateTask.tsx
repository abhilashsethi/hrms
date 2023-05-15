import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  TextField,
  Tooltip,
} from "@mui/material";
import { useChange, useFetch } from "hooks";
import { useRouter } from "next/router";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Check, Close } from "@mui/icons-material";
import Swal from "sweetalert2";
import moment from "moment";
import { useState } from "react";

interface Props {
  open?: any;
  handleClose?: any;
  mutate?: any;
  id?: any;
}
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
});

const ProjectCreateTask = ({ open, handleClose, mutate, id }: Props) => {
  const { data, isLoading } = useFetch<any>(`users`);
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const router = useRouter();
  const { data: employData } = useFetch<any>(`projects/${id}`);
  const initialValues = {
    title: "",
    description: "",
    status: "",
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      const res = await change(`projects/${id}`, {
        method: "PATCH",
        // isFormData: true,
        body: values,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Update", "error");
        setLoading(false);
        return;
      }
      mutate();
      Swal.fire(`Success`, `Updated Successfully`, `success`);
      handleClose();
      return;
    } catch (error) {}
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        maxWidth="lg"
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ p: 2, minWidth: "40rem !important" }}
        >
          <p className="text-center text-md font-bold text-theme te tracking-wide">
            CREATE TASK
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
        <DialogContent className="app-scrollbar" sx={{ p: 3 }}>
          <div className="md:w-[50rem] w-[72vw] md:px-4 px-2 tracking-wide flex flex-col gap-3 text-sm py-4">
            <div className="items-center w-full">
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
                    <div className="grid grid-cols-2 w-full">
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">Title</InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="title"
                          placeholder="Title"
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
                          <InputLabel htmlFor="name">Description</InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="title"
                          placeholder="Description"
                          name="description"
                          value={values.description}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.description && !!errors.description}
                          helperText={touched.description && errors.description}
                        />
                      </div>
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">Assign Members</InputLabel>
                        </div>
                        <div>
                          <Autocomplete
                            multiple
                            options={team}
                            size="small"
                            getOptionLabel={(option) => option.title}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Select Members"
                                placeholder="Members"
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="px-4 py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">Status</InputLabel>
                        </div>
                        <TextField
                          fullWidth
                          size="small"
                          id="status"
                          placeholder="Status"
                          name="status"
                          value={values.status}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.status && !!errors.status}
                          helperText={touched.status && errors.status}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center py-4">
                      <Button
                        type="submit"
                        variant="contained"
                        className="!bg-theme"
                        disabled={loading}
                        startIcon={
                          loading ? <CircularProgress size={20} /> : <Check />
                        }
                      >
                        UPDATE
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProjectCreateTask;

const team = [
  { title: "Srinu Reddy", year: 1994 },
  { title: "Loushik Kumar", year: 1972 },
  { title: "Chinmay", year: 1974 },
  { title: "Abhilash", year: 2008 },
  { title: "Sunil", year: 1957 },
];
