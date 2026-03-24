import { auth } from '@/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { isSubscribed, isTrialActive, daysLeftInTrial } from '@/lib/subscription'
import { Badge } from '@/components/ui/badge'

export default async function BillingPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const user = await db.user.findUnique({ where: { id: session.user.id } })
  if (!user) redirect('/login')

  const subscribed = isSubscribed(user)
  const trialActive = isTrialActive(user)
  const daysLeft = daysLeftInTrial(user)

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-medium">Plano & Faturamento</h1>
        <p className="text-muted-foreground text-sm mt-1">Gerencie sua assinatura.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Plano atual</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-medium text-foreground">{user.plan}</span>
              {trialActive && <Badge variant="secondary">{daysLeft} dias restantes</Badge>}
              {subscribed && <Badge>Ativo</Badge>}
            </div>
          </div>
        </div>

        {!subscribed && (
          <div className="border-t border-border pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">PRO</p>
                <p className="text-sm text-muted-foreground">
                  Compras ilimitadas, reconhecimento facial, histórico completo
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium">R$ 29/mês</p>
              </div>
            </div>
            <form action="/api/stripe/checkout" method="POST" className="mt-4">
              <Button type="submit" className="w-full">
                {trialActive ? 'Assinar agora (trial ativo)' : 'Assinar PRO'}
              </Button>
            </form>
          </div>
        )}

        {subscribed && (
          <div className="border-t border-border pt-4">
            <form action="/api/stripe/portal" method="POST">
              <Button variant="outline" type="submit">
                Gerenciar assinatura
              </Button>
            </form>
          </div>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl p-6">
        <h2 className="font-medium mb-4">Comparativo de Planos</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div />
          <div className="text-center font-medium">FREE</div>
          <div className="text-center font-medium text-primary">PRO</div>

          {[
            ['Busca por rota', '✓', '✓'],
            ['Preview com marca d\'água', '✓', '✓'],
            ['Compras por mês', '1', 'Ilimitadas'],
            ['Reconhecimento facial', '—', '✓'],
            ['Histórico de downloads', '—', '✓'],
            ['Acesso antecipado a galerias', '—', '✓'],
          ].map(([feat, free, pro]) => (
            <>
              <div key={`feat-${feat}`} className="text-muted-foreground">{feat}</div>
              <div key={`free-${feat}`} className="text-center">{free}</div>
              <div key={`pro-${feat}`} className="text-center text-primary">{pro}</div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}
