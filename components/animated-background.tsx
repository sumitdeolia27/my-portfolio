"use client"

import { useEffect, useState, useCallback, useRef } from "react"

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 1024, height: 768 })
  const [currentSection, setCurrentSection] = useState("home")

  // Add this ref at the top of the component
  const lastSectionUpdate = useRef(0)
  const lastMouseUpdate = useRef(0)

  // Safe window size detection
  useEffect(() => {
    if (typeof window === "undefined") return
    
    const updateWindowSize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateWindowSize()
    window.addEventListener("resize", updateWindowSize)
    return () => window.removeEventListener("resize", updateWindowSize)
  }, [])

  // Mouse tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle mouse updates to 60fps
    const now = Date.now()
    if (now - lastMouseUpdate.current > 16) {
      setMousePosition({ x: e.clientX, y: e.clientY })
      lastMouseUpdate.current = now
    }
  }, [])

  // Scroll tracking and section detection
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return
    
    const scrollPosition = window.scrollY
    setScrollY(scrollPosition)

    // Throttled section detection - only update every 100ms
    const now = Date.now()
    if (now - lastSectionUpdate.current > 100) {
      const sections = ["home", "about", "education", "skills", "experience", "projects", "contact"]
      const viewportHeight = window.innerHeight

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          // More precise section detection
          if (rect.top <= viewportHeight * 0.4 && rect.bottom >= viewportHeight * 0.2) {
            setCurrentSection(sectionId)
            lastSectionUpdate.current = now
            break
          }
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleMouseMove, handleScroll])

  // Section-specific colors and effects
  const getSectionTheme = (section: string) => {
    const themes = {
      home: {
        primary: "rgba(59, 130, 246, 0.6)",
        secondary: "rgba(139, 92, 246, 0.4)",
        accent: "rgba(16, 185, 129, 0.3)",
        particleCount: 25,
      },
      about: {
        primary: "rgba(16, 185, 129, 0.6)",
        secondary: "rgba(59, 130, 246, 0.4)",
        accent: "rgba(236, 72, 153, 0.3)",
        particleCount: 20,
      },
      education: {
        primary: "rgba(236, 72, 153, 0.6)",
        secondary: "rgba(251, 146, 60, 0.4)",
        accent: "rgba(139, 92, 246, 0.3)",
        particleCount: 18,
      },
      skills: {
        primary: "rgba(251, 146, 60, 0.6)",
        secondary: "rgba(239, 68, 68, 0.4)",
        accent: "rgba(59, 130, 246, 0.3)",
        particleCount: 30,
      },
      experience: {
        primary: "rgba(239, 68, 68, 0.6)",
        secondary: "rgba(245, 158, 11, 0.4)",
        accent: "rgba(16, 185, 129, 0.3)",
        particleCount: 22,
      },
      projects: {
        primary: "rgba(16, 185, 129, 0.6)",
        secondary: "rgba(59, 130, 246, 0.4)",
        accent: "rgba(139, 92, 246, 0.3)",
        particleCount: 35,
      },
      contact: {
        primary: "rgba(139, 92, 246, 0.6)",
        secondary: "rgba(236, 72, 153, 0.4)",
        accent: "rgba(251, 146, 60, 0.3)",
        particleCount: 20,
      },
    }
    return themes[section as keyof typeof themes] || themes.home
  }

  const theme = getSectionTheme(currentSection)

  // Generate multi-layered web structure
  const generateWebLayers = () => {
    const layers = []

    // Background layer
    layers.push(generateWebForLayer(0.3, 120, 3, 0.2))
    // Middle layer
    layers.push(generateWebForLayer(0.5, 90, 4, 0.4))
    // Foreground layer
    layers.push(generateWebForLayer(0.8, 60, 5, 0.6))

    return layers
  }

  const generateWebForLayer = (speed: number, size: number, rings: number, opacity: number) => {
    const lines = []
    const centerX = windowSize.width / 2
    const centerY = windowSize.height / 2

    for (let ring = 1; ring <= rings; ring++) {
      const radius = ring * size
      const segments = ring * 6

      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const x = centerX + Math.cos(angle) * radius
        const y = centerY + Math.sin(angle) * radius

        // Add scroll-based wave distortion
        const waveOffset = Math.sin(scrollY * 0.002 * speed + angle * 2) * 15
        const adjustedY = y + waveOffset

        if (ring === 1) {
          lines.push({
            x1: centerX,
            y1: centerY,
            x2: x,
            y2: adjustedY,
            id: `layer-${speed}-radial-${ring}-${i}`,
            opacity,
          })
        } else {
          const prevRadius = (ring - 1) * size
          const prevX = centerX + Math.cos(angle) * prevRadius
          const prevY = centerY + Math.sin(angle) * prevRadius + Math.sin(scrollY * 0.002 * speed + angle * 2) * 10

          lines.push({
            x1: prevX,
            y1: prevY,
            x2: x,
            y2: adjustedY,
            id: `layer-${speed}-radial-${ring}-${i}`,
            opacity,
          })
        }

        // Circular connections
        if (i % 2 === 0) {
          const nextAngle = (((i + 1) % segments) / segments) * Math.PI * 2
          const nextX = centerX + Math.cos(nextAngle) * radius
          const nextY = centerY + Math.sin(nextAngle) * radius + Math.sin(scrollY * 0.002 * speed + nextAngle * 2) * 15

          lines.push({
            x1: x,
            y1: adjustedY,
            x2: nextX,
            y2: nextY,
            id: `layer-${speed}-circular-${ring}-${i}`,
            opacity,
          })
        }
      }
    }

    return lines
  }

  // Calculate line distortion with mouse interaction
  const getDistortedLine = (line: any) => {
    let { x1, y1, x2, y2 } = line

    // Mouse interaction
    if (isHovered) {
      const dist1 = Math.sqrt(Math.pow(x1 - mousePosition.x, 2) + Math.pow(y1 - mousePosition.y, 2))
      const dist2 = Math.sqrt(Math.pow(x2 - mousePosition.x, 2) + Math.pow(y2 - mousePosition.y, 2))

      if (dist1 < 200) {
        const force = (1 - dist1 / 200) * 25
        const angle = Math.atan2(y1 - mousePosition.y, x1 - mousePosition.x)
        x1 += Math.cos(angle) * force
        y1 += Math.sin(angle) * force
      }

      if (dist2 < 200) {
        const force = (1 - dist2 / 200) * 25
        const angle = Math.atan2(y2 - mousePosition.y, x2 - mousePosition.x)
        x2 += Math.cos(angle) * force
        y2 += Math.sin(angle) * force
      }
    }

    return { x1, y1, x2, y2 }
  }

  // Generate section-specific floating particles
  const generateSectionParticles = () => {
    const particles = []
    const particleCount = theme.particleCount

    for (let i = 0; i < particleCount; i++) {
      const baseX = Math.random() * windowSize.width
      const baseY = Math.random() * windowSize.height
      const size = 1 + Math.random() * 4
      const speed = 0.3 + Math.random() * 1.2

      // Different particle behaviors per section
      let x = baseX
      let y = baseY

      switch (currentSection) {
        case "skills":
          // Orbiting particles
          const orbitRadius = 50 + Math.random() * 100
          const orbitAngle = (scrollY * 0.001 + i * 0.5) % (Math.PI * 2)
          x = baseX + Math.cos(orbitAngle) * orbitRadius
          y = baseY + Math.sin(orbitAngle) * orbitRadius
          break

        case "projects":
          // Grid-like movement
          x = baseX + Math.sin(scrollY * 0.002 + i * 0.3) * 40
          y = baseY + Math.cos(scrollY * 0.001 + i * 0.2) * 30
          break

        case "experience":
          // Flowing upward
          x = baseX + Math.sin(scrollY * 0.001 + i) * 20
          y = (baseY - scrollY * speed * 0.1) % windowSize.height
          break

        default:
          // Default floating
          x = baseX + Math.sin(scrollY * 0.001 * speed + i) * 30
          y = baseY + ((scrollY * speed * 0.05) % windowSize.height)
      }

      particles.push({
        id: i,
        x,
        y,
        size,
        opacity: 0.4 + Math.random() * 0.4,
        color: i % 3 === 0 ? theme.primary : i % 3 === 1 ? theme.secondary : theme.accent,
      })
    }
    return particles
  }

  // Generate section-specific geometric shapes
  const generateSectionShapes = () => {
    const shapes = []
    const shapeCount = 8

    for (let i = 0; i < shapeCount; i++) {
      const x = (windowSize.width / shapeCount) * i + Math.sin(scrollY * 0.001 + i) * 50
      const y = windowSize.height * 0.3 + Math.cos(scrollY * 0.0008 + i) * 100
      const size = 20 + Math.sin(scrollY * 0.002 + i) * 10

      shapes.push({
        id: i,
        x,
        y,
        size,
        rotation: (scrollY * 0.1 + i * 45) % 360,
        opacity: 0.1 + Math.sin(scrollY * 0.001 + i) * 0.1,
      })
    }
    return shapes
  }

  const webLayers = generateWebLayers()
  const particles = generateSectionParticles()
  const shapes = generateSectionShapes()

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme.primary} />
            <stop offset="50%" stopColor={theme.secondary} />
            <stop offset="100%" stopColor={theme.accent} />
          </linearGradient>

          <radialGradient id="particleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={theme.primary} />
            <stop offset="100%" stopColor={theme.secondary} />
          </radialGradient>

          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="softGlow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Multi-layered web structure */}
        {webLayers.map((layer, layerIndex) =>
          layer.map((line) => {
            const distorted = getDistortedLine(line)
            return (
              <line
                key={line.id}
                x1={distorted.x1}
                y1={distorted.y1}
                x2={distorted.x2}
                y2={distorted.y2}
                stroke="url(#webGradient)"
                strokeWidth={layerIndex === 2 ? "2" : "1"}
                opacity={line.opacity}
                filter="url(#softGlow)"
              />
            )
          }),
        )}

        {/* Web intersection nodes */}
        {webLayers[2]?.map((line, index) => {
          if (index % 4 !== 0) return null
          const distorted = getDistortedLine(line)
          return (
            <circle
              key={`node-${line.id}`}
              cx={distorted.x2}
              cy={distorted.y2}
              r="3"
              fill={theme.primary}
              opacity="0.8"
              filter="url(#glow)"
            />
          )
        })}

        {/* Section-specific floating particles */}
        {particles.map((particle) => (
          <circle
            key={`particle-${particle.id}`}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={particle.color}
            opacity={particle.opacity}
            filter="url(#softGlow)"
          />
        ))}

        {/* Section-specific geometric shapes */}
        {shapes.map((shape) => (
          <g key={`shape-${shape.id}`} transform={`translate(${shape.x}, ${shape.y}) rotate(${shape.rotation})`}>
            {currentSection === "skills" && (
              <polygon
                points={`0,${-shape.size} ${shape.size * 0.866},${shape.size * 0.5} ${-shape.size * 0.866},${shape.size * 0.5}`}
                fill="none"
                stroke={theme.accent}
                strokeWidth="1"
                opacity={shape.opacity}
              />
            )}
            {currentSection === "projects" && (
              <rect
                x={-shape.size / 2}
                y={-shape.size / 2}
                width={shape.size}
                height={shape.size}
                fill="none"
                stroke={theme.secondary}
                strokeWidth="1"
                opacity={shape.opacity}
              />
            )}
            {currentSection === "experience" && (
              <circle r={shape.size / 2} fill="none" stroke={theme.primary} strokeWidth="1" opacity={shape.opacity} />
            )}
          </g>
        ))}

        {/* Mouse interaction ripples */}
        {isHovered && (
          <>
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r="80"
              fill="none"
              stroke={theme.primary}
              strokeWidth="2"
              opacity="0.6"
            />
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r="120"
              fill="none"
              stroke={theme.secondary}
              strokeWidth="1"
              opacity="0.3"
            />
          </>
        )}

        {/* Animated center core */}
        <g transform={`translate(${windowSize.width / 2}, ${windowSize.height / 2})`}>
          <circle r={8 + Math.sin(scrollY * 0.003) * 3} fill={theme.primary} opacity="0.9" filter="url(#glow)" />
          <circle
            r={15 + Math.cos(scrollY * 0.002) * 5}
            fill="none"
            stroke={theme.secondary}
            strokeWidth="1"
            opacity="0.5"
          />
        </g>

        {/* Section transition effects */}
        <defs>
          <linearGradient id="sectionTransition" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={theme.primary} stopOpacity="0" />
            <stop offset="50%" stopColor={theme.secondary} stopOpacity="0.1" />
            <stop offset="100%" stopColor={theme.accent} stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="100%" height="100%" fill="url(#sectionTransition)" opacity="0.3" />
      </svg>

      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/5 to-black/15 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${theme.primary}15 0%, transparent 50%)`,
        }}
      />
    </div>
  )
}
