import { Tooltip } from "@mui/material";
import ICONS from "assets/icons";

interface Props {
  value?: any;
}

const CopyClipboard = ({ value }: Props) => {
  return (
    <div className="group flex gap-2 items-center text-sm">
      {value?.slice(0, 15)}
      {value?.length >= 15 ? "..." : ""}
      <Tooltip title="Copy to clipboard">
        <span
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(value);
          }}
          className="scale-0 rounded cursor-pointer p-1 transition hover:bg-indigo-100 active:bg-green-100 group-hover:scale-100 "
        >
          <ICONS.Copy />
        </span>
      </Tooltip>
    </div>
  );
};
export default CopyClipboard;
