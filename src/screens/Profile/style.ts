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
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    gap: Spacing.base
  },
  profileCard: {
    borderRadius: Radius.lg,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.BORDER
  },
  profileMainRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileTextWrap: {
    flex: 1,
    marginLeft: Spacing.md
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarPhoto: {
    width: 54,
    height: 54,
    borderRadius: Radius.full
  },
  avatarInitials: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.md,
    color: Colors.WHITE
  },
  name: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.TITLE,
    marginBottom: Spacing.xs
  },
  roleText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED
  },
  menuCard: {
    borderRadius: Radius.lg,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.BORDER
  },
  menuRow: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  menuRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md
  },
  menuText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  menuDangerText: {
    fontFamily: Typography.family.medium,
    fontSize: Typography.size.base,
    color: Colors.TOAST_ERROR
  },
  menuDivider: {
    height: 1,
    backgroundColor: Colors.BORDER
  }
});
