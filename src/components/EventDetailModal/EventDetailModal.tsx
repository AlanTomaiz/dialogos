import { Clock, MapPin, Users } from 'lucide-react-native';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import { formatRelativeDate } from '../../utils/formatRelativeDate';
import { getInitialsFromName } from '../../utils/getInitialsFromName';
import type { EventData } from '../EventCard/EventCard';
import { styles } from './style';

type EventDetailModalProps = {
  event: EventData | null;
  visible: boolean;
  onClose: () => void;
  onPrimaryAction: () => void;
  primaryActionLabel: string;
  showPrimaryAction: boolean;
  onViewParticipants?: () => void;
};

export function EventDetailModal({
  event,
  visible,
  onClose,
  onPrimaryAction,
  primaryActionLabel,
  showPrimaryAction,
  onViewParticipants
}: EventDetailModalProps) {
  const insets = useSafeAreaInsets();

  if (!event) return null;

  const avatarInitials =
    event.creatorInitials || getInitialsFromName(event.creatorName);
  const hasCreatorPhoto = Boolean(event.creatorPhotoUrl);
  const createdAtLabel = formatRelativeDate(event.createdAt);

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
        <View style={[styles.sheet, { paddingBottom: insets.bottom + 16 }]}>
          <View style={styles.handle} />

          <View style={styles.creatorRow}>
            <View
              style={[styles.avatar, !hasCreatorPhoto && styles.avatarFallback]}
            >
              {hasCreatorPhoto ? (
                <Image
                  source={{ uri: event.creatorPhotoUrl as string }}
                  style={styles.avatarImage}
                />
              ) : (
                <Text style={styles.avatarText}>{avatarInitials}</Text>
              )}
            </View>
            <View style={styles.creatorInfo}>
              <Text style={styles.creatorName}>{event.creatorName}</Text>
              <Text style={styles.createdAt}>{createdAtLabel}</Text>
            </View>
          </View>

          <View style={styles.titleRow}>
            <Text style={styles.title}>{event.title}</Text>
            {onViewParticipants && (
              <TouchableOpacity
                style={styles.participantsButton}
                onPress={onViewParticipants}
                activeOpacity={0.7}
              >
                <Users size={20} color={Colors.MUTED} strokeWidth={1.8} />
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.description}>{event.description}</Text>

          <View style={styles.detailRow}>
            <Clock size={16} color={Colors.MUTED} strokeWidth={1.8} />
            <Text style={styles.detailText}>
              {event.timeRange} · {event.duration}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <MapPin size={16} color={Colors.MUTED} strokeWidth={1.8} />
            <Text style={styles.detailText}>{event.location}</Text>
          </View>

          {showPrimaryAction && (
            <TouchableOpacity
              style={styles.attendButton}
              onPress={onPrimaryAction}
            >
              <Text style={styles.attendButtonText}>{primaryActionLabel}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}
