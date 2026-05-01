import { Share2 } from 'lucide-react-native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { buildQRCodeValue, shareEventQRCode } from './EventQRCodeModal.action';
import type { EventQRCodeModalProps } from './EventQRCodeModal.type';
import { styles } from './style';

export function EventQRCodeModal({
  visible,
  eventId,
  eventTitle,
  onClose
}: EventQRCodeModalProps) {
  const insets = useSafeAreaInsets();

  const qrValue = buildQRCodeValue({ eventId });

  async function handleShare(): Promise<void> {
    await shareEventQRCode(eventTitle, eventId);
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
          <View style={styles.handle} />
          <Text style={styles.title}>QR Code do Evento</Text>
          <Text style={styles.eventName}>{eventTitle}</Text>

          <View style={styles.qrWrapper}>
            <QRCode
              value={qrValue}
              size={200}
              color={Colors.TITLE}
              backgroundColor={Colors.WHITE}
            />
          </View>

          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Share2 size={18} color={Colors.TITLE} strokeWidth={2} />
            <Text style={styles.shareButtonText}>Compartilhar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
