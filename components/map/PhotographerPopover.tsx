'use client'

import Link from 'next/link'
import { Star, Camera, ChevronRight, Flame } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover'

// Rich photographer profiles with social proof data
const PHOTOGRAPHER_PROFILES: Record<string, {
  name: string
  handle: string
  avatar: string
  initials: string
  rating: number
  reviewCount: number
  totalSales: number
  recentBuyers: number   // bought in last 24h
  activeNow: number      // viewing right now
  speciality: string
  badge: string | null
}> = {
  p1: {
    name: 'Carlos Mendes',
    handle: 'carlos-mendes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80',
    initials: 'CM',
    rating: 4.9,
    reviewCount: 312,
    totalSales: 1840,
    recentBuyers: 8,
    activeNow: 3,
    speciality: 'Moto Esportiva & Naked',
    badge: 'Top vendedor',
  },
  p2: {
    name: 'Ana Lima',
    handle: 'ana-lima',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    initials: 'AL',
    rating: 4.8,
    reviewCount: 187,
    totalSales: 940,
    recentBuyers: 5,
    activeNow: 2,
    speciality: 'Adventure & Trail',
    badge: null,
  },
  p3: {
    name: 'Bruno Costa',
    handle: 'bruno-costa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    initials: 'BC',
    rating: 4.7,
    reviewCount: 94,
    totalSales: 412,
    recentBuyers: 3,
    activeNow: 1,
    speciality: 'Moto & Off-road',
    badge: null,
  },
  p4: {
    name: 'Marcos Reis',
    handle: 'marcos-reis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    initials: 'MR',
    rating: 4.9,
    reviewCount: 256,
    totalSales: 1520,
    recentBuyers: 11,
    activeNow: 4,
    speciality: 'Naked & Custom',
    badge: 'Top vendedor',
  },
  p5: {
    name: 'Julia Faria',
    handle: 'julia-faria',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    initials: 'JF',
    rating: 4.8,
    reviewCount: 143,
    totalSales: 670,
    recentBuyers: 4,
    activeNow: 2,
    speciality: 'Custom & Touring',
    badge: null,
  },
  p6: {
    name: 'Pedro Luz',
    handle: 'pedro-luz',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    initials: 'PL',
    rating: 4.6,
    reviewCount: 78,
    totalSales: 310,
    recentBuyers: 2,
    activeNow: 1,
    speciality: 'Enduro & Off-road',
    badge: null,
  },
}

interface Props {
  photographerId: string | null
  anchorX: number
  anchorY: number
  onClose: () => void
}

export default function PhotographerPopover({ photographerId, anchorX, anchorY, onClose }: Props) {
  const profile = photographerId ? PHOTOGRAPHER_PROFILES[photographerId] : null

  return (
    <Popover open={!!profile} onOpenChange={(open) => { if (!open) onClose() }}>
      {/* Invisible anchor positioned at the marker's screen coordinates */}
      <PopoverAnchor asChild>
        <div
          className="pointer-events-none absolute z-40"
          style={{ left: anchorX, top: anchorY, width: 1, height: 1 }}
        />
      </PopoverAnchor>

      {/* Glassmorphism floating panel — 70% surface opacity + backdrop-blur */}
      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="w-72 p-0 overflow-hidden rounded-2xl border-0 shadow-ambient"
        style={{
          background: 'rgba(248, 249, 250, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        {profile && (
          <>
            {/* ── Header ───────────────────────────────────── */}
            <div className="px-4 pt-4 pb-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 shadow-ambient">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-accent text-accent-foreground font-bold text-lg">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online dot — primary teal */}
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-bold text-foreground text-sm leading-tight">{profile.name}</p>
                    {profile.badge && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                        ⭐ {profile.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{profile.speciality}</p>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          className={s <= Math.round(profile.rating) ? 'text-amber-400 fill-amber-400' : 'text-accent fill-accent'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-foreground">{profile.rating}</span>
                    <span className="text-xs text-muted-foreground">({profile.reviewCount})</span>
                  </div>
                </div>

                <PopoverClose
                  className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground flex-none mt-0.5"
                  onClick={onClose}
                >
                  <span className="text-xs leading-none">✕</span>
                </PopoverClose>
              </div>
            </div>

            {/* ── Stats bar — tonal separation, no 1px dividers ── */}
            <div className="grid grid-cols-2 bg-muted/60">
              <div className="px-4 py-2.5 text-center">
                <p className="text-sm font-bold text-foreground">{profile.totalSales.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-0.5">
                  <Camera size={9} /> fotos vendidas
                </p>
              </div>
              {/* Ghost border divider — outline-variant at 15% */}
              <div className="px-4 py-2.5 text-center border-l border-[rgba(188,201,206,0.2)]">
                <p className="text-sm font-bold text-foreground">{profile.reviewCount}</p>
                <p className="text-[10px] text-muted-foreground">avaliações</p>
              </div>
            </div>

            {/* ── Social proof ─────────────────────────────── */}
            <div className="px-4 py-2.5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/60 rounded-xl px-3 py-2">
                <Flame size={13} className="text-amber-500 flex-none" />
                <span>
                  <strong className="text-foreground">{profile.recentBuyers} pessoas</strong> compraram fotos no último mês
                </span>
              </div>
            </div>

            {/* ── CTA — gradient primary + rounded-full ──── */}
            <div className="px-4 pb-4 pt-1">
              <Link
                href={`/photographer/${profile.handle}`}
                className="flex items-center justify-center gap-1.5 w-full btn-primary text-sm font-semibold py-2.5"
                onClick={onClose}
              >
                Ver todas as fotos <ChevronRight size={15} />
              </Link>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
