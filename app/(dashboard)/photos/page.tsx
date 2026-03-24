'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Camera } from 'lucide-react'
import Link from 'next/link'

const categories = ['Todas', 'Moto', 'Custom', 'Esportivo', 'Clássico']

const mockPhotos = [
  {
    id: '1',
    photographer: 'Carlos Mendes',
    initials: 'CM',
    location: 'Gramado - RS',
    category: 'Moto',
    date: '15 Mar 2025',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400&q=80',
    price: 'R$ 29,90',
  },
  {
    id: '2',
    photographer: 'Ana Lima',
    initials: 'AL',
    location: 'Orla do Guaíba - POA',
    category: 'Esportivo',
    date: '10 Mar 2025',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&q=80',
    price: 'R$ 24,90',
  },
  {
    id: '3',
    photographer: 'Bruno Costa',
    initials: 'BC',
    location: 'Canela - RS',
    category: 'Custom',
    date: '2 Mar 2025',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=400&q=80',
    price: 'R$ 34,90',
  },
]

export default function PhotosPage() {
  const [activeCategory, setActiveCategory] = useState('Todas')
  const [selfieMode, setSelfieMode] = useState(false)

  const filtered =
    activeCategory === 'Todas'
      ? mockPhotos
      : mockPhotos.filter((p) => p.category === activeCategory)

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 bg-white sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">Fotos</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelfieMode(!selfieMode)}
              className={`flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full border transition-colors ${
                selfieMode
                  ? 'bg-[#2D6A2D] text-white border-[#2D6A2D]'
                  : 'border-[#2D6A2D] text-[#2D6A2D]'
              }`}
            >
              <Camera size={14} />
              Selfie
            </button>
            <button className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
              <SlidersHorizontal size={16} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-3">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por evento, bib, local..."
            className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
          />
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
        {filtered.map((photo) => (
          <div key={photo.id} className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            {/* Photographer header */}
            <div className="flex items-center justify-between px-3 py-2.5 bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 text-xs font-bold">
                  {photo.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{photo.photographer}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-0.5">
                    <span>📍</span> {photo.location}
                  </p>
                </div>
              </div>
              <span className="text-xs font-medium text-[#2D6A2D] bg-[#e8f5e9] px-2.5 py-1 rounded-full">
                {photo.category}
              </span>
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
              <div className="absolute inset-0 flex items-center justify-center">
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
        ))}
      </div>
    </div>
  )
}
