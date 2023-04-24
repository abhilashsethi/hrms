import ICONS from "assets/icons";
import React from "react";

export function RenderIconRow({
  value,
  isEmail,
  isPhone,
}: {
  value: string;
  isEmail?: boolean;
  isPhone?: boolean;
}) {
  return (
    <>
      <div className="group flex items-center gap-2">
        {isEmail ? (
          <a href={`mailto:${value}`} className="hover:text-blue-500">
            <ICONS.Email />
          </a>
        ) : isPhone ? (
          <a href={`tel:${value}`} className="hover:text-blue-500">
            <ICONS.Call />
          </a>
        ) : null}
        <span>{value}</span>
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
