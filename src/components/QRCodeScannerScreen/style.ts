import { StyleSheet } from 'react-native';
import { Colors, Radius, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BG,
    paddingHorizontal: Spacing.base
  },
  headerCard: {
    backgroundColor: Colors.SCANNER_HEADER_BG,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    marginBottom: Spacing.lg
  },
  headerTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.lg,
    color: Colors.TITLE,
    marginBottom: Spacing.xs
  },
  headerSubtitle: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.sm,
    color: Colors.MUTED,
    textAlign: 'center'
  },
  scannerArea: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderRadius: Radius.xl,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  camera: {
    flex: 1
  },
  permissionFallback: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.base
  },
  permissionText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.base,
    color: Colors.MUTED,
    textAlign: 'center',
    marginBottom: Spacing.base
  },
  permissionButton: {
    backgroundColor: Colors.SECONDARY,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm
  },
  permissionButtonText: {
    fontFamily: Typography.family.semiBold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  },
  scanFrame: {
    position: 'absolute',
    width: 230,
    height: 230,
    alignSelf: 'center'
  },
  corner: {
    position: 'absolute',
    width: 28,
    height: 28
  },
  topLeft: {
    top: 0,
    left: 0
  },
  topRight: {
    top: 0,
    right: 0
  },
  bottomLeft: {
    bottom: 0,
    left: 0
  },
  bottomRight: {
    bottom: 0,
    right: 0
  },
  closeButton: {
    marginTop: Spacing.base,
    backgroundColor: Colors.SECONDARY,
    borderRadius: Radius.full,
    alignItems: 'center',
    paddingVertical: Spacing.md
  },
  closeButtonText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.base,
    color: Colors.WHITE
  }
});
