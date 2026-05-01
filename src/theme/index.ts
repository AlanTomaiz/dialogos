export const Colors = {
  // Palette
  BG: '#F5F5F7',
  WHITE: '#FFFFFF',
  TRANSPARENT: 'transparent',
  TITLE: '#111827',
  MUTED: '#6B7280',
  BORDER: '#E5E7EB',
  PRIMARY: '#F5C62A',
  SECONDARY: '#4A7FE5',
  SCREENBG: '#FDB640',
  INPUT_BG: '#F9FAFB',
  SUCCESS_BG: '#E5F4D9',
  SUCCESS_TEXT: '#223A18',
  SCANNER_HEADER_BG: '#F3F4F6',
  OVERLAY_DARK_40: 'rgba(0,0,0,0.4)',
  WHITE_ALPHA_30: 'rgba(255,255,255,0.3)',
  WHITE_ALPHA_85: 'rgba(255,255,255,0.85)',
  WHITE_ALPHA_90: 'rgba(255,255,255,0.9)',
  SUCCESS_GREEN: '#22C55E',
  TOAST_INFO: '#4DA3FF',
  TOAST_WARNING: '#FF8A3D',
  TOAST_ERROR: '#FF5C5C',
  NOTIFICATION_LIGHT: '#A5B2E0'
} as const;

export const Typography = {
  family: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    semiBold: 'Poppins_600SemiBold',
    bold: 'Poppins_700Bold'
  },
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    md: 17,
    lg: 20,
    xl: 24,
    xxl: 32,
    display: 40
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75
  }
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
  section: 64
} as const;

export const Radius = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 28,
  full: 9999
} as const;

export const Shadow = {
  sm: {},
  md: {},
  lg: {}
} as const;

export const ZIndex = {
  base: 0,
  card: 10,
  dropdown: 20,
  modal: 30,
  toast: 40,
  tooltip: 50
} as const;

const theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  radius: Radius,
  shadow: Shadow,
  zIndex: ZIndex
} as const;

export type Theme = typeof theme;
export default theme;
