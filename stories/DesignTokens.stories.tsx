import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { tokens, surfacePalette } from '../design-system/tokens'

function ColorSwatch({ name, value, label }: { name: string; value: string; label?: string }) {
  return (
    <div className="space-y-2">
      <div
        className="h-16 rounded-lg"
        style={{ background: value, boxShadow: '0 2px 12px rgba(25,28,29,0.06)' }}
      />
      <p className="text-xs font-medium" style={{ color: '#191c1d' }}>{label ?? name}</p>
      <p className="text-xs" style={{ color: '#3d494d' }}>{value}</p>
    </div>
  )
}

function ColorPalette() {
  return (
    <div className="p-8 space-y-10" style={{ background: '#f8f9fa' }}>
      <div>
        <h1
          className="text-2xl font-medium mb-1"
          style={{ color: '#191c1d', letterSpacing: '-0.02em' }}
        >
          Design Tokens — PicTrail
        </h1>
        <p className="text-sm" style={{ color: '#3d494d' }}>
          Technical Minimalism · The Precision Lens
        </p>
      </div>

      {/* Brand Colors */}
      <section>
        <h2 className="text-lg font-medium mb-4" style={{ color: '#191c1d' }}>
          Brand Colors
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorSwatch name="primary" value={tokens.colors.primary} label="Primary #00677d" />
          <ColorSwatch name="primaryContainer" value={tokens.colors.primaryContainer} label="Primary Container #00b4d8" />
          <ColorSwatch name="secondary" value="#4c616c" label="Secondary #4c616c" />
          <ColorSwatch name="destructive" value={tokens.colors.destructive} label="Destructive #d4183d" />
        </div>

        {/* Gradient preview */}
        <div className="mt-4 space-y-2">
          <div
            className="h-16 rounded-full"
            style={{ background: 'linear-gradient(135deg, #00677d 0%, #00b4d8 100%)' }}
          />
          <p className="text-xs font-medium" style={{ color: '#191c1d' }}>Primary CTA Gradient — liquid metal</p>
          <p className="text-xs" style={{ color: '#3d494d' }}>linear-gradient(135deg, #00677d → #00b4d8)</p>
        </div>
      </section>

      {/* Surface Hierarchy */}
      <section>
        <h2 className="text-lg font-medium mb-2" style={{ color: '#191c1d' }}>
          Surface Hierarchy
        </h2>
        <p className="text-xs mb-4" style={{ color: '#3d494d' }}>
          Depth via tonal layering — like stacked sheets of frosted glass.
          No 1px borders between sections.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <ColorSwatch name="surface" value={surfacePalette.surfaceContainerLowest} label="Lowest #fff" />
          <ColorSwatch name="surface" value={surfacePalette.surface} label="Surface #f8f9fa" />
          <ColorSwatch name="surfaceLow" value={surfacePalette.surfaceContainerLow} label="Container Low #f3f4f5" />
          <ColorSwatch name="surfaceContainer" value={surfacePalette.surfaceContainer} label="Container #edeeef" />
          <ColorSwatch name="surfaceHigh" value={surfacePalette.surfaceContainerHigh} label="Container High #e7e8e9" />
          <ColorSwatch name="surfaceHighest" value={surfacePalette.surfaceContainerHighest} label="Highest #e1e3e4" />
        </div>
      </section>

      {/* Text Colors */}
      <section>
        <h2 className="text-lg font-medium mb-4" style={{ color: '#191c1d' }}>
          Text — On Surface
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <ColorSwatch name="onSurface" value={surfacePalette.onSurface} label="On Surface #191c1d" />
          <ColorSwatch name="onSurfaceVariant" value={surfacePalette.onSurfaceVariant} label="On Surface Variant #3d494d" />
          <ColorSwatch name="outlineVariant" value={surfacePalette.outlineVariant} label="Outline Variant #bcc9ce" />
        </div>
      </section>

      {/* Component Tokens */}
      <section>
        <h2 className="text-lg font-medium mb-4" style={{ color: '#191c1d' }}>
          Component Tokens
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(tokens.colors).map(([key, value]) => (
            <ColorSwatch key={key} name={key} value={value} />
          ))}
        </div>
      </section>

      {/* Typography */}
      <section>
        <h2 className="text-lg font-medium mb-4" style={{ color: '#191c1d' }}>
          Tipografia — Inter
        </h2>
        <div className="space-y-4" style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '1rem' }}>
          <div>
            <p className="text-xs mb-1 uppercase tracking-widest" style={{ color: '#3d494d', letterSpacing: '0.05em' }}>Display</p>
            <h1 style={{ color: '#191c1d', letterSpacing: '-0.02em' }}>Display — Editorial headline</h1>
          </div>
          <div>
            <p className="text-xs mb-1 uppercase tracking-widest" style={{ color: '#3d494d', letterSpacing: '0.05em' }}>Headline</p>
            <h2 style={{ color: '#191c1d' }}>Headline — Navigation & sections</h2>
          </div>
          <div>
            <p className="text-xs mb-1 uppercase tracking-widest" style={{ color: '#3d494d', letterSpacing: '0.05em' }}>Body</p>
            <p style={{ color: '#3d494d' }}>Body — Technical descriptions and content</p>
          </div>
          <div>
            <p className="text-xs mb-1 uppercase tracking-widest" style={{ color: '#3d494d', letterSpacing: '0.05em' }}>Label Instrument</p>
            <p className="text-xs font-medium uppercase" style={{ color: '#191c1d', letterSpacing: '0.05em' }}>
              TELEMETRY · MICRO-COPY · DATA
            </p>
          </div>
        </div>
      </section>

      {/* Border Radius */}
      <section>
        <h2 className="text-lg font-medium mb-4" style={{ color: '#191c1d' }}>
          Raios (Border Radius)
        </h2>
        <div className="flex gap-6 items-end flex-wrap">
          {Object.entries(tokens.radius).map(([key, value]) => (
            <div key={key} className="text-center space-y-2">
              <div
                className="w-16 h-16"
                style={{ borderRadius: value, background: 'linear-gradient(135deg, #00677d 0%, #00b4d8 100%)' }}
              />
              <p className="text-xs font-medium" style={{ color: '#191c1d' }}>{key}</p>
              <p className="text-xs" style={{ color: '#3d494d' }}>{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Buttons */}
      <section>
        <h2 className="text-lg font-medium mb-4" style={{ color: '#191c1d' }}>
          Buttons
        </h2>
        <div className="flex flex-wrap gap-4 items-center">
          <button
            className="px-6 py-3 text-white font-semibold"
            style={{
              background: 'linear-gradient(135deg, #00677d 0%, #00b4d8 100%)',
              borderRadius: '9999px',
            }}
          >
            Primary CTA
          </button>
          <button
            className="px-6 py-3 font-semibold"
            style={{ background: '#edeeef', color: '#191c1d', borderRadius: '0.75rem' }}
          >
            Secondary
          </button>
          <button
            className="px-6 py-3 font-semibold"
            style={{ background: 'none', color: '#00677d' }}
          >
            Tertiary (text-only)
          </button>
        </div>
      </section>

      {/* No-Line Rule reminder */}
      <section
        className="rounded-2xl p-5"
        style={{ background: '#edeeef' }}
      >
        <h3 className="font-semibold mb-2" style={{ color: '#191c1d' }}>
          ⚡ The No-Line Rule
        </h3>
        <p className="text-sm" style={{ color: '#3d494d' }}>
          1px solid borders are strictly prohibited for sectioning. Boundaries must be defined
          solely through background color shifts. Ghost borders (outline-variant #bcc9ce at 15%
          opacity) are the only allowed fallback for accessibility-critical data tables.
        </p>
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
