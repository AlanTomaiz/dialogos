import { StyleSheet } from 'react-native';
import { Colors, Radius, Shadow, Spacing, Typography } from '../../theme';

const cardGreen = '#2E7D52';
const cardGreenLight = '#3A9966';
const cardTextDark = '#1A1A1A';

export const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    overflow: 'hidden',
    width: '100%',
    ...Shadow.md,
  },
  illustrationArea: {
    backgroundColor: cardGreen,
    height: 180,
    padding: Spacing.base,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderBottomWidth: 0,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.sm,
    backgroundColor: Colors.text,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    backgroundColor: Colors.text,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
  },
  title: {
    fontSize: Typography.size.xl,
    fontFamily: Typography.family.bold,
    color: cardTextDark,
  },
  subtitle: {
    fontSize: Typography.size.sm,
    fontFamily: Typography.family.regular,
    color: cardGreenLight,
    marginTop: Spacing.xxs,
  },
});
