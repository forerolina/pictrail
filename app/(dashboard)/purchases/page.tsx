import { auth } from '@/auth'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default async function PurchasesPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login')

  const purchases = await db.purchase.findMany({
    where: { userId: session.user.id, status: 'paid' },
    include: { photo: true },
    orderBy: { purchasedAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-medium">Minhas Compras</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {purchases.length} foto{purchases.length !== 1 ? 's' : ''} comprada{purchases.length !== 1 ? 's' : ''}
        </p>
      </div>

      {purchases.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-4xl mb-4">🛒</p>
          <p>Você ainda não comprou nenhuma foto.</p>
          <Link href="/explore" className="text-primary underline text-sm mt-2 inline-block">
            Explorar fotos →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {purchases.map((p) => (
            <div key={p.id} className="space-y-2">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                <Image
                  src={p.photo.urlFullres}
                  alt="Foto comprada"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {new Date(p.purchasedAt).toLocaleDateString('pt-BR')}
                </span>
                <a
                  href={p.photo.urlFullres}
                  download
                  className="text-primary underline text-xs"
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
