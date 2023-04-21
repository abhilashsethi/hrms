import { SVGProps } from "react";
export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export interface BloodGroup {
  A_Positive: "A_Positive";

  A_Negative: "A_Negative";

  B_Positive: "B_Positive";

  B_Negative: "B_Negative";

  AB_Positive: "AB_Positive";

  AB_Negative: "AB_Negative";

  O_Positive: "O_Positive";

  O_Negative: "O_Negative";
}

export interface Gender {
  Male: "Male";
  Female: "Female";
}

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
  photo?: string | null;
  dob?: Date | null;
  joiningDate?: Date | null;
  linkedin?: string | null;
  gender?: Gender;
  gmail?: string | null;
  github?: string | null;
  IFSCCode?: string | null;
  bankName?: string | null;
  bloodGroup?: BloodGroup;
  accountNo?: string | null;
  panNo?: string | null;
  aadharNo?: string | null;
  address?: string | null;
  roleId?: string;
  projectIDs?: string[];
};

export type Projects = {

 id: string;
 name: string;
 description: string | null;
 devURL: string | null;
 prodURL: string | null;
 gmail: string | null;
 github: string | null;
 startDate: Date;
 userIDs: string;
 createdAt: Date;
 updatedAt: Date;
};