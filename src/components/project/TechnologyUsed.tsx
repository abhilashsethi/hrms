import { Edit } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { AWS, CSS, JAVASCRIPT, NEXTJS, REACT } from "assets/svgicons";

const TechnologyUsed = () => {
  return (
    <section className="w-full rounded-md p-6 mt-4 bg-white shadow-jubilation">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-gray-600">Technology Used</h1>
        <Tooltip title="Update">
          <IconButton size="small">
            <Edit />
          </IconButton>
        </Tooltip>
      </div>
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
