import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PaywallGate } from '../components/paywall/PaywallGate'

const meta: Meta<typeof PaywallGate> = {
  title: 'Components/PaywallGate',
  component: PaywallGate,
  parameters: {
    layout: 'centered',
    nextjs: { appDir: true },
  },
}

export default meta
type Story = StoryObj<typeof PaywallGate>

export const Locked: Story = {
  args: {
    feature: 'Reconhecimento facial',
    hasAccess: false,
    children: (
      <div className="w-80 h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
        Conteúdo bloqueado
      </div>
    ),
  },
}

export const Unlocked: Story = {
  args: {
    feature: 'Reconhecimento facial',
    hasAccess: true,
    children: (
      <div className="w-80 h-48 bg-muted rounded-lg flex items-center justify-center text-foreground">
        Conteúdo visível ✓
      </div>
    ),
  },
}
