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
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  let customerId = user.stripeCustomerId

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.name ?? undefined,
    })
    customerId = customer.id
    await db.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID_PRO!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/settings/billing?canceled=true`,
    metadata: { userId: user.id },
  })

  return NextResponse.redirect(checkoutSession.url!, 303)
}
