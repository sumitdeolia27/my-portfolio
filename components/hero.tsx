"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Download } from "lucide-react"
import { motion } from "framer-motion"

interface HeroProps {
  data: {
    name: string
    title: string
    description: string
  }
}

const titles = ["Web Development", "AI Enthusiast", "Problem Solver", "Machine Learning Engineer"]

export default function Hero({ data }: HeroProps) {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length
      const fullText = titles[i]

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1))

      setTypingSpeed(isDeleting ? 50 : 100)

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 relative">
      <div className="text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-12"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-extralight text-white mb-8 tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
              {data.name}
            </span>
          </motion.h1>

          <motion.div
            className="text-2xl md:text-3xl text-gray-300 mb-8 h-12 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <span>{text}</span>
            <motion.span
              className="text-blue-400"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              |
            </motion.span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {data.description}
          </motion.p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.button
            onClick={() => {
              if (typeof document !== "undefined") {
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 text-white rounded-full font-light tracking-wide transition-all duration-500 hover:from-blue-500/30 hover:to-purple-600/30 hover:border-blue-400/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Explore My Work</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
          </motion.button>

          <motion.a
            href="https://drive.google.com/file/d/12C48hLvYAq_YrKWXYoFDSxDtVc-sdFT_/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-light tracking-wide hover:from-purple-700 hover:to-pink-700 transition-all duration-500 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            <span>Download Resume</span>
          </motion.a>

          <motion.button
            onClick={() => {
              if (typeof document !== "undefined") {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
            }}
            className="px-8 py-4 border border-white/20 text-white rounded-full font-light tracking-wide hover:bg-white/5 transition-all duration-500 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="cursor-pointer"
            onClick={() => {
              if (typeof document !== "undefined") {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            <ChevronDown size={32} className="text-white/40 hover:text-white/80 transition-colors duration-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
