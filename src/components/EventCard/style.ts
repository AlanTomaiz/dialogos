import { StyleSheet } from 'react-native';
import { Colors, Radius, Shadow, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: Colors.WHITE,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm
  },
  content: {
    flex: 1
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.TITLE,
    marginBottom: Spacing.xxs
  },
  time: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  },
  duration: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: Radius.sm,
    borderWidth: 2,
    borderColor: Colors.BORDER,
    marginLeft: Spacing.md,
    marginTop: Spacing.xxs
  },
  badgeChecked: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY
  }
});
