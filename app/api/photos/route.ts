import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const route = searchParams.get('route') ?? ''
  const date = searchParams.get('date') ?? ''

  const photos = await db.photo.findMany({
    where: {
      status: 'available',
      ...(route && {
        gallery: { routeName: { contains: route, mode: 'insensitive' } },
      }),
      ...(date && {
        takenAt: {
          gte: new Date(date),
          lt: new Date(new Date(date).getTime() + 86400000),
        },
      }),
    },
    include: { gallery: { select: { routeName: true } } },
    take: 50,
    orderBy: { takenAt: 'desc' },
  })

  return NextResponse.json({
    photos: photos.map((p) => ({
      id: p.id,
      urlWatermarked: p.urlWatermarked,
      priceBrl: p.priceBrl,
      takenAt: p.takenAt,
      routeName: p.gallery?.routeName,
    })),
  })
}
