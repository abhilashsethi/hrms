import { Check, Close, CloudUpload } from "@mui/icons-material";
import {
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
import { PDF } from "assets/home";
import { ErrorMessage, Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
  open?: any;
  handleClose?: any;
  mutate?: any;
}
type IMAGES_TYPES = {
  file: File;
  uniId: string;
  previewURL: string;
};
const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required!"),
  description: Yup.string().required("Required field!"),
});

const ProjectCreateTicket = ({ open, handleClose, mutate }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { user } = useAuth();
  const docsRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const initialValues = {
    title: "",
    description: "",
    uploadDoc: [] as IMAGES_TYPES[],
  };
  const handleSubmit = async (values: any) => {
    setLoading(true);

    try {
      const docsUrls = [];
      for (const docs of values?.uploadDoc) {
        // console.log(docs?.uniId);

        const url = await uploadFile(
          docs?.file,
          `${Date.now()}.${docs?.uniId}`
        );
        docsUrls.push({ link: url, filetype: docs?.uniId });
      }
      const reqData = {
        documents: docsUrls,
        clientId: user?.id,
        title: values?.title,
        description: values?.description,
        associatedProjectId: router?.query?.id,
      };
      const res = await change(`tickets`, {
        body: reqData,
      });
      setLoading(false);
      if (res?.status !== 200) {
        Swal.fire("Error", res?.results?.msg || "Unable to Create", "error");
        setLoading(false);
        return;
      }
      Swal.fire(`Success`, `Created Successfully`, `success`);
      mutate();
      setLoading(false);
      handleClose();
      return;
    } catch (error) {
      console.log(error);
    }
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
            CREATE TICKET
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
                    <div className="grid w-full">
                      <div className="py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">
                            Title <span className="text-red-600">*</span>
                          </InputLabel>
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
                      <div className="py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">
                            Description <span className="text-red-600">*</span>
                          </InputLabel>
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
                      {/* ----------------------------multiple Docs component------------------ */}
                      <div className="py-2">
                        <div className="py-2">
                          <InputLabel htmlFor="name">
                            Upload Document
                          </InputLabel>
                        </div>
                        <div
                          onClick={() => docsRef?.current?.click()}
                          className="min-h-[8rem] py-6 w-full border-[1px] border-dashed border-theme cursor-pointer flex flex-col items-center justify-center text-sm"
                        >
                          <input
                            className="hidden"
                            ref={docsRef}
                            type="file"
                            multiple
                            onChange={(event) => {
                              const files: File[] = Array.from(
                                event.target.files!
                              );
                              const fileObjects = files.map((file: File) => {
                                const uniId = file.type
                                  .split("/")[1]
                                  .split("+")[0]; // Get unique ID of the image
                                return {
                                  file,
                                  previewURL: URL.createObjectURL(file),
                                  uniId, // Add unique ID to the file object
                                };
                              });
                              setFieldValue("uploadDoc", fileObjects);
                            }}
                          />
                          <div className="flex justify-center items-center gap-2 flex-wrap">
                            {values.uploadDoc.map((image, index) => (
                              <div className="" key={index}>
                                <img
                                  className="w-20 object-contain"
                                  src={PDF.src}
                                  alt={`Image ${index + 1}`}
                                />
                              </div>
                            ))}
                          </div>
                          <p>Upload Docs</p>
                          <CloudUpload fontSize="large" color="primary" />
                          <ErrorMessage
                            name="uploadDoc"
                            component="div"
                            className="error"
                          />
                        </div>
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
                        CREATE
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

export default ProjectCreateTicket;

const team = [
  { title: "Srinu Reddy", year: 1994 },
  { title: "Loushik Kumar", year: 1972 },
  { title: "Chinmay", year: 1974 },
  { title: "Abhilash", year: 2008 },
  { title: "Sunil", year: 1957 },
];

const statuses = [
  { id: 1, value: "Open" },
  { id: 2, value: "Pending" },
  { id: 3, value: "Ongoing" },
  // { id: 4, value: "Completed" },
];
