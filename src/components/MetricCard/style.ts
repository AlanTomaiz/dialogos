import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../theme';

const WHITE = '#FFFFFF';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  labelIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelIconText: {
    fontFamily: Typography.family.bold,
    fontSize: 9,
    color: WHITE,
  },
  label: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.sm,
    color: 'rgba(255,255,255,0.9)',
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.8)',
  },
  badgeFilled: {
    backgroundColor: '#22C55E',
    borderColor: '#22C55E',
  },
  badgeEmpty: {
    backgroundColor: 'transparent',
  },
  value: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: WHITE,
    marginBottom: Spacing.sm,
  },
  progressTrack: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 999,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 999,
  },
});
