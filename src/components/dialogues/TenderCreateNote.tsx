import { Check, Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputLabel,
  MenuItem,
  TextField,
  Tooltip
} from "@mui/material";
import { Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useRef, useState } from "react";
import * as Yup from "yup";

interface Props {
  open: any;
  handleClose: any;
  mutate?: any;
  tenderData?: any;
}

const TenderCreateNote = ({ open, handleClose, mutate, tenderData }: Props) => {
  const [loading, setLoading] = useState(false);
  const { data: branchData } = useFetch<any>(`branches`);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { change } = useChange();

  const initialValues = {
    note: "",
  };

  const validationSchema = Yup.object().shape({
    note: Yup.string().required("Note is required!"),

  });

  const handleSubmit = async (values: any) => {
    setLoading(true);
    console.log(values);
    return
  };
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          id="customized-dialog-title"
          sx={{ p: 2, maxWidth: "18rem !important" }}
        >
          <p className="text-center text-xl font-bold text-theme tracking-wide">
            CREATE NOTE
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
          <div className="w-full md:px-4 px-2 tracking-wide">
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
              }) => (
                <Form>
                  <div className="grid">

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="note">
                          Note <span className="text-red-600">*</span>
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        placeholder="Add Some Note"
                        id="note"
                        name="note"
                        value={values.note}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.note && !!errors.note}
                        helperText={touched.note && errors.note}
                      />
                    </div>

                  </div>
                  <div className="flex justify-center md:py-4 py-2">
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      className="!bg-green-500"
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

        </DialogContent>
      </Dialog>
    </>
  );
};

export default TenderCreateNote;
