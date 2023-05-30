import {
  ArrowBack,
  ArrowForward,
  ArrowRight,
  BackHand,
  People,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Container,
  Drawer,
  IconButton,
  TextField,
} from "@mui/material";
import { PhotoViewerSmall } from "components/core";
import { useFetch } from "hooks";
import { User } from "types";

type Props = {
  open?: boolean | any;
  onClose: () => void;
};
const ChatGroupCreate = ({ open, onClose }: Props) => {
  const { data: employeeData } = useFetch<User[]>(`users`);
  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
        }}
      >
        <section className="relative w-full overflow-hidden py-6">
          <div className="font-semibold flex gap-2 items-center">
            <IconButton size="small" onClick={() => onClose()}>
              <ArrowBack className="!text-red-600" />
            </IconButton>
            <span>Create Group</span>
          </div>
          <h1 className="mt-4 font-semibold flex gap-2 items-center">
            <People /> Add Group Participants
          </h1>
          <div className="mt-2">
            <Autocomplete
              multiple
              options={employeeData ? employeeData : []}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                  {...props}
                >
                  <div className="flex gap-2 items-center">
                    <PhotoViewerSmall
                      size="2rem"
                      photo={option?.photo}
                      name={option?.name}
                    />
                    {option.name}
                  </div>
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Members"
                  placeholder="Employees"
                />
              )}
            />
          </div>
          <div className="flex justify-center mt-8">
            <div className="h-16 w-16 bg-emerald-500 rounded-full flex justify-center items-center shadow-md">
              <ArrowForward />
            </div>
          </div>
        </section>
      </Container>
    </Drawer>
  );
};

export default ChatGroupCreate;

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
];
