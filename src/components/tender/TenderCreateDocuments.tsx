import {
  Add,
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
    inputFields: [{ field1: '', field2: '' }]
  };

  const handleSubmit = (values: any) => {
    // Access the values of all input fields
    console.log(values.inputFields);
  };
  return (
    <section>
      <div className="w-full my-6 py-6 px-20 flex justify-center">
        {/* <div className="w-1/2">
          <div className="flex justify-end w-full">
            <Button
              variant="contained"
              startIcon={<Add />}
              className="!bg-blue-600"
            >
              ADD MORE
            </Button>
          </div>
          <h1 className="mb-3">Document Title </h1>
          <TextField placeholder="Document Title" size="small" fullWidth />
          <h1 className="mb-3 mt-3">Upload file </h1>
          <input
            className="border-2 w-full py-4 px-4 rounded-md cursor-pointer"
            type="file"
            name=""
            id=""
          />
        </div> */}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray name="inputFields">
                {({ remove, push }) => (
                  <div>
                    {values.inputFields.map((field, index) => (
                      <div key={index}>
                        <Field
                          as={TextField}
                          name={`inputFields[${index}].field1`}
                          label="Field 1"
                        />
                        <Field
                          as={TextField}
                          name={`inputFields[${index}].field2`}
                          label="Field 2"
                        />
                        <Button type="button" onClick={() => remove(index)}>
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button type="button" onClick={() => push({ field1: '', field2: '' })}>
                      Add Field
                    </Button>
                  </div>
                )}
              </FieldArray>
              <Button type="submit">Submit</Button>
            </form>
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
