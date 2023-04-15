export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string;
  isBlocked: boolean;
  isOfficeAccessGranted: boolean;
  role: string;
  employeeID: string;
  lat: number | null;
  lng: number | null;
  createdAt: Date;
  updatedAt: Date;
};
