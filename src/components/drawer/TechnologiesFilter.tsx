import {
  Construction,
  FilterListRounded,
  MoreHoriz,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  Drawer,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useFetch } from "hooks";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  setEmpName?: any;
  setClientName?: any;
  setTechnologies?: any;
};
const initialValues = {
  empName: [],
  clientName: [],
  technologies: [],
};
const TechnologiesFilter = ({
  open,
  onClose,
  setEmpName,
  setTechnologies,
  setClientName,
}: Props) => {
  const { data: employeesData } = useFetch<any[]>(`users`);
  const { data: clientData } = useFetch<any[]>(`clients`);
  const { data: techData } = useFetch<any[]>(`technologies`);
  const handleSubmit = async (values: any) => {
    console.log(values);
  };
  return (
    <>
      <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
        <Container
          style={{
            width: "30vw",
            marginTop: "3.5vh",
          }}
        >
          <p className="text-lg font-bold text-theme flex gap-3 items-center pb-4">
            <MoreHoriz />
            More Filters
          </p>
          <div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                setFieldValue,
              }) => (
                <Form>
                  <h4 className="text-sm font-light">
                    Please select the fields to filter the projects.
                  </h4>
                  <div>
                    <h1 className="mt-4 mb-2">Employee Name </h1>
                    <Autocomplete
                      multiple
                      options={employeesData ? (employeesData as any) : []}
                      value={employeesData?.filter((item: any) =>
                        values?.empName?.includes(item?.name)
                      )}
                      id="empName"
                      onChange={(e: any, r: any) => {
                        setFieldValue(
                          "empName",
                          r?.map((data: { name: any }) => data?.name)
                        );
                      }}
                      getOptionLabel={(option: any) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Employee Names"
                          onBlur={handleBlur}
                          placeholder="Select Employees"
                        />
                      )}
                    />
                    <h1 className="mt-4 mb-2">Client Name </h1>
                    <Autocomplete
                      multiple
                      options={clientData ? (clientData as any) : []}
                      value={values?.clientName}
                      id="clientName"
                      onChange={(e: any, r: any) => {
                        setFieldValue(
                          "clientName",
                          r?.map((data: { name: string }) => data?.name)
                        );
                      }}
                      getOptionLabel={(option: any) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Client Names"
                          placeholder="Select Clients"
                        />
                      )}
                    />
                    <h1 className="mt-4 mb-2">Technologies </h1>
                    <Autocomplete
                      multiple
                      options={techData ? (techData as any) : []}
                      value={values?.technologies}
                      id="technologies"
                      onChange={(e: any, r: any) => {
                        setFieldValue(
                          "technologies",
                          r?.map((data: { name: string }) => data?.name)
                        );
                      }}
                      getOptionLabel={(option: any) => option?.name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Technologies"
                          placeholder="Select Technologies"
                        />
                      )}
                    />
                  </div>
                  <div className="flex justify-center mt-10">
                    <Button
                      type="submit"
                      startIcon={<FilterListRounded />}
                      variant="contained"
                      className="!bg-theme"
                    >
                      Filter
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Container>
      </Drawer>
    </>
  );
};

export default TechnologiesFilter;

const top100Films = [
  { title: "Srinu Reddy", year: 1994 },
  { title: "Loushik Giri", year: 1972 },
  { title: "Trupti Kar", year: 1974 },
  { title: "Javascript", year: 2008 },
  { title: "TypeScript", year: 1957 },
  { title: "React", year: 1993 },
  { title: "Next JS", year: 1994 },
  {
    title: "Redux",
    year: 2003,
  },
];
