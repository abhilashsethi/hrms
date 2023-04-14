import { SVGProps } from "react";
export type IconType = JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>;

export type CourseType = {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
export type SpecializationType = CourseType & { course: CourseType };

export type ROLE =
  | "STUDENT"
  | "AMBASSADOR"
  | "ADMIN"
  | "UNIVERSITY"
  | "FACULTY"
  | "UNIVERSITY_STUDENT";
export type GENDER_TYPE = "MALE" | "FEMALE";
export type STATUS_TYPE = "ACTIVE" | "PENDING" | "BLOCK";
export type CREATED_BY = "SELF" | "ADMIN";

export type User = {
  _id: string;
  role: ROLE;
  name: string;
  email: string;
  avatar?: string;
  avatarPath?: string;
  countryCode: string;
  phoneNumber: string;
  gender: GENDER_TYPE;
  deviceName: string;
  status: STATUS_TYPE;
  lastLogInTime: Date;
  city: string;
  createdBy: CREATED_BY;
  preferCountry?: string;
  // need to update
  course?: CourseType;
  specialization?: SpecializationType;
  currentEducationLevel?: string;
  currentUniversity?: string;
  expireDate?: Date;
  createdAt: Date;
  about?: string;
  collegeOrUniversityName?: string;
  university?: User;
};

export type EmailTemplateType = {
  _id: string;
  content: string;
  title: string;
  createdAt: string;
  updatedAt: string;
};
