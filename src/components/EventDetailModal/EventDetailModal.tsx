import { Clock, MapPin } from 'lucide-react-native';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { EventData } from '../EventCard/EventCard';
import { styles } from './style';

type EventDetailModalProps = {
  event: EventData | null;
  visible: boolean;
  onClose: () => void;
  onConfirmPresence: () => void;
};

export function EventDetailModal({ event, visible, onClose, onConfirmPresence }: EventDetailModalProps) {
  const insets = useSafeAreaInsets();

  if (!event) return null;

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose} />
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.creatorRow}>
            <View style={[styles.avatar, { backgroundColor: event.accentColor }]}>
              <Text style={styles.avatarText}>{event.creatorInitials}</Text>
            </View>
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorName}>{event.creatorName}</Text>
              <Text style={styles.createdAt}>{event.createdAt}</Text>
            </View>
          </View>

          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.detailRow}>
            <Clock size={16} color="#6B7280" strokeWidth={1.8} />
            <Text style={styles.detailText}>{event.timeRange} · {event.duration}</Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={16} color="#6B7280" strokeWidth={1.8} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>

          <TouchableOpacity style={styles.attendButton} onPress={onConfirmPresence}>
            <Text style={styles.attendButtonText}>Marcar presença</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
