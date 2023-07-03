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
import { SingleDocUpdate } from "components/core";
import { ErrorMessage, Form, Formik } from "formik";
import { useChange, useFetch } from "hooks";
import moment from "moment";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { Tender } from "types";
import { deleteFile, uploadFile } from "utils";
import * as Yup from "yup";

interface TenderDoc {
  link?: any;
  title?: string;
  id?: string;
}
interface Props {
  open: boolean;
  handleClose: () => void;
  mutate: () => void;
  tenderData?: TenderDoc;
}

const UpdateTenderDocument = ({ open, handleClose, mutate, tenderData }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { change } = useChange();
  interface InputField {
    title: string;
    docs: any;
  }
  const initialValues = {
    title: `${tenderData?.title ? tenderData?.title : ""}`,
    docs: `${tenderData?.link ? tenderData?.link : ""}`,
  };

  const validationSchema = Yup.object().shape({
    // docs: Yup.string().required("Document is required!"),
    title: Yup.string().required("Document Name is required!"),
  });
  const handleSubmit = async (values: InputField) => {
    setLoading(true);
    try {
      if (tenderData?.link !== values?.docs) {
        const uniId = values?.docs?.name?.split('.').pop();
        const url = values?.docs ? await uploadFile(
          values?.docs,
          `${Date.now()}.${uniId}`
        ) : undefined;
        if (tenderData?.id) {
          await deleteFile(String(tenderData?.link?.split("/").reverse()[0]));
        }
        const res = await change(`tenders/update-doc/of-tender/${tenderData?.id}`, {
          method: "PATCH",
          body:
            { title: values?.title, link: url, tenderId: router?.query?.id },
        });
        if (res?.status !== 200) {
          Swal.fire(
            "Error",
            res?.results?.msg || "Unable to Submit",
            "error"
          );
          setLoading(false);
          return;
        }
        setLoading(false);
        Swal.fire(`Success`, `Tender document updated successfully!`, `success`);
        mutate()
        handleClose()
        setLoading(false);
        return;
      }

      const res = await change(`tenders/update-doc/of-tender/${tenderData?.id}`, {
        method: "PATCH",
        body:
          { title: values?.title, link: values?.docs, tenderId: router?.query?.id },
      });
      if (res?.status !== 200) {
        Swal.fire(
          "Error",
          res?.results?.msg || "Unable to Submit",
          "error"
        );
        setLoading(false);
        return;
      }
      setLoading(false);
      Swal.fire(`Success`, `Tender document updated successfully!`, `success`);
      mutate()
      handleClose()
      setLoading(false);
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

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
          sx={{ p: 2, minWidth: "18rem !important" }}
        >
          <p className="text-center text-xl font-bold text-theme tracking-wide">
            UPDATE DOCUMENT
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
          <div className="px-2 md:w-[25rem] w-full tracking-wide">
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
                  <div className="grid">

                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="title">
                          Document Title
                        </InputLabel>
                      </div>
                      <TextField
                        size="small"
                        fullWidth
                        // placeholder="Email"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                      />
                    </div>
                    <div className="md:px-4 px-2 md:py-2 py-1">
                      <div className="py-2">
                        <InputLabel htmlFor="title">
                          Document
                        </InputLabel>
                      </div>
                      <SingleDocUpdate
                        values={values}
                        setImageValue={(event: any) => {
                          setFieldValue("docs", event.currentTarget.files[0]);
                        }}
                      >
                        <ErrorMessage name="docs" />
                      </SingleDocUpdate>
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

export default UpdateTenderDocument;
