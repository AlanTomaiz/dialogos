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
  avatarRow: {
    alignItems: 'center',
    marginBottom: Spacing.base
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm
  },
  avatarText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: Colors.WHITE
  },
  fullName: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.md,
    color: Colors.TITLE,
    textAlign: 'center'
  },
  roleBadge: {
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.full,
    backgroundColor: Colors.BG,
    alignSelf: 'center'
  },
  roleBadgeText: {
    fontFamily: Typography.family.medium,
    fontSize: Typography.size.xs,
    color: Colors.MUTED
  },
  infoSection: {
    gap: Spacing.sm,
    marginTop: Spacing.base,
    marginBottom: Spacing.base
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER
  },
  infoLabel: {
    fontFamily: Typography.family.medium,
    fontSize: Typography.size.sm,
    color: Colors.MUTED,
    width: 56
  },
  infoValue: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.TITLE,
    flex: 1
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.full
  },
  statusActive: {
    backgroundColor: Colors.SUCCESS_BG
  },
  statusInactive: {
    backgroundColor: '#FEE2E2'
  },
  statusActiveText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.xs,
    color: Colors.SUCCESS_TEXT
  },
  statusInactiveText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.xs,
    color: '#991B1B'
  },
  actionButton: {
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center'
  },
  deactivateButton: {
    backgroundColor: Colors.TOAST_ERROR
  },
  reactivateButton: {
    backgroundColor: Colors.SUCCESS_GREEN
  },
  actionButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  }
});
