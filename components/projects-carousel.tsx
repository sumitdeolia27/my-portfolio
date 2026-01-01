"use client"
import { useRef } from "react"
import { motion, useTransform, useScroll } from "framer-motion"

export default function ProjectsCarousel() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"])

  const projects = [
    {
      title: "Portfolio Website",
      description: "Personal portfolio showcasing my projects and skills",
      image: "/modern-portfolio-website.png",
      tech: ["React", "Next.js", "Tailwind CSS"],
      link: "#",
    },
    {
      title: "Android Chat App",
      description: "Real-time messaging application built with Android Studio",
      image: "/android-chat-app-interface.png",
      tech: ["Android Studio", "Java", "Firebase"],
      link: "#",
    },
    {
      title: "E-commerce Web App",
      description: "Full-stack e-commerce platform with React and Node.js",
      image: "/ecommerce-website-design.png",
      tech: ["React", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Task Management App",
      description: "Productivity app for managing daily tasks and goals",
      image: "/task-management-app.png",
      tech: ["React Native", "Redux", "SQLite"],
      link: "#",
    },
    {
      title: "Weather Dashboard",
      description: "Weather forecasting app with beautiful UI",
      image: "/weather-dashboard-interface.png",
      tech: ["Vue.js", "API Integration", "Chart.js"],
      link: "#",
    },
    {
      title: "Social Media App",
      description: "Full-featured social platform with real-time updates",
      image: "/social-media-app-design.png",
      tech: ["React", "Socket.io", "PostgreSQL"],
      link: "#",
    },
  ]

  return (
    <section className="w-full py-20">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <h1 className="text-4xl font-bold text-white text-center mb-4">My Projects</h1>
        <p className="text-gray-300 text-center">Scroll down to explore my work</p>
      </div>

      <div ref={targetRef} className="relative h-[300vh]">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative h-[500px] w-[400px] flex-shrink-0 overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  className="h-64 w-full object-cover"
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
