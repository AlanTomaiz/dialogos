import { StyleSheet } from 'react-native';
import { Colors, Radius, Shadow, Spacing, Typography } from '../../theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Spacing.xl,
    },
    appTitle: {
        fontSize: Typography.size.xxl,
        fontFamily: Typography.family.bold,
        color: Colors.text,
        letterSpacing: 1,
        marginBottom: Spacing.xs,
    },
    appSubtitle: {
        fontSize: Typography.size.sm,
        fontFamily: Typography.family.regular,
        color: Colors.textMuted,
        marginBottom: Spacing.xxxl,
        letterSpacing: 0.5,
    },
    locationCard: {
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        padding: Spacing.xl,
        width: '100%',
        ...Shadow.md,
    },
    cardTitle: {
        fontSize: Typography.size.md,
        fontFamily: Typography.family.semiBold,
        color: Colors.text,
        marginBottom: Spacing.base,
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    label: {
        fontSize: Typography.size.sm,
        fontFamily: Typography.family.medium,
        color: Colors.textMuted,
    },
    value: {
        fontSize: Typography.size.sm,
        fontFamily: Typography.family.semiBold,
        color: Colors.text,
        fontVariant: ['tabular-nums'],
    },
    loadingText: {
        marginTop: Spacing.md,
        fontSize: Typography.size.base,
        fontFamily: Typography.family.regular,
        color: Colors.textMuted,
    },
    errorText: {
        fontSize: Typography.size.base,
        fontFamily: Typography.family.regular,
        color: Colors.error,
        textAlign: 'center',
    },
});
