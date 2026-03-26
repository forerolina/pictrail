'use client'

import { useState, useCallback, lazy, Suspense, useRef } from 'react'
import { Search, ChevronRight, X, ImagePlus, MapPin } from 'lucide-react'
import Link from 'next/link'
import PhotographerPopover from '@/components/map/PhotographerPopover'

// Dynamic import to avoid SSR (Leaflet needs window)
const ExploreMap = lazy(() => import('@/components/map/ExploreMap'))

// Route colors use only brand palette
const ROUTES = [
  {
    id: 'orla',
    name: 'Orla do Guaíba',
    color: '#00677d',
    distance: '12,4 km',
    photographers: 3,
    photos: 85,
  },
  {
    id: 'farroupilha',
    name: 'Parque Farroupilha',
    color: '#00b4d8',
    distance: '6,2 km',
    photographers: 2,
    photos: 57,
  },
  {
    id: 'bento',
    name: 'Bento Gonçalves Norte',
    color: '#4c616c',
    distance: '18,7 km',
    photographers: 1,
    photos: 31,
  },
]

const PAST_ROUTES = [
  { id: 'orla',        name: 'Orla do Guaíba',         date: '23 Mar 2025', distance: '12,4 km', emoji: '🌊' },
  { id: 'farroupilha', name: 'Parque Farroupilha',       date: '20 Mar 2025', distance: '6,2 km',  emoji: '🌳' },
  { id: 'bento',       name: 'Bento Gonçalves Norte',    date: '15 Mar 2025', distance: '18,7 km', emoji: '🏔️' },
  { id: 'gramado',     name: 'Gramado Trail',            date: '8 Mar 2025',  distance: '24,1 km', emoji: '🛤️' },
]

const PERIODS = ['Manhã', 'Tarde', 'Noite'] as const
type Period = typeof PERIODS[number]

