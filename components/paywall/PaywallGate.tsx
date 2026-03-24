'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  feature: string
  children: React.ReactNode
  hasAccess: boolean
}

export function PaywallGate({ feature, children, hasAccess }: Props) {
  const router = useRouter()

  if (hasAccess) return <>{children}</>

  return (
    <div className="relative">
      <div className="pointer-events-none select-none opacity-40 blur-sm">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 rounded-lg">
        <div className="text-center space-y-3 p-6 bg-card border border-border rounded-xl shadow-sm max-w-sm">
          <div className="text-2xl">🔒</div>
          <h3 className="font-medium text-foreground">Recurso PRO</h3>
          <p className="text-sm text-muted-foreground">
            {feature} está disponível no plano PRO.
          </p>
          <Button
            className="w-full"
            onClick={() => router.push('/settings/billing')}
          >
            Assinar PRO — R$ 29/mês
          </Button>
        </div>
      </div>
    </div>
  )
}
