import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xl,
    color: Colors.TITLE,
    marginBottom: Spacing.xl
  },
  fieldWrap: {
    width: '80%',
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.BORDER,
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm
  },
  input: {
    flex: 1,
    marginLeft: Spacing.sm,
    padding: 10,
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.TITLE
  },
  loginButton: {
    width: '80%',
    height: 46,
    borderRadius: Radius.full,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  },
  separatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.lg
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.BORDER
  },
  separatorText: {
    fontFamily: Typography.family.regular,
    color: Colors.MUTED,
    fontSize: Typography.size.sm
  },
  guestButton: {
    height: 42,
    borderRadius: Radius.full,
    backgroundColor: Colors.SUCCESS_BG,
    alignItems: 'center',
    justifyContent: 'center'
  },
  guestButtonText: {
    fontFamily: Typography.family.semiBold,
    color: Colors.SUCCESS_TEXT,
    fontSize: Typography.size.base
  },
  signupText: {
    textAlign: 'center',
    fontFamily: Typography.family.regular,
    color: Colors.MUTED,
    fontSize: Typography.size.sm
  },
  signupLink: {
    fontFamily: Typography.family.bold,
    color: Colors.TITLE
  }
});
