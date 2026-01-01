"use client"

import React from "react"
import { useEffect, useState, useMemo, useCallback } from "react"

const isBrowser = typeof window !== "undefined"
const getWindowWidth = () => (isBrowser ? window.innerWidth : 1024)
const getWindowHeight = () => (isBrowser ? window.innerHeight : 768)

type Season = "spring" | "summer" | "autumn" | "winter"

interface SeasonalTheme {
  name: string
  colors: {
    primary: string
    secondary: string
    tertiary: string
    accent: string
  }
  effects: {
    particleCount: number
    glowIntensity: number
    animationSpeed: number
    waveAmplitude: number
  }
  particles: {
    type: string
    colors: string[]
    sizes: number[]
    speeds: number[]
  }
}

const seasonalThemes: Record<Season, SeasonalTheme> = {
  spring: {
    name: "Spring Bloom",
    colors: {
      primary: "rgba(34, 197, 94, 0.6)",
      secondary: "rgba(59, 130, 246, 0.5)",
      tertiary: "rgba(236, 72, 153, 0.4)",
      accent: "rgba(250, 204, 21, 0.5)",
    },
    effects: {
      particleCount: 15,
      glowIntensity: 2,
      animationSpeed: 1.0,
      waveAmplitude: 15,
    },
    particles: {
      type: "petals",
      colors: ["rgba(236, 72, 153, 0.8)", "rgba(250, 204, 21, 0.7)", "rgba(34, 197, 94, 0.6)"],
      sizes: [3, 4],
      speeds: [0.8, 1.0],
    },
  },
  summer: {
    name: "Summer Radiance",
    colors: {
      primary: "rgba(59, 130, 246, 0.7)",
      secondary: "rgba(34, 197, 94, 0.6)",
      tertiary: "rgba(251, 146, 60, 0.5)",
      accent: "rgba(250, 204, 21, 0.6)",
    },
    effects: {
      particleCount: 20,
      glowIntensity: 2,
      animationSpeed: 1.2,
      waveAmplitude: 18,
    },
    particles: {
      type: "fireflies",
      colors: ["rgba(250, 204, 21, 0.9)", "rgba(251, 146, 60, 0.8)"],
      sizes: [2, 3],
      speeds: [1.0, 1.2],
    },
  },
  autumn: {
    name: "Autumn Harvest",
    colors: {
      primary: "rgba(251, 146, 60, 0.6)",
      secondary: "rgba(239, 68, 68, 0.5)",
      tertiary: "rgba(217, 119, 6, 0.5)",
      accent: "rgba(245, 158, 11, 0.6)",
    },
    effects: {
      particleCount: 18,
      glowIntensity: 2,
      animationSpeed: 0.8,
      waveAmplitude: 12,
    },
    particles: {
      type: "leaves",
      colors: ["rgba(251, 146, 60, 0.8)", "rgba(239, 68, 68, 0.7)"],
      sizes: [4, 5],
      speeds: [0.6, 0.8],
    },
  },
  winter: {
    name: "Winter Frost",
    colors: {
      primary: "rgba(59, 130, 246, 0.5)",
      secondary: "rgba(148, 163, 184, 0.6)",
      tertiary: "rgba(139, 92, 246, 0.4)",
      accent: "rgba(219, 234, 254, 0.7)",
    },
    effects: {
      particleCount: 25,
      glowIntensity: 1,
      animationSpeed: 0.6,
      waveAmplitude: 8,
    },
    particles: {
      type: "snowflakes",
      colors: ["rgba(219, 234, 254, 0.9)", "rgba(148, 163, 184, 0.8)"],
      sizes: [2, 3],
      speeds: [0.4, 0.6],
    },
  },
}

interface WebLayer {
  id: string
  scrollSpeed: number
  mouseSpeed: number
  webSize: number
  ringCount: number
  opacity: number
  strokeWidth: number
  nodeSize: number
}

const webLayers: WebLayer[] = [
  {
    id: "background",
    scrollSpeed: 0.2,
    mouseSpeed: 0.3,
    webSize: 100,
    ringCount: 4,
    opacity: 0.15,
    strokeWidth: 1,
    nodeSize: 1.5,
  },
  {
    id: "middle",
    scrollSpeed: 0.6,
    mouseSpeed: 0.7,
    webSize: 80,
    ringCount: 3,
    opacity: 0.25,
    strokeWidth: 1.5,
    nodeSize: 2,
  },
  {
    id: "foreground",
    scrollSpeed: 1.0,
    mouseSpeed: 1.0,
    webSize: 60,
    ringCount: 3,
    opacity: 0.4,
    strokeWidth: 2,
    nodeSize: 2.5,
  },
]

