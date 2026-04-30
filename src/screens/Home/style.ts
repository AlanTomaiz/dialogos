import { StyleSheet } from 'react-native';
import { Shadow, Spacing, Typography } from '../../theme';

const BACKGROUND = '#F5F5F7';
const WHITE = '#FFFFFF';
const DARK_TEXT = '#111827';
const DIVIDER = '#E5E7EB';
const FAB_COLOR = '#F5952A';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: WHITE,
    borderBottomWidth: 1,
    borderBottomColor: DIVIDER,
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xl,
    color: DARK_TEXT,
  },
  metricRowWrapper: {
    flexDirection: 'row',
  },
  metricRow: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
  },
  agendaList: {
    gap: Spacing.md,
    padding: Spacing.base,
  },
  fab: {
    position: 'absolute',
    right: Spacing.base,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: FAB_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.lg,
  },
});
