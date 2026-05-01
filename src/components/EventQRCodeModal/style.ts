import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.OVERLAY_DARK_40
  },
  overlay: {
    ...StyleSheet.absoluteFillObject
  },
  sheet: {
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: Radius.xxl,
    borderTopRightRadius: Radius.xxl,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    alignItems: 'center'
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.BORDER,
    marginBottom: Spacing.lg
  },
  title: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.md,
    color: Colors.TITLE,
    marginBottom: Spacing.xs
  },
  eventName: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED,
    marginBottom: Spacing.xl,
    textAlign: 'center'
  },
  qrWrapper: {
    padding: Spacing.base,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.WHITE,
    marginBottom: Spacing.xl
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.PRIMARY,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl,
    marginBottom: Spacing.md
  },
  shareButtonText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  closeButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xl
  },
  closeButtonText: {
    fontFamily: Typography.family.medium,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  }
});
