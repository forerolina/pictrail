'use client'

import { Settings, ChevronRight, Camera } from 'lucide-react'
import Link from 'next/link'

const sports = [
  { label: 'Corrida', emoji: '🏃' },
  { label: 'Ciclismo', emoji: '🚴' },
  { label: 'Triathlon', emoji: '🏊' },
  { label: 'MTB', emoji: '🚵' },
]

const recentPurchases = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&q=80',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=200&q=80',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=200&q=80',
  },
]

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Green header */}
      <div className="bg-[#2D6A2D] px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-xl font-bold text-white">Meu Perfil</h1>
          <button className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <Settings size={18} className="text-white" />
          </button>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 flex items-center justify-center text-white text-xl font-bold">
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

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Corridas', value: '28' },
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

      {/* Body */}
      <div className="flex-1 px-4 pt-4 space-y-4 pb-6">
        {/* Photographer mode card */}
        <div className="bg-white rounded-2xl p-4 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <Camera size={20} className="text-gray-500" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 text-sm">Modo Fotógrafo</p>
            <p className="text-xs text-gray-400">Comece a vender suas fotos</p>
          </div>
          <Link
            href="/photographer/onboarding"
            className="flex items-center gap-1 border border-[#2D6A2D] text-[#2D6A2D] text-sm font-semibold px-3 py-1.5 rounded-xl"
          >
            Ativar <ChevronRight size={14} />
          </Link>
        </div>

        {/* Sports */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <p className="font-semibold text-gray-900 mb-3">Meus esportes</p>
          <div className="flex flex-wrap gap-2">
            {sports.map((s) => (
              <span
                key={s.label}
                className="flex items-center gap-1.5 border border-gray-200 text-gray-700 text-sm font-medium px-3 py-1.5 rounded-full"
              >
                <span>{s.emoji}</span> {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Recent purchases */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-semibold text-gray-900">Compras recentes</p>
            <Link href="/purchases" className="text-sm font-semibold text-[#2D6A2D]">
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

        {/* Settings links */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {[
            { label: 'Configurações da conta', href: '/settings/billing' },
            { label: 'Plano e assinatura', href: '/settings/billing' },
            { label: 'Sair', href: '/login' },
          ].map((item, i, arr) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 ${
                i < arr.length - 1 ? 'border-b border-gray-100' : ''
              } ${item.label === 'Sair' ? 'text-red-500' : 'text-gray-700'}`}
            >
              <span className="text-sm font-medium">{item.label}</span>
              <ChevronRight size={16} className="text-gray-300" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
