import { MenuItem, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useFetch } from "hooks";

const EmployeeAllAttendance = () => {
  const [status, setStatus] = useState<{
    totalPresent?: number | undefined;
    totalAbsent?: number | undefined;
  }>({
    totalPresent: 0,
    totalAbsent: 0,
  });
  const [progress, setProgress] = React.useState(0);
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const { data: currentDateData } = useFetch<any>(
    `attendances/${new Date().toISOString()}/all`
  );
  const { data: attendanceData } = useFetch<any>(
    `attendances/get-by-month?month=${activeMonth}`
  );

  useEffect(() => {
    const data = attendanceData?.filter((item: any) => item?.present);
    let present = Number(
      data?.reduce((acc: any, obj: any) => {
        return acc + Number(obj?.present);
      }, 0)
    );
    let absent = Number(
      data?.reduce((acc: any, obj: any) => {
        return acc + Number(obj?.absent);
      }, 0)
    );
    setStatus({ totalPresent: present, totalAbsent: absent });
  }, [attendanceData]);

  useEffect(() => {
    let total = Number(status?.totalPresent) + Number(status?.totalAbsent);
    const percentage = (Number(status?.totalPresent) / total) * 100;
    setProgress(percentage);
  }, [attendanceData, status?.totalPresent]);

  // console.log(currentDateData);

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
            onChange={(e: any) => setActiveMonth(e.target.value)}
            variant="outlined"
            defaultValue={new Date().getMonth()}
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.id}>
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
            <p className="font-semibold">{status?.totalPresent || 0} </p>
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 bg-emerald-500 rounded-sm"></div>
              <p>PRESENT</p>
            </div>
          </div>
          <div>
            <p className="font-semibold">{status?.totalAbsent || 0} </p>
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
  { id: 0, value: "January" },
  { id: 1, value: "February" },
  { id: 2, value: "March" },
  { id: 3, value: "April" },
  { id: 4, value: "May" },
  { id: 5, value: "June" },
  { id: 6, value: "July" },
  { id: 7, value: "August" },
  { id: 8, value: "September" },
  { id: 9, value: "October" },
  { id: 10, value: "November" },
  { id: 11, value: "December" },
];
