export function WatermarkOverlay() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="text-white/40 font-bold text-lg select-none rotate-[-30deg] whitespace-nowrap"
        style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
      >
        PICTRAIL
      </div>
    </div>
  )
}
