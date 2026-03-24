import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/explore" className="font-medium text-foreground text-lg">
            PicTrail
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link href="/explore" className="text-muted-foreground hover:text-foreground transition-colors">
              Explorar
            </Link>
            <Link href="/purchases" className="text-muted-foreground hover:text-foreground transition-colors">
              Compras
            </Link>
            <Link href="/photographer/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              Fotógrafo
            </Link>
            <Link href="/settings/billing" className="text-muted-foreground hover:text-foreground transition-colors">
              Plano
            </Link>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
