'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Search, Camera, MapPin } from 'lucide-react'

const slides = [
  {
    icon: Search,
    title: 'Encontre suas fotos',
    description:
      'Use o mapa interativo para descobrir fotógrafos e fotos do seu percurso em corridas, pedais e muito mais.',
    image:
      'https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80',
  },
  {
    icon: Camera,
    title: 'Busque pelo percurso',
    description:
      'Selecione a rota do seu evento no mapa e veja todas as fotos tiradas ao longo do trajeto.',
    image:
      'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
  },
  {
    icon: MapPin,
    title: 'Compre com facilidade',
    description:
      'Encontrou sua foto? Compre em segundos via Pix e faça o download em alta resolução.',
    image:
      'https://images.unsplash.com/photo-1461897104016-0b3b00cc81ee?w=800&q=80',
  },
]

export default function OnboardingPage() {
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
  }

  const skip = () => {
    window.location.href = '/explore'
  }

  const slide = slides[current]
  const Icon = slide.icon
  const isLast = current === slides.length - 1

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#191c1d] p-4">
      <div className="w-full max-w-sm bg-card rounded-3xl overflow-hidden shadow-ambient">
        {/* Hero image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/30" />
          <button
            onClick={skip}
            className="absolute top-4 right-4 glass text-foreground text-sm font-medium px-4 py-1.5 rounded-full"
          >
            Pular
          </button>
        </div>

        {/* Content */}
        <div className="px-6 pt-5 pb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
              <Icon size={18} className="text-accent-foreground" />
            </div>
            <span className="text-sm font-semibold text-muted-foreground label-instrument">
              {current + 1} / {slides.length}
            </span>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2 leading-tight">
            {slide.title}
          </h1>

          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            {slide.description}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mb-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? 'w-6 bg-primary' : 'w-2 bg-accent'
                }`}
              />
            ))}
          </div>

          {isLast ? (
            <div className="space-y-3">
              <Link
                href="/explore"
                className="flex items-center justify-center gap-2 w-full btn-primary font-semibold py-4 text-base"
              >
                Explorar fotos <ChevronRight size={18} />
              </Link>
              {/* Secondary — surface-container bg, no border */}
              <Link
                href="/login"
                className="flex items-center justify-center w-full bg-secondary text-secondary-foreground font-semibold py-4 rounded-full text-base"
              >
                Entrar / Criar conta
              </Link>
            </div>
          ) : (
            <button
              onClick={next}
              className="flex items-center justify-center gap-2 w-full btn-primary font-semibold py-4 text-base"
            >
              Próximo <ChevronRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
