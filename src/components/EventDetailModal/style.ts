import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.OVERLAY_DARK_40
  },
  sheet: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: Radius.xxs,
    backgroundColor: Colors.BORDER,
    alignSelf: 'center',
    marginBottom: Spacing.base
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.base
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: Radius.xl,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarFallback: {
    backgroundColor: Colors.PRIMARY
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: Radius.xl
  },
  avatarText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  },
  creatorInfo: {
    flex: 1
  },
  creatorName: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  createdAt: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: Colors.TITLE,
    marginBottom: Spacing.sm
  },
  description: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.MUTED,
    marginBottom: Spacing.base,
    lineHeight: Typography.size.base * 1.5
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm
  },
  detailText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  },
  attendButton: {
    marginTop: Spacing.base,
    backgroundColor: Colors.TITLE,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center'
  },
  attendButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  },
  attendButtonDisabled: {
    backgroundColor: Colors.MUTED,
    opacity: 0.6
  }
});
