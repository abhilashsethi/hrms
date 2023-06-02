import { Flag, HomeRepairServiceRounded } from "@mui/icons-material";
import ICONS from "assets/icons";

export function RenderIconRow({
  value,
  isEmail,
  isPhone,
  isCountry,
  isId,
  longText = true,
}: {
  value: any;
  isEmail?: boolean;
  isPhone?: boolean;
  isId?: boolean;
  longText?: boolean;
  isCountry?: boolean;
}) {
  return (
    <>
      <div className="group flex items-center justify-center gap-2">
        {isEmail ? (
          <a href={`mailto:${value}`} className="hover:text-blue-500">
            <ICONS.Email />
          </a>
        ) : isPhone ? (
          <a href={`tel:${value}`} className="hover:text-blue-500">
            <ICONS.Call />
          </a>
        ) : isId ? (
          <>
            {" "}
            <span className="hover:text-blue-500">
              <HomeRepairServiceRounded />
            </span>
          </>
        ) : isCountry ? (
          <a href={`tel:${value}`} className="hover:text-blue-500">
            <Flag />
          </a>
        ) : null}
        {longText ? (
          <span className="text-sm font-medium">
            {value?.slice(0, 16)}
            {value?.length >= 16 ? "..." : ""}
          </span>
        ) : (
          <span className="text-sm font-medium">{value}</span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(value);
          }}
          className="scale-0 rounded p-1 transition hover:bg-indigo-100 active:bg-green-100 group-hover:scale-100 "
        >
          <ICONS.Copy />
        </button>
      </div>
    </>
  );
}
