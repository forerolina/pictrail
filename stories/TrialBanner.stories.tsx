import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TrialBanner } from '../components/paywall/TrialBanner'

const meta: Meta<typeof TrialBanner> = {
  title: 'Components/TrialBanner',
  component: TrialBanner,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof TrialBanner>

export const Active: Story = {
  args: {
    user: {
      plan: 'TRIAL',
      trialEndsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      stripeCurrentPeriodEnd: null,
      stripeSubscriptionId: null,
    },
  },
}

export const LastDay: Story = {
  args: {
    user: {
      plan: 'TRIAL',
      trialEndsAt: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
      stripeCurrentPeriodEnd: null,
      stripeSubscriptionId: null,
    },
  },
}

export const FreePlan: Story = {
  args: {
    user: {
      plan: 'FREE',
      trialEndsAt: null,
      stripeCurrentPeriodEnd: null,
      stripeSubscriptionId: null,
    },
  },
}
