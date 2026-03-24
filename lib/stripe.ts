import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-02-25.clover',
  typescript: true,
})

export const PRO_PRICE_BRL = 2900 // R$ 29,00 in centavos
