import {
  Add,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
}

const TenderCreateDocuments = ({ handleBack, handleNext }: Props) => {
  const initialValues = {
    inputFields: [{ value: '' }]
  };

  const handleSubmit = (values: any) => {
    // Access the values of all input fields
    console.log(values);
    console.log(values.inputFields.map((field: any) => field.value));
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
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {values.inputFields.map((field, index) => (
                <div key={index}>
                  <input
                    type="text"
                    name={`inputFields[${index}].value`}
                    value={field.value}
                    onChange={handleChange}
                  />
                  <button type="button" onClick={() => values.inputFields.splice(index, 1)}>
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => values.inputFields.push({ value: '' })}>
                Add Field
              </button>
              <button type="submit">Submit</button>
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
