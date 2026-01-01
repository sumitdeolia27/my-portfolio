"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import SectionAnimations from "@/components/section-animations"

interface AboutProps {
  data: {
    description: string
    highlights: string[]
  }
}

export default function About({ data }: AboutProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // Responsive dimensions
  const getImageSize = () => {
    if (isMobile) return "w-32 h-32" // 128px
    if (isTablet) return "w-40 h-40" // 160px
    return "w-48 h-48" // 192px
  }

  const getContainerHeight = () => {
    if (isMobile) return "min-h-[400px]"
    if (isTablet) return "min-h-[450px]"
    return "min-h-[500px]"
  }

  const getRingSize = () => {
    if (isMobile) return { outer: "w-72 h-72", middle: "w-60 h-60", inner: "w-48 h-48" }
    if (isTablet) return { outer: "w-80 h-80", middle: "w-68 h-68", inner: "w-56 h-56" }
    return { outer: "w-96 h-96", middle: "w-80 h-80", inner: "w-64 h-64" }
  }

  const getBadgePositions = () => {
    if (isMobile) {
      return {
        aiEngineer: "top-4 left-1/2 transform -translate-x-1/2",
        pythonDev: "right-2 top-1/2 transform -translate-y-1/2",
        llmDev: "bottom-4 left-1/2 transform -translate-x-1/2",
        promptEngineer: "left-2 top-1/2 transform -translate-y-1/2",
      }
    }
    if (isTablet) {
      return {
        aiEngineer: "top-6 left-1/2 transform -translate-x-1/2",
        pythonDev: "right-3 top-1/2 transform -translate-y-1/2",
        llmDev: "bottom-6 left-1/2 transform -translate-x-1/2",
        promptEngineer: "left-3 top-1/2 transform -translate-y-1/2",
      }
    }
    return {
      aiEngineer: "top-8 left-1/2 transform -translate-x-1/2",
      pythonDev: "right-4 top-1/2 transform -translate-y-1/2",
      llmDev: "bottom-8 left-1/2 transform -translate-x-1/2",
      promptEngineer: "left-4 top-1/2 transform -translate-y-1/2",
    }
  }

  const getBadgeSize = () => {
    if (isMobile) return "px-2 py-1 text-xs"
    if (isTablet) return "px-3 py-1.5 text-xs"
    return "px-4 py-2 text-sm"
  }

  const getParticlePositions = () => {
    if (isMobile) {
      return [
        { position: "top-12 right-12", size: "w-2 h-2" },
        { position: "bottom-12 left-12", size: "w-3 h-3" },
        { position: "top-1/3 right-6", size: "w-1.5 h-1.5" },
        { position: "bottom-1/3 left-6", size: "w-2 h-2" },
      ]
    }
    if (isTablet) {
      return [
        { position: "top-14 right-14", size: "w-2.5 h-2.5" },
        { position: "bottom-14 left-14", size: "w-3.5 h-3.5" },
        { position: "top-1/3 right-7", size: "w-2 h-2" },
        { position: "bottom-1/3 left-7", size: "w-2.5 h-2.5" },
      ]
    }
    return [
      { position: "top-16 right-16", size: "w-3 h-3" },
      { position: "bottom-16 left-16", size: "w-4 h-4" },
      { position: "top-1/3 right-8", size: "w-2 h-2" },
      { position: "bottom-1/3 left-8", size: "w-3 h-3" },
    ]
  }

  const ringSize = getRingSize()
  const badgePositions = getBadgePositions()
  const badgeSize = getBadgeSize()
  const particlePositions = getParticlePositions()

  return (
    <SectionAnimations sectionId="about">
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            ref={ref}
            className={`transition-all duration-1000 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-white mb-8 sm:mb-10 lg:mb-12">
              About{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Me</span>
            </h2>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Text Content - Mobile First */}
              <div className="space-y-4 sm:space-y-6 order-2 lg:order-1">
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">{data.description}</p>

                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white">Key Strengths</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {data.highlights.map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 sm:p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex-shrink-0"></div>
                        <span className="text-sm sm:text-base text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Profile Image Section - Mobile First */}
              <div className={`relative flex justify-center items-center ${getContainerHeight()} order-1 lg:order-2`}>
                {/* Orbital rings background */}
                <motion.div className="absolute inset-0 flex items-center justify-center">
                  {/* Outer ring */}
                  <motion.div
                    className={`${ringSize.outer} rounded-full border border-blue-400/20`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: isMobile ? 40 : 30,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  {/* Middle ring */}
                  <motion.div
                    className={`absolute ${ringSize.middle} rounded-full border border-purple-500/20`}
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: isMobile ? 35 : 25,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                  {/* Inner ring */}
                  <motion.div
                    className={`absolute ${ringSize.inner} rounded-full border border-cyan-400/20`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: isMobile ? 30 : 20,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </motion.div>

                {/* Main profile image container */}
                <motion.div
                  className="relative z-10 group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Glowing background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 rounded-full blur-xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Profile image */}
                  <motion.div
                    className={`relative ${getImageSize()} rounded-full overflow-hidden border-2 sm:border-4 border-white/20 backdrop-blur-sm shadow-2xl`}
                    animate={{
                      y: [0, isMobile ? -4 : -8, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                  >
                    <motion.img
                      src="/images/sumit-profile.jpg"
                      alt="Sumit Deolia - Software Engineer"
                      className="w-full h-full object-cover"
                      whileHover={{
                        scale: isMobile ? 1.05 : 1.1,
                      }}
                      transition={{ duration: 0.3 }}
                    />

                    {/* Overlay gradient on hover */}
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </motion.div>

                {/* Orbital skill badges - Responsive positioning */}
                {/* Software Engineer - Top */}
                <motion.div
                  className={`absolute ${badgePositions.aiEngineer} z-20`}
                  animate={{
                    y: [0, isMobile ? -5 : -10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0,
                  }}
                >
                  <div
                    className={`bg-blue-500/20 backdrop-blur-sm border border-blue-400/40 ${badgeSize} rounded-full text-blue-300 font-medium shadow-lg whitespace-nowrap`}
                  >
                    Software Engineer
                  </div>
                </motion.div>

                {/* Full-Stack Dev - Right */}
                <motion.div
                  className={`absolute ${badgePositions.pythonDev} z-20`}
                  animate={{
                    x: [0, isMobile ? 5 : 10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                >
                  <div
                    className={`bg-green-500/20 backdrop-blur-sm border border-green-400/40 ${badgeSize} rounded-full text-green-300 font-medium shadow-lg whitespace-nowrap`}
                  >
                    Full-Stack Dev
                  </div>
                </motion.div>

                {/* Problem Solver - Bottom */}
                <motion.div
                  className={`absolute ${badgePositions.llmDev} z-20`}
                  animate={{
                    y: [0, isMobile ? 5 : 10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                >
                  <div
                    className={`bg-purple-500/20 backdrop-blur-sm border border-purple-400/40 ${badgeSize} rounded-full text-purple-300 font-medium shadow-lg whitespace-nowrap`}
                  >
                    Problem Solver
                  </div>
                </motion.div>

                {/* Tech Enthusiast - Left */}
                <motion.div
                  className={`absolute ${badgePositions.promptEngineer} z-20`}
                  animate={{
                    x: [0, isMobile ? -5 : -10, 0],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3.2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                >
                  <div
                    className={`bg-cyan-500/20 backdrop-blur-sm border border-cyan-400/40 ${badgeSize} rounded-full text-cyan-300 font-medium shadow-lg whitespace-nowrap`}
                  >
                    Tech Enthusiast
                  </div>
                </motion.div>

                {/* Floating decorative particles - Responsive */}
                {particlePositions.map((particle, index) => {
                  const colors = ["bg-blue-500", "bg-green-400", "bg-purple-400", "bg-cyan-400"]
                  const delays = [0, 0.8, 1.2, 1.8]
                  const durations = [4, 3.5, 5, 4.5]

                  return (
                    <motion.div
                      key={index}
                      className={`absolute ${particle.position} ${particle.size} ${colors[index]} rounded-full`}
                      animate={{
                        y: [0, index % 2 === 0 ? (isMobile ? -8 : -15) : isMobile ? 6 : 12, 0],
                        x: [0, index % 2 === 0 ? (isMobile ? 4 : 8) : isMobile ? -3 : -6, 0],
                        scale: [1, isMobile ? 1.3 : 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: durations[index],
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: delays[index],
                      }}
                    />
                  )
                })}

                {/* Interactive glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </SectionAnimations>
  )
}
