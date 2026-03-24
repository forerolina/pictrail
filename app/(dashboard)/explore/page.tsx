'use client'

import { useState } from 'react'
import { Search, SlidersHorizontal, Camera, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const categories = ['Todos', 'Moto', 'Custom', 'Esportivo', 'Clássico', 'Trail']

const routes = [
  { name: 'Orla do Guaíba', color: '#2D6A2D', count: 47 },
  { name: 'Parque Farroupilha Loop', color: '#3B82F6', count: 15 },
  { name: 'Bento Gonçalves Norte', color: '#F97316', count: 23 },
]

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [showVehicleSearch, setShowVehicleSearch] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 bg-white">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Explorar</h1>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <span>📍</span> Porto Alegre, RS
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-[#2D6A2D] flex items-center justify-center text-white text-sm font-bold">
            JO
          </div>
        </div>

        {/* Search bar */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Buscar evento, local, bib..."
              className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder:text-gray-400"
            />
          </div>
          <button className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
            <SlidersHorizontal size={16} className="text-gray-600" />
          </button>
        </div>

        {/* Category pills */}
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

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden bg-[#f0f4e8]">
        {/* Simulated map grid */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#c8d4b0" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Route cluster markers */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-14 h-14 rounded-full bg-[#2D6A2D] flex items-center justify-center text-white font-bold text-lg shadow-lg">
            47
          </div>
          <p className="text-center text-xs text-[#2D6A2D] font-medium mt-1">Farroupilha</p>
        </div>
        <div className="absolute top-1/4 right-1/4">
          <div className="w-11 h-11 rounded-full bg-[#2D6A2D] flex items-center justify-center text-white font-bold shadow-md">
            15
          </div>
          <p className="text-center text-xs text-[#2D6A2D] font-medium mt-1">Bento Gonçal.</p>
        </div>
        <div className="absolute bottom-1/3 left-1/6">
          <div className="w-11 h-11 rounded-full bg-[#2D6A2D] flex items-center justify-center text-white font-bold shadow-md">
            23
          </div>
          <p className="text-center text-xs text-[#2D6A2D] font-medium mt-1">Guaíba</p>
        </div>

        {/* Route legend popup */}
        <div className="absolute top-4 left-4 bg-white rounded-2xl shadow-lg px-4 py-3 space-y-2">
          {routes.map((r) => (
            <div key={r.name} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: r.color }} />
              <span className="text-xs font-medium text-gray-700">{r.name}</span>
            </div>
          ))}
        </div>

        {/* Vehicle search button */}
        <button
          onClick={() => setShowVehicleSearch(true)}
          className="absolute bottom-4 right-4 bg-[#2D6A2D] text-white rounded-2xl px-3 py-2.5 flex flex-col items-center gap-1 shadow-lg"
        >
          <Camera size={20} />
          <span className="text-xs font-medium">Meu Veículo</span>
        </button>
      </div>

      {/* Bottom sheet */}
      <div className="bg-white px-4 pt-3 pb-4 border-t border-gray-100">
        <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-3" />
        <div className="flex items-start justify-between">
          <div>
            <p className="font-semibold text-gray-900 text-sm">Fotos perto de você</p>
            <p className="text-xs text-gray-400 mt-0.5">Toque em um marcador para ver fotos</p>
          </div>
          <Link
            href="/photos"
            className="flex items-center gap-1 text-sm font-semibold text-[#2D6A2D]"
          >
            Ver todas <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      {/* Vehicle search modal */}
      {showVehicleSearch && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end">
          <div className="w-full max-w-lg mx-auto bg-white rounded-t-3xl p-6">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">Buscar por Veículo</h3>
            <p className="text-sm text-gray-500 mb-4">
              Tire uma foto do seu veículo para encontrar fotos automaticamente
            </p>
            <button
              className="w-full bg-[#2D6A2D] text-white font-semibold py-3.5 rounded-2xl mb-3"
              onClick={() => setShowVehicleSearch(false)}
            >
              Tirar foto do veículo
            </button>
            <button
              onClick={() => setShowVehicleSearch(false)}
              className="w-full text-gray-500 font-medium py-2"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
