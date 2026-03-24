'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const features = [
  {
    icon: '🗺️',
    title: 'Busca por Rota GPS',
    description:
      'Selecione uma rota ou evento e veja todas as fotos tiradas naquele dia e local.',
  },
  {
    icon: '🤳',
    title: 'Busca por Imagem',
    description:
      'Envie uma foto sua e encontre-se automaticamente em galerias de provas e pedaladas.',
  },
  {
    icon: '🖼️',
    title: 'Galeria com Preview',
    description:
      'Navegue antes de comprar. Download em alta resolução liberado após pagamento.',
  },
  {
    icon: '📷',
    title: 'CMS para Fotógrafos',
    description:
      'Upload, tag por GPS, evento e data. Defina preço e publique sua vitrine em minutos.',
  },
  {
    icon: '⚡',
    title: 'Pagamento via PIX',
    description:
      'Checkout instantâneo. Split automático entre fotógrafo e plataforma.',
  },
]

const buyerSteps = [
  { step: '1', text: 'Busque pela rota ou evento que você participou' },
  { step: '2', text: "Encontre-se nas fotos com marcação d'água" },
  { step: '3', text: 'Pague via PIX e baixe em alta resolução' },
]

const photographerSteps = [
  { step: '1', text: 'Crie sua conta e configure seu perfil e chave PIX' },
  { step: '2', text: 'Faça upload das fotos com tag de GPS e evento' },
  { step: '3', text: 'Publique e receba automaticamente por cada venda' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-medium text-xl text-foreground">PicTrail</span>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
              Entrar
            </Link>
            <Link href="/login" className={cn(buttonVariants({ size: 'sm' }))}>
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 py-24 text-center space-y-6">
        <Badge variant="secondary" className="text-xs">
          Marketplace de fotos esportivas do RS
        </Badge>
        <h1 className="text-4xl md:text-6xl font-medium text-foreground leading-tight max-w-4xl mx-auto">
          Sua foto na Serra do Rio do Rastro existe. Agora você consegue encontrá-la.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Encontre fotos suas em provas, pedaladas e rotas cênicas — por GPS, data ou
          reconhecimento facial. Compre com PIX em um clique.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
            Começar grátis — 14 dias PRO
          </Link>
          <Link href="/explore" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
            Ver galerias
          </Link>
        </div>
        <p className="text-xs text-muted-foreground">
          Sem cartão de crédito. Trial de 14 dias com todos os recursos PRO.
        </p>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground">Tudo que você precisa</h2>
            <p className="text-muted-foreground mt-2">Do clique do fotógrafo ao download do atleta.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="bg-card border border-border rounded-xl p-6 space-y-3">
                <span className="text-3xl">{f.icon}</span>
                <h3 className="font-medium text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground">Como funciona</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-medium text-lg mb-6 text-foreground">Para atletas</h3>
              <div className="space-y-4">
                {buyerSteps.map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      {s.step}
                    </div>
                    <p className="text-muted-foreground text-sm pt-1">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-6 text-foreground">Para fotógrafos</h3>
              <div className="space-y-4">
                {photographerSteps.map((s) => (
                  <div key={s.step} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium shrink-0">
                      {s.step}
                    </div>
                    <p className="text-muted-foreground text-sm pt-1">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-medium text-foreground">Planos simples</h2>
            <p className="text-muted-foreground mt-2">Comece grátis, assine quando precisar de mais.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-8 space-y-6">
              <div>
                <h3 className="text-xl font-medium">FREE</h3>
                <p className="text-3xl font-medium mt-2">R$ 0</p>
                <p className="text-muted-foreground text-sm">para sempre</p>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  'Busca por rota',
                  "Preview com marca d'água",
                  '1 compra avulsa por mês',
                  'Sem reconhecimento facial',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: 'outline' }), 'w-full justify-center')}
              >
                Criar conta grátis
              </Link>
            </div>

            <div className="bg-primary text-primary-foreground rounded-xl p-8 space-y-6">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-medium">PRO</h3>
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                </div>
                <p className="text-3xl font-medium mt-2">R$ 29</p>
                <p className="opacity-70 text-sm">por mês</p>
              </div>
              <ul className="space-y-3 text-sm opacity-90">
                {[
                  'Tudo do FREE',
                  'Compras ilimitadas',
                  'Reconhecimento facial',
                  'Histórico de downloads',
                  'Acesso antecipado a galerias',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/login"
                className={cn(buttonVariants({ variant: 'secondary' }), 'w-full justify-center')}
              >
                Começar trial de 14 dias
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-medium text-foreground">PicTrail</p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PicTrail. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Entrar
            </Link>
            <Link href="/explore" className="hover:text-foreground transition-colors">
              Galerias
            </Link>
            <a href="mailto:contato@pictrail.com.br" className="hover:text-foreground transition-colors">
              Contato
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
