import { Check } from 'lucide-react-native';
import { Text, View, ViewStyle } from 'react-native';
import { Colors } from '../../theme';
import { styles } from './style';

export type MetricCardProps = {
  labelIcon: string;
  label: string;
  status: string;
  isComplete?: boolean;
  progress: number;
  backgroundColor: string;
};

export function MetricCard({
  labelIcon,
  label,
  status,
  isComplete = false,
  progress,
  backgroundColor
}: MetricCardProps) {
  const fillStyle: ViewStyle = {
    width: `${Math.round(progress * 100)}%` as ViewStyle['width']
  };

  return (
    <View style={[styles.card, { backgroundColor }]}>
      <View style={styles.cardHeader}>
        <View style={styles.labelRow}>
          <View style={styles.labelIcon}>
            <Text style={styles.labelIconText}>{labelIcon}</Text>
          </View>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View
          style={[
            styles.badge,
            isComplete ? styles.badgeFilled : styles.badgeEmpty
          ]}
        >
          {isComplete && <Check size={9} color={Colors.WHITE} strokeWidth={3} />}
        </View>
      </View>
      <Text style={styles.value}>{status}</Text>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, fillStyle]} />
      </View>
    </View>
  );
}
