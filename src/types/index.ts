import { SVGProps } from "react";
export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export type EmailTemplateType = {
  _id: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type Card = {
  id: string;
  cardId: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  user: User | null;
};

export type Attendance = {
  id: string;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  isBlocked: boolean;
  isOfficeAccessGranted: boolean;
  role: { name?: string; id?: string; createdAt?: string; updatedAt?: string };
  employeeID: string;
  lat: number | null;
  lng: number | null;
  createdAt: Date;
  updatedAt: Date;
};
