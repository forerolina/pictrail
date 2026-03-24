'use client'

import { useState } from 'react'
import { GPSRouteSearch } from '@/components/search/GPSRouteSearch'
import { ImageSearch } from '@/components/search/ImageSearch'
import { PhotoGrid } from '@/components/photos/PhotoGrid'

export default function ExplorePage() {
  const [photos, setPhotos] = useState<
    Array<{
      id: string
      urlWatermarked: string
      priceBrl: number
      takenAt: Date
      routeName?: string
    }>
  >([])
  const [loading, setLoading] = useState(false)

  async function handleRouteSearch(params: { route: string; date: string }) {
    setLoading(true)
    try {
      const qs = new URLSearchParams(params).toString()
      const res = await fetch(`/api/photos?${qs}`)
      const data = await res.json()
      setPhotos(data.photos ?? [])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-foreground">Explorar Fotos</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Busque fotos suas por rota, evento ou imagem.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GPSRouteSearch onSearch={handleRouteSearch} loading={loading} />
        <ImageSearch onResults={(p) => setPhotos(p as typeof photos)} hasAccess={false} />
      </div>

      {photos.length > 0 && (
        <div>
          <h2 className="text-lg font-medium mb-4">Resultados ({photos.length} fotos)</h2>
          <PhotoGrid photos={photos} />
        </div>
      )}
    </div>
  )
}
