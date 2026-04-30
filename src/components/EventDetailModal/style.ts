import { StyleSheet } from 'react-native';
import { Radius, Shadow, Spacing, Typography } from '../../theme';

const WHITE = '#FFFFFF';
const DARK_TEXT = '#111827';
const GRAY_TEXT = '#6B7280';
const DIVIDER = '#E5E7EB';
const ATTEND_BG = '#111827';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    backgroundColor: WHITE,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    ...Shadow.lg,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: DIVIDER,
    alignSelf: 'center',
    marginBottom: Spacing.base,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.base,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: WHITE,
  },
  creatorInfo: {
    flex: 1,
  },
  creatorName: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: DARK_TEXT,
  },
  createdAt: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: GRAY_TEXT,
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: DARK_TEXT,
    marginBottom: Spacing.sm,
  },
  description: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: GRAY_TEXT,
    marginBottom: Spacing.base,
    lineHeight: Typography.size.base * 1.5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  detailText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: GRAY_TEXT,
  },
  attendButton: {
    marginTop: Spacing.base,
    backgroundColor: ATTEND_BG,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    ...Shadow.sm,
  },
  attendButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: WHITE,
  },
});
