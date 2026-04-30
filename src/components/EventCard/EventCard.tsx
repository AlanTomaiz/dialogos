import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';

export type EventData = {
  title: string;
  timeRange: string;
  duration: string;
  accentColor: string;
  location: string;
  creatorName: string;
  creatorInitials: string;
  createdAt: string;
  description: string;
};

type EventCardProps = EventData & {
  onPress: () => void;
};

export function EventCard({ title, timeRange, duration, accentColor, onPress }: EventCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{timeRange}</Text>
        <Text style={styles.duration}>{duration}</Text>
      </View>
      <View style={[styles.badge, { borderColor: accentColor }]} />
    </TouchableOpacity>
  );
}
