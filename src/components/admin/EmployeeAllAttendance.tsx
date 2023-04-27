import { MenuItem, TextField } from "@mui/material";
import React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const EmployeeAllAttendance = () => {
  function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
  ) {
    return (
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress size={80} variant="determinate" {...props} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
          >{`${Math.round(props.value)}%`}</Typography>
        </Box>
      </Box>
    );
  }
  const [progress, setProgress] = React.useState(80);

  return (
    <section className="w-full p-6 rounded-lg bg-white shadow-xl">
      <div className="flex justify-between items-center">
        <div>
          <p className="tracking-wide font-semibold">% Of Attendance</p>
        </div>
        <div className="w-1/2">
          <TextField
            select
            label="Select Month"
            fullWidth
            size="small"
            variant="outlined"
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="flex justify-between items-center py-10 px-4">
        <CircularProgressWithLabel value={progress} />
        <div className="flex gap-7 items-center">
          <div>
            <p className="font-semibold">80% </p>
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 bg-emerald-500 rounded-sm"></div>
              <p>PRESENT</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">20% </p>
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 bg-red-500 rounded-sm"></div>
              <p>ABSENT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmployeeAllAttendance;

const months = [
  { id: 1, value: "January" },
  { id: 2, value: "February" },
  { id: 3, value: "March" },
  { id: 4, value: "April" },
];
