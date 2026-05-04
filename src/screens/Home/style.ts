import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.WHITE
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.xl,
    color: Colors.TITLE
  },
  headerAction: {
    padding: Spacing.xs
  },
  metricRowWrapper: {
    flexDirection: 'row'
  },
  metricRow: {
    flex: 1,
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base
  },
  agendaList: {
    gap: Spacing.md,
    padding: Spacing.base
  },
  fab: {
    position: 'absolute',
    right: Spacing.base,
    width: 56,
    height: 56,
    borderRadius: Radius.xxl,
    backgroundColor: Colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
