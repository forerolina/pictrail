'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'

// Route data: Porto Alegre - Orla do Guaíba
const ROUTES = {
  orla: {
    name: 'Orla do Guaíba',
    color: '#4F46E5',
    coords: [
      [-30.0500, -51.2400],
      [-30.0450, -51.2380],
      [-30.0410, -51.2350],
      [-30.0380, -51.2310],
      [-30.0350, -51.2270],
      [-30.0320, -51.2230],
      [-30.0300, -51.2200],
      [-30.0275, -51.2180],
      [-30.0250, -51.2160],
      [-30.0230, -51.2140],
    ] as [number, number][],
    photographers: [
      { id: 'p1', lat: -30.0420, lng: -51.2360, name: 'Carlos M.', photos: 47, color: '#2D6A2D' },
      { id: 'p2', lat: -30.0350, lng: -51.2270, name: 'Ana Lima', photos: 23, color: '#7C3AED' },
      { id: 'p3', lat: -30.0280, lng: -51.2190, name: 'Bruno C.', photos: 15, color: '#DC2626' },
    ],
  },
  farroupilha: {
    name: 'Parque Farroupilha',
    color: '#059669',
    coords: [
      [-30.0310, -51.2190],
      [-30.0295, -51.2170],
      [-30.0280, -51.2155],
      [-30.0265, -51.2140],
      [-30.0250, -51.2125],
      [-30.0235, -51.2110],
      [-30.0220, -51.2095],
    ] as [number, number][],
    photographers: [
      { id: 'p4', lat: -30.0270, lng: -51.2148, name: 'Marcos R.', photos: 38, color: '#2D6A2D' },
      { id: 'p5', lat: -30.0235, lng: -51.2110, name: 'Julia F.', photos: 19, color: '#7C3AED' },
    ],
  },
  bento: {
    name: 'Bento Gonçalves Norte',
    color: '#D97706',
    coords: [
      [-30.0380, -51.2100],
      [-30.0360, -51.2080],
      [-30.0340, -51.2060],
      [-30.0320, -51.2040],
      [-30.0300, -51.2020],
    ] as [number, number][],
    photographers: [
      { id: 'p6', lat: -30.0350, lng: -51.2065, name: 'Pedro L.', photos: 31, color: '#2D6A2D' },
    ],
  },
}

interface Props {
  activeRouteId: string
  onPhotographerClick: (id: string) => void
}

export default function ExploreMap({ activeRouteId, onPhotographerClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layersRef = useRef<any[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!mapRef.current) return
    const container = mapRef.current

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initMap = (L: any) => {
      if (mapInstanceRef.current) return // already initialised

      // Fix default icon paths
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(container, {
        zoomControl: false,
        attributionControl: false,
      })

      // CartoDB Voyager — clean Waze-like style
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map)

      L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map)

      mapInstanceRef.current = map
      setReady(true)
    }

    // Only create the map once the container has non-zero dimensions.
    // Leaflet reads clientWidth/clientHeight at init time — if it sees 0 the
    // pixel-origin is wrong and tiles land at garbage positions.
    const ro = new ResizeObserver(() => {
      if (container.clientHeight > 0 && !mapInstanceRef.current) {
        ro.disconnect()
        import('leaflet').then(initMap)
      }
    })
    ro.observe(container)

    // Also try immediately, in case the container is already sized.
    if (container.clientHeight > 0) {
      ro.disconnect()
      import('leaflet').then(initMap)
    }

    return () => {
      ro.disconnect()
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Update route and markers when activeRouteId changes
  useEffect(() => {
    if (!ready || !mapInstanceRef.current) return

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current

      // Remove old layers
      layersRef.current.forEach((l) => map.removeLayer(l))
      layersRef.current = []

      const route = ROUTES[activeRouteId as keyof typeof ROUTES]
      if (!route) return

      // Draw all routes dimmed first
      Object.entries(ROUTES).forEach(([id, r]) => {
        if (id === activeRouteId) return
        const line = L.polyline(r.coords, {
          color: '#CBD5E1',
          weight: 4,
          opacity: 0.5,
        }).addTo(map)
        layersRef.current.push(line)
      })

      // Draw active route — thick Waze style
      const shadow = L.polyline(route.coords, {
        color: 'rgba(0,0,0,0.15)',
        weight: 12,
        opacity: 1,
      }).addTo(map)
      layersRef.current.push(shadow)

      const mainLine = L.polyline(route.coords, {
        color: route.color,
        weight: 8,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)
      layersRef.current.push(mainLine)

      // User location marker (Waze arrow style)
      const userPos = route.coords[Math.floor(route.coords.length / 2)]
      const userIcon = L.divIcon({
        html: `<div style="
          width:36px;height:36px;
          background:#4F46E5;
          border:3px solid white;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 2px 8px rgba(0,0,0,0.3);
        "><div style="
          transform:rotate(45deg);
          width:100%;height:100%;
          display:flex;align-items:center;justify-content:center;
          font-size:14px;
        ">▲</div></div>`,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
        className: '',
      })
      const userMarker = L.marker(userPos, { icon: userIcon }).addTo(map)
      layersRef.current.push(userMarker)

      // Photographer markers
      route.photographers.forEach((p) => {
        const icon = L.divIcon({
          html: `<div style="
            position:relative;
            width:40px;height:40px;
          ">
            <div style="
              width:40px;height:40px;
              background:${p.color};
              border:2.5px solid white;
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 2px 6px rgba(0,0,0,0.25);
              cursor:pointer;
              font-size:16px;
            ">📷</div>
            <div style="
              position:absolute;
              bottom:-6px;left:50%;transform:translateX(-50%);
              background:${p.color};
              color:white;
              font-size:9px;font-weight:700;
              padding:1px 5px;
              border-radius:8px;
              white-space:nowrap;
              border:1.5px solid white;
            ">${p.photos}</div>
          </div>`,
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          className: '',
        })
        const marker = L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .on('click', () => onPhotographerClick(p.id))
        const tooltip = L.tooltip({
          permanent: false,
          direction: 'top',
          offset: [0, -52],
          className: 'photographer-tooltip',
        }).setContent(`<strong>${p.name}</strong><br/>${p.photos} fotos`)
        marker.bindTooltip(tooltip)
        layersRef.current.push(marker)
      })

      // Fit map to route — no animation so tiles load at the final position only
      map.fitBounds(L.polyline(route.coords).getBounds(), { padding: [60, 60], animate: false })
    })
  }, [ready, activeRouteId, onPhotographerClick])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{`
        .leaflet-container {
          width: 100% !important;
          height: 100% !important;
          font-family: 'Inter', sans-serif;
        }
        .photographer-tooltip {
          background: white;
          border: none;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          padding: 4px 8px;
          font-size: 12px;
        }
        .photographer-tooltip::before { display: none; }
        .leaflet-control-attribution {
          font-size: 9px !important;
          background: rgba(255,255,255,0.6) !important;
        }
      `}</style>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {!ready && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#4F46E5] border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
