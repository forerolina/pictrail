'use client'

import { ArrowLeft, Bell, Upload, ShoppingBag, Eye } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const barData = [20, 45, 30, 60, 280, 420, 380]
const maxBar = Math.max(...barData)

const topPhotos = [
  {
    rank: 1,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&q=80',
    sales: 8,
    views: 142,
  },
  {
    rank: 2,
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=200&q=80',
    sales: 6,
    views: 98,
  },
  {
    rank: 3,
    image: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=200&q=80',
    sales: 5,
    views: 87,
  },
]

export default function PhotographerDashboardPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — primary teal with gradient depth */}
      <div className="bg-primary px-4 pt-12 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push('/profile')}
              className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-white" />
            </button>
            <div>
              <p className="text-white/60 text-xs font-medium label-instrument">Fotógrafo</p>
              <h1 className="text-xl font-bold text-white">Meu Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/photographer/notifications"
              className="relative w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center"
            >
              <Bell size={18} className="text-white" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#00b4d8] rounded-full text-[9px] text-white font-bold flex items-center justify-center">
                3
              </span>
            </Link>
            <Link
              href="/photographer/upload"
              className="flex items-center gap-1.5 bg-white text-primary text-sm font-bold px-3 py-2 rounded-xl"
            >
              <Upload size={14} />
              Upload
            </Link>
          </div>
        </div>

        {/* Stats grid — tonal white layers */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/15 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1 label-instrument">Esta semana</p>
            <p className="text-white font-black text-lg">R$ 1.764</p>
            <p className="text-white/60 text-xs mt-0.5">+12% vs anterior</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1 label-instrument">Vendas</p>
            <p className="text-white font-black text-lg">59</p>
            <p className="text-white/60 text-xs mt-0.5">esta semana</p>
          </div>
          <div className="bg-white/15 rounded-xl p-3">
            <p className="text-white/60 text-xs mb-1 label-instrument">Fotos ativas</p>
            <p className="text-white font-black text-lg">127</p>
            <p className="text-white/60 text-xs mt-0.5">4 percursos</p>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 pt-4 space-y-4 pb-6">
        {/* Revenue chart — surface-container-lowest card on surface background */}
        <div className="bg-card rounded-2xl p-4 shadow-ambient">
          <div className="flex items-center justify-between mb-4">
            <p className="font-bold text-foreground flex items-center gap-1.5">
              <span className="text-primary">↗</span> Receita — 7 dias
            </p>
            <div className="flex gap-1">
              {/* Active — secondary button style */}
              <button className="text-xs font-semibold bg-primary text-primary-foreground px-2.5 py-1 rounded-full">
                R$
              </button>
              {/* Inactive — surface-container, no border */}
              <button className="text-xs font-medium text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
                Qtd
              </button>
            </div>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1 h-24">
            {weekDays.map((day, i) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-t-md bg-primary"
                  style={{ height: `${(barData[i] / maxBar) * 88}px`, minHeight: 2 }}
                />
                <span className="text-[10px] text-muted-foreground/70">{day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top photos — surface-container-lowest card */}
        <div className="bg-card rounded-2xl p-4 shadow-ambient">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-foreground">🏆 Fotos mais vendidas</p>
            {/* Tertiary — text-only primary color */}
            <button className="text-sm font-semibold text-primary">
              Ver todas
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {topPhotos.map((p) => (
              <div key={p.rank} className="relative">
                <img
                  src={p.image}
                  alt={`#${p.rank}`}
                  className="w-full h-24 object-cover rounded-xl"
                />
                <div className="absolute top-2 left-2 w-6 h-6 bg-[#191c1d]/60 rounded-full flex items-center justify-center">
                  <span className="text-white text-[10px] font-bold">#{p.rank}</span>
                </div>
                <div className="mt-1.5 flex items-center justify-around">
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <ShoppingBag size={11} /> {p.sales}
                  </span>
                  <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                    <Eye size={11} /> {p.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
