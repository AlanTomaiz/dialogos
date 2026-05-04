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
    maxHeight: '80%'
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: Radius.xxs,
    backgroundColor: Colors.BORDER,
    alignSelf: 'center',
    marginBottom: Spacing.base
  },
  header: {
    marginBottom: Spacing.base
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: Colors.TITLE
  },
  headerSubtitle: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED,
    marginTop: Spacing.xxs
  },
  loader: {
    marginVertical: Spacing.xxl
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.md
  },
  emptyText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.MUTED
  },
  listContent: {
    paddingBottom: Spacing.base
  },
  participantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BORDER
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.sm,
    color: Colors.WHITE
  },
  participantInfo: {
    flex: 1
  },
  participantName: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  participantTime: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  }
});
