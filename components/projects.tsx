"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { ExternalLink, X, Github } from "lucide-react"
import { portfolioData } from "@/lib/portfolio-data"

interface ProjectsProps {
  darkMode?: boolean
}

export default function Projects({ darkMode }: ProjectsProps) {
  const projects = portfolioData.projects
  const [filter, setFilter] = useState("All")
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  // Get all unique tags (technologies)
  const allTags = Array.from(new Set(projects.flatMap(p => p.technologies)))
  const filters = ["All", ...allTags]

  // Filter projects
  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(p => p.technologies.includes(filter))

  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8 py-20 md:py-32">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-6"
      >
        My <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Work</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-gray-400 text-center mb-16 md:mb-20 max-w-3xl text-base md:text-lg leading-relaxed mx-auto"
      >
        Here are some of my recent projects showcasing my skills in web development, mobile apps, and AI integration
      </motion.p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 md:gap-4 justify-center mb-20 max-w-5xl mx-auto relative z-20">
        {filters.map((tech) => (
          <button
            key={tech}
            type="button"
            onClick={() => setFilter(tech)}
            className={`px-6 md:px-7 py-3 md:py-3.5 rounded-xl font-semibold text-sm md:text-base transition-all duration-300 cursor-pointer ${
              filter === tech
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/40 border border-purple-400/30"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/20 hover:border-purple-400/40"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl w-full mx-auto px-2">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: 45 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: -45 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
                duration: 0.4
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900/40 via-purple-900/30 to-pink-900/40 backdrop-blur-2xl rounded-3xl w-full max-w-2xl max-h-[70vh] overflow-y-auto border border-purple-500/50 shadow-2xl shadow-purple-500/30 relative"
              style={{ perspective: 1000 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10 group"
              >
                <X className="text-white group-hover:rotate-90 transition-transform duration-300" size={20} />
              </button>

              {/* Modal Content */}
              <div className="p-5">
                {/* Project Image */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative aspect-video border-2 border-purple-400/30 shadow-lg shadow-purple-500/20 group/modal-img"
                >
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    fill
                    className="object-cover group-hover/modal-img:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1200px) 100vw, 1200px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover/modal-img:opacity-100 transition-opacity duration-300" />
                </motion.div>

                {/* Project Title */}
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="text-xl md:text-2xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
                >
                  {selectedProject.name}
                </motion.h2>

                {/* Project Description */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="text-gray-300 mb-4 text-sm leading-relaxed"
                >
                  {selectedProject.description}
                </motion.p>

                {/* Tech Stack Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.4 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {selectedProject.technologies.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.05, type: "spring" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="text-xs bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-100 px-2.5 py-1 rounded-lg border border-purple-400/40 font-medium cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>

                {/* Action Buttons */}
                {(selectedProject.demoUrl || selectedProject.githubUrl) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    {selectedProject.githubUrl && (
                      <motion.a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all text-sm font-semibold border border-white/20 hover:border-purple-400/50"
                      >
                        <Github size={16} /> GitHub
                      </motion.a>
                    )}
                    {selectedProject.demoUrl && (
                      <motion.a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all text-sm font-semibold shadow-lg shadow-purple-500/40 hover:shadow-xl hover:shadow-purple-500/60"
                      >
                        <ExternalLink size={16} /> View Project
                      </motion.a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({ project, index, onClick }: { project: typeof portfolioData.projects[0], index: number, onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
    >
        {/* Glassmorphism Card */}
        <div className="glass-card p-6 md:p-7 h-full flex flex-col justify-between hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 group relative overflow-hidden">
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">


                {/* Project Image */}
                <motion.div
                  onClick={onClick}
                  className="rounded-2xl overflow-hidden mb-5 bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative h-52 md:h-56 border border-white/10 cursor-pointer transition-all"
                  whileHover="hover"
                  initial="initial"
                  variants={{
                    initial: {},
                    hover: { scale: 1.02, borderColor: "rgba(192, 132, 252, 0.5)" }
                  }}
                >
                  {/* Image with zoom and rotate */}
                  <motion.div
                    className="w-full h-full relative"
                    variants={{
                      initial: { scale: 1, rotate: 0 },
                      hover: { scale: 1.15, rotate: 3 }
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>

                  {/* Animated gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-cyan-600/20 pointer-events-none"
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: 1 }
                    }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* Click Overlay with animation */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
                    variants={{
                      initial: { opacity: 0 },
                      hover: { opacity: 1 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-sm font-bold bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2.5 rounded-xl shadow-lg shadow-purple-500/50 border border-white/20">
                      🔍 View Details
                    </span>
                  </motion.div>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none overflow-hidden"
                    variants={{
                      initial: {},
                      hover: {}
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                      style={{ width: "50%" }}
                      variants={{
                        initial: { x: "-100%" },
                        hover: { x: "300%" }
                      }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-grow">
                  <h3 className="text-2xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all">
                    {project.name}
                  </h3>
                  <p className="text-gray-300 mb-5 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs md:text-sm bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-purple-100 px-3 py-1.5 rounded-lg border border-purple-400/40 font-medium hover:border-purple-400/70 hover:scale-105 transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
            </div>
          </div>
    </motion.div>
  )
}
