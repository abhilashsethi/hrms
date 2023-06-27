import {
  Add,
  Delete,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FieldArray, Form, Field, Formik } from "formik";
import useFormStore from "hooks/userFormStore";
import { useState } from "react";
import * as Yup from "yup";

interface Props {
  handleBack?: () => void;
  handleNext: () => void;
}
const validationSchema = Yup.object().shape({
  inputFields: Yup.array().of(
    Yup.object().shape({
      docTitle: Yup.string().required('Document Title is required'),
      doc: Yup.mixed().required('File is required'),
    })
  ),
});
const TenderCreateDocuments = ({ handleBack, handleNext }: Props) => {
  const [loading, setLoading] = useState(false);
  const { setTender, tender } = useFormStore();
  const initialValues = {
    inputFields: [{ docTitle: tender?.docTitle || "", doc: tender?.doc || "" }]
  };
  const handleSubmit = (values: any) => {
    // Access the values of all input fields
    console.log(values);
    setTender(...tender, ...values)
    console.log(tender);
    handleNext()
  };

  return (
    <section>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values }) => (
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
                            name={`inputFields[${index}].docTitle`}
                          />
                          <h1 className="">Upload file </h1>
                          <Field
                            as={TextField}
                            fullWidth
                            size="small"
                            type="file"
                            name={`inputFields[${index}].doc`}
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
              {/* <Button type="submit">Submit</Button> */}

            </div>
            <div className="flex justify-between items-center px-20">
              <Button
                variant="contained"
                startIcon={<KeyboardArrowLeft />}
                className="!bg-red-600"
                onClick={handleBack}
              >
                PREV
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  loading ? <CircularProgress size={20} /> : <KeyboardArrowRight />
                }
                className="!bg-green-600"
              >
                NEXT
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default TenderCreateDocuments;
