'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Map, Grid2x2, User } from 'lucide-react'

const navItems = [
  { href: '/explore', label: 'Mapa', icon: Map },
  { href: '/photos', label: 'Fotos', icon: Grid2x2 },
  { href: '/profile', label: 'Perfil', icon: User },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Main content */}
      <main className="flex-1 pb-20 max-w-lg mx-auto w-full">
        {children}
      </main>

      {/* Bottom navigation — tonal surface, no 1px border, ambient shadow upward */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 liquid-glass-nav rounded-t-[28px]">
        <div className="max-w-lg mx-auto flex items-center justify-around h-16">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === '/explore'
                ? pathname === '/explore' || pathname === '/app' || pathname === '/app/map'
                : pathname.startsWith(href)
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-0.5 px-6 py-2 text-xs font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground/60'
                }`}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.2 : 1.6}
                  className={isActive ? 'text-primary' : 'text-muted-foreground/60'}
                />
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
