'use client'

import { CheckCircle, Download, Home, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function PurchaseConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white max-w-sm mx-auto">
      {/* Green check hero */}
      <div className="bg-[#e8f5e9] flex flex-col items-center justify-center pt-16 pb-10 px-6">
        <CheckCircle size={72} strokeWidth={1.5} className="text-[#2D6A2D] mb-5" />
        <h1 className="text-3xl font-black text-[#2D6A2D] mb-2">Compra Confirmada!</h1>
        <p className="flex items-center gap-2 text-sm text-[#2D6A2D] font-medium">
          <span>✅</span> Pix recebido com sucesso
        </p>
        <div className="mt-4 bg-white/60 border border-[#2D6A2D]/20 px-5 py-2 rounded-full">
          <p className="text-sm font-semibold text-[#2D6A2D]">Pedido #SC-059315</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 px-4 pt-5 pb-6 space-y-4">
        {/* Photo card */}
        <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex items-center gap-3 p-3">
          <img
            src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&q=80"
            alt="Maratona POA"
            className="w-20 h-20 object-cover rounded-xl flex-none"
          />
          <div>
            <p className="font-bold text-gray-900">Maratona POA 2025</p>
            <p className="text-xs text-gray-400 mt-0.5">Orla do Guaíba</p>
            <p className="text-xs text-gray-400">15 Mar 2025</p>
            <p className="text-base font-bold text-[#2D6A2D] mt-1">R$ 29,90</p>
          </div>
        </div>

        {/* Download button */}
        <button className="flex items-center justify-center gap-2 w-full bg-[#2D6A2D] text-white font-bold py-4 rounded-2xl text-base">
          <Download size={18} />
          Baixar Foto (6016×4016)
        </button>

        {/* Share actions */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-2xl py-3 text-xs text-gray-600 font-medium">
            <span className="text-xl">📸</span>
            Stories
          </button>
          <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-2xl py-3 text-xs text-gray-600 font-medium">
            <MessageCircle size={20} className="text-gray-500" />
            WhatsApp
          </button>
          <button className="flex flex-col items-center justify-center gap-1.5 bg-gray-50 rounded-2xl py-3 text-xs text-gray-600 font-medium">
            <span className="text-xl">🏃</span>
            Strava
          </button>
        </div>

        {/* Back home */}
        <Link
          href="/explore"
          className="flex items-center justify-center gap-2 w-full border-2 border-[#2D6A2D] text-[#2D6A2D] font-semibold py-4 rounded-2xl text-base"
        >
          <Home size={18} />
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
