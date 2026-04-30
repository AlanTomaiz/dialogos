import { StyleSheet } from 'react-native';
import { Radius, Spacing, Typography } from '../../theme';

const BG = '#EDF2FF';
const WHITE = '#FFFFFF';
const DARK = '#111827';
const MUTED = '#6B7280';
const BLUE = '#4A7FE5';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: Spacing.base,
  },
  headerCard: {
    backgroundColor: '#F3F4F6',
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: DARK,
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: MUTED,
    textAlign: 'center',
  },
  scannerArea: {
    flex: 1,
    backgroundColor: WHITE,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  permissionFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base,
  },
  permissionText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: MUTED,
    textAlign: 'center',
    marginBottom: Spacing.base,
  },
  permissionButton: {
    backgroundColor: BLUE,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  permissionButtonText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: WHITE,
  },
  scanFrame: {
    position: 'absolute',
    width: 230,
    height: 230,
    alignSelf: 'center',
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderColor: '#5A88D9',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  },
  closeButton: {
    marginTop: Spacing.base,
    backgroundColor: BLUE,
    borderRadius: Radius.full,
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  closeButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: WHITE,
  },
});
