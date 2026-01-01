"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { GraduationCap, Calendar } from "lucide-react"

interface EducationProps {
  data: {
    degree: string
    institution: string
    percentage: string
    duration: string
    secondary: {
      institution: string
      percentage: string
      duration: string
    }
  }
}

export default function Education({ data }: EducationProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <section id="education" className="py-20 px-4 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Education</span>
          </motion.h2>

          <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="text-white" size={24} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.4 }}
                  >
                    Undergraduate Degree
                  </motion.h3>
                  <motion.p
                    className="text-xl text-blue-400 mb-2"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {data.degree}
                  </motion.p>
                  <motion.p
                    className="text-lg text-gray-300 mb-3"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {data.institution}
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap gap-4 items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-400">{data.duration}</span>
                    </div>
                    <motion.div
                      className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {data.percentage}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                y: -5,
                transition: { duration: 0.3 },
              }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-colors duration-300"
            >
              <div className="flex items-start space-x-4">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="text-white" size={24} />
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    className="text-2xl font-bold text-white mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.5 }}
                  >
                    Higher Secondary Certificate
                  </motion.h3>
                  <motion.p
                    className="text-lg text-gray-300 mb-3"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {data.secondary.institution}
                  </motion.p>
                  <motion.div
                    className="flex flex-wrap gap-4 items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Calendar size={16} className="text-gray-400" />
                      <span className="text-gray-400">{data.secondary.duration}</span>
                    </div>
                    <motion.div
                      className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-semibold"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {data.secondary.percentage}
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
