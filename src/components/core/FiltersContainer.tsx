import { FilterListRounded } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useState } from "react";

interface Props {
  children?: JSX.Element | any;
  changes?: any;
}

const FiltersContainer = ({ children, changes }: Props) => {
  const [isFilter, setIsFilter] = useState(true);
  return (
    <div className="md:flex justify-between w-full py-2">
      <div
        className={`w-10 h-10 flex justify-center items-center rounded-md shadow-lg ${isFilter ? `bg-theme` : `bg-white`
          }`}
      >
        <IconButton
          onClick={() => {
            setIsFilter((prev) => !prev);
            changes ? changes() : null;
          }}
        >
          <Tooltip title={isFilter ? `Remove Filters` : `Filter`}>
            <FilterListRounded className={`${isFilter ? `!text-white` : ``}`} />
          </Tooltip>
        </IconButton>
      </div>
      <div className="md:w-[95%] w-[85%]">{isFilter && <>{children}</>}</div>
    </div>
  );
};

export default FiltersContainer;