const SeasonalParticles = React.memo(({ theme, scrollY }: { theme: SeasonalTheme; scrollY: number }) => {
  const particles = useMemo(() => {
    if (!theme || !theme.effects || !theme.particles) return []

    try {
      return Array.from({ length: theme.effects.particleCount || 10 }, (_, i) => ({
        id: `particle-${i}`,
        x: Math.random() * getWindowWidth(),
        y: Math.random() * getWindowHeight(),
        size:
          theme.particles.sizes && theme.particles.sizes.length > 0
            ? theme.particles.sizes[Math.floor(Math.random() * theme.particles.sizes.length)]
            : 3,
        color:
          theme.particles.colors && theme.particles.colors.length > 0
            ? theme.particles.colors[Math.floor(Math.random() * theme.particles.colors.length)]
            : "rgba(59, 130, 246, 0.6)",
        speed:
          theme.particles.speeds && theme.particles.speeds.length > 0
            ? theme.particles.speeds[Math.floor(Math.random() * theme.particles.speeds.length)]
            : 1.0,
        angle: Math.random() * Math.PI * 2,
        rotation: Math.random() * 360,
      }))
    } catch (error) {
      console.error("Error creating particles:", error)
      return []
    }
  }, [theme])

  const getParticleShape = useCallback(
    (particle: any, index: number) => {
      if (!particle || !theme || !theme.particles) return null

      try {
        const time = (scrollY || 0) * 0.005 + index * 0.1
        const x = particle.x + Math.sin(time * (particle.speed || 1)) * 20
        const y = particle.y + (((scrollY || 0) * (particle.speed || 1) * 0.05) % getWindowHeight())

        switch (theme.particles.type) {
          case "petals":
            return (
              <ellipse
                key={particle.id}
                cx={x}
                cy={y}
                rx={particle.size}
                ry={particle.size * 1.5}
                fill={particle.color}
                opacity={0.6}
                transform={`rotate(${particle.rotation + time * 10} ${x} ${y})`}
              />
            )

          case "fireflies":
            return (
              <g key={particle.id}>
                <circle cx={x} cy={y} r={particle.size} fill={particle.color} opacity={0.7} />
              </g>
            )

          case "leaves":
            return (
              <path
                key={particle.id}
                d={`M ${x} ${y} Q ${x + particle.size} ${y - particle.size} ${x + particle.size * 2} ${y} Q ${x + particle.size} ${y + particle.size} ${x} ${y}`}
                fill={particle.color}
                opacity={0.5}
                transform={`rotate(${particle.rotation + time * 5} ${x} ${y})`}
              />
            )

          case "snowflakes":
            return (
              <g key={particle.id} transform={`translate(${x}, ${y}) rotate(${particle.rotation + time * 8})`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <line
                    key={i}
                    x1="0"
                    y1="0"
                    x2={particle.size * 1.5}
                    y2="0"
                    stroke={particle.color}
                    strokeWidth="1"
                    opacity={0.6}
                    transform={`rotate(${i * 90})`}
                  />
                ))}
              </g>
            )

          default:
            return <circle key={particle.id} cx={x} cy={y} r={particle.size} fill={particle.color} opacity={0.6} />
        }
      } catch (error) {
        console.error("Error rendering particle:", error)
        return null
      }
    },
    [theme, scrollY],
  )

  if (!particles || particles.length === 0) return null

  return <g>{particles.map((particle, index) => getParticleShape(particle, index)).filter(Boolean)}</g>
})

