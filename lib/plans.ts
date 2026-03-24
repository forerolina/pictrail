import { Plan } from '@prisma/client'

export const PLAN_LIMITS: Record<
  Plan,
  { purchasesPerMonth: number; facialSearch: boolean; routeSearch: boolean }
> = {
  FREE: { purchasesPerMonth: 1, facialSearch: false, routeSearch: true },
  TRIAL: { purchasesPerMonth: Infinity, facialSearch: true, routeSearch: true },
  PRO: { purchasesPerMonth: Infinity, facialSearch: true, routeSearch: true },
}

export function getPlanLimit(plan: Plan) {
  return PLAN_LIMITS[plan]
}
