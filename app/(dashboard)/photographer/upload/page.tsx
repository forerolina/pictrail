'use client'

import { useState } from 'react'
import { ArrowLeft, Upload } from 'lucide-react'
import { useRouter } from 'next/navigation'

const modalities = ['Corrida', 'Ciclismo', 'MTB', 'Triathlon', 'Moto', 'Trail Run']

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
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="px-4 pt-12 pb-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <h1 className="text-xl font-bold text-gray-900">Upload de Fotos</h1>
          </div>
          <span className="text-sm font-semibold text-[#2D6A2D]">
            {selectedFiles > 0 ? `${selectedFiles} selecionadas` : '0 selecionadas'}
          </span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 pb-32">
        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDragging(false)
            setSelectedFiles(e.dataTransfer.files.length)
          }}
          className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-2 transition-colors cursor-pointer ${
            dragging ? 'border-[#2D6A2D] bg-[#e8f5e9]' : 'border-[#2D6A2D]/40 bg-[#e8f5e9]/30'
          }`}
          onClick={() => {
            const input = document.getElementById('file-input') as HTMLInputElement
            input?.click()
          }}
        >
          <Upload size={28} className="text-[#2D6A2D]" />
          <p className="text-sm font-semibold text-[#2D6A2D] text-center">
            Arraste fotos ou toque para selecionar
          </p>
          <p className="text-xs text-[#2D6A2D]/60 text-center">
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

        {/* Tag all photos section */}
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm space-y-4">
          <p className="font-semibold text-gray-900">Marcar todas as fotos</p>

          {/* Route */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <span>📍</span> Percurso / Evento
            </label>
            <select
              value={route}
              onChange={(e) => setRoute(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none"
            >
              <option value="">Selecionar percurso...</option>
              <option value="orla">Orla do Guaíba</option>
              <option value="farroupilha">Parque Farroupilha Loop</option>
              <option value="bento">Bento Gonçalves Norte</option>
              <option value="gramado">Gramado Trail</option>
            </select>
          </div>

          {/* Modality */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <span>📷</span> Modalidade
            </label>
            <div className="flex flex-wrap gap-2">
              {modalities.map((m) => (
                <button
                  key={m}
                  onClick={() => setModality(m)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                    modality === m
                      ? 'bg-[#2D6A2D] text-white border-[#2D6A2D]'
                      : 'bg-white text-gray-700 border-gray-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <span>📅</span> Data do evento
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-700 outline-none"
            />
          </div>

          {/* Price */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
              <span>💰</span> Preço por foto (R$)
            </label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5">
              <span className="text-sm text-gray-400">R$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="29,90"
                className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed bottom publish button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 max-w-lg mx-auto">
        <button
          disabled={!canPublish}
          className={`flex items-center justify-center gap-2 w-full font-bold py-4 rounded-2xl text-base transition-colors ${
            canPublish
              ? 'bg-[#2D6A2D] text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Upload size={18} />
          Publicar fotos selecionadas
        </button>
        {!canPublish && (
          <p className="text-center text-xs text-gray-400 mt-2">
            {selectedFiles === 0 ? 'Selecione ao menos uma foto' : 'Preencha todos os campos'}
          </p>
        )}
      </div>
    </div>
  )
}
