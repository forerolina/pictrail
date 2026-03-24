'use client'

import { useState, useCallback, lazy, Suspense } from 'react'
import { Search, SlidersHorizontal, ChevronRight, Clock, TrendingUp, Camera, X, MapPin } from 'lucide-react'
import Link from 'next/link'
import PhotographerPopover from '@/components/map/PhotographerPopover'

// Dynamic import to avoid SSR (Leaflet needs window)
const ExploreMap = lazy(() => import('@/components/map/ExploreMap'))

const ROUTES = [
  {
    id: 'orla',
    name: 'Orla do Guaíba',
    color: '#4F46E5',
    distance: '12,4 km',
    photographers: 3,
    photos: 85,
    lastRidden: 'Ontem',
    tag: 'recente',
  },
  {
    id: 'farroupilha',
    name: 'Parque Farroupilha',
    color: '#059669',
    distance: '6,2 km',
    photographers: 2,
    photos: 57,
    lastRidden: '3 dias atrás',
    tag: 'popular',
  },
  {
    id: 'bento',
    name: 'Bento Gonçalves Norte',
    color: '#D97706',
    distance: '18,7 km',
    photographers: 1,
    photos: 31,
    lastRidden: 'Semana passada',
    tag: '',
  },
]

const PAST_ROUTES = [
  { id: 'orla', name: 'Orla do Guaíba', date: '23 Mar 2025', distance: '12,4 km' },
  { id: 'farroupilha', name: 'Parque Farroupilha', date: '20 Mar 2025', distance: '6,2 km' },
  { id: 'bento', name: 'Bento Gonçalves Norte', date: '15 Mar 2025', distance: '18,7 km' },
]

