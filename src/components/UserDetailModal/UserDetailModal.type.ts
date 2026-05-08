import type { UserRole, UserStatus } from '../../services/authService';

export type UserDetailData = {
  uid: string;
  fullName: string;
  ra: string;
  email: string;
  role: UserRole;
  status: UserStatus;
};

export type UserDetailModalProps = {
  visible: boolean;
  user: UserDetailData | null;
  onClose: () => void;
  onStatusChanged: (uid: string, newStatus: UserStatus) => void;
};
