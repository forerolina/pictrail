import { auth } from '@/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function PhotographerDashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const photographer = await db.photographer.findUnique({
    where: { userId: session.user.id },
    include: {
      galleries: {
        include: { _count: { select: { photos: true } } },
        orderBy: { createdAt: 'desc' },
        take: 10,
      },
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-medium text-foreground">Painel do Fotógrafo</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Gerencie suas galerias e fotos.
        </p>
      </div>

      {!photographer ? (
        <div className="rounded-lg border border-border bg-card p-8 text-center space-y-4">
          <p className="text-muted-foreground">Você ainda não tem um perfil de fotógrafo.</p>
          <p className="text-sm text-muted-foreground">
            Entre em contato para cadastrar seu perfil e começar a vender suas fotos.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Galerias</p>
              <p className="text-3xl font-medium text-foreground mt-1">
                {photographer.galleries.length}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Total de fotos</p>
              <p className="text-3xl font-medium text-foreground mt-1">
                {photographer.galleries.reduce((acc, g) => acc + g._count.photos, 0)}
              </p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-sm text-muted-foreground">Fotógrafo desde</p>
              <p className="text-lg font-medium text-foreground mt-1">
                {photographer.createdAt.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground mb-4">Galerias recentes</h2>
            {photographer.galleries.length === 0 ? (
              <p className="text-muted-foreground text-sm">Nenhuma galeria ainda.</p>
            ) : (
              <div className="space-y-2">
                {photographer.galleries.map((gallery) => (
                  <div
                    key={gallery.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-foreground text-sm">{gallery.routeName}</p>
                      <p className="text-xs text-muted-foreground">
                        {gallery._count.photos} foto{gallery._count.photos !== 1 ? 's' : ''} •{' '}
                        {gallery.date.toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <Link
                      href={`/gallery/${gallery.id}`}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Ver →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
