import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { stripe } from '@/lib/stripe'

export async function POST(_req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL!))
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user?.stripeCustomerId) {
    return NextResponse.redirect(new URL('/settings/billing', process.env.NEXT_PUBLIC_APP_URL!))
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing`,
  })

  return NextResponse.redirect(portalSession.url, 303)
}
