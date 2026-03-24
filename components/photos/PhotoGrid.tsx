import { PhotoCard } from './PhotoCard'

interface Photo {
  id: string
  urlWatermarked: string
  priceBrl: number
  takenAt: Date
  routeName?: string
  purchased?: boolean
}

interface PhotoGridProps {
  photos: Photo[]
  emptyMessage?: string
}

export function PhotoGrid({ photos, emptyMessage = 'Nenhuma foto encontrada.' }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <p className="text-4xl mb-4">📷</p>
        <p className="text-sm">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} {...photo} />
      ))}
    </div>
  )
}
