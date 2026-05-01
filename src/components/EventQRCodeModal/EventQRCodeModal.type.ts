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
  onClose: () => void;
};
