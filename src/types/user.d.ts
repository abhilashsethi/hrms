export default interface UserType {
  _id: string;
  displayName: string;
  phoneNumber: number;
  country: {
    code: string;
    name: string;
    phone: string;
  };
  photoURL: string;
  avatar: string;
  photoPath: string;
  email: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  encrypted_password: string;
  salt: string;
  password: string;
  _password: string;
  token: string;
  dateOfBirth: string;
  role: "USER" | "MANAGER" | "ADMIN" | "STUDENT" | "AMBASSADOR";
  status: "INACTIVE" | "ACTIVE" | "PENDING" | "VERIFIED";
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  isLoggedIn: boolean;
  isOnline: boolean;
  blockStatus: "BLOCKED" | "UNBLOCKED";
  lastLogin: Date;
  verificationInfo: {
    OTP: number;
    OTPExpiry: Date;
  };
  store: StoreType;
  refreshTokens: {};
  createdAt: string;
  updatedAt: string;
  cartCount: number;
}
