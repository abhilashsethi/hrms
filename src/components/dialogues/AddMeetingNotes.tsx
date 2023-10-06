import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useAuth, useChange } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";
import * as Yup from "yup";

interface Props {
  open: boolean;
  handleClose: any;
  details?: any;
  mutate?: any;
}

const validationSchema = Yup.object().shape({
  text: Yup.string().required("Note text is Required"),
  link: Yup.string().required("Choose Document"),
});
const AddMeetingNotes = ({ open, handleClose, details, mutate }: Props) => {
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const initialValues = {
    text: "",
    link: null,
  };

  const { change } = useChange();
  const handleSubmit = async (values: any) => {
    // console.log(values);
    setLoading(true);
    try {
      const dtype = values?.link?.type.split("/")[1];
      const url = await uploadFile(values?.link, `${Date.now()}.${dtype}`);
      const notes = [
        {
          text: values.text,
          link: url,
          docType: values?.link?.type,
          addedById: user?.id,
        },
      ];
      const res = await change(`meetings/add-notes/${details?.id}`, {
        method: "PATCH",
        body: {
          notes,
        },
      });
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Something went wrong!",
          "error"
        );
        return;
      }
      Swal.fire(`Success`, "Note added successfully!!", "success");
      mutate();
      handleClose();
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
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth="lg"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">
        <p className="text-center text-xl font-bold text-theme tracking-wide">
          ADD NOTES
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
      <DialogContent className="app-scrollbar" sx={{ p: 2 }}>
        <div className="md:w-[40rem] w-[72vw] md:px-4 px-2 tracking-wide">
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
              <Form className="w-full">
                <p className="font-medium text-gray-700 mb-2">Note Text</p>
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Notes"
                  name="text"
                  value={values.text}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.text && !!errors.text}
                  helperText={touched.text && errors.text}
                />

                <p className="font-medium text-gray-700 my-2">Choose File</p>
                <TextField
                  type="file"
                  name="link"
                  size="small"
                  fullWidth
                  placeholder="Choose Document"
                  //   value={values?.link}
                  onChange={(e: any) =>
                    setFieldValue("link", e?.target?.files[0])
                  }
                  onBlur={handleBlur}
                  error={touched.link && !!errors.link}
                  helperText={touched.link && errors.link}
                />
                {/* {values.link && (
                  <>
                    <div className="py-2">
                      <img
                        className="w-24 object-contain"
                        src={URL.createObjectURL(values.link)}
                        alt="Preview"
                      />
                    </div>
                  </>
                )} */}

                <div className="flex justify-center mt-4">
                  <Button
                    type="submit"
                    className={`${loading ? "!bg-gray-300" : "bg-theme"}`}
                    variant="contained"
                    disabled={loading}
                    startIcon={
                      loading ? (
                        <CircularProgress size={20} color="secondary" />
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
      </DialogContent>
    </Dialog>
  );
};

export default AddMeetingNotes;
const leavesType = [
  { id: 1, value: "First_Half" },
  { id: 2, value: "Second_Half" },
];
