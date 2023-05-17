import { GridViewRounded, TableRowsRounded } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface Props {
  isGrid?: boolean;
  setIsGrid?: any;
}

const GridAndList = ({ isGrid, setIsGrid }: Props) => {
  return (
    <div className="flex gap-1">
      <IconButton onClick={() => setIsGrid(true)} size="small">
        <div
          className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
            isGrid && `border-2 border-theme`
          }`}
        >
          <GridViewRounded
            className={`${
              isGrid && `!text-theme`
            } md:!text-[1.5rem] !text-[1rem]`}
          />
        </div>
      </IconButton>
      <IconButton onClick={() => setIsGrid(false)} size="small">
        <div
          className={` p-2 rounded-md grid place-items-center transition-all ease-in-out duration-500 ${
            !isGrid && `border-2 border-theme`
          }`}
        >
          <TableRowsRounded
            className={`${
              !isGrid && `!text-theme`
            } md:!text-[1.5rem] !text-[1rem]`}
          />
        </div>
      </IconButton>
    </div>
  );
};

export default GridAndList;
