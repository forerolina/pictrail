export interface DesignTokens {
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryContainer: string
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
    full: string
  }
  fontWeight: {
    normal: number
    medium: number
  }
}

export const tokens: DesignTokens = {
  colors: {
    // Surface hierarchy (light layers like frosted glass)
    background: '#f8f9fa',          // surface — base layer
    foreground: '#191c1d',          // on-surface — near-black (never #000)

    card: '#ffffff',                // surface-container-lowest — white cards
    cardForeground: '#191c1d',

    popover: '#ffffff',
    popoverForeground: '#191c1d',

    primary: '#00677d',             // primary teal — precision lens
    primaryContainer: '#00b4d8',    // primary-container cyan — gradient end
    primaryForeground: '#ffffff',

    secondary: '#edeeef',           // surface-container — secondary buttons
    secondaryForeground: '#191c1d',

    muted: '#f3f4f5',               // surface-container-low — secondary sectioning
    mutedForeground: '#3d494d',     // on-surface-variant

    accent: '#e1e3e4',              // surface-container-highest — recessed data
    accentForeground: '#00677d',

    destructive: '#d4183d',
    destructiveForeground: '#ffffff',

    border: '#bcc9ce',              // outline-variant (use at 15% opacity for ghost borders)
    input: 'transparent',
    inputBackground: '#e7e8e9',     // surface-container-high
    switchBackground: '#bcc9ce',
    ring: '#00677d',
  },
  radius: {
    sm: '0.45rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.25rem',
    full: '9999px',                 // primary CTA buttons
  },
  fontWeight: {
    normal: 400,
    medium: 500,
  },
}

// Surface palette reference — Technical Minimalism
export const surfacePalette = {
  surface: '#f8f9fa',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainer: '#edeeef',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerHighest: '#e1e3e4',
  surfaceContainerLowest: '#ffffff',
  onSurface: '#191c1d',
  onSurfaceVariant: '#3d494d',
  outlineVariant: '#bcc9ce',
  primary: '#00677d',
  primaryContainer: '#00b4d8',
  secondary: '#4c616c',
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
