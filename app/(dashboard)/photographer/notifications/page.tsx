'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const categories = ['Todas', 'Vendas', 'Visualizações', 'Avaliações']

const notifications = [
  {
    id: '1',
    type: 'sale',
    title: 'Nova venda!',
    description: 'Atleta comprou sua foto da Maratona POA · BIB #1847',
    value: '+R$ 22,42',
    time: '2h atrás',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=100&q=80',
    unread: true,
  },
  {
    id: '2',
    type: 'sale',
    title: 'Nova venda!',
    description: 'Atleta comprou sua foto do Trail Run Canela · BIB #203',
    value: '+R$ 29,92',
    time: '5h atrás',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&q=80',
    unread: true,
  },
  {
    id: '3',
    type: 'view',
    title: '12 novas visualizações',
    description: 'Suas fotos da Maratona POA estão em alta',
    value: '',
    time: '1d atrás',
    image: 'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=100&q=80',
    unread: false,
  },
]

export default function PhotographerNotificationsPage() {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState('Todas')

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 bg-white border-b border-gray-100">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Notificações</h1>
              <p className="text-xs text-gray-400">3 não lidas</p>
            </div>
          </div>
          <button className="text-sm font-semibold text-[#2D6A2D]">
            Marcar todas lidas
          </button>
        </div>
      </div>

      {/* Earnings card */}
      <div className="px-4 pt-4">
        <div className="bg-[#e8f5e9] border border-[#2D6A2D]/20 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 bg-[#2D6A2D] rounded-xl flex items-center justify-center flex-none">
            <span className="text-white text-lg font-bold">$</span>
          </div>
          <div className="flex-1">
            <p className="text-xl font-black text-[#2D6A2D]">R$ 112,13</p>
            <p className="text-xs text-[#2D6A2D]/70">Seus ganhos · últimas 72h</p>
          </div>
          <button className="bg-[#2D6A2D] text-white text-sm font-semibold px-4 py-2 rounded-xl">
            Sacar
          </button>
        </div>
      </div>

      {/* Category filter */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
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

      {/* Notifications list */}
      <div className="flex-1 px-4 space-y-3 pt-2 pb-6">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-3 rounded-2xl border transition-colors ${
              n.unread ? 'bg-[#f8fdf8] border-[#2D6A2D]/10' : 'bg-white border-gray-100'
            }`}
          >
            {/* Photo thumbnail with badge */}
            <div className="relative flex-none">
              <img
                src={n.image}
                alt=""
                className="w-14 h-14 rounded-xl object-cover"
              />
              {n.type === 'sale' && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2D6A2D] rounded-full flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">$</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">{n.title}</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.description}</p>
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-xs text-gray-400">{n.time}</p>
                {n.value && (
                  <p className="text-sm font-bold text-[#2D6A2D]">
                    {n.value} <span className="text-xs font-normal text-gray-400">para você</span>
                  </p>
                )}
              </div>
            </div>

            {n.unread && (
              <div className="w-2 h-2 rounded-full bg-[#2D6A2D] mt-1 flex-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
