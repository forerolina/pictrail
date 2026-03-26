'use client'

import { useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Search,
  Star,
  ChevronLeft,
  ImagePlus,
  X,
  ShoppingCart,
  Camera,
  Flame,
  Check,
} from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

/* ─── Shared photographer data ─────────────────────────────────────────────── */
const PHOTOGRAPHERS: Record<string, {
  name: string
  handle: string
  avatar: string
  initials: string
  rating: number
  reviewCount: number
  totalSales: number
  recentBuyers: number
  speciality: string
  badge: string | null
  bio: string
}> = {
  'carlos-mendes': {
    name: 'Carlos Mendes',
    handle: 'carlos-mendes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
    initials: 'CM',
    rating: 4.9,
    reviewCount: 312,
    totalSales: 1840,
    recentBuyers: 8,
    speciality: 'Moto Esportiva & Naked',
    badge: 'Top vendedor',
    bio: 'Fotógrafo especializado em motos esportivas e naked. Atua na Orla do Guaíba e rotas da Serra há mais de 5 anos.',
  },
  'ana-lima': {
    name: 'Ana Lima',
    handle: 'ana-lima',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    initials: 'AL',
    rating: 4.8,
    reviewCount: 187,
    totalSales: 940,
    recentBuyers: 5,
    speciality: 'Adventure & Trail',
    badge: null,
    bio: 'Capturando o movimento perfeito em cada curva e acelerada desde 2020.',
  },
  'bruno-costa': {
    name: 'Bruno Costa',
    handle: 'bruno-costa',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    initials: 'BC',
    rating: 4.7,
    reviewCount: 94,
    totalSales: 412,
    recentBuyers: 3,
    speciality: 'Moto & Off-road',
    badge: null,
    bio: 'Aventureiro e fotógrafo. Se você passou pela bento ou fez trilha, provavelmente tenho uma foto sua.',
  },
  'marcos-reis': {
    name: 'Marcos Reis',
    handle: 'marcos-reis',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    initials: 'MR',
    rating: 4.9,
    reviewCount: 256,
    totalSales: 1520,
    recentBuyers: 11,
    speciality: 'Naked & Custom',
    badge: 'Top vendedor',
    bio: 'Registrando as motos porto-alegrenses com identidade e arte nas rotas da cidade.',
  },
  'julia-faria': {
    name: 'Julia Faria',
    handle: 'julia-faria',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    initials: 'JF',
    rating: 4.8,
    reviewCount: 143,
    totalSales: 670,
    recentBuyers: 4,
    speciality: 'Custom & Touring',
    badge: null,
    bio: 'Motociclista e fotógrafa. Entendo o piloto porque também sou uma.',
  },
  'pedro-luz': {
    name: 'Pedro Luz',
    handle: 'pedro-luz',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    initials: 'PL',
    rating: 4.6,
    reviewCount: 78,
    totalSales: 310,
    recentBuyers: 2,
    speciality: 'Enduro & Off-road',
    badge: null,
    bio: 'Nas estradas de Bento Gonçalves e arredores capturando motos adventure e enduro.',
  },
}

