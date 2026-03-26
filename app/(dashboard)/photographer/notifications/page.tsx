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
    description: 'Motociclista comprou sua foto da Orla do Guaíba · Honda CB 500F',
    value: '+R$ 22,42',
    time: '2h atrás',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=100&q=80',
    unread: true,
  },
  {
    id: '2',
    type: 'sale',
    title: 'Nova venda!',
    description: 'Motociclista comprou sua foto de Gramado Trail · Yamaha MT-07',
    value: '+R$ 29,92',
    time: '5h atrás',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=100&q=80',
    unread: true,
  },
  {
    id: '3',
    type: 'view',
    title: '12 novas visualizações',
    description: 'Suas fotos da Orla do Guaíba estão em alta',
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
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — liquid glass sticky */}
      <div className="px-4 pt-12 pb-3 liquid-glass sticky top-0 z-10">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-muted-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Notificações</h1>
              <p className="text-xs text-muted-foreground">3 não lidas</p>
            </div>
          </div>
          {/* Tertiary — text-only */}
          <button className="text-sm font-semibold text-primary">
            Marcar todas lidas
          </button>
        </div>
      </div>

      {/* Earnings card — tonal surface, no border */}
      <div className="px-4 pt-4">
        <div className="bg-accent rounded-2xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center flex-none">
            <span className="text-primary-foreground text-lg font-bold">$</span>
          </div>
          <div className="flex-1">
            <p className="text-xl font-black text-foreground">R$ 112,13</p>
            <p className="text-xs text-muted-foreground">Seus ganhos · últimas 72h</p>
          </div>
          {/* Primary CTA — gradient + rounded-full */}
          <button className="btn-primary text-sm font-semibold px-4 py-2">
            Sacar
          </button>
        </div>
      </div>

      {/* Category filter — no borders on inactive pills */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-none px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications list — tonal unread indicator, no borders */}
      <div className="flex-1 px-4 space-y-3 pt-2 pb-6">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start gap-3 p-3 rounded-2xl transition-colors ${
              n.unread ? 'bg-muted' : 'bg-card'
            }`}
          >
            {/* Photo thumbnail */}
            <div className="relative flex-none">
              <img
                src={n.image}
                alt=""
                className="w-14 h-14 rounded-xl object-cover"
              />
              {n.type === 'sale' && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-[9px] font-bold">$</span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{n.description}</p>
              <div className="flex items-center justify-between mt-1.5">
                <p className="text-xs text-muted-foreground/70">{n.time}</p>
                {n.value && (
                  <p className="text-sm font-bold text-primary">
                    {n.value} <span className="text-xs font-normal text-muted-foreground/70">para você</span>
                  </p>
                )}
              </div>
            </div>

            {n.unread && (
              <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-none" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
