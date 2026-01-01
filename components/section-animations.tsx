"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface SectionAnimationsProps {
  children: React.ReactNode
  sectionId: string
}

export default function SectionAnimations({ children, sectionId }: SectionAnimationsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return
    
    let animationFrame: number

    const handleScroll = () => {
      const element = document.getElementById(sectionId)
      if (element) {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // More responsive visibility detection
        const visible = rect.top < windowHeight * 0.8 && rect.bottom > windowHeight * 0.2
        setIsVisible(visible)

        // Only calculate progress if visible to save performance
        if (visible) {
          const progress = Math.max(
            0,
            Math.min(1, (windowHeight * 0.8 - rect.top) / (windowHeight * 0.6 + rect.height * 0.3)),
          )
          setScrollProgress(progress)
        }
      }
    }

    const throttledScroll = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      animationFrame = requestAnimationFrame(handleScroll)
    }

    handleScroll() // Initial call
    window.addEventListener("scroll", throttledScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", throttledScroll)
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [sectionId])

  // Section-specific animation styles
  const getSectionAnimations = () => {
    const baseStyle = {
      transition: "all 0.6s ease-out",
      transform: isVisible ? "translateY(0)" : "translateY(50px)",
      opacity: isVisible ? 1 : 0,
    }

    const sectionStyles = {
      about: {
        ...baseStyle,
        filter: `hue-rotate(${scrollProgress * 60}deg)`,
      },
      skills: {
        ...baseStyle,
        transform: isVisible ? `translateY(0) scale(${1 + scrollProgress * 0.02})` : "translateY(50px) scale(0.98)",
      },
      projects: {
        ...baseStyle,
        transform: isVisible ? `translateY(0) rotateX(${scrollProgress * 2}deg)` : "translateY(50px) rotateX(5deg)",
      },
      experience: {
        ...baseStyle,
        background: `linear-gradient(${scrollProgress * 180}deg, transparent, rgba(59, 130, 246, 0.05))`,
      },
      contact: {
        ...baseStyle,
        boxShadow: isVisible ? `0 0 ${20 + scrollProgress * 30}px rgba(139, 92, 246, 0.3)` : "none",
      },
    }

    return sectionStyles[sectionId as keyof typeof sectionStyles] || baseStyle
  }

  return (
    <div style={getSectionAnimations()}>
      {children}

      {/* Section-specific floating elements */}
      {isVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {sectionId === "skills" && (
            <div
              className="absolute top-10 right-10 w-20 h-20 border border-blue-400/30 rounded-full animate-spin"
              style={{ animationDuration: "20s" }}
            />
          )}

          {sectionId === "projects" && (
            <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg animate-pulse" />
          )}

          {sectionId === "experience" && (
            <div className="absolute top-1/2 right-5 w-1 h-32 bg-gradient-to-b from-transparent via-green-400/50 to-transparent" />
          )}

          {sectionId === "contact" && (
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-pink-400/60 rounded-full animate-bounce"
                  style={{
                    left: `${i * 10}px`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
