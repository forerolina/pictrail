import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { db } from '@/lib/db'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      if (!userId || !session.subscription) break

      const sub = await stripe.subscriptions.retrieve(session.subscription as string)

      await db.user.update({
        where: { id: userId },
        data: {
          plan: 'PRO',
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(sub as any).current_period_end ?? Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60) * 1000),
        },
      })
      break
    }

    case 'invoice.payment_succeeded': {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const invoice = event.data.object as any
      if (!invoice.subscription) break

      const sub = await stripe.subscriptions.retrieve(invoice.subscription as string)
      const user = await db.user.findFirst({
        where: { stripeSubscriptionId: sub.id },
      })
      if (!user) break

      await db.user.update({
        where: { id: user.id },
        data: {
          plan: 'PRO',
          stripeCurrentPeriodEnd: new Date(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(sub as any).current_period_end ?? Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60) * 1000),
        },
      })
      break
    }

    case 'customer.subscription.deleted':
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const user = await db.user.findFirst({
        where: { stripeSubscriptionId: sub.id },
      })
      if (!user) break

      if (sub.status === 'canceled' || sub.status === 'unpaid') {
        await db.user.update({
          where: { id: user.id },
          data: { plan: 'FREE', stripeSubscriptionId: null },
        })
      } else {
        await db.user.update({
          where: { id: user.id },
          data: {
            stripeCurrentPeriodEnd: new Date(// eslint-disable-next-line @typescript-eslint/no-explicit-any
(sub as any).current_period_end ?? Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60) * 1000),
          },
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } }
