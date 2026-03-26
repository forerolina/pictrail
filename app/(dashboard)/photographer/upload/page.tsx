'use client'

import { useState } from 'react'
import { ArrowLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

const modalities = ['Custom', 'Naked', 'Adventure', 'Trail', 'Touring', 'Esportivo']

export default function PhotographerUploadPage() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState(0)
  const [route, setRoute] = useState('')
  const [modality, setModality] = useState('')
  const [date, setDate] = useState('')
  const [price, setPrice] = useState('')
  const [dragging, setDragging] = useState(false)

  const canPublish = selectedFiles > 0 && route && modality && date

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header — no border, tonal bg */}
      <div className="px-4 pt-12 pb-4 liquid-glass sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-muted-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Upload de Fotos</h1>
          </div>
          {/* Tertiary — text-only */}
          <span className="text-sm font-semibold text-primary">
            {selectedFiles > 0 ? `${selectedFiles} selecionadas` : '0 selecionadas'}
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 pb-32">
        {/* Drop zone — ghost border (outline-variant at 15%), tonal bg */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            setSelectedFiles(e.dataTransfer.files.length)
          }}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-2 transition-colors cursor-pointer ${
            dragging
              ? 'border-primary bg-accent'
              : 'border-[rgba(188,201,206,0.4)] bg-muted'
          }`}
          onClick={() => {
            const input = document.getElementById('file-input') as HTMLInputElement
            input?.click()
          }}
        >
          <Upload size={28} className="text-primary" />
          <p className="text-sm font-semibold text-primary text-center">
            Arraste fotos ou toque para selecionar
          </p>
          <p className="text-xs text-muted-foreground text-center">
            JPG, RAW, PNG · Máx 50MB por foto
          </p>
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => setSelectedFiles(e.target.files?.length || 0)}
          />
        </div>

        {/* Tag all photos — surface-container-lowest on background, no border */}
        <div className="bg-card rounded-2xl p-4 shadow-ambient space-y-4">
          <p className="font-semibold text-foreground">Marcar todas as fotos</p>

          {/* Route */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5 label-instrument">
              <span>📍</span> Percurso / Evento
            </label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full liquid-glass-float rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            >
              <option value="">Selecionar percurso...</option>
              <option value="orla">Orla do Guaíba</option>
              <option value="farroupilha">Parque Farroupilha Loop</option>
              <option value="bento">Bento Gonçalves Norte</option>
              <option value="gramado">Gramado Trail</option>
            </select>
          </div>

          {/* Modality — tonal active, secondary inactive, no borders */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5 label-instrument">
              <span>📷</span> Modalidade
            </label>
            <div className="flex flex-wrap gap-2">
              {modalities.map((m) => (
                <button
                  key={m}
                  onClick={() => setModality(m)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    modality === m
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5 label-instrument">
              <span>📅</span> Data do evento
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full liquid-glass-float rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/40 transition-shadow"
            />
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground mb-1.5 label-instrument">
              <span>💰</span> Preço por foto (R$)
            </label>
            <div className="flex items-center gap-2 liquid-glass-float rounded-xl px-3 py-2.5">
              <span className="text-sm text-muted-foreground">R$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29,90"
                className="flex-1 bg-transparent text-sm text-foreground outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom — no border, ambient shadow up */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-ambient-up px-4 py-4 max-w-lg mx-auto">
        <button
          disabled={!canPublish}
          className={`flex items-center justify-center gap-2 w-full font-bold py-4 rounded-full text-base transition-all ${
            canPublish ? 'btn-primary' : 'bg-accent text-muted-foreground cursor-not-allowed'
          }`}
        >
          <Upload size={18} />
          Publicar fotos selecionadas
        </button>
        {!canPublish && (
          <p className="text-center text-xs text-muted-foreground/70 mt-2">
            {selectedFiles === 0 ? 'Selecione ao menos uma foto' : 'Preencha todos os campos'}
          </p>
        )}
      </div>
    </div>
  )
}
