import { KeyboardBackspace, East, ArrowRightAlt } from "@mui/icons-material";
import { FormControl, IconButton, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";

const CreateHeader = () => {
  const { back } = useRouter();

  return (
    <section className="w-full bg-theme text-white">
      <div className="flex container mx-auto p-4 justify-between gap-4 items-center">
        <div className="flex gap-4 items-center">
          <IconButton onClick={back}>
            <KeyboardBackspace className="!text-white" />
          </IconButton>
          <span className="text-gray-100/20 ">|</span>
          <p className="font-medium  tracking-wide">New Email</p>
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-medium text-xs  tracking-wide">
            Choose Template <ArrowRightAlt />{" "}
          </p>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              className="!border-white !text-white "
              defaultValue={"normal"}
            >
              <MenuItem value="normal">
                <em>Normal</em>
              </MenuItem>
              <MenuItem value={10}>Salary Template</MenuItem>
              <MenuItem value={20}>Email Invitation</MenuItem>
              <MenuItem value={30}>Programme</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
    </section>
  );
};

export default CreateHeader;
