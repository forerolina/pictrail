'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'

// Brand palette — Technical Minimalism
const BRAND = {
  primary: '#00677d',
  primaryContainer: '#00b4d8',
  secondary: '#4c616c',
  onSurface: '#191c1d',
}

// Waypoints for each route — placed on actual Porto Alegre roads.
// OSRM will snap these to the road network and return full geometry.
const ROUTES = {
  orla: {
    name: 'Orla do Guaíba',
    color: BRAND.primary,              // teal
    waypoints: [
      [-30.0215, -51.2244], // Ponte do Gasômetro (north)
      [-30.0290, -51.2295],
      [-30.0355, -51.2340],
      [-30.0420, -51.2368],
      [-30.0540, -51.2393], // Cristal (south)
    ] as [number, number][],
    photographers: [
      { id: 'p1', lat: -30.0420, lng: -51.2368, name: 'Carlos M.', photos: 47, color: BRAND.primary },
      { id: 'p2', lat: -30.0355, lng: -51.2340, name: 'Ana Lima',  photos: 23, color: BRAND.primaryContainer },
      { id: 'p3', lat: -30.0280, lng: -51.2290, name: 'Bruno C.',  photos: 15, color: BRAND.secondary },
    ],
  },
  farroupilha: {
    name: 'Parque Farroupilha',
    color: BRAND.primaryContainer,     // cyan
    waypoints: [
      [-30.0295, -51.2175], // NE corner (Av. Osvaldo Aranha)
      [-30.0320, -51.2130],
      [-30.0345, -51.2100],
      [-30.0370, -51.2118],
      [-30.0360, -51.2165],
      [-30.0330, -51.2185],
    ] as [number, number][],
    photographers: [
      { id: 'p4', lat: -30.0330, lng: -51.2148, name: 'Marcos R.', photos: 38, color: BRAND.primary },
      { id: 'p5', lat: -30.0355, lng: -51.2112, name: 'Julia F.',  photos: 19, color: BRAND.secondary },
    ],
  },
  bento: {
    name: 'Bento Gonçalves Norte',
    color: BRAND.secondary,            // blue-grey
    waypoints: [
      [-30.0385, -51.2115], // start near city centre
      [-30.0330, -51.2045],
      [-30.0270, -51.1980],
      [-30.0210, -51.1910],
      [-30.0155, -51.1845], // near UFRGS
    ] as [number, number][],
    photographers: [
      { id: 'p6', lat: -30.0270, lng: -51.1980, name: 'Pedro L.', photos: 31, color: BRAND.primary },
    ],
  },
}

// Module-level cache so we only fetch each route once per session
const geomCache = new Map<string, [number, number][]>()

async function fetchRoadGeometry(
  routeId: string,
  waypoints: [number, number][]
): Promise<[number, number][]> {
  if (geomCache.has(routeId)) return geomCache.get(routeId)!

  // Build OSRM coordinate string: lng,lat;lng,lat;...
  const coords = waypoints.map(([lat, lng]) => `${lng},${lat}`).join(';')
  const url =
    `https://router.project-osrm.org/route/v1/driving/${coords}` +
    `?geometries=geojson&overview=full`

  try {
    const res = await fetch(url)
    const data = await res.json()
    if (data.code === 'Ok' && data.routes?.[0]?.geometry?.coordinates?.length) {
      // OSRM returns [lng, lat]; Leaflet needs [lat, lng]
      const geom: [number, number][] = data.routes[0].geometry.coordinates.map(
        ([lng, lat]: [number, number]) => [lat, lng]
      )
      geomCache.set(routeId, geom)
      return geom
    }
  } catch {
    // Network error — fall back to straight waypoints
  }

  geomCache.set(routeId, waypoints)
  return waypoints
}

interface Props {
  activeRouteId: string
  /** Called with photographer id + marker pixel coords relative to the map container */
  onPhotographerClick: (id: string, x: number, y: number) => void
}

