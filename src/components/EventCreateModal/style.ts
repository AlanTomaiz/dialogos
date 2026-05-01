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
    paddingTop: Spacing.md,
    gap: Spacing.base
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: Radius.full,
    backgroundColor: Colors.BORDER,
    alignSelf: 'center'
  },
  title: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: Colors.TITLE
  },
  input: {
    minHeight: 48,
    borderRadius: Radius.lg,
    backgroundColor: Colors.INPUT_BG,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.TITLE,
    textAlignVertical: 'top'
  },
  descriptionInput: {
    minHeight: 104
  },
  timeRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.sm
  },
  timeInput: {
    width: '48%',
    flexGrow: 0,
    flexShrink: 1,
    minWidth: 0
  },
  actions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.xs
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.INPUT_BG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  secondaryButtonText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  primaryButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  }
});
