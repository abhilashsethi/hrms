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

type Props = {
  open?: boolean | any;
  onClose: () => void;
};

const TechnologiesFilter = ({ open, onClose }: Props) => {
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
            <h4 className="text-sm font-light">
              Please select the fields to filter the projects.
            </h4>
            <div>
              <h1 className="mt-4 mb-2">Employee Name </h1>
              <Autocomplete
                multiple
                options={top100Films}
                getOptionLabel={(option) => option?.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Employee Names"
                    placeholder="Select Employees"
                  />
                )}
              />
              <h1 className="mt-4 mb-2">Client Name </h1>
              <Autocomplete
                multiple
                options={top100Films}
                getOptionLabel={(option) => option?.title}
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
                options={top100Films}
                getOptionLabel={(option) => option?.title}
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
                startIcon={<FilterListRounded />}
                variant="contained"
                className="!bg-theme"
              >
                Filter
              </Button>
            </div>
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
