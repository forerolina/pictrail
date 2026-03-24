import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { tokens } from '../design-system/tokens'

// Color palette story
function ColorPalette() {
  return (
    <div className="p-8 space-y-8 bg-background">
      <h1 className="text-2xl font-medium text-foreground">Design Tokens — PicTrail</h1>

      <section>
        <h2 className="text-lg font-medium text-foreground mb-4">Cores</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(tokens.colors).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div
                className="h-16 rounded-lg border border-border"
                style={{ background: value }}
              />
              <p className="text-xs font-medium text-foreground">{key}</p>
              <p className="text-xs text-muted-foreground">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-foreground mb-4">Tipografia</h2>
        <div className="space-y-3">
          <h1 className="text-foreground">h1 — Heading 1</h1>
          <h2 className="text-foreground">h2 — Heading 2</h2>
          <h3 className="text-foreground">h3 — Heading 3</h3>
          <h4 className="text-foreground">h4 — Heading 4</h4>
          <p className="text-foreground">p — Body text</p>
          <p className="text-sm text-muted-foreground">small — Muted text</p>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-foreground mb-4">Raios (Border Radius)</h2>
        <div className="flex gap-4 items-end">
          {Object.entries(tokens.radius).map(([key, value]) => (
            <div key={key} className="text-center space-y-2">
              <div
                className="w-16 h-16 bg-primary"
                style={{ borderRadius: value }}
              />
              <p className="text-xs text-muted-foreground">{key}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

const meta: Meta = {
  title: 'Design System/Tokens',
  component: ColorPalette,
  parameters: { layout: 'fullscreen' },
}

export default meta

export const All: StoryObj = {}