export default function ExplorePage() {
  const [activeRouteId, setActiveRouteId] = useState('orla')
  const [showSearch, setShowSearch]       = useState(false)
  const [searchQuery, setSearchQuery]     = useState('')
  const [selectedDate, setSelectedDate]   = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [routesScrolled, setRoutesScrolled] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [selectedPhotographer, setSelectedPhotographer] = useState<{
    id: string; x: number; y: number
  } | null>(null)

  const activeRoute = ROUTES.find((r) => r.id === activeRouteId)!

  const handlePhotographerClick = useCallback((id: string, x: number, y: number) => {
    setSelectedPhotographer({ id, x, y })
  }, [])

  const closeSearch = () => {
    setShowSearch(false)
    setRoutesScrolled(false)
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setRoutesScrolled(e.currentTarget.scrollTop > 100)
  }

  return (
    <div className="relative flex flex-col bg-background" style={{ height: '100dvh', overflow: 'hidden' }}>

      {/* ── Top bar (floating over map) — liquid glass ── */}
      <div className="absolute top-0 left-0 right-0 z-30 px-3 pt-12 pb-3 pointer-events-none">

        {/* Row 1: wordmark + buscar por imagem */}
        <div className="flex items-center justify-between mb-3 pointer-events-auto h-[44px]">
          <span className="text-2xl font-extrabold text-foreground leading-none" style={{ letterSpacing: '-0.02em' }}>PicTrail</span>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (!file) return
              setUploadedImage(URL.createObjectURL(file))
            }}
          />
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

        {/* Row 2: search bar — full width, tap to open overlay */}
        <div className="pointer-events-auto">
          <button
            onClick={() => setShowSearch(true)}
            className="w-full flex items-center gap-2 liquid-glass-float rounded-2xl px-3 py-2.5 text-left"
          >
            <Search size={15} className="text-muted-foreground/60 flex-none" />
            <span className="flex-1 text-sm text-muted-foreground/60 min-w-0 truncate">
              {activeRoute.name} · {selectedDate ? selectedDate : 'qualquer data'}{selectedPeriod ? ` · ${selectedPeriod}` : ''}
            </span>
          </button>
        </div>
      </div>

      {/* ── Search overlay ── */}
      {showSearch && (
        <div className="absolute inset-0 z-50 bg-background flex flex-col">

          {/* Collapsed header — shown when scrolled into routes */}
          {routesScrolled ? (
            <div className="px-4 pt-12 pb-3 bg-card shadow-ambient">
              <div className="flex items-center gap-2">
                <button
                  onClick={closeSearch}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-none"
                >
                  <X size={16} className="text-foreground" />
                </button>
                <div className="flex-1 flex items-center gap-2 bg-muted rounded-2xl px-3 py-2">
                  <Search size={14} className="text-muted-foreground/60 flex-none" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por rota..."
                    className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')}>
                      <X size={14} className="text-muted-foreground/60" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Full header */
            <div className="px-4 pt-12 pb-4 bg-card">
              <div className="flex items-center gap-3 mb-5">
                <button
                  onClick={closeSearch}
                  className="w-8 h-8 bg-muted rounded-full flex items-center justify-center flex-none"
                >
                  <X size={16} className="text-foreground" />
                </button>
                <h2 className="text-xl font-bold text-foreground">Onde?</h2>
              </div>

              {/* Active search input */}
              <div className="flex items-center gap-2 bg-muted rounded-2xl px-3 py-3">
                <Search size={15} className="text-muted-foreground/60 flex-none" />
                <input
                  autoFocus
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por rota, percurso..."
                  className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X size={14} className="text-muted-foreground/60" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto" onScroll={handleScroll}>

            {/* Routes section */}
            <div className="px-4 pt-5 pb-2 bg-card">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest mb-3">
                Minhas rotas
              </p>
              <div className="space-y-0">
                {PAST_ROUTES.map((r, i) => {
                  const isActive = r.id === activeRouteId
                  const route = ROUTES.find((x) => x.id === r.id)
                  return (
                    <button
                      key={r.id}
                      onClick={() => {
                        setActiveRouteId(r.id)
                        closeSearch()
                      }}
                      className={`w-full flex items-center gap-3 py-3.5 text-left ${
                        i < PAST_ROUTES.length - 1 ? 'border-b border-[rgba(188,201,206,0.12)]' : ''
                      }`}
                    >
                      {/* Icon tile */}
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-none text-xl"
                        style={{ background: (route?.color ?? '#4c616c') + '18' }}
                      >
                        {r.emoji}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{r.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{r.date} · {r.distance}</p>
                      </div>

                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-none" />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Section divider */}
            <div className="h-2 bg-muted" />

            {/* Quando section */}
            <div className="px-4 py-5 bg-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-foreground">Quando</p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {selectedDate
                      ? new Date(selectedDate + 'T12:00:00').toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Adicionar data'}
                  </p>
                </div>
                <label
                  htmlFor="overlay-date-picker"
                  className="text-sm font-bold text-foreground underline cursor-pointer"
                >
                  {selectedDate ? 'Alterar' : 'Adicionar data'}
                </label>
                <input
                  id="overlay-date-picker"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="sr-only"
                />
              </div>
            </div>

            {/* Section divider */}
            <div className="h-2 bg-muted" />

            {/* Horário section — replaces Who / guests */}
            <div className="px-4 py-5 bg-card">
              <div className="mb-4">
                <p className="text-base font-semibold text-foreground">Horário</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {selectedPeriod ? selectedPeriod : 'Período do dia'}
                </p>
              </div>
              <div className="flex gap-3">
                {PERIODS.map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPeriod(selectedPeriod === p ? null : p)}
                    className={`flex-1 flex flex-col items-center gap-1.5 py-4 rounded-2xl text-sm font-semibold transition-colors ${
                      selectedPeriod === p
                        ? 'bg-foreground text-background'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <span className="text-xl">
                      {p === 'Manhã' ? '🌅' : p === 'Tarde' ? '☀️' : '🌙'}
                    </span>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom scroll breathing room */}
            <div className="h-28" />
          </div>

          {/* Fixed bottom CTA */}
          <div className="px-4 py-4 bg-card shadow-ambient-up flex items-center justify-between">
            <button
              onClick={() => { setSearchQuery(''); setSelectedDate(''); setSelectedPeriod(null) }}
              className="text-sm font-semibold text-foreground underline"
            >
              Limpar
            </button>
            <Link
              href={`/photos?route=${activeRouteId}`}
              onClick={closeSearch}
              className="btn-primary flex items-center gap-2 px-6 py-3 text-sm font-semibold"
            >
              <Search size={14} />
              Buscar
            </Link>
          </div>
        </div>
      )}

      {/* ── Photographer popover ── */}
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
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
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
        <div className="liquid-glass-float rounded-2xl px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-semibold text-foreground text-sm">{activeRoute.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activeRoute.photographers} fotógrafo{activeRoute.photographers > 1 ? 's' : ''} · {activeRoute.photos} fotos · {activeRoute.distance}
              </p>
            </div>
            <Link
              href={`/photos?route=${activeRouteId}`}
              className="btn-primary flex items-center gap-1 text-sm font-semibold px-4 py-2"
            >
              Ver fotos <ChevronRight size={14} />
            </Link>
          </div>

          <div className="flex items-center gap-1.5">
            {['CM', 'AL', 'BC'].slice(0, activeRoute.photographers).map((initials, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white text-[10px] font-bold -ml-1 first:ml-0"
                style={{ border: '2px solid rgba(248,249,250,0.8)' }}
              >
                {initials}
              </div>
            ))}
            <span className="text-xs text-muted-foreground ml-1">na rota agora</span>
          </div>
        </div>
      </div>
    </div>
  )
}