/* ─── Mock photo gallery per photographer ───────────────────────────────────── */
const GALLERY: Record<string, Array<{
  id: string
  image: string
  route: string
  date: string
  period: string
  price: string
  purchased?: boolean
}>> = {
  'carlos-mendes': [
    { id: 'cm1', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80', route: 'Orla do Guaíba', date: '23 Mar', period: 'Manhã', price: 'R$ 29,90' },
    { id: 'cm2', image: 'https://images.unsplash.com/photo-1571333250630-f0230c320b6d?w=600&q=80', route: 'Orla do Guaíba', date: '23 Mar', period: 'Tarde', price: 'R$ 29,90' },
    { id: 'cm3', image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=600&q=80', route: 'Orla do Guaíba', date: '21 Mar', period: 'Manhã', price: 'R$ 24,90' },
    { id: 'cm4', image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=600&q=80', route: 'Orla do Guaíba', date: '20 Mar', period: 'Noite', price: 'R$ 34,90' },
    { id: 'cm5', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80', route: 'Bento Gonçalves', date: '15 Mar', period: 'Tarde', price: 'R$ 29,90' },
    { id: 'cm6', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80', route: 'Bento Gonçalves', date: '15 Mar', period: 'Manhã', price: 'R$ 29,90' },
  ],
  'ana-lima': [
    { id: 'al1', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80', route: 'Orla do Guaíba', date: '23 Mar', period: 'Tarde', price: 'R$ 24,90' },
    { id: 'al2', image: 'https://images.unsplash.com/photo-1558981852-426c349548ab?w=600&q=80', route: 'Orla do Guaíba', date: '22 Mar', period: 'Manhã', price: 'R$ 24,90' },
    { id: 'al3', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&q=80', route: 'Parque Farroupilha', date: '18 Mar', period: 'Tarde', price: 'R$ 29,90' },
  ],
  'marcos-reis': [
    { id: 'mr1', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80', route: 'Parque Farroupilha', date: '15 Mar', period: 'Manhã', price: 'R$ 29,90' },
    { id: 'mr2', image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?w=600&q=80', route: 'Parque Farroupilha', date: '14 Mar', period: 'Tarde', price: 'R$ 24,90' },
    { id: 'mr3', image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=600&q=80', route: 'Orla do Guaíba', date: '10 Mar', period: 'Manhã', price: 'R$ 34,90' },
    { id: 'mr4', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80', route: 'Orla do Guaíba', date: '08 Mar', period: 'Noite', price: 'R$ 29,90' },
  ],
}

/* Default fallback gallery */
const DEFAULT_GALLERY = [
  { id: 'd1', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600&q=80', route: 'Orla do Guaíba', date: '23 Mar', period: 'Manhã', price: 'R$ 29,90' },
  { id: 'd2', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80', route: 'Orla do Guaíba', date: '22 Mar', period: 'Tarde', price: 'R$ 24,90' },
  { id: 'd3', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80', route: 'Bento Gonçalves', date: '20 Mar', period: 'Noite', price: 'R$ 34,90' },
]

export default function PhotographerProfilePage() {
  const params = useParams<{ handle: string }>()
  const router = useRouter()
  const handle = params.handle

  const photographer = PHOTOGRAPHERS[handle]
  const gallery = GALLERY[handle] ?? DEFAULT_GALLERY

  const [search, setSearch] = useState('')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [cart, setCart] = useState<Set<string>>(new Set())
  const [purchased, setPurchased] = useState<Set<string>>(new Set())
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadedImage(URL.createObjectURL(file))
  }

  const toggleCart = (id: string) => {
    setCart((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handlePurchase = (id: string) => {
    setPurchased((prev) => new Set(prev).add(id))
    setCart((prev) => {
      const next = new Set(prev)
      next.delete(id)
      return next
    })
  }

  const filtered = gallery.filter((p) => {
    if (search && !p.route.toLowerCase().includes(search.toLowerCase()) &&
        !p.date.toLowerCase().includes(search.toLowerCase()) &&
        !p.period.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  if (!photographer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
        <p className="text-gray-400 text-sm">Fotógrafo não encontrado.</p>
        <button onClick={() => router.back()} className="mt-4 text-[#4F46E5] text-sm font-semibold">
          ← Voltar
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── Hero / Profile header ─────────────────────────────────────────── */}
      <div className="bg-card px-4 pt-12 pb-4">
        {/* Back */}
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-1 text-muted-foreground text-sm mb-4 min-h-[44px]"
        >
          <ChevronLeft size={16} aria-hidden="true" /> Voltar
        </button>

        {/* Avatar + name row */}
        <div className="flex items-start gap-3 mb-3">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-card shadow-ambient">
              <AvatarImage src={photographer.avatar} alt={photographer.name} />
              <AvatarFallback className="bg-accent text-accent-foreground font-bold text-2xl">
                {photographer.initials}
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-primary border-2 border-card" />
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-extrabold text-foreground leading-tight">{photographer.name}</h1>
              {photographer.badge && (
                <span className="text-[10px] font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-full">
                  ⭐ {photographer.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{photographer.speciality}</p>

            {/* Stars */}
            <div className="flex items-center gap-1 mt-1">
              <div className="flex">
                {[1,2,3,4,5].map((s) => (
                  <Star
                    key={s}
                    size={11}
                    className={s <= Math.round(photographer.rating) ? 'text-primary fill-primary' : 'text-muted fill-muted'}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">{photographer.rating}</span>
              <span className="text-xs text-muted-foreground">({photographer.reviewCount} avaliações)</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{photographer.bio}</p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-muted rounded-xl py-2.5 text-center">
            <p className="text-base font-extrabold text-foreground">{photographer.totalSales.toLocaleString('pt-BR')}</p>
            <p className="text-[10px] text-muted-foreground flex items-center justify-center gap-0.5 mt-0.5">
              <Camera size={9} aria-hidden="true" /> fotos vendidas
            </p>
          </div>
          <div className="bg-muted rounded-xl py-2.5 text-center">
            <p className="text-base font-extrabold text-foreground">{gallery.length}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">fotos disponíveis</p>
          </div>
          <div className="bg-muted rounded-xl py-2.5 text-center">
            <p className="text-base font-extrabold text-foreground">{photographer.reviewCount}</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">avaliações</p>
          </div>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent rounded-xl px-3 py-2">
          <Flame size={13} className="text-primary flex-none" aria-hidden="true" />
          <span>
            <strong className="text-primary">{photographer.recentBuyers} pessoas</strong> compraram fotos no último mês
          </span>
        </div>
      </div>

      {/* ── Search & upload ───────────────────────────────────────────────── */}
      <div className="px-4 pt-3 pb-3 mt-2 liquid-glass sticky top-0 z-10">
        {/* Row: search bar + image upload */}
        <div className="flex gap-2 h-[44px]">
          <div className="flex-1 flex items-center gap-2 liquid-glass-float rounded-2xl px-3">
            <Search size={15} className="text-muted-foreground/60 flex-none" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por rota, data, período..."
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground/60 min-w-0"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} aria-label="Limpar busca">
                <X size={14} className="text-muted-foreground/60" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Image upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <button
            type="button"
            aria-label={uploadedImage ? 'Imagem ativa — clique para alterar' : 'Buscar por imagem do veículo'}
            onClick={() => fileInputRef.current?.click()}
            className={`w-[44px] h-[44px] rounded-2xl flex items-center justify-center flex-none transition-colors ${
              uploadedImage
                ? 'bg-primary text-primary-foreground'
                : 'liquid-glass-float text-muted-foreground'
            }`}
          >
            <ImagePlus size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Uploaded image hint */}
        {uploadedImage && (
          <div className="flex items-center gap-2 bg-accent rounded-xl px-3 py-2 mt-2">
            <img src={uploadedImage} alt="Seu veículo" className="w-8 h-8 rounded-lg object-cover" />
            <p className="flex-1 text-xs font-medium text-accent-foreground">Filtrando por veículo similar</p>
            <button type="button" onClick={() => setUploadedImage(null)} aria-label="Remover filtro de imagem" className="text-muted-foreground">
              <X size={13} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* ── Cart bar (shows when items selected) ─────────────────────────── */}
      {cart.size > 0 && (
        <div className="fixed bottom-20 left-0 right-0 z-50 px-4">
          <Link
            href={`/purchase-confirm?photographer=${handle}&ids=${[...cart].join(',')}`}
            className="btn-primary flex items-center justify-between rounded-2xl px-4 py-3 shadow-ambient"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} aria-hidden="true" />
              <span className="font-bold text-sm">{cart.size} foto{cart.size > 1 ? 's' : ''} selecionada{cart.size > 1 ? 's' : ''}</span>
            </div>
            <span className="font-bold text-sm">Comprar →</span>
          </Link>
        </div>
      )}

      {/* ── Photo grid ───────────────────────────────────────────────────── */}
      <div className="px-4 pt-3 pb-24 grid grid-cols-2 gap-3">
        {filtered.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center py-20 text-center">
            <p className="text-4xl mb-3">📷</p>
            <p className="text-muted-foreground text-sm font-medium">Nenhuma foto encontrada</p>
          </div>
        ) : (
          filtered.map((photo) => {
            const inCart = cart.has(photo.id)
            const isPurchased = purchased.has(photo.id)

            return (
              <div key={photo.id} className="rounded-2xl overflow-hidden bg-card shadow-ambient">
                {/* Photo with watermark */}
                <div className="relative">
                  <img
                    src={photo.image}
                    alt={photo.route}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  {/* Watermark */}
                  {!isPurchased && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <p className="text-white/25 text-xl font-black tracking-widest rotate-[-30deg] select-none">
                        PICTRAIL
                      </p>
                    </div>
                  )}
                  {/* Period badge */}
                  <div className="absolute top-2 left-2 glass text-foreground text-[10px] px-1.5 py-0.5 rounded-full">
                    {photo.period === 'Manhã' ? '🌅' : photo.period === 'Tarde' ? '☀️' : '🌙'} {photo.period}
                  </div>
                  {/* Purchased overlay */}
                  {isPurchased && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <div className="bg-primary rounded-full p-2 shadow-ambient">
                        <Check size={20} className="text-primary-foreground" aria-hidden="true" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-2.5 py-2">
                  <p className="text-[11px] text-muted-foreground truncate mb-1">📍 {photo.route} · {photo.date}</p>
                  {isPurchased ? (
                    <div className="flex items-center gap-1 text-primary text-xs font-semibold">
                      <Check size={12} aria-hidden="true" /> Comprada
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-foreground">{photo.price}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          aria-label={inCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
                          onClick={() => toggleCart(photo.id)}
                          className={`w-[32px] h-[32px] rounded-lg flex items-center justify-center transition-colors ${
                            inCart
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <ShoppingCart size={13} aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePurchase(photo.id)}
                          className="btn-primary text-[11px] font-bold px-2.5 py-1.5"
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
