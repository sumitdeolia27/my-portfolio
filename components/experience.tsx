"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Briefcase, Trophy, Calendar, Award } from "lucide-react"
import SectionAnimations from "@/components/section-animations"

interface ExperienceProps {
  data: {
    internships: Array<{
      title: string
      company: string
      duration: string
      certificateUrl?: string
    }>
    hackathons: Array<{
      name: string
      url: string
    }>
    certificates?: Array<{
      title: string
      issuer: string
      url: string
    }>
  }
}

export default function Experience({ data }: ExperienceProps) {
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

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <SectionAnimations sectionId="experience">
      <section id="experience" className="py-20 px-4 bg-black/20">
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
              <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Experience
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
              {/* Internships */}
              <motion.div variants={sectionVariants}>
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Briefcase className="mr-3 text-blue-400" size={24} />
                  </motion.div>
                  Internships
                </motion.h3>
                <motion.div className="space-y-6" variants={containerVariants}>
                  {data.internships.map((internship, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.3 },
                      }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-blue-400/30 hover:shadow-[0_0_30px_rgba(96,165,250,0.15)] transition-colors duration-300 cursor-pointer"
                    >
                      <motion.h4
                        className="text-xl font-semibold text-white mb-2"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                      >
                        {internship.title}
                      </motion.h4>
                      <motion.p
                        className="text-blue-400 mb-2"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                      >
                        {internship.company}
                      </motion.p>
                      <motion.div
                        className="flex items-center space-x-2"
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                      >
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-gray-400">{internship.duration}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Hackathons */}
              <motion.div variants={sectionVariants}>
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Trophy className="mr-3 text-yellow-400" size={24} />
                  </motion.div>
                  Hackathons
                </motion.h3>
                <motion.div className="space-y-4" variants={containerVariants}>
                  {data.hackathons.map((hackathon, index) => (
                    <motion.a
                      key={index}
                      href={hackathon.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        x: 5,
                        transition: { duration: 0.3 },
                      }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-yellow-400/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] transition-colors duration-300 cursor-pointer block"
                    >
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.8, 1, 0.8],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <motion.span
                          className="text-gray-300 font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {hackathon.name}
                        </motion.span>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            {/* Certificates */}
            {data.certificates && data.certificates.length > 0 && (
              <motion.div variants={sectionVariants}>
                <motion.h3
                  className="text-2xl font-bold text-white mb-6 flex items-center justify-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Award className="mr-3 text-purple-400" size={24} />
                  </motion.div>
                  Certificates
                </motion.h3>
                <motion.div
                  className="grid md:grid-cols-2 gap-6"
                  variants={containerVariants}
                >
                  {data.certificates.map((certificate, index) => (
                    <motion.a
                      key={index}
                      href={certificate.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { duration: 0.3 },
                      }}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-purple-400/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Award className="text-white" size={20} />
                        </motion.div>
                        <div className="flex-1">
                          <motion.h4
                            className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                          >
                            {certificate.title}
                          </motion.h4>
                          <motion.p
                            className="text-gray-400 text-sm"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ delay: index * 0.1 + 0.7 }}
                          >
                            {certificate.issuer}
                          </motion.p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </SectionAnimations>
  )
}
