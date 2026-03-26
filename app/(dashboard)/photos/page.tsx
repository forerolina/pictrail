'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { Search, ImagePlus, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ROUTE_LABELS: Record<string, string> = {
  orla: 'Orla do Guaíba',
  farroupilha: 'Parque Farroupilha',
  bento: 'Bento Gonçalves Norte',
}

const categories = ['Todas', 'Custom', 'Naked', 'Adventure', 'Trail', 'Touring', 'Esportivo']
const periods = ['Manhã', 'Tarde', 'Noite'] as const
type Period = typeof periods[number]

const dateFilters = ['Esta semana', 'Semana passada', 'Mês'] as const
type DateFilter = typeof dateFilters[number]

const mockPhotos = [
  {
    id: '1',
    photographer: 'Carlos Mendes',
    initials: 'CM',
    handle: 'carlos-mendes',
    location: 'Orla do Guaíba - POA',
    routeId: 'orla',
    category: 'Moto',
    period: 'Manhã' as Period,
    date: '23 Mar 2025',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80',
    price: 'R$ 29,90',
  },
  {
    id: '2',
    photographer: 'Ana Lima',
    initials: 'AL',
    handle: 'ana-lima',
    location: 'Orla do Guaíba - POA',
    routeId: 'orla',
    category: 'Custom',
    period: 'Tarde' as Period,
    date: '23 Mar 2025',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80',
    price: 'R$ 24,90',
  },
  {
    id: '3',
    photographer: 'Bruno Costa',
    initials: 'BC',
    handle: 'bruno-costa',
    location: 'Bento Gonçalves - RS',
    routeId: 'bento',
    category: 'Esportivo',
    period: 'Noite' as Period,
    date: '20 Mar 2025',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80',
    price: 'R$ 34,90',
  },
  {
    id: '4',
    photographer: 'Marcos Reis',
    initials: 'MR',
    handle: 'marcos-reis',
    location: 'Parque Farroupilha - POA',
    routeId: 'farroupilha',
    category: 'Moto',
    period: 'Manhã' as Period,
    date: '15 Mar 2025',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80',
    price: 'R$ 29,90',
  },
  {
    id: '5',
    photographer: 'Julia Faria',
    initials: 'JF',
    handle: 'julia-faria',
    location: 'Parque Farroupilha - POA',
    routeId: 'farroupilha',
    category: 'Custom',
    period: 'Tarde' as Period,
    date: '10 Mar 2025',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    price: 'R$ 39,90',
  },
  {
    id: '6',
    photographer: 'Bruno Costa',
    initials: 'BC',
    handle: 'bruno-costa',
    location: 'Orla do Guaíba - POA',
    routeId: 'orla',
    category: 'Moto',
    period: 'Noite' as Period,
    date: '23 Mar 2025',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80',
    price: 'R$ 29,90',
  },
]

