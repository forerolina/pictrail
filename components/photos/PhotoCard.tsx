import Image from 'next/image'
import Link from 'next/link'
import { WatermarkOverlay } from './WatermarkOverlay'
import { Badge } from '@/components/ui/badge'

interface PhotoCardProps {
  id: string
  urlWatermarked: string
  priceBrl: number
  takenAt: Date
  routeName?: string
  purchased?: boolean
}

export function PhotoCard({
  id,
  urlWatermarked,
  priceBrl,
  takenAt,
  routeName,
  purchased = false,
}: PhotoCardProps) {
  return (
    <Link href={`/photo/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-[4/3]">
        <Image
          src={urlWatermarked}
          alt="Foto da prova"
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {!purchased && <WatermarkOverlay />}
        {purchased && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-primary text-primary-foreground">Comprada</Badge>
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {new Date(takenAt).toLocaleDateString('pt-BR')}
          </p>
          {routeName && (
            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
              {routeName}
            </p>
          )}
        </div>
        <span className="text-sm font-medium text-foreground">
          R$ {priceBrl.toFixed(2).replace('.', ',')}
        </span>
      </div>
    </Link>
  )
}
