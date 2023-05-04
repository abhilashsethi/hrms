import ICONS from "assets/icons";

interface Props {
  value?: any;
}

const CopyClipboard = ({ value }: Props) => {
  return (
    <p className="group flex gap-2 items-center text-sm">
      {value?.slice(0, 15)}
      {value?.length >= 15 ? "..." : ""}
      <span
        onClick={(e) => {
          e.stopPropagation();
          navigator.clipboard.writeText(value);
        }}
        className="scale-0 rounded cursor-pointer p-1 transition hover:bg-indigo-100 active:bg-green-100 group-hover:scale-100 "
      >
        <ICONS.Copy />
      </span>
    </p>
  );
};
export default CopyClipboard;
