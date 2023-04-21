import React from "react";

interface Props {
  title: string;
}

const TextTitles = ({ title }: Props) => {
  return (
    <div>
      <p className="text-xl font-bold text-theme tracking-wide">{title}</p>
    </div>
  );
};

export default TextTitles;
