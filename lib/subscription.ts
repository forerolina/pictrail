import { Plan } from '@prisma/client'

interface UserSubscription {
  plan: Plan
  trialEndsAt: Date | null
  stripeCurrentPeriodEnd: Date | null
  stripeSubscriptionId: string | null
}

export function isTrialActive(user: UserSubscription): boolean {
  if (user.plan !== 'TRIAL') return false
  if (!user.trialEndsAt) return false
  return user.trialEndsAt > new Date()
}

export function isSubscribed(user: UserSubscription): boolean {
  if (user.plan !== 'PRO') return false
  if (!user.stripeCurrentPeriodEnd) return false
  return user.stripeCurrentPeriodEnd > new Date()
}

export function hasAccess(user: UserSubscription): boolean {
  return isTrialActive(user) || isSubscribed(user) || user.plan === 'FREE'
}

export function daysLeftInTrial(user: UserSubscription): number {
  if (!isTrialActive(user) || !user.trialEndsAt) return 0
  const diff = user.trialEndsAt.getTime() - Date.now()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}
