"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Optimized section detection with better thresholds
      const sections = navItems.map((item) => ({
        id: item.href.substring(1),
        element: document.getElementById(item.href.substring(1)),
      }))

      // Find the section that's most visible in the viewport
      let currentSection = "home"
      let maxVisibility = 0

      sections.forEach(({ id, element }) => {
        if (element) {
          const rect = element.getBoundingClientRect()
          const viewportHeight = window.innerHeight

          // Calculate how much of the section is visible
          const visibleTop = Math.max(0, -rect.top)
          const visibleBottom = Math.min(rect.height, viewportHeight - rect.top)
          const visibleHeight = Math.max(0, visibleBottom - visibleTop)
          const visibilityRatio = visibleHeight / viewportHeight

          // Use a more aggressive threshold for better responsiveness
          if (rect.top <= viewportHeight * 0.3 && rect.bottom >= viewportHeight * 0.1) {
            if (visibilityRatio > maxVisibility) {
              maxVisibility = visibilityRatio
              currentSection = id
            }
          }
        }
      })

      setActiveSection(currentSection)
    }

    // Use requestAnimationFrame for smoother updates
    let ticking = false
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", optimizedScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", optimizedScroll)
  }, [])

  const scrollToSection = (href: string) => {
    if (typeof document === "undefined") return
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/30 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div className="flex-shrink-0" whileHover={{ scale: 1.05 }}>
            <span className="text-white font-light text-2xl tracking-wider">
              S<span className="text-blue-400">D</span>
            </span>
          </motion.div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 text-sm font-light tracking-wide transition-colors duration-300 ${
                    activeSection === item.href.substring(1) ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500"
                      layoutId="activeTab"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2 transition-colors duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <motion.div
          className="md:hidden bg-black/40 backdrop-blur-xl border-t border-white/10"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pt-4 pb-6 space-y-2">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-light tracking-wide transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "bg-white/10 text-white"
                    : "text-gray-300 hover:bg-white/5 hover:text-white"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
