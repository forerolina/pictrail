'use client'

import Link from 'next/link'
import { Star, Camera, TrendingUp, ChevronRight, Flame } from 'lucide-react'
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
    speciality: 'Ciclismo & Triathlon',
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
    speciality: 'Corrida & Moto',
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
    speciality: 'Ciclismo urbano',
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
    speciality: 'Corrida & Ciclismo',
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
    speciality: 'MTB & Trilha',
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

      <PopoverContent
        side="top"
        align="center"
        sideOffset={12}
        className="w-72 p-0 overflow-hidden rounded-2xl border-0 shadow-xl"
      >
        {profile && (
          <>
            {/* ── Header ───────────────────────────────────── */}
            <div className="px-4 pt-4 pb-3 bg-white">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="bg-indigo-100 text-indigo-700 font-bold text-lg">
                      {profile.initials}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online dot */}
                  <span className="absolute bottom-0.5 right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="font-bold text-gray-900 text-sm leading-tight">{profile.name}</p>
                    {profile.badge && (
                      <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">
                        ⭐ {profile.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{profile.speciality}</p>
                  {/* Stars */}
                  <div className="flex items-center gap-1 mt-1">
                    <div className="flex">
                      {[1,2,3,4,5].map((s) => (
                        <Star
                          key={s}
                          size={11}
                          className={s <= Math.round(profile.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{profile.rating}</span>
                    <span className="text-xs text-gray-400">({profile.reviewCount})</span>
                  </div>
                </div>

                <PopoverClose
                  className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 flex-none mt-0.5"
                  onClick={onClose}
                >
                  <span className="text-xs leading-none">✕</span>
                </PopoverClose>
              </div>
            </div>

            {/* ── Stats bar ────────────────────────────────── */}
            <div className="grid grid-cols-2 divide-x divide-gray-100 border-y border-gray-100 bg-gray-50">
              <div className="px-4 py-2.5 text-center">
                <p className="text-sm font-bold text-gray-900">{profile.totalSales.toLocaleString('pt-BR')}</p>
                <p className="text-[10px] text-gray-500 flex items-center justify-center gap-0.5">
                  <Camera size={9} /> fotos vendidas
                </p>
              </div>
              <div className="px-4 py-2.5 text-center">
                <p className="text-sm font-bold text-gray-900">{profile.reviewCount}</p>
                <p className="text-[10px] text-gray-500">avaliações</p>
              </div>
            </div>

            {/* ── Social proof ─────────────────────────────── */}
            <div className="px-4 py-2.5 bg-white space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-orange-50 rounded-xl px-3 py-2">
                <Flame size={13} className="text-orange-500 flex-none" />
                <span>
                  <strong className="text-orange-600">{profile.recentBuyers} pessoas</strong> compraram fotos nas últimas 24h
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 rounded-xl px-3 py-2">
                <TrendingUp size={13} className="text-green-600 flex-none" />
                <span>
                  <strong className="text-green-700">{profile.activeNow} pessoas</strong> estão vendo este perfil agora
                </span>
              </div>
            </div>

            {/* ── CTA ──────────────────────────────────────── */}
            <div className="px-4 pb-4 pt-1">
              <Link
                href={`/photographer/${profile.handle}`}
                className="flex items-center justify-center gap-1.5 w-full bg-[#4F46E5] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-indigo-600 transition-colors"
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
