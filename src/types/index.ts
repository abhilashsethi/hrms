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
  validFrom?: string | null;
  validTill?: string | null;
  guestId?: string | null;
  guest?: Guest | null;
};

export type Attendance = {
  id: string;
  date: Date;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export interface Guest {
  id?: string;
  company?: string | null;
  createdAt?: string;
  email?: string | null;
  gender?: string;
  isBlocked?: boolean;
  name?: string;
  phone?: string;
  updatedAt?: Date;
  visitInfo?: string | null;
}

export type User = {
  firstName?: string;
  lastName?: string;
  username?: String;
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
  grossSalary?: number;
  tds?: number;
  kpi?: number;
  salaryInfoNewFields?: any;
  github?: string | null;
  ifscCode?: string | null;
  bankName?: string | null;
  bloodGroup?: BloodGroup;
  accountNo?: string | null;
  panNo?: string | null;
  aadharNo?: string | null;
  address?: string | null;
  roleId?: string;
  projectIDs?: string[];
  departmentId?: string;
  department?: {
    name?: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  employeeOfBranchId?: string | null;
  employeeOfBranch?: {
    id?: string;
    name?: string;
  };
  wallet?: number;
  lastActiveTime?: string;
  isOnline?: boolean;
  ChatMember: {
    chatGroupId: string;
  }[];
};

interface urlTypes {
  id?: string;
  link?: string | undefined;
  projectId?: string | undefined;
  title?: string | undefined;
}
export type TicketsConversations = {
  id: string;
  ticketId: string;
  text?: string;
  userInfo?: {
    id?: string;
    isClient?: boolean;
    name?: string;
  };
  ticket?: {
    id?: string;
    description?: string;
    title?: string;
  };
  createdAt?: any;
  updatedAt?: string;
};
export interface DocumentType {
  docId?: string;
  filetype?: string;
  link?: string;
  name?: string;
  createdAt?: string;
}
export type Tickets = {
  id: string;
  title?: string;
  clientId?: string;
  documents?: DocumentType[];
  associatedProjectId?: string;
  description?: string | null;
  isResolved?: boolean;
  assignedUserIds?: User[];
  createdAt?: any | null;
  updatedAt?: string | null;
  conversations?: TicketsConversations[];
  client?: Client;
};
export type Projects = {
  URLs?: urlTypes[];
  endDate?: string | null;
  name: string;
  description: string | null;
  devURL: string | null;
  prodURL: string | null;
  gmail: string | null;
  github: string | null;
  startDate: Date;
  userIDs: string;
  createdAt: Date;
  industry?: string;
  updatedAt: Date;
  status?: string;
  id?: string;
  involvedMemberIds?: string[];
  managerId?: string[];
  involvedMembers?: User[];
  manager?: {
    name?: string;
    photo?: string | null;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};
export type Role = {
  id: string;
  name: string;
  cardId: string;
  createdAt: Date;
  updatedAt: Date;
  users: User[];
  departments: string;
  accessPages: Pages[];
};
export type Pages = {
  pageId: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Leave = {
  id?: string;
  photo?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  status?: string | undefined;
  credit?: number | undefined;
};

export type Client = {
  id: string;
  name: string;
  email: string;
  _count: { projects?: number; tickets?: string };
  gender: string;
  isBlocked: boolean;
  phone: number;
  photo: string;
  createdAt: Date;
  updatedAt: Date;
  country: string;
  completedProjectCount: number;
  resolvedTicketCount: number;
};

export interface MeetingTypes {
  meetings?: MeetingProps[];
}
export interface MeetingProps {
  id?: string;
  title?: string;
  address?: string;
  clientEmail?: string;
  clientName?: string;
  clientPhone?: string;
  meetingDate?: string;
  meetingEndTime?: string;
  meetingStartTime?: string;
  meetingPersonName?: string;
  status?: string;
  purpose?: string;
  lat?: number;
  lng?: number;
}

export const enum MessageCategory {
  text,
  link,
  image,
  code,
  markup,
  file,
  event,
}

export interface IGroupChatData {
  id: string;
  isGroupBlocked: boolean;
  isPrivateGroup: boolean;
  lastMessage: {
    category: "text" | "link" | "image" | "code" | "markup" | "file" | "event";
    createdAt: string;
    isRead: boolean;
    isSenderIsUser: boolean;
    link: string;
    message: string;
    sender: string;
    totalUnreadMessageCount: number;
  };
  title: string;
  photo: string;
}

export interface IChatMessages {
  category: "text" | "link" | "image" | "code" | "markup" | "file" | "event";
  createdAt: string;
  deliveredTo: User[];
  id: string;
  isEdited: boolean;
  reactedUsers: User[];
  readUsers: {
    user: User;
    readAt: string;
  }[];
  sender: User;
  taggedMembers: User;
  text: string;
  updatedAt: string;
  link: string;
}
export interface IChatGroup {
  chatMembers: IChatMember[];
  createdAt: string;
  description: string;
  isGroupBlocked: boolean;
  isPrivateGroup: boolean;
  photo: string;
  title: string;
  totalMembers: number;
  id: string;
  isNewChat: boolean;
}
export interface IChatMember {
  isAdmin: boolean;
  user: Partial<User>;
  isPastMember: boolean;
  id: string;
}

export interface ServerToClientEvents {
  // USER_CONNECTED: ({ userId }: { userId: string }) => void;
  // USER_DISCONNECT: ({ userId }: { userId: string }) => void;
  [key: string]: (arg: any) => void;
}

export interface ClientToServerEvents {
  USER_CONNECT: ({ userId }: { userId?: string }) => void;
  REFETCH_DATA: ({
    userId,
    groupId,
  }: {
    userId?: string;
    groupId?: string;
  }) => void;
  SENT_MESSAGE: ({
    userId,
    groupId,
  }: {
    userId?: string;
    groupId?: string;
  }) => void;
  USER_TYPING: ({
    userId,
    groupId,
  }: {
    userId?: string;
    groupId?: string;
  }) => void;
  USER_TYPING_STOP: ({
    userId,
    groupId,
  }: {
    userId?: string;
    groupId?: string;
  }) => void;
}
