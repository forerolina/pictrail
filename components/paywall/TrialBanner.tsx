'use client'

import { daysLeftInTrial } from '@/lib/subscription'
import { Plan } from '@prisma/client'

interface Props {
  user: {
    plan: Plan
    trialEndsAt: Date | null
    stripeCurrentPeriodEnd: Date | null
    stripeSubscriptionId: string | null
  }
}

export function TrialBanner({ user }: Props) {
  if (user.plan !== 'TRIAL') return null
  const days = daysLeftInTrial(user)
  if (days === 0) return null

  return (
    <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm">
      <span>
        Você tem <strong>{days} dias</strong> de trial PRO restantes.{' '}
        <a href="/settings/billing" className="underline font-medium">
          Assinar agora →
        </a>
      </span>
    </div>
  )
}
