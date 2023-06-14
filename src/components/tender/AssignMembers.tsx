import {
  FileCopy,
  FindInPage,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Search,
  Task,
  Timeline,
} from "@mui/icons-material";
import { Autocomplete, Button, TextField } from "@mui/material";
import { useFetch } from "hooks";

interface Props {
  handleBack?: () => void;
  handleNext?: () => void;
}

const AssignMembers = ({ handleBack, handleNext }: Props) => {
  const { data: employees } = useFetch<any>(`users`);
  return (
    <section>
      <div className="mb-8 w-full px-20 mt-8">
        <div className="flex gap-2 items-center">
          <div className="h-3 w-3 bg-slate-600 rounded-sm"></div>
          <h1>Select the members for tender management.</h1>
        </div>
        <div className="w-4/5">
          <div className="mt-6 flex justify-between">
            <h1 className="flex gap-3 items-center">
              <Search fontSize="small" /> Search and filter
            </h1>
            <div className="w-1/2">
              <Autocomplete
                options={employees}
                fullWidth
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.clientId
                }
                id="clientId"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select Member"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <h1 className="flex gap-3 items-center">
              <FileCopy fontSize="small" /> Documentation
            </h1>
            <div className="w-1/2">
              <Autocomplete
                options={employees}
                fullWidth
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.clientId
                }
                id="clientId"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select Member"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <h1 className="flex gap-3 items-center">
              <FindInPage fontSize="small" /> Review
            </h1>
            <div className="w-1/2">
              <Autocomplete
                options={employees}
                fullWidth
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.clientId
                }
                id="clientId"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select Member"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <h1 className="flex gap-3 items-center">
              <Task fontSize="small" /> Submission
            </h1>
            <div className="w-1/2">
              <Autocomplete
                options={employees}
                fullWidth
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.clientId
                }
                id="clientId"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select Member"
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <h1 className="flex gap-3 items-center">
              <Timeline fontSize="small" /> Track
            </h1>
            <div className="w-1/2">
              <Autocomplete
                options={employees}
                fullWidth
                getOptionLabel={(option: any) => option.name}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.clientId
                }
                id="clientId"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    placeholder="Select Member"
                  />
                )}
              />
            </div>
          </div>
        </div>
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

export default AssignMembers;
