import { StyleSheet } from 'react-native';
import { Radius, Shadow, Spacing, Typography } from '../../theme';

const WHITE = '#FFFFFF';
const DARK_TEXT = '#111827';
const GRAY_TEXT = '#6B7280';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: WHITE,
    borderRadius: Radius.lg,
    padding: Spacing.base,
    ...Shadow.sm,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: DARK_TEXT,
    marginBottom: Spacing.xxs,
  },
  time: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: GRAY_TEXT,
  },
  duration: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: GRAY_TEXT,
  },
  badge: {
    width: 22,
    height: 22,
    borderRadius: Radius.sm,
    borderWidth: 2,
    marginLeft: Spacing.md,
    marginTop: Spacing.xxs,
  },
});
