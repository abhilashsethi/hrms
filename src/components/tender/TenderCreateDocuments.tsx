import {
  Add,
  Delete,
  KeyboardArrowRight
} from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import { Field, FieldArray, Form, Formik, FormikErrors } from "formik";
import { useChange, useForm } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { uploadFile } from "utils";

interface InputField {
  docTitle: string;
  doc: any;
}
interface Props {
  handleNext: () => void;
}
interface FormValues {
  inputFields: InputField[];
}

// const validationSchema = Yup.object().shape({
//   inputFields: Yup.array().of(
//     Yup.object().shape({
//       docTitle: Yup.string().required('Document Title is required'),
//       doc: Yup.mixed().required('File is required'),
//     })
//   ),
// });

const TenderCreateDocuments = ({ handleNext }: Props) => {
  const [loading, setLoading] = useState(false);
  const { change } = useChange();
  const { tender } = useForm();
  const initialValues = {
    inputFields: [{ docTitle: "", doc: "" }]
  };
  const handleSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      for (const docs of values?.inputFields) {
        console.log(docs);
        const uniId = docs?.doc?.split('.').pop();
        const url = docs?.doc ? await uploadFile(
          docs?.doc,
          `${Date.now()}.${uniId}`
        ) : undefined;
        console.log(url);
        const res = await change(`tenders/add-doc/to-tender`, {
          body:
            { title: docs?.docTitle, link: url, tenderId: tender?.id },
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
      }
      setLoading(false);
      Swal.fire(`Success`, `You have successfully submit!`, `success`);
      setLoading(false);
      handleNext()
      return;
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }

  };

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}
        enableReinitialize={true}
      // validationSchema={validationSchema}
      >
        {({ values, errors, handleBlur, touched }: {
          values: FormValues,
          errors: FormikErrors<FormValues>,
          handleBlur: (eventOrString: any) => void,
          touched: any
        }) => (
          <Form>
            <div className="w-full my-6 py-6 px-20 flex justify-center">
              <FieldArray name="inputFields">
                {({ remove, push }) => (
                  <div>
                    {values.inputFields.map((field, index) => (
                      <div key={index} className="my-2">
                        <div className="px-8 py-4 w-full grid gap-2 border-2 border-theme">
                          <h1 className="">Document Title </h1>
                          <Field
                            as={TextField}
                            fullWidth
                            size="small"
                            type="text"
                            onBlur={handleBlur}
                            name={`inputFields[${index}].docTitle`}
                          />
                          <h1 className="">Upload file </h1>
                          <Field
                            as={TextField}
                            fullWidth
                            size="small"
                            type="file"
                            name={`inputFields[${index}].doc`}
                            onBlur={handleBlur}
                          />
                          <div className="flex justify-end w-full">
                            <Button type="button"
                              variant="contained"
                              startIcon={<Delete />}
                              className="!bg-red-600"
                              onClick={() => remove(index)}>
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button type="button"
                      variant="contained"
                      startIcon={<Add />}
                      className="!bg-blue-600"
                      onClick={() => push({ docTitle: '', doc: '' })}>
                      ADD MORE FIELD
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>
            <div className="flex justify-end items-center px-20">
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                startIcon={
                  loading ? <CircularProgress size={20} /> : <KeyboardArrowRight />
                }
                className="!bg-green-600"
              >
                Next
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TenderCreateDocuments;
