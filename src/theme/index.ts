// ─────────────────────────────────────────────
//  Dialogos — Design System / Theme
// ─────────────────────────────────────────────

export const Colors = {
  // Palette
  primaryBackground: '#0B102F',
  secondaryShade: '#2A3681',
  accent: '#A5B2E0',
  nightStarAccent: '#FCD172',
  textAndIcons: '#FFFFFF',

  // Semantic aliases
  background: '#0B102F',
  surface: '#2A3681',
  primary: '#A5B2E0',
  highlight: '#FCD172',
  text: '#FFFFFF',
  textMuted: '#A5B2E0',
  textInverse: '#0B102F',
  error: '#FF6B6B',
  success: '#4ECDC4',
  border: '#2A3681',
  overlay: 'rgba(11, 16, 47, 0.75)',
} as const;

export const Typography = {
  family: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold',
  },
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 32,
    display: 40,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const Spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
  section: 64,
} as const;

export const Radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const Shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;

export const ZIndex = {
  base: 0,
  card: 10,
  dropdown: 20,
  modal: 30,
  toast: 40,
  tooltip: 50,
} as const;

const theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radius: Radius,
  shadow: Shadow,
  zIndex: ZIndex,
} as const;

export type Theme = typeof theme;
export default theme;
