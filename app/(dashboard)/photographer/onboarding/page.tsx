'use client'

import { useState } from 'react'
import { ArrowLeft, Camera, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const steps = [
  { label: 'Perfil' },
  { label: 'Equipamento' },
  { label: 'Percursos' },
  { label: 'Pagamento' },
]

export default function PhotographerOnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    camera: '',
    lens: '',
    routes: [] as string[],
    pix: '',
  })

  const update = (key: string, val: string) => setForm((f) => ({ ...f, [key]: val }))

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1)
    else router.push('/photographer/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-card">
      {/* Header — no border, tonal background */}
      <div className="px-4 pt-12 pb-4 bg-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => (step > 0 ? setStep(step - 1) : router.back())}
              className="w-9 h-9 bg-muted rounded-xl flex items-center justify-center"
            >
              <ArrowLeft size={18} className="text-muted-foreground" />
            </button>
            <div>
              <p className="text-xs text-muted-foreground label-instrument">
                Cadastro de Fotógrafo · {step + 1}/{steps.length}
              </p>
              <h1 className="text-lg font-bold text-foreground">{steps[step].label}</h1>
            </div>
          </div>
          <Camera size={22} className="text-primary" />
        </div>

        {/* Progress bar — tonal, no border */}
        <div className="flex gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i <= step ? 'bg-primary' : 'bg-accent'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex-1 px-4 py-6 space-y-5 pb-32 bg-background">
        {/* Step 0: Profile */}
        {step === 0 && (
          <>
            <div className="flex flex-col items-center mb-2">
              <div className="relative w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mb-3">
                <Camera size={32} className="text-accent-foreground/40" />
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center">
                  <Camera size={12} className="text-white" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Preencha seus dados para começar a vender fotos no PicTrail.
              </p>
            </div>
            <Field label="Nome completo" placeholder="Seu nome" value={form.name} onChange={(v) => update('name', v)} />
            <Field label="Email" placeholder="email@exemplo.com" type="email" value={form.email} onChange={(v) => update('email', v)} />
            <Field label="Telefone / WhatsApp" placeholder="(51) 9 0000-0000" type="tel" value={form.phone} onChange={(v) => update('phone', v)} />
          </>
        )}

        {/* Step 1: Equipment */}
        {step === 1 && (
          <>
            <Field label="Câmera" placeholder="Ex: Sony A7 IV" value={form.camera} onChange={(v) => update('camera', v)} />
            <Field label="Lente principal" placeholder="Ex: 70-200mm f/2.8" value={form.lens} onChange={(v) => update('lens', v)} />
          </>
        )}

        {/* Step 2: Routes — tonal selected state, no borders */}
        {step === 2 && (
          <>
            <p className="text-sm text-muted-foreground">Selecione os percursos onde você fotografa:</p>
            {['Orla do Guaíba', 'Parque Farroupilha Loop', 'Bento Gonçalves Norte', 'Gramado Trail', 'Canela MTB'].map((r) => (
              <button
                key={r}
                onClick={() =>
                  setForm((f) => ({
                    ...f,
                    routes: f.routes.includes(r)
                      ? f.routes.filter((x) => x !== r)
                      : [...f.routes, r],
                  }))
                }
                className={`flex items-center justify-between w-full p-3.5 rounded-xl transition-colors ${
                  form.routes.includes(r)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                <span className="text-sm font-medium">{r}</span>
                {form.routes.includes(r) && <span className="text-primary">✓</span>}
              </button>
            ))}
          </>
        )}

        {/* Step 3: Payment */}
        {step === 3 && (
          <>
            <p className="text-sm text-muted-foreground mb-1">
              Informe sua chave Pix para receber seus pagamentos.
            </p>
            <Field label="Chave Pix" placeholder="CPF, e-mail ou chave aleatória" value={form.pix} onChange={(v) => update('pix', v)} />
            {/* Info — surface-container-high tonal block, no border */}
            <div className="bg-muted rounded-xl p-3 text-xs text-muted-foreground">
              💡 Você receberá 70% de cada venda. Os pagamentos são processados toda sexta-feira.
            </div>
          </>
        )}
      </div>

      {/* Bottom button — no border on bar, gradient CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-card shadow-ambient-up px-4 py-4 max-w-lg mx-auto">
        <button
          onClick={next}
          className="flex items-center justify-center gap-2 w-full btn-primary font-bold py-4 text-base"
        >
          {step < steps.length - 1 ? (
            <>
              Próximo: {steps[step + 1].label} <ChevronRight size={18} />
            </>
          ) : (
            'Começar a vender!'
          )}
        </button>
        <p className="text-center text-xs text-muted-foreground/70 mt-2">
          Você pode editar essas informações depois
        </p>
      </div>
    </div>
  )
}

function Field({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
}: {
  label: string
  placeholder: string
  type?: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
      {/* Input — surface-container-high bg, no border, ghost border on focus */}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#e7e8e9] rounded-xl px-3 py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-primary/40 transition-shadow"
      />
    </div>
  )
}
