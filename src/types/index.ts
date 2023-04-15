import { SVGProps } from "react";
export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export type EmailTemplateType = {
  _id: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export * from "./user";
