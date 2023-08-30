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
  countryCode?: string;
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
  isClient?: boolean;
  uanNo?: string;
  clientId?: string;
  uanNumber?: string;
  alreadyConnected?: {
    blockedBy: string[];
    groupId: string;
  };
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
  _count: { users: number };
};
export type Pages = {
  pageId: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
};
export type LeaveCredit = {
  id?: string;
  leavesData?: { casualLeaveCarryOver?: number; sickLeaveCarryOver?: number };
  createdAt?: Date;
  updatedAt?: Date;
};

export type Leave = {
  id?: string;
  photo?: string | undefined;
  name?: string | undefined;
  role?: string | undefined;
  status?: string | undefined;
  credit?: number | undefined;
  user?: User;
  createdAt?: Date;
  updatedAt?: Date;
  type?: string;
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
  ticketsCountAccordingProjects?: ClientDashboard[];
  projectCountStatusWise?: ClientDashboard[];
  ticketCounts?: ClientDashboard[];
};
export type ClientDashboard = {
  projectName?: string;
  _id?: string;
  ticketCount?: number;
  count?: number;
  name?: string;
};
export type Photos = {
  file?: File;
  previewURL?: string;
  uniId?: string;
};
export type Branch = {
  id?: string;
  name?: string;
  location?: string;
  email?: string;
  employees?: User[];
  photos?: Photos[];
  manager?: { name?: string; id?: string };
  managerId?: string;
  isBlocked?: boolean;
  phone?: number;
  createdAt?: Date;
  updatedAt?: Date;
  country?: string;
  count?: number;
  employeesCount?: number;
  branchName?: string;
};
export type BranchDashboard = {
  totalBranchCount: number;
  countryWiseBranchCount: Branch[];
  totalInActiveBranch: number;
  totalActiveBranch: number;
  branchWiseEmployeeCount: Branch[];
};
export interface TenderDocumentType {
  id?: string;
  link: string;
  title?: string;
  createdAt?: string;
}
export interface TenderMember {
  id?: string;
  isAllowedToAddDoc: boolean;
  isAllowedToReviewTender: boolean;
  isAllowedToSubmitTender: boolean;
  isAllowedToTrackTender: boolean;
  member: User;
}
export interface TenderNote {
  id?: string;
  createdAt: Date;
  title?: string;
  description?: string;
}
export interface TenderUserDashboard {
  monthAbbreviation: string;
  tenderCount?: number;
  month?: string;
  _count?: number;
  count?: number;
  status?: string;
}
export interface TenderDashboard {
  monthAbbreviation: string;
  status: string | null;
  count: number;
  _count: number | null;
  month: number;
}
export type Tender = {
  id?: string;
  name?: string;
  isBlocked?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  tenderNo?: string;
  title?: string;
  portal?: string;
  category?: string;
  submissionDate?: Date;
  submissionTime?: string;
  bidValue?: string;
  members?: TenderMember[];
  status?: string;
  notes?: TenderNote[];
  EmdAmount?: number;
  totalOpenTenderCount?: number;
  totalClosedTenderCount?: number;
  totalSubmittedTenderCount?: number;
  tenderCount?: number;
  tenderFees?: number;
  feesPaymentMode?: string;
  EmdPaymentMode?: string;
  documentAddReason?: string;
  isEmdExemption?: boolean;
  isAllDocumentsCorrect?: boolean;
  isAllDocumentsAdded?: boolean;
  documents?: TenderDocumentType[];
  allTenderCountMonthWiseOfCurrentYear?: TenderDashboard[];
  allTenderCountStatusWise?: TenderDashboard[];
  totalAssignAssetCount?: number;
  totalTenderCount?: number;
  monthWiseTenderCount?: TenderUserDashboard[];
  tenders?: Tender;
  _id?: { $oid?: string };
  currentMonthAttendanceCount?: number;
  totalLeaveCountOfTheYear?: number;
  thisYearLeaveDetails?: TenderUserDashboard[];
  tenderCountStatusWise?: TenderDashboard[];
  totalTender?: number;
  tenderOverview?: TenderUserDashboard[];
  tenderCountStatus?: TenderUserDashboard[];
};
export interface QuotationDashboard {
  status?: string | null;
  count?: number;
  _count?: number | null;
  month?: string;
  billType?: string;
}
export interface BillsDashboard {
  billType?: string | null;
  count?: number;
  _count?: number | null;
  month?: string;
}
export interface QuotationGst {
  id?: string;
  Igst: number;
  Sgst: number;
  Cgst: number;
}
export interface Quotation {
  id: string;
  cgstVal?: number;
  grandTotal?: number;
  gst?: number;
  gstVal?: number;
  total?: number;
  sgstVal?: number;
  igstVal?: number;
  isCgst?: boolean;
  isIgst?: boolean;
  isSgst?: boolean;
  igstPercent?: number;
  cgstPercent?: number;
  sgstPercent?: number;
  clientAddress?: string;
  clientEmail?: string;
  clientName?: string;
  quotationNumber?: string;
  quotationTitle?: string;
  status?: string;
  termsAndConditions?: string;
  updatedAt?: Date;
  createdAt?: Date;
  works?: QuotationWork[];
  allQuotationStatus?: QuotationDashboard[];
  acceptedQuotationOfCurrentYear?: QuotationDashboard[];
  totalAcceptedQuotation?: number;
  totalModifiedQuotations?: number;
  totalQuotation?: number;
  totalRejectedQuotations?: number;
  reason?: string;
  totalPaidBill?: number;
  totalQuotations?: number;
  totalUnpaidBill?: number;
  totalLeaveCountOfTheYear?: number;
  quotationOverview?: QuotationDashboard[];
  monthWiseBillOverview?: QuotationDashboard[];
  billOverview?: QuotationDashboard[];
  quotationBranchId?: string;
  quotationOfBranch?: Branch;
}
export interface Bills {
  id?: string;
  billNumber?: string;
  gstVal?: number;
  billType?: string;
  clientAddress?: string;
  clientEmail?: string;
  clientName?: string;
  cgstVal?: number;
  dueDate?: Date;
  grandTotal?: number;
  clientGstNumber?: string;
  gst?: number;
  invoiceDate?: Date;
  total?: number;
  quotationId?: string;
  sgstVal?: number;
  igstVal?: number;
  isCgst?: boolean;
  isIgst?: boolean;
  isSgst?: boolean;
  status?: string;
  sgstPercent?: number;
  cgstPercent?: number;
  igstPercent?: number;
  termsAndConditions?: string;
  updatedAt?: Date;
  createdAt?: Date;
  works?: BillsWork[];
  currentYearBillCountMonthWise?: BillsDashboard[];
  totalAdvanceBillCount?: number;
  totalBillCount?: number;
  totalPaidBillCount?: number;
  totalUnpaidBillCount?: number;
  typeWiseBillCount?: BillsDashboard[];
  billOfBranch?: Branch;
  billOfBranchId?: string;
}
export interface QuotationBank {
  id?: string;
  bankName?: string;
  branchName?: string;
  accountNumber?: string;
  companyName?: string;
  ifscCode?: string;
  swiftCode?: string;
  isBlock?: boolean;
  updatedAt?: Date;
  createdAt?: Date;
  Quotation?: Quotation[];
  quotationId?: string;
}
export interface QuotationWork {
  id?: string;
  cost?: number;
  quantity?: number;
  description?: string;
  createdAt?: Date;
}
export interface BillsWork {
  id?: string;
  Amount?: number;
  SACcode?: string;
  description?: string;
  createdAt?: Date;
}
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
  role?: string;
  blockedBy?: string[];
  alreadyConnected: {
    groupId: string;
    blockedBy: string[];
  };
}
export interface IChatMember {
  isAdmin: boolean;
  user: Partial<User>;
  isPastMember: boolean;
  id: string;
  client: Partial<User>;
  isClient: boolean;
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

export type EmailUser = {
  id: string;
  name: string;
  photo: string;
  username: string;
};

export type SentEmailType = {
  bcc: EmailUser[];
  cc: EmailUser[];
  content: string;
  isRead: boolean;
  isSend: boolean;
  receiver: EmailUser;
  subject: string;
  attachments: string[];
  id: string;
  sentAt: string;
  createdAt: string;
};
export type InboxEmailType = {
  bcc: EmailUser[];
  cc: EmailUser[];
  content: string;
  isRead: boolean;
  isSend: boolean;
  receiver: EmailUser;
  subject: string;
  attachments: string[];
  id: string;
  sentAt: string;
  sender: EmailUser;
  createdAt: string;
};

export type EmailType = {
  attachments: string[];
  bcc: EmailUser[];
  cc: EmailUser[];
  content: string;
  id: string;
  receiver: EmailUser;
  sender: EmailUser;
  subject: string;
  isSend: boolean;
  sentAt: string;
  replyTo: InboxEmailType;
  isSenderUser: boolean;
  isUsingTemplate: boolean;
  templateId?: string;
};
export type MailTemplate = {
  content: string;
  title: string;
  json: string;
  id: string;
};

export type ASSET = {
  assetType: string;
  billAmount: number;
  branchId: string;
  brandName: string;
  createdAt: string;
  dateOfPurchase: string;
  id: string;
  identityNumber: string;
  isAssign: boolean;
  marketPrice: number;
  modelName: string;
  name: string;
  note: string;
  serialNumber: string;
  updatedAt: string;
  assetOfBranch: Branch;
  docs: [
    {
      link: string;
      docType: string;
    }
  ];
  photos: string[];
};

export interface ASSET_DASHBOARD {
  countryWiseAssetCount: [{ count: number; country: string }];
  totalAsset: number;
  totalAssignAsset: number;
  totalNotAssignedAsset: number;
}

export interface BRANCH_DASHBOARD {
  branchWiseEmployeeCount: [
    {
      branchId: string;
      branchName: string;
      employeesCount: number;
    }
  ];
  countryWiseBranchCount: [
    {
      count: number;
      country: string;
    }
  ];
  totalActiveBranch: number;
  totalBranchCount: number;
  totalCountryCount: number;
  totalInActiveBranch: number;
  totalLocationCount: [totalLocations: number];
}

type Note = {
  id: string;
  text: string;
  link: string;
  docType: string;
  createdAt: string;
  addedById: string;
  addedBy: string;
  meetingId: string;
  updatedAt: string;
};

export interface MEETING_DATA {
  address: string;
  clientEmail: string;
  clientName: string;
  clientPhone: string;
  createdAt: string;
  id: string;
  lat: number;
  lng: number;
  meetingDate: string;
  meetingEndTime: string;
  meetingPersonName: string;
  meetingStartTime: string;
  notes: Note[];
  purpose: string;
  status: string;
  title: string;
  updatedAt: string;
  user: User;
  userId: string;
}
