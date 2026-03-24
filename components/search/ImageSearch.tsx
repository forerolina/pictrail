'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface Props {
  onResults: (photos: unknown[]) => void
  hasAccess: boolean
}

export function ImageSearch({ onResults, hasAccess }: Props) {
  const [dragging, setDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    if (!hasAccess) {
      toast.error('Reconhecimento facial disponível apenas no plano PRO.')
      return
    }
    const url = URL.createObjectURL(file)
    setPreview(url)
    setLoading(true)
    try {
      const form = new FormData()
      form.append('image', file)
      const res = await fetch('/api/search/image', { method: 'POST', body: form })
      const data = await res.json()
      onResults(data.photos ?? [])
    } catch {
      toast.error('Erro na busca. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <h2 className="font-medium text-foreground">Buscar por Imagem</h2>
      <p className="text-sm text-muted-foreground">
        Envie uma foto sua e encontre-se em galerias de eventos.
      </p>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          const file = e.dataTransfer.files[0]
          if (file) handleFile(file)
        }}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${dragging ? 'border-primary bg-accent' : 'border-border hover:border-primary'}`}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="preview" className="h-32 mx-auto object-cover rounded" />
        ) : (
          <div className="space-y-2 text-muted-foreground">
            <p className="text-3xl">📸</p>
            <p className="text-sm">Arraste uma foto ou clique para selecionar</p>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
      />

      {preview && (
        <Button variant="outline" onClick={() => { setPreview(null); onResults([]) }}>
          Limpar
        </Button>
      )}

      {loading && <p className="text-sm text-muted-foreground">Analisando imagem...</p>}
    </div>
  )
}
