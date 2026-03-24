export interface DesignTokens {
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    inputBackground: string
    switchBackground: string
    ring: string
  }
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  fontWeight: {
    normal: number
    medium: number
  }
}

export const tokens: DesignTokens = {
  colors: {
    background: '#ffffff',
    foreground: 'oklch(0.145 0 0)',
    card: '#ffffff',
    cardForeground: 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)',
    popoverForeground: 'oklch(0.145 0 0)',
    primary: '#030213',
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.95 0.0058 264.53)',
    secondaryForeground: '#030213',
    muted: '#ececf0',
    mutedForeground: '#717182',
    accent: '#e9ebef',
    accentForeground: '#030213',
    destructive: '#d4183d',
    destructiveForeground: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)',
    input: 'transparent',
    inputBackground: '#f3f3f5',
    switchBackground: '#cbced4',
    ring: 'oklch(0.708 0 0)',
  },
  radius: {
    sm: 'calc(0.625rem - 4px)',
    md: 'calc(0.625rem - 2px)',
    lg: '0.625rem',
    xl: 'calc(0.625rem + 4px)',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
  },
}

export const darkTokens: Partial<DesignTokens['colors']> = {
  background: 'oklch(0.145 0 0)',
  foreground: 'oklch(0.985 0 0)',
  card: 'oklch(0.145 0 0)',
  cardForeground: 'oklch(0.985 0 0)',
  popover: 'oklch(0.145 0 0)',
  popoverForeground: 'oklch(0.985 0 0)',
  primary: 'oklch(0.985 0 0)',
  primaryForeground: 'oklch(0.205 0 0)',
  secondary: 'oklch(0.269 0 0)',
  secondaryForeground: 'oklch(0.985 0 0)',
  muted: 'oklch(0.269 0 0)',
  mutedForeground: 'oklch(0.708 0 0)',
  accent: 'oklch(0.269 0 0)',
  accentForeground: 'oklch(0.985 0 0)',
  destructive: 'oklch(0.396 0.141 25.723)',
  border: 'oklch(0.269 0 0)',
  input: 'oklch(0.269 0 0)',
  ring: 'oklch(0.439 0 0)',
}
