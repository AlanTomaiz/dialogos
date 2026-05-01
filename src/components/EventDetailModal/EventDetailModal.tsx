import { Clock, MapPin } from 'lucide-react-native';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme';
import type { EventData } from '../EventCard/EventCard';
import { styles } from './style';

type EventDetailModalProps = {
  event: EventData | null;
  visible: boolean;
  onClose: () => void;
  onConfirmPresence: () => void;
};

function getInitialsFromName(name: string): string {
  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) {
    return 'US';
  }

  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase();
  }

  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

function formatCreatedAtLabel(createdAt: string): string {
  const createdTime = new Date(createdAt).getTime();

  if (Number.isNaN(createdTime)) {
    return createdAt;
  }

  const diffInSeconds = Math.max(
    0,
    Math.floor((Date.now() - createdTime) / 1000)
  );

  if (diffInSeconds <= 60) {
    return 'Agora mesmo';
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);

  if (diffInMinutes < 60) {
    return `Há ${diffInMinutes}min`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);

  if (diffInHours < 24) {
    return `Há ${diffInHours}hr`;
  }

  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInDays < 7) {
    return `Há ${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`;
  }

  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInWeeks < 4) {
    return `Há ${diffInWeeks} ${diffInWeeks === 1 ? 'semana' : 'semanas'}`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMonths < 12) {
    return `Há ${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'}`;
  }

  const diffInYears = Math.floor(diffInDays / 365);
  return `Há ${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'}`;
}

export function EventDetailModal({
  event,
  visible,
  onClose,
  onConfirmPresence
}: EventDetailModalProps) {
  const insets = useSafeAreaInsets();

  if (!event) return null;

  const avatarInitials = event.creatorInitials || getInitialsFromName(event.creatorName);
  const hasCreatorPhoto = Boolean(event.creatorPhotoUrl);
  const createdAtLabel = formatCreatedAtLabel(event.createdAt);

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

          <Text style={styles.title}>{event.title}</Text>
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

          <TouchableOpacity
            style={styles.attendButton}
            onPress={onConfirmPresence}
          >
            <Text style={styles.attendButtonText}>Marcar presença</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
