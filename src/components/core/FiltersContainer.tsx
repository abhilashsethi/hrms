import { FilterListRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

interface Props {
  children?: JSX.Element | any;
}

const FiltersContainer = ({ children }: Props) => {
  const [isFilter, setIsFilter] = useState(false);
  return (
    <div className="flex justify-between w-full py-2">
      <div
        className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg ${
          isFilter ? `bg-theme` : `bg-white`
        }`}
      >
        <IconButton onClick={() => setIsFilter((prev) => !prev)}>
          <Tooltip title="Filter">
            <FilterListRounded className={`${isFilter ? `!text-white` : ``}`} />
          </Tooltip>
        </IconButton>
      </div>
      <div className="md:w-[95%] w-[85%]">{isFilter && <>{children}</>}</div>
    </div>
  );
};

export default FiltersContainer;
