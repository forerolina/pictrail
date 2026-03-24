import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()

  const photo = await db.photo.findUnique({
    where: { id },
    include: {
      gallery: true,
      photographer: { select: { displayName: true } },
    },
  })

  if (!photo) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const purchased = session?.user?.id
    ? !!(await db.purchase.findFirst({
        where: { userId: session.user.id, photoId: id, status: 'paid' },
      }))
    : false

  return NextResponse.json({
    ...photo,
    url: purchased ? photo.urlFullres : photo.urlWatermarked,
    purchased,
  })
}