export default function ExploreMap({ activeRouteId, onPhotographerClick }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const layersRef = useRef<any[]>([])
  const [ready, setReady] = useState(false)

  // ── Initialize Leaflet map ──────────────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current) return
    const container = mapRef.current

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const initMap = (L: any) => {
      if (mapInstanceRef.current) return

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(container, { zoomControl: false, attributionControl: false })

      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
        { subdomains: 'abcd', maxZoom: 19 }
      ).addTo(map)

      L.control.attribution({ position: 'bottomleft', prefix: false }).addTo(map)

      mapInstanceRef.current = map
      setReady(true)
    }

    // Gate init until the container has non-zero dimensions
    const ro = new ResizeObserver(() => {
      if (container.clientHeight > 0 && !mapInstanceRef.current) {
        ro.disconnect()
        import('leaflet').then(initMap)
      }
    })
    ro.observe(container)

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

  // ── Draw route + markers whenever activeRouteId changes ───────────────────
  useEffect(() => {
    if (!ready || !mapInstanceRef.current) return

    const route = ROUTES[activeRouteId as keyof typeof ROUTES]
    if (!route) return

    import('leaflet').then(async (L) => {
      const map = mapInstanceRef.current

      // Remove previous layers
      layersRef.current.forEach((l) => map.removeLayer(l))
      layersRef.current = []

      // ── Fetch road-following geometry ──────────────────────────────────────
      const [activeGeom, ...dimmedGeoms] = await Promise.all([
        fetchRoadGeometry(activeRouteId, route.waypoints),
        ...Object.entries(ROUTES)
          .filter(([id]) => id !== activeRouteId)
          .map(([id, r]) => fetchRoadGeometry(id, r.waypoints)),
      ])

      // Draw inactive routes dimmed — outline-variant tonal
      dimmedGeoms.forEach((geom) => {
        const line = L.polyline(geom, { color: '#bcc9ce', weight: 4, opacity: 0.5 }).addTo(map)
        layersRef.current.push(line)
      })

      // Draw active route — Waze-style shadow + brand colour
      const shadow = L.polyline(activeGeom, {
        color: 'rgba(25,28,29,0.12)',
        weight: 12,
        opacity: 1,
      }).addTo(map)

      const mainLine = L.polyline(activeGeom, {
        color: route.color,
        weight: 8,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
      }).addTo(map)

      layersRef.current.push(shadow, mainLine)

      // ── User location arrow — primary teal ──────────────────────────────────
      const userPos = activeGeom[Math.floor(activeGeom.length / 2)]
      const userIcon = L.divIcon({
        html: `<div style="
          width:36px;height:36px;
          background:${BRAND.primary};
          border:3px solid white;
          border-radius:50% 50% 50% 0;
          transform:rotate(-45deg);
          box-shadow:0 4px 16px rgba(0,103,125,0.35);
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
      layersRef.current.push(L.marker(userPos, { icon: userIcon }).addTo(map))

      // ── Photographer markers — brand palette ────────────────────────────────
      route.photographers.forEach((p) => {
        const icon = L.divIcon({
          html: `<div style="position:relative;width:40px;height:40px;">
            <div style="
              width:40px;height:40px;
              background:${p.color};
              border:2.5px solid white;
              border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 4px 16px rgba(0,103,125,0.30);
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
            ">${p.photos}</div>
          </div>`,
          iconSize: [40, 50],
          iconAnchor: [20, 50],
          className: '',
        })
        const marker = L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .on('click', (e: any) => {
            const pt = map.latLngToContainerPoint(e.latlng)
            onPhotographerClick(p.id, pt.x, pt.y)
          })
        marker.bindTooltip(
          L.tooltip({ permanent: false, direction: 'top', offset: [0, -52], className: 'photographer-tooltip' })
            .setContent(`<strong>${p.name}</strong><br/>${p.photos} fotos`)
        )
        layersRef.current.push(marker)
      })

      // Fit to active route
      map.fitBounds(L.polyline(activeGeom).getBounds(), { padding: [60, 60], animate: false })
    })
  }, [ready, activeRouteId, onPhotographerClick])

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <style>{`
        .leaflet-container { width:100%!important; height:100%!important; font-family:'Inter',sans-serif; }
        .photographer-tooltip {
          background: rgba(248,249,250,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: none !important;
          border-radius: 10px;
          box-shadow: 0 4px 24px rgba(25,28,29,0.08);
          padding: 4px 8px;
          font-size: 12px;
          color: #191c1d;
        }
        .photographer-tooltip::before { display:none; }
        .leaflet-control-attribution { font-size:9px!important; background:rgba(248,249,250,0.7)!important; backdrop-filter:blur(8px)!important; }
      `}</style>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      {!ready && (
        <div className="absolute inset-0 bg-muted flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  )
}