const SpiderWebLayer = React.memo(
  ({
    layer,
    mousePosition,
    scrollY,
    isHovered,
    theme,
  }: {
    layer: WebLayer
    mousePosition: { x: number; y: number }
    scrollY: number
    isHovered: boolean
    theme: SeasonalTheme
  }) => {
    const webData = useMemo(() => {
      if (!layer || !theme) return { nodes: [], connections: [] }

      try {
        const nodes = []
        const connections = []
        const centerX = getWindowWidth() / 2
        const centerY = getWindowHeight() / 2

        for (let ring = 1; ring <= (layer.ringCount || 3); ring++) {
          const radius = ring * (layer.webSize || 60)
          const nodeCount = ring * 4 + 2

          for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2
            const x = centerX + Math.cos(angle) * radius
            const y = centerY + Math.sin(angle) * radius

            nodes.push({
              x,
              y,
              id: `${layer.id}-${ring}-${i}`,
              ring,
              originalX: x,
              originalY: y,
            })

            if (ring === 1) {
              connections.push({
                x1: centerX,
                y1: centerY,
                x2: x,
                y2: y,
                id: `${layer.id}-radial-${ring}-${i}`,
                originalX1: centerX,
                originalY1: centerY,
                originalX2: x,
                originalY2: y,
              })
            } else {
              const prevRadius = (ring - 1) * (layer.webSize || 60)
              const prevAngle = (Math.floor((i * (ring - 1) * 4) / nodeCount) / ((ring - 1) * 4)) * Math.PI * 2
              const prevX = centerX + Math.cos(prevAngle) * prevRadius
              const prevY = centerY + Math.sin(prevAngle) * prevRadius

              connections.push({
                x1: prevX,
                y1: prevY,
                x2: x,
                y2: y,
                id: `${layer.id}-radial-${ring}-${i}`,
                originalX1: prevX,
                originalY1: prevY,
                originalX2: x,
                originalY2: y,
              })
            }

            if (i % 2 === 0) {
              const nextAngle = (((i + 1) % nodeCount) / nodeCount) * Math.PI * 2
              const nextX = centerX + Math.cos(nextAngle) * radius
              const nextY = centerY + Math.sin(nextAngle) * radius

              connections.push({
                x1: x,
                y1: y,
                x2: nextX,
                y2: nextY,
                id: `${layer.id}-circular-${ring}-${i}`,
                originalX1: x,
                originalY1: y,
                originalX2: nextX,
                originalY2: nextY,
              })
            }
          }
        }

        return { nodes, connections }
      } catch (error) {
        console.error("Error creating web data:", error)
        return { nodes: [], connections: [] }
      }
    }, [layer, theme])

    const calculateDistortion = useCallback(
      (originalX: number, originalY: number) => {
        if (!layer || !theme || !theme.effects) return { x: originalX, y: originalY }

        try {
          let x = originalX
          let y = originalY

          const scrollWave =
            Math.sin((scrollY || 0) * 0.005 * (layer.scrollSpeed || 1) + originalX * 0.003) *
            ((theme.effects.waveAmplitude || 10) * 0.5)
          const scrollWave2 =
            Math.cos((scrollY || 0) * 0.004 * (layer.scrollSpeed || 1) + originalY * 0.002) *
            ((theme.effects.waveAmplitude || 10) * 0.3)

          y += scrollWave
          x += scrollWave2

          if (isHovered && mousePosition) {
            const distance = Math.sqrt(
              Math.pow(x - (mousePosition.x || 0), 2) + Math.pow(y - (mousePosition.y || 0), 2),
            )
            const maxDistance = 150

            if (distance < maxDistance) {
              const force = (1 - distance / maxDistance) * 15
              const angle = Math.atan2(y - (mousePosition.y || 0), x - (mousePosition.x || 0))

              x += Math.cos(angle) * force
              y += Math.sin(angle) * force
            }
          }

          return { x, y }
        } catch (error) {
          console.error("Error calculating distortion:", error)
          return { x: originalX, y: originalY }
        }
      },
      [scrollY, layer, theme, isHovered, mousePosition],
    )

    const getLayerColor = useCallback(
      (layerIndex: number) => {
        if (!theme || !theme.colors) return "rgba(59, 130, 246, 0.5)"

        try {
          const colors = [
            theme.colors.primary || "rgba(59, 130, 246, 0.5)",
            theme.colors.secondary || "rgba(34, 197, 94, 0.5)",
            theme.colors.tertiary || "rgba(236, 72, 153, 0.4)",
            theme.colors.accent || "rgba(250, 204, 21, 0.5)",
          ]
          return colors[layerIndex % colors.length]
        } catch (error) {
          console.error("Error getting layer color:", error)
          return "rgba(59, 130, 246, 0.5)"
        }
      },
      [theme],
    )

    if (!webData || !webData.connections || !webData.nodes) return null

    const layerIndex = webLayers.findIndex((l) => l.id === layer.id)

    return (
      <g opacity={layer.opacity || 0.3}>
        {webData.connections
          .map((connection) => {
            if (!connection) return null

            try {
              const distortedStart = calculateDistortion(connection.originalX1, connection.originalY1)
              const distortedEnd = calculateDistortion(connection.originalX2, connection.originalY2)

              return (
                <line
                  key={connection.id}
                  x1={distortedStart.x}
                  y1={distortedStart.y}
                  x2={distortedEnd.x}
                  y2={distortedEnd.y}
                  stroke={getLayerColor(layerIndex)}
                  strokeWidth={layer.strokeWidth || 1}
                  opacity={0.6}
                />
              )
            } catch (error) {
              console.error("Error rendering connection:", error)
              return null
            }
          })
          .filter(Boolean)}

        {webData.nodes
          .map((node) => {
            if (!node) return null

            try {
              const distorted = calculateDistortion(node.originalX, node.originalY)

              return (
                <circle
                  key={node.id}
                  cx={distorted.x}
                  cy={distorted.y}
                  r={layer.nodeSize || 2}
                  fill={getLayerColor(layerIndex)}
                  opacity={0.7}
                />
              )
            } catch (error) {
              console.error("Error rendering node:", error)
              return null
            }
          })
          .filter(Boolean)}
      </g>
    )
  },
)

function SpiderWebBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [currentSeason, setCurrentSeason] = useState<Season>("spring")
  const [isMounted, setIsMounted] = useState(false)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (e && typeof e.clientX === "number" && typeof e.clientY === "number") {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
  }, [])

  const handleScroll = useCallback(() => {
    if (isBrowser && typeof window.scrollY === "number") {
      setScrollY(window.scrollY)
    }
  }, [])

  useEffect(() => {
    setIsMounted(true)

    const getCurrentSeason = (): Season => {
      try {
        const month = new Date().getMonth() + 1
        if (month >= 3 && month <= 5) return "spring"
        if (month >= 6 && month <= 8) return "summer"
        if (month >= 9 && month <= 11) return "autumn"
        return "winter"
      } catch (error) {
        console.error("Error getting current season:", error)
        return "spring"
      }
    }

    setCurrentSeason(getCurrentSeason())
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const seasons: Season[] = ["spring", "summer", "autumn", "winter"]
    let currentIndex = seasons.indexOf(currentSeason)

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % seasons.length
      setCurrentSeason(seasons[currentIndex])
    }, 15000)

    return () => clearInterval(interval)
  }, [currentSeason, isMounted])

  useEffect(() => {
    if (!isBrowser || !isMounted) return

    let mouseTimeout: NodeJS.Timeout | null = null
    let scrollTimeout: NodeJS.Timeout | null = null

    const throttledMouseMove = (e: MouseEvent) => {
      if (mouseTimeout) return
      mouseTimeout = setTimeout(() => {
        handleMouseMove(e)
        mouseTimeout = null
      }, 16)
    }

    const throttledScroll = () => {
      if (scrollTimeout) return
      scrollTimeout = setTimeout(() => {
        handleScroll()
        scrollTimeout = null
      }, 16)
    }

    window.addEventListener("mousemove", throttledMouseMove)
    window.addEventListener("scroll", throttledScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", throttledMouseMove)
      window.removeEventListener("scroll", throttledScroll)
      if (mouseTimeout) clearTimeout(mouseTimeout)
      if (scrollTimeout) clearTimeout(scrollTimeout)
    }
  }, [handleMouseMove, handleScroll, isMounted])

  if (!isMounted) return null

  const theme = seasonalThemes[currentSeason] || seasonalThemes.spring

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <SeasonalParticles theme={theme} scrollY={scrollY} />

        {webLayers.map((layer) => (
          <SpiderWebLayer
            key={layer.id}
            layer={layer}
            mousePosition={mousePosition}
            scrollY={scrollY}
            isHovered={isHovered}
            theme={theme}
          />
        ))}

        {isBrowser && (
          <circle
            cx={getWindowWidth() / 2 + Math.sin((scrollY || 0) * 0.002) * 10}
            cy={getWindowHeight() / 2 + Math.cos((scrollY || 0) * 0.003) * 8}
            r="3"
            fill={theme.colors?.primary || "rgba(59, 130, 246, 0.8)"}
            opacity={0.8}
          />
        )}

        {isHovered && isBrowser && mousePosition && (
          <circle
            cx={mousePosition.x}
            cy={mousePosition.y}
            r="40"
            fill="none"
            stroke={theme.colors?.primary || "rgba(59, 130, 246, 0.5)"}
            strokeWidth="2"
            opacity={0.6}
          />
        )}
      </svg>
    </div>
  )
}

export default function ProgrammingBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <SpiderWebBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/15" />
    </div>
  )
}
