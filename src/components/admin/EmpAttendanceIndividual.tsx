import { MenuItem, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
type Props = {
  employData?: any;
};
const EmpAttendanceIndividual = ({ employData }: Props) => {
  const [absents, setAbsents] = useState(0);
  const [progress, setProgress] = useState(80);
  const [activeMonth, setActiveMonth] = useState(
    `?month=${new Date().getMonth()}`
  );
  const router = useRouter();
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

  const { data: attendanceData } = useFetch<any>(
    `attendances/${employData?.id}${activeMonth}`
  );
  const date = new Date();
  const lastDayOfMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  useEffect(() => {
    let reqData = Number(lastDayOfMonth) - attendanceData?.length;
    setAbsents(reqData);
    const percent = (attendanceData?.length / Number(lastDayOfMonth)) * 100;
    setProgress(Number(percent));
  }, [attendanceData]);

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
            onChange={(e) => setActiveMonth(e.target?.value)}
          >
            {months.map((option) => (
              <MenuItem key={option.id} value={option.query}>
                {option.value}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <div className="grid justify-items-center items-center py-10 px-4">
        <div className="flex justify-between items-center ">
          {progress && <CircularProgressWithLabel value={progress} />}
        </div>
        <div className="flex gap-7 items-center">
          <div>
            <p className="font-semibold">{attendanceData?.length} </p>
            <div className="flex gap-2 items-center">
              <div className="h-3 w-3 bg-emerald-500 rounded-sm"></div>
              <p className="text-sm">TOTAL PRESENT IN THIS MONTH</p>
            </div>
          </div>
          {/* <div>
						<p className="font-semibold">{absents} </p>
						<div className="flex gap-2 items-center">
							<div className="h-3 w-3 bg-red-500 rounded-sm"></div>
							<p className="text-sm">TOTAL DAYS</p>
						</div>
					</div> */}
        </div>
      </div>
    </section>
  );
};

export default EmpAttendanceIndividual;

const months = [
  { id: 1, value: "January", query: "?month=0" },
  { id: 2, value: "February", query: "?month=1" },
  { id: 3, value: "March", query: "?month=2" },
  { id: 4, value: "April", query: "?month=3" },
  { id: 5, value: "May", query: "?month=4" },
  { id: 6, value: "June", query: "?month=5" },
  { id: 7, value: "July", query: "?month=6" },
  { id: 8, value: "August", query: "?month=7" },
  { id: 9, value: "September", query: "?month=8" },
  { id: 10, value: "October", query: "?month=9" },
  { id: 11, value: "November", query: "?month=10" },
  { id: 12, value: "December", query: "?month=11" },
];