function PhotosContent() {
  const searchParams = useSearchParams()
  const routeParam = searchParams.get('route') ?? ''

  const [activeCategory, setActiveCategory] = useState('Todas')
  const [activePeriods, setActivePeriods] = useState<Period[]>([])
  const [activeDateFilter, setActiveDateFilter] = useState<DateFilter | null>(null)
  const [search, setSearch] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [activeRouteFilter, setActiveRouteFilter] = useState(routeParam)

  useEffect(() => {
    setActiveRouteFilter(searchParams.get('route') ?? '')
  }, [searchParams])

  const togglePeriod = (p: Period) => {
    setActivePeriods((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setUploadedImage(url)
  }

  const clearUpload = () => {
    setUploadedImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const filtered = mockPhotos.filter((photo) => {
    if (activeRouteFilter && photo.routeId !== activeRouteFilter) return false
    if (activeCategory !== 'Todas' && photo.category !== activeCategory) return false
    if (activePeriods.length > 0 && !activePeriods.includes(photo.period)) return false
    if (search && !photo.photographer.toLowerCase().includes(search.toLowerCase()) &&
        !photo.location.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const routeLabel = activeRouteFilter ? ROUTE_LABELS[activeRouteFilter] : null

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — sticky liquid glass */}
      <div className="px-4 pt-12 pb-3 liquid-glass sticky top-0 z-10">
        {/* Row 1: title + buscar por imagem */}
        <div className="flex items-center justify-between mb-3 h-[44px]">
          <h1 className="text-2xl font-bold text-foreground leading-none" style={{ letterSpacing: '-0.02em' }}>Fotos</h1>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          <button
            type="button"
            aria-label={uploadedImage ? 'Imagem ativa — clique para alterar' : 'Buscar por imagem'}
            onClick={() => fileInputRef.current?.click()}
            className={`flex items-center gap-1.5 text-sm font-semibold px-4 min-h-[44px] rounded-full transition-all flex-none ${
              uploadedImage ? 'bg-primary text-primary-foreground' : 'btn-primary'
            }`}
          >
            <ImagePlus size={14} aria-hidden="true" />
            <span>{uploadedImage ? 'Imagem ativa' : 'Buscar por imagem'}</span>
          </button>
        </div>

        {/* Row 2: full-width search bar — liquid glass float */}
        <div className="flex items-center gap-2 liquid-glass-float rounded-2xl px-3 py-2.5">
          <Search size={16} className="text-muted-foreground/60" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por rota, fotógrafo, veículo..."
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X size={14} className="text-muted-foreground/60" />
            </button>
          )}
        </div>
      </div>


      {/* Results count */}
      <div className="px-4 py-2 flex items-center gap-1.5">
        <span className="text-sm font-medium text-foreground">{filtered.length * 4} fotos</span>
        <span className="text-muted-foreground/40">·</span>
        <button className="text-sm text-muted-foreground flex items-center gap-1">
          Recentes <span className="text-xs">▾</span>
        </button>
      </div>

      {/* Photo list — tonal cards, no border */}
      <div className="flex-1 px-4 space-y-4 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-3">📷</p>
            <p className="text-muted-foreground text-sm font-medium">Nenhuma foto encontrada</p>
            <p className="text-muted-foreground/70 text-xs mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          filtered.map((photo) => (
            // Card — surface-container-lowest on surface (no border)
            <div key={photo.id} className="rounded-2xl overflow-hidden bg-card shadow-ambient">
              {/* Photographer header */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-card">
                <div className="flex items-center gap-2.5">
                  {/* Avatar — accent surface, no purple */}
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-muted-foreground text-xs font-bold">
                    {photo.initials}
                  </div>
                  <div>
                    <Link href={`/photographer/${photo.handle}`} className="text-sm font-semibold text-foreground hover:text-primary transition-colors">
                      {photo.photographer}
                    </Link>
                    <p className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <span>📍</span> {photo.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                    {photo.period === 'Manhã' ? '🌅' : photo.period === 'Tarde' ? '☀️' : '🌙'} {photo.period}
                  </span>
                  <span className="text-xs font-medium text-accent-foreground bg-accent px-2.5 py-1 rounded-full">
                    {photo.category}
                  </span>
                </div>
              </div>

              {/* Photo */}
              <div className="relative">
                <img
                  src={photo.image}
                  alt={photo.photographer}
                  className="w-full h-52 object-cover"
                />
                <div className="absolute top-3 right-3 glass text-foreground text-xs px-2 py-1 rounded-full">
                  {photo.date}
                </div>
                {/* Watermark overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <p className="text-white/20 text-4xl font-black tracking-widest rotate-[-30deg] select-none">
                    PICTRAIL
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-card">
                <span className="text-base font-bold text-foreground">{photo.price}</span>
                {/* Primary CTA — gradient + rounded-full */}
                <Link
                  href={`/purchase-confirm?id=${photo.id}`}
                  className="btn-primary text-sm font-semibold px-4 py-2"
                >
                  Comprar
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default function PhotosPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PhotosContent />
    </Suspense>
  )
}
