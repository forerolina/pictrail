'use client'

import { Settings, ChevronRight, Camera } from 'lucide-react'
import Link from 'next/link'

const motorcycleCategories = [
  { label: 'Custom', emoji: '🏍️' },
  { label: 'Naked', emoji: '🏍️' },
  { label: 'Adventure', emoji: '🏔️' },
  { label: 'Trail', emoji: '🛤️' },
  { label: 'Touring', emoji: '🗺️' },
]

const recentPurchases = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=200&q=80',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=200&q=80',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200&q=80',
  },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — primary teal */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
          <button className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center">
            <Settings size={18} className="text-white" />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center text-white text-xl font-bold">
            JO
          </div>
          <div>
            <p className="text-white font-bold text-lg">João Oliveira</p>
            <p className="text-white/70 text-sm">joao.oliveira@email.com</p>
            <p className="text-white/70 text-xs flex items-center gap-1 mt-0.5">
              <span>📍</span> Porto Alegre, RS
            </p>
          </div>
        </div>

        {/* Stats — tonal white layers */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Saídas', value: '28' },
            { label: 'Fotos compradas', value: '12' },
            { label: 'Favoritos', value: '7' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/15 rounded-xl p-3 text-center">
              <p className="text-white font-bold text-xl">{stat.value}</p>
              <p className="text-white/70 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body — surface background */}
      <div className="flex-1 px-4 pt-4 space-y-4 pb-6">
        {/* Photographer mode card — surface-container-lowest, no border */}
        <div className="bg-card rounded-2xl p-4 flex items-center gap-3 shadow-ambient">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <Camera size={20} className="text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm">Modo Fotógrafo</p>
            <p className="text-xs text-muted-foreground">Comece a vender suas fotos</p>
          </div>
          {/* Secondary button — surface-container bg, no border */}
          <Link
            href="/photographer/onboarding"
            className="flex items-center gap-1 bg-secondary text-primary text-sm font-semibold px-3 py-1.5 rounded-full"
          >
            Ativar <ChevronRight size={14} />
          </Link>
        </div>

        {/* Sports — tonal tags, no borders */}
        <div className="bg-card rounded-2xl p-4 shadow-ambient">
          <p className="font-semibold text-foreground mb-3">Minhas categorias</p>
          <div className="flex flex-wrap gap-2">
            {motorcycleCategories.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm font-medium px-3 py-1.5 rounded-full"
              >
                <span>{s.emoji}</span> {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Recent purchases */}
        <div className="bg-card rounded-2xl p-4 shadow-ambient">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-foreground">Compras recentes</p>
            {/* Tertiary — text-only */}
            <Link href="/purchases" className="text-sm font-semibold text-primary">
              Ver todas
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {recentPurchases.map((p) => (
              <img
                key={p.id}
                src={p.image}
                alt="compra"
                className="w-full h-20 object-cover rounded-xl"
              />
            ))}
          </div>
        </div>

        {/* Settings links — tonal separators via background, no 1px borders */}
        <div className="bg-card rounded-2xl shadow-ambient overflow-hidden">
          {[
            { label: 'Configurações da conta', href: '/settings/billing' },
            { label: 'Plano e assinatura', href: '/settings/billing' },
            { label: 'Sair', href: '/login' },
          ].map((item, i, arr) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 ${
                i < arr.length - 1 ? 'border-b border-[rgba(188,201,206,0.15)]' : ''
              } ${item.label === 'Sair' ? 'text-destructive' : 'text-foreground'}`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <ChevronRight size={16} className="text-muted-foreground/40" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
