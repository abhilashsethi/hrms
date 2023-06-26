import {
  Add,
  Delete,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { FieldArray, Form, Field, Formik } from "formik";

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
}

const TenderCreateDocuments = ({ handleBack, handleNext }: Props) => {


  const initialValues = {
    inputFields: [{ docTitle: '', doc: '' }]
  };

  const handleSubmit = (values: any) => {
    // Access the values of all input fields
    console.log(values.inputFields);
  };
  return (
    <section>
      <div className="w-full my-6 py-6 px-20 flex justify-center">

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => (
            <Form>
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
              <Button type="submit">Submit</Button>
            </Form>
          )}
        </Formik>
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
          variant="contained"
          startIcon={<KeyboardArrowRight />}
          className="!bg-green-600"
          onClick={handleNext}
        >
          NEXT
        </Button>
      </div>
    </section>
  );
};

export default TenderCreateDocuments;
