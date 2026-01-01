"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Brain, MessageCircle, Users, Clock, Lightbulb, Shield } from "lucide-react"
import SectionAnimations from "@/components/section-animations"

interface SkillsProps {
  data: {
    technical: string[]
    soft: string[]
    languages: string[]
    certifications: string[]
  }
}

const softSkillIcons = {
  Creativity: Lightbulb,
  Communication: MessageCircle,
  Teamwork: Users,
  "Meeting deadlines": Clock,
  "Critical thinking": Brain,
  Resilience: Shield,
}

export default function Skills({ data }: SkillsProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.4,
      },
    }),
  }

  return (
    <SectionAnimations sectionId="skills">
      <section id="skills" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center text-white mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Skills</span>
            </motion.h2>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants}>
              {/* Technical Skills */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-purple-400/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-xl font-bold text-white mb-4 text-center">Technical Skills</h3>
                <div className="space-y-3">
                  {data.technical.map((skill, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 p-3 rounded-lg text-center cursor-pointer hover:from-blue-500/30 hover:to-purple-600/30 transition-all duration-300"
                    >
                      <span className="text-gray-300 font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-green-400/30 hover:shadow-[0_0_30px_rgba(74,222,128,0.15)] transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-xl font-bold text-white mb-4 text-center">Soft Skills</h3>
                <div className="space-y-3">
                  {data.soft.map((skill, index) => {
                    const IconComponent = softSkillIcons[skill as keyof typeof softSkillIcons] || Brain
                    return (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="bg-gradient-to-r from-green-500/20 to-blue-600/20 p-3 rounded-lg flex items-center space-x-2 cursor-pointer hover:from-green-500/30 hover:to-blue-600/30 transition-all duration-300"
                      >
                        <motion.div
                          whileHover={{ rotate: 360, scale: 1.2 }}
                          transition={{ duration: 0.5 }}
                        >
                          <IconComponent size={16} className="text-green-400" />
                        </motion.div>
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>

              {/* Languages */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-xl font-bold text-white mb-4 text-center">Languages</h3>
                <div className="space-y-3">
                  {data.languages.map((language, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 p-3 rounded-lg text-center cursor-pointer hover:from-yellow-500/30 hover:to-orange-600/30 transition-all duration-300"
                    >
                      <span className="text-gray-300 font-medium">{language}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Certifications */}
              <motion.div
                variants={cardVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  transition: { duration: 0.3 },
                }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-pink-400/30 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] transition-colors duration-300"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h3 className="text-xl font-bold text-white mb-4 text-center">Certifications</h3>
                <div className="space-y-3">
                  {data.certifications.map((cert, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                      className="bg-gradient-to-r from-pink-500/20 to-red-600/20 p-3 rounded-lg cursor-pointer hover:from-pink-500/30 hover:to-red-600/30 transition-all duration-300"
                    >
                      <span className="text-gray-300 text-sm">{cert}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SectionAnimations>
  )
}
