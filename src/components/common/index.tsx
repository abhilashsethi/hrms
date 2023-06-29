import { Flag, HomeRepairServiceRounded } from "@mui/icons-material";
import { EMAIL, PHONE } from "assets/dashboard_Icons";
import ICONS from "assets/icons";
import { useState } from "react";

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
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 5000); // Set isCopied back to false after 5 seconds
  };

  return (
    <>
      <div className="group flex items-center justify-center gap-2">
        {isEmail ? (
          <a href={`mailto:${value}`} className="hover:text-blue-500">
            <img src={EMAIL.src} className="w-4" alt="" />
          </a>
        ) : isPhone ? (
          <a href={`tel:${value}`} className="hover:text-blue-500">
            <img src={PHONE.src} className="w-4" alt="" />
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

        {/* <button
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(value);
          }}
          className="scale-0 rounded p-1 transition hover:bg-indigo-100 active:bg-green-100 group-hover:scale-100 "
        >
          <ICONS.Copy />
        </button> */}
        <button
          onClick={handleCopyClick}
          className="scale-0 rounded p-1 transition hover:bg-indigo-100 active:bg-green-100 group-hover:scale-100"
        >
          <ICONS.Copy />
        </button>
      </div>

      {isCopied && (
        <div className="bg-green-500 text-sm rounded-lg text-white font-semibold p-1">Copied!</div>
      )}
    </>
  );
}
