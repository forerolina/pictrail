'use client'

import { CheckCircle, Download, Home, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export default function PurchaseConfirmPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background max-w-sm mx-auto">
      {/* Confirmation hero — surface-container-low tonal bg, no border */}
      <div className="bg-muted flex flex-col items-center justify-center pt-16 pb-10 px-6">
        <CheckCircle size={72} strokeWidth={1.5} className="text-primary mb-5" />
        <h1 className="text-3xl font-black text-foreground mb-2">Compra Confirmada!</h1>
        <p className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <span>✅</span> Pix recebido com sucesso
        </p>
        {/* Order pill — surface-container bg, no border */}
        <div className="mt-4 bg-secondary px-5 py-2 rounded-full">
          <p className="text-sm font-semibold text-primary">Pedido #SC-059315</p>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 px-4 pt-5 pb-6 space-y-4">
        {/* Photo card — tonal surface, no border */}
        <div className="bg-card rounded-2xl overflow-hidden shadow-ambient flex items-center gap-3 p-3">
          <img
            src="https://images.unsplash.com/photo-1530549387789-4c1017266635?w=200&q=80"
            alt="Orla do Guaíba"
            className="w-20 h-20 object-cover rounded-xl flex-none"
          />
          <div>
            <p className="font-bold text-foreground">Saída Orla do Guaíba</p>
            <p className="text-xs text-muted-foreground mt-0.5">Orla do Guaíba</p>
            <p className="text-xs text-muted-foreground">15 Mar 2025</p>
            <p className="text-base font-bold text-primary mt-1">R$ 29,90</p>
          </div>
        </div>

        {/* Download — primary CTA, gradient + rounded-full */}
        <button className="flex items-center justify-center gap-2 w-full btn-primary font-bold py-4 text-base">
          <Download size={18} />
          Baixar Foto (6016×4016)
        </button>

        {/* Share actions — secondary surface, no border */}
        <div className="grid grid-cols-3 gap-3">
          <button className="flex flex-col items-center justify-center gap-1.5 bg-secondary rounded-2xl py-3 text-xs text-secondary-foreground font-medium">
            <span className="text-xl">📸</span>
            Stories
          </button>
          <button className="flex flex-col items-center justify-center gap-1.5 bg-secondary rounded-2xl py-3 text-xs text-secondary-foreground font-medium">
            <MessageCircle size={20} className="text-muted-foreground" />
            WhatsApp
          </button>
          <button className="flex flex-col items-center justify-center gap-1.5 bg-secondary rounded-2xl py-3 text-xs text-secondary-foreground font-medium">
            <span className="text-xl">📱</span>
            Instagram
          </button>
        </div>

        {/* Back home — tertiary style (text + icon, no border) */}
        <Link
          href="/explore"
          className="flex items-center justify-center gap-2 w-full bg-secondary text-primary font-semibold py-4 rounded-full text-base"
        >
          <Home size={18} />
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}
