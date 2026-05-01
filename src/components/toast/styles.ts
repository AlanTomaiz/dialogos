import { StyleSheet } from 'react-native';
import theme from '../../theme';

export const TOAST_TYPES = {
  success: {
    backgroundColor: theme.colors.SUCCESS_GREEN,
    textColor: theme.colors.WHITE,
    iconColor: theme.colors.WHITE
  },
  info: {
    backgroundColor: theme.colors.TOAST_INFO,
    textColor: theme.colors.WHITE,
    iconColor: theme.colors.WHITE
  },
  warning: {
    backgroundColor: theme.colors.TOAST_WARNING,
    textColor: theme.colors.WHITE,
    iconColor: theme.colors.WHITE
  },
  error: {
    backgroundColor: theme.colors.TOAST_ERROR,
    textColor: theme.colors.WHITE,
    iconColor: theme.colors.WHITE
  }
};

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    width: '90%',
    alignSelf: 'center',
    zIndex: theme.zIndex.toast
  },
  stackItem: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.base,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radius.md,
    gap: theme.spacing.md
  },
  text: {
    flex: 1,
    fontFamily: theme.typography.family.semiBold,
    fontSize: theme.typography.size.sm
  }
});
