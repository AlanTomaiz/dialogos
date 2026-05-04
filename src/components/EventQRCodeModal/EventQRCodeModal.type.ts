import type { UserRole } from '../../services/authService';

export type SignedQRCodePayload = {
  v: 2;
  eventId: string;
  exp: number;
  sig: string;
};

export type EventQRCodeModalProps = {
  visible: boolean;
  eventId: string;
  eventTitle: string;
  requesterUid: string;
  requesterRole: UserRole;
  onLoadError: (message: string) => void;
  onClose: () => void;
};
