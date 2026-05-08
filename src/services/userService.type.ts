import type { UserRole, UserStatus } from './authService';

export type DialUserPublic = {
  uid: string;
  fullName: string;
  ra: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type UserStatusUpdateInput = {
  uid: string;
  status: UserStatus;
};
