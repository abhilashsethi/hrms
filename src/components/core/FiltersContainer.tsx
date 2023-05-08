import { FilterListRounded } from "@mui/icons-material";
import { Tooltip } from "@mui/material";

interface Props {
  children?: JSX.Element | any;
}

const FiltersContainer = ({ children }: Props) => {
  return (
    <div className="flex justify-between w-full py-2">
      <div className="w-10 h-10 flex justify-center items-center rounded-md bg-theme">
        <Tooltip title="Filter">
          <FilterListRounded className="!text-white" />
        </Tooltip>
      </div>
      <div className="w-[95%]">{children}</div>
    </div>
  );
};

export default FiltersContainer;
