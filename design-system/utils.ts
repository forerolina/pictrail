import { tokens, darkTokens } from './tokens'

export function toCssVar(key: string): string {
  return `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
}

export function tokensToVars(
  colorTokens: Record<string, string>
): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [key, value] of Object.entries(colorTokens)) {
    vars[toCssVar(key)] = value
  }
  return vars
}

export function generateRootCSS(): string {
  const lightVars = tokensToVars(tokens.colors)
  const darkVars = tokensToVars(darkTokens as Record<string, string>)

  const lightLines = Object.entries(lightVars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')

  const darkLines = Object.entries(darkVars)
    .map(([k, v]) => `  ${k}: ${v};`)
    .join('\n')

  return `:root {\n${lightLines}\n}\n\n.dark {\n${darkLines}\n}`
}
