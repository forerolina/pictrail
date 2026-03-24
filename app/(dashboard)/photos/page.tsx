'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { Search, SlidersHorizontal, ImagePlus, X } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ROUTE_LABELS: Record<string, string> = {
  orla: 'Orla do Guaíba',
  farroupilha: 'Parque Farroupilha',
  bento: 'Bento Gonçalves Norte',
}

const categories = ['Todas', 'Moto', 'Custom', 'Esportivo', 'Clássico']
const periods = ['Manhã', 'Tarde', 'Noite'] as const
type Period = typeof periods[number]

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
  const [search, setSearch] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Apply route pre-filter from URL param on mount
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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fotos</h1>
            {routeLabel && (
              <p className="text-xs text-[#4F46E5] font-medium mt-0.5 flex items-center gap-1">
                <span>📍</span> {routeLabel}
                <button onClick={() => setActiveRouteFilter('')} className="ml-1 text-gray-400 hover:text-gray-600">
                  <X size={11} />
                </button>
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {/* Image upload search */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                uploadedImage
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'border-[#4F46E5] text-[#4F46E5]'
              }`}
            >
              <ImagePlus size={14} />
              {uploadedImage ? 'Imagem' : 'Buscar por imagem'}
            </button>
            <button className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
              <SlidersHorizontal size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Uploaded image preview */}
        {uploadedImage && (
          <div className="flex items-center gap-2 mb-3 bg-indigo-50 rounded-xl px-3 py-2">
            <img src={uploadedImage} alt="Seu veículo" className="w-10 h-10 rounded-lg object-cover border border-indigo-200" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-indigo-800">Buscando por veículo similar</p>
              <p className="text-[11px] text-indigo-500">Mostrando resultados mais parecidos</p>
            </div>
            <button onClick={clearUpload} className="text-indigo-400 hover:text-indigo-600">
              <X size={14} />
            </button>
          </div>
        )}

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-3">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por rota, fotógrafo, veículo..."
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')}>
              <X size={14} className="text-gray-400" />
            </button>
          )}
        </div>

        {/* Period filters */}
        <div className="flex gap-2 mb-3">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => togglePeriod(p)}
              className={`flex-none px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                activePeriods.includes(p)
                  ? 'bg-[#4F46E5] text-white border-[#4F46E5]'
                  : 'bg-white border-gray-200 text-gray-600'
              }`}
            >
              {p === 'Manhã' ? '🌅' : p === 'Tarde' ? '☀️' : '🌙'} {p}
            </button>
          ))}
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-[#2D6A2D] text-white'
                  : 'bg-white border border-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="px-4 py-2 flex items-center gap-1.5">
        <span className="text-sm font-medium text-gray-700">{filtered.length * 4} fotos</span>
        <span className="text-gray-300">·</span>
        <button className="text-sm text-gray-500 flex items-center gap-1">
          Recentes <span className="text-xs">▾</span>
        </button>
      </div>

      {/* Photo list */}
      <div className="flex-1 px-4 space-y-4 pb-4">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-3">📷</p>
            <p className="text-gray-500 text-sm font-medium">Nenhuma foto encontrada</p>
            <p className="text-gray-400 text-xs mt-1">Tente ajustar os filtros</p>
          </div>
        ) : (
          filtered.map((photo) => (
            <div key={photo.id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              {/* Photographer header */}
              <div className="flex items-center justify-between px-3 py-2.5 bg-white">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-xs font-bold">
                    {photo.initials}
                  </div>
                  <div>
                    <Link href={`/photographer/${photo.handle}`} className="text-sm font-semibold text-gray-900 hover:text-[#4F46E5]">
                      {photo.photographer}
                    </Link>
                    <p className="text-xs text-gray-400 flex items-center gap-0.5">
                      <span>📍</span> {photo.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                    {photo.period === 'Manhã' ? '🌅' : photo.period === 'Tarde' ? '☀️' : '🌙'} {photo.period}
                  </span>
                  <span className="text-xs font-medium text-[#2D6A2D] bg-[#e8f5e9] px-2.5 py-1 rounded-full">
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
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
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
              <div className="flex items-center justify-between px-3 py-2.5 bg-white">
                <span className="text-base font-bold text-gray-900">{photo.price}</span>
                <Link
                  href={`/purchase-confirm?id=${photo.id}`}
                  className="bg-[#2D6A2D] text-white text-sm font-semibold px-4 py-2 rounded-xl"
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
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PhotosContent />
    </Suspense>
  )
}
