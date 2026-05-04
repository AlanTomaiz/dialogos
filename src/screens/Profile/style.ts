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
    paddingBottom: Spacing.md,
    backgroundColor: Colors.WHITE
  },
  headerBackButton: {
    marginRight: Spacing.base,
    padding: Spacing.xs
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xl,
    color: Colors.TITLE
  },
  content: {
    alignItems: 'center',
    paddingTop: Spacing.xxxl
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg
  },
  avatarPhoto: {
    width: 96,
    height: 96,
    borderRadius: Radius.full,
    marginBottom: Spacing.lg
  },
  avatarInitials: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xxl,
    color: Colors.WHITE
  },
  name: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: Colors.TITLE,
    marginBottom: Spacing.sm
  },
  roleBadge: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.full,
    backgroundColor: Colors.SECONDARY
  },
  roleText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.sm,
    color: Colors.WHITE
  }
});
