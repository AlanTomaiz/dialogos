export type EventQRCodePayload = {
  eventId: string;
};

export type EventQRCodeModalProps = {
  visible: boolean;
  eventId: string;
  eventTitle: string;
  onClose: () => void;
};
