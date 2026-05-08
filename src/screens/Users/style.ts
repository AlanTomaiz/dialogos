import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.lg,
    backgroundColor: Colors.WHITE
  },
  headerBackButton: {
    marginRight: Spacing.base,
    padding: Spacing.xs
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xl,
    color: Colors.TITLE
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.WHITE,
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.BORDER
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  avatarText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.sm,
    color: Colors.WHITE
  },
  userInfo: {
    flex: 1
  },
  userName: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  userEmail: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED,
    marginTop: Spacing.xxs
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.full,
    flexShrink: 0
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
    paddingBottom: Spacing.xxxl
  },
  emptyText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.MUTED
  }
});
