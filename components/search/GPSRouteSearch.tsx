'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  onSearch: (params: { route: string; date: string }) => void
  loading?: boolean
}

const POPULAR_ROUTES = [
  'Serra do Rio do Rastro',
  'Trilha do Pico Agudo',
  'Rota dos Imigrantes',
  'Caminho dos Cânions',
  'Circuito das Araucárias',
]

export function GPSRouteSearch({ onSearch, loading }: Props) {
  const [route, setRoute] = useState('')
  const [date, setDate] = useState('')

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h2 className="font-medium text-foreground">Buscar por Rota / Evento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label>Rota ou Evento</Label>
          <Input
            placeholder="Ex: Serra do Rio do Rastro"
            value={route}
            onChange={(e) => setRoute(e.target.value)}
            list="routes"
          />
          <datalist id="routes">
            {POPULAR_ROUTES.map((r) => (
              <option key={r} value={r} />
            ))}
          </datalist>
        </div>
        <div className="space-y-1">
          <Label>Data</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {POPULAR_ROUTES.slice(0, 3).map((r) => (
          <button
            key={r}
            onClick={() => setRoute(r)}
            className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
          >
            {r}
          </button>
        ))}
      </div>

      <Button
        onClick={() => onSearch({ route, date })}
        disabled={loading || !route}
        className="w-full md:w-auto"
      >
        {loading ? 'Buscando...' : 'Buscar Fotos'}
      </Button>
    </div>
  )
}
