import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { getPlanLimit } from '@/lib/plans'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

  const limits = getPlanLimit(user.plan)
  if (!limits.facialSearch) {
    return NextResponse.json(
      { error: 'Reconhecimento facial disponível apenas no plano PRO.' },
      { status: 403 }
    )
  }

  await db.imageSearch.create({
    data: { userId: user.id, consentGivenAt: new Date() },
  })

  // Stub: return mock similar photos
  const photos = await db.photo.findMany({
    where: { status: 'available' },
    take: 8,
    orderBy: { takenAt: 'desc' },
  })

  return NextResponse.json({ photos })
}

export const config = { api: { bodyParser: false } }
