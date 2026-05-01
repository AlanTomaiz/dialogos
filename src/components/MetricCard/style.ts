import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: Radius.lg,
    padding: Spacing.md
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs
  },
  labelIcon: {
    width: 16,
    height: 16,
    borderRadius: Radius.sm,
    backgroundColor: Colors.WHITE_ALPHA_30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  labelIconText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xs,
    color: Colors.WHITE
  },
  label: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.WHITE_ALPHA_90
  },
  badge: {
    width: 18,
    height: 18,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center'
  },
  badgeFilled: {
    backgroundColor: Colors.SUCCESS_GREEN
  },
  badgeEmpty: {
    backgroundColor: Colors.TRANSPARENT
  },
  value: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE,
    marginBottom: Spacing.sm
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.WHITE_ALPHA_30,
    borderRadius: Radius.full,
    overflow: 'hidden'
  },
  progressFill: {
    height: 4,
    backgroundColor: Colors.WHITE_ALPHA_85,
    borderRadius: Radius.full
  }
});