export default function ExplorePage() {
  const [activeRouteId, setActiveRouteId] = useState('orla')
  const [showRouteSheet, setShowRouteSheet] = useState(false)
  const [routeTab, setRouteTab] = useState<'past' | 'popular'>('past')
  const [search, setSearch] = useState('')
  const [selectedPhotographer, setSelectedPhotographer] = useState<{
    id: string; x: number; y: number
  } | null>(null)

  const activeRoute = ROUTES.find((r) => r.id === activeRouteId)!

  const handlePhotographerClick = useCallback((id: string, x: number, y: number) => {
    setSelectedPhotographer({ id, x, y })
  }, [])

  return (
    <div className="relative flex flex-col bg-white" style={{ height: '100dvh', overflow: 'hidden' }}>

      {/* ── Top bar (floating over map) ── */}
      <div className="absolute top-0 left-0 right-0 z-30 px-3 pt-12 pb-2 pointer-events-none">

        {/* Header row: [PicTrail + pill] ←→ [avatar] */}
        <div className="flex items-center justify-between mb-6 pointer-events-auto">
          {/* Left: stacked label + pill, 8px gap */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-extrabold text-gray-900 leading-none">PicTrail</span>
            <button
              onClick={() => setShowRouteSheet(true)}
              className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm shadow-md rounded-full pl-2.5 pr-3 py-1.5 self-start"
            >
              <MapPin size={13} className="flex-none" style={{ color: activeRoute.color }} />
              <span className="text-xs font-semibold text-gray-800 max-w-[200px] truncate">
                {activeRoute.name}
              </span>
            </button>
          </div>

          {/* Right: profile avatar, vertically centred with the left stack */}
          <Link href="/profile" className="self-center">
            <div className="w-9 h-9 rounded-full bg-[#4F46E5] flex items-center justify-center border-2 border-white shadow-md">
              <span className="text-white text-xs font-bold">LF</span>
            </div>
          </Link>
        </div>

        {/* Search + filter */}
        <div className="flex gap-2 pointer-events-auto">
          {/* Search */}
          <div className="flex-1 flex items-center gap-2 bg-white/95 backdrop-blur-sm shadow-md rounded-2xl px-3 py-2.5">
            <Search size={15} className="text-gray-400 flex-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por rota, fotógrafo, veículo..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400 min-w-0"
            />
            {search && (
              <button onClick={() => setSearch('')}>
                <X size={14} className="text-gray-400" />
              </button>
            )}
          </div>
          {/* Filter */}
          <button className="w-10 h-10 bg-white/95 backdrop-blur-sm shadow-md rounded-2xl flex items-center justify-center flex-none">
            <SlidersHorizontal size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* ── Photographer popover (anchored to marker screen position) ── */}
      <div className="absolute inset-0 z-40 pointer-events-none">
        <div className="pointer-events-auto">
          <PhotographerPopover
            photographerId={selectedPhotographer?.id ?? null}
            anchorX={selectedPhotographer?.x ?? 0}
            anchorY={selectedPhotographer?.y ?? 0}
            onClose={() => setSelectedPhotographer(null)}
          />
        </div>
      </div>

      {/* ── Leaflet Map ── */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }}>
        <Suspense
          fallback={
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <ExploreMap
            activeRouteId={activeRouteId}
            onPhotographerClick={handlePhotographerClick}
          />
        </Suspense>
      </div>

      {/* ── Bottom sheet (stats + CTA) ── */}
      <div className="absolute bottom-16 left-0 right-0 z-30 px-3">
        <div className="bg-white rounded-2xl shadow-lg px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-900 text-sm">{activeRoute.name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {activeRoute.photographers} fotógrafo{activeRoute.photographers > 1 ? 's' : ''} · {activeRoute.photos} fotos · {activeRoute.distance}
              </p>
            </div>
            <Link
              href={`/photos?route=${activeRouteId}`}
              className="flex items-center gap-1 text-sm font-bold text-[#4F46E5]"
            >
              Ver fotos <ChevronRight size={14} />
            </Link>
          </div>

          {/* Photographer avatars */}
          <div className="flex items-center gap-1.5">
            {['CM', 'AL', 'BC'].slice(0, activeRoute.photographers).map((initials, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-[#4F46E5] flex items-center justify-center text-white text-[10px] font-bold border-2 border-white -ml-1 first:ml-0"
              >
                {initials}
              </div>
            ))}
            <span className="text-xs text-gray-400 ml-1">
              na rota agora
            </span>
          </div>
        </div>
      </div>

      {/* ── Route selector bottom sheet ── */}
      {showRouteSheet && (
        <>
          {/* Backdrop */}
          <div
            className="absolute inset-0 z-40 bg-black/30"
            onClick={() => setShowRouteSheet(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl max-h-[75vh] overflow-y-auto">
            {/* Handle */}
            <div className="sticky top-0 bg-white pt-3 pb-2 px-4">
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-gray-900">Trocar rota</h2>
                <button
                  onClick={() => setShowRouteSheet(false)}
                  className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center"
                >
                  <X size={14} className="text-gray-500" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setRouteTab('past')}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-colors ${
                    routeTab === 'past' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <Clock size={12} /> Minhas rotas
                </button>
                <button
                  onClick={() => setRouteTab('popular')}
                  className={`flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-lg transition-colors ${
                    routeTab === 'popular' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <TrendingUp size={12} /> Mais fotos
                </button>
              </div>
            </div>

            {/* Route list */}
            <div className="px-4 pb-8 pt-2 space-y-2">
              {(routeTab === 'past' ? PAST_ROUTES : ROUTES.sort((a, b) => b.photos - a.photos))
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map((r: any) => {
                  const route = ROUTES.find((x) => x.id === r.id)!
                  const isActive = r.id === activeRouteId
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setActiveRouteId(r.id)
                        setShowRouteSheet(false)
                      }}
                      className={`w-full flex items-center gap-3 p-3.5 rounded-2xl border transition-colors text-left ${
                        isActive
                          ? 'border-[#4F46E5] bg-indigo-50'
                          : 'border-gray-100 bg-white'
                      }`}
                    >
                      {/* Color dot */}
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-none"
                        style={{ background: route.color + '20' }}
                      >
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ background: route.color }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{route.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {routeTab === 'past'
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            ? `${(r as any).date} · ${(r as any).distance}`
                            : `${route.photos} fotos · ${route.photographers} fotógrafos`}
                        </p>
                      </div>

                      {routeTab === 'popular' && route.tag === 'popular' && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full flex-none">
                          🔥 Popular
                        </span>
                      )}
                      {isActive && (
                        <div className="w-5 h-5 rounded-full bg-[#4F46E5] flex items-center justify-center flex-none">
                          <span className="text-white text-[10px] font-bold">✓</span>
                        </div>
                      )}

                      {/* Camera icon */}
                      <Camera size={14} className="text-gray-300 flex-none" />
                    </button>
                  )
                })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
