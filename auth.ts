import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { db } from '@/lib/db'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: 'noreply@pictrail.com.br',
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
  events: {
    async createUser({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          plan: 'TRIAL',
          trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        },
      })
    },
  },
  pages: {
    signIn: '/login',
  },
})
