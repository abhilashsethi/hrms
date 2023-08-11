import {
  Add,
  ChevronLeft,
  ChevronRight,
  Delete,
  MoreVert,
  Refresh,
  Search,
} from "@mui/icons-material";
import { Checkbox, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState, MouseEvent } from "react";

const InboxHeader = ({
  setAllClicked,
  allClicked,
  setPageNo,
  setSearchText,
  setSelectedEmails,
  setSortBy,
  mutate,
  totalPage,
  pageNo,
  searchText,
  handleDeleteEmail,
}: {
  setAllClicked: (arg: any) => void;
  allClicked: boolean;
  mutate?: any;
  setPageNo: (arg: any) => void;
  setSelectedEmails: (arg: any) => void;
  setSortBy: (arg: any) => void;
  setSearchText: (arg: any) => void;
  totalPage?: number;
  pageNo: number;
  searchText: string;
  handleDeleteEmail?: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReset = () => {
    setPageNo(1);
    setAllClicked(false);
    setSelectedEmails([]);
    setSortBy(undefined);
    setSearchText("");
  };

  const { push } = useRouter();

  return (
    <div className="flex flex-col lg:flex-row gap-2 shadow-md rounded-lg justify-between p-4 bg-white py-4  w-full items-center">
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-2 items-center">
        <Checkbox
          size="small"
          checked={allClicked}
          onClick={() => setAllClicked((prev: boolean) => !prev)}
        />{" "}
        <span className="text-gray-800/20">|</span>
        <IconButton onClick={handleDeleteEmail}>
          <Delete />
        </IconButton>
        <IconButton
          onClick={() => {
            mutate?.();
            handleReset();
          }}
        >
          <Refresh />
        </IconButton>
        <IconButton onClick={handleClick}>
          <MoreVert />
        </IconButton>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              setSortBy(false);
              handleClose();
            }}
          >
            Unread Email
          </MenuItem>
          <MenuItem
            onClick={() => {
              setSortBy(true);
              handleClose();
            }}
          >
            Read Email
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleReset();
              handleClose();
            }}
          >
            Reset
          </MenuItem>
        </Menu>
        <span className="text-gray-800/20  ">|</span>
        <button
          className="flex ml-8 items-center gap-2 bg-blue-500 hover:bg-white border border-blue-500 text-white hover:text-blue-500 transition-all ease-in-out duration-300 justify-center px-4 py-2 rounded-md shadow-lg "
          onClick={() => push(`/admin/email/create`)}
        >
          <Add />
          <p>Compose</p>
        </button>
      </div>
      <div className="w-full flex items-center justify-center">
        <TextField
          className="w-full"
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: <Search />,
          }}
          autoComplete="off"
          name={`search_${Math.random()}`}
          onChange={(e) => setSearchText(e?.target?.value)}
          value={searchText}
        />
      </div>
      <div className="flex gap-2 items-center">
        <IconButton
          onClick={() =>
            setPageNo((prev: number) => (prev <= 1 ? prev : prev - 1))
          }
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={() =>
            setPageNo((prev: number) =>
              prev * 20 >= (totalPage || 0) ? prev : prev + 1
            )
          }
        >
          <ChevronRight />
        </IconButton>
        <span>|</span>
        <span className="text-gray-400 flex gap-2 text-sm whitespace-nowrap">
          Show{" "}
          <p className="text-black font-bold">
            {(pageNo - 1) * 20 + 1} to{" "}
            {(totalPage || 0) < 20 ? totalPage : pageNo * 20}
          </p>{" "}
          of <p className="text-black font-bold">{totalPage}</p>
        </span>
      </div>
    </div>
  );
};

export default InboxHeader;
