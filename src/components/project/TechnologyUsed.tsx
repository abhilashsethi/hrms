import { Check, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
import { AWS, CSS, JAVASCRIPT, NEXTJS, REACT } from "assets/svgicons";
import { useState } from "react";

const TechnologyUsed = () => {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <section className="w-full rounded-md p-6 mt-4 bg-white shadow-jubilation">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600">Technology Used</h1>
        <Tooltip title="Update">
          <IconButton onClick={() => setIsUpdate((prev) => !prev)} size="small">
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
      {isUpdate && (
        <>
          <div>
            <Autocomplete
              multiple
              options={team}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  label="Select Technologies"
                  placeholder="Technologies"
                />
              )}
            />
          </div>
          <div className="flex justify-end mt-3">
            <Button
              size="small"
              variant="contained"
              className="!bg-theme"
              startIcon={<Check />}
            >
              SUBMIT
            </Button>
          </div>
        </>
      )}
      <div className="py-4 flex gap-3 flex-wrap">
        {techs?.map((item) => (
          <img
            key={item?.id}
            className="h-7 object-contain"
            src={item?.img}
            alt="photo"
          />
        ))}
      </div>
    </section>
  );
};

export default TechnologyUsed;

const techs = [
  { id: 1, img: REACT.src },
  { id: 2, img: JAVASCRIPT.src },
  { id: 3, img: NEXTJS.src },
  { id: 4, img: AWS.src },
  { id: 5, img: CSS.src },
];

const team = [
  { title: "JavaScript", year: 1994 },
  { title: "Typescript", year: 1972 },
  { title: "AWS", year: 1974 },
  { title: "React", year: 2008 },
  { title: "Next.Js", year: 1957 },
];
