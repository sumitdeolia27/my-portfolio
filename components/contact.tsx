"use client"

import type React from "react"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react"
import { useState } from "react"
import SectionAnimations from "@/components/section-animations"

interface ContactProps {
  data: {
    email: string
    phone: string
    location: string
    social?: {
      linkedin: string
      github: string
    }
  }
}

export default function Contact({ data }: ContactProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "061319a0-c662-4cc3-baa9-9d037855da3b",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact from ${formData.name}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus("success")
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        })
        // Reset success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  const formVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <SectionAnimations sectionId="contact">
      <section id="contact" className="py-20 px-4 bg-black/20">
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
              <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div className="space-y-8" variants={itemVariants}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8">
                    I'm always open to discussing new opportunities, collaborations, or just having a chat about
                    technology and software development. Feel free to reach out!
                  </p>
                </motion.div>

                <motion.div className="space-y-6" variants={containerVariants}>
                  <motion.a
                    href={`mailto:${data.email}`}
                    className="flex items-center space-x-4 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Mail className="text-white" size={20} />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-medium hover:text-blue-400 transition-colors">{data.email}</p>
                    </div>
                  </motion.a>

                  <motion.a
                    href={`tel:${data.phone}`}
                    className="flex items-center space-x-4 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-full"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Phone className="text-white" size={20} />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">Phone</p>
                      <p className="text-white font-medium hover:text-green-400 transition-colors">{data.phone}</p>
                    </div>
                  </motion.a>

                  <motion.div
                    className="flex items-center space-x-4"
                    variants={itemVariants}
                    whileHover={{ x: 10, transition: { duration: 0.3 } }}
                  >
                    <motion.div
                      className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-full"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <MapPin className="text-white" size={20} />
                    </motion.div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-white font-medium">{data.location}</p>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  className="flex space-x-4 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.a
                    href={data.social?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-gray-700 to-gray-800 p-3 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Github className="text-white" size={20} />
                  </motion.a>
                  <motion.a
                    href={data.social?.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Linkedin className="text-white" size={20} />
                  </motion.a>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-pink-400/30 hover:shadow-[0_0_30px_rgba(244,114,182,0.15)] transition-all duration-300"
                variants={formVariants}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="name" className="block text-white font-medium mb-2">
                      Name
                    </label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                      placeholder="Your Name"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="email" className="block text-white font-medium mb-2">
                      Email
                    </label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300"
                      placeholder="your.email@example.com"
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                  >
                    <label htmlFor="message" className="block text-white font-medium mb-2">
                      Message
                    </label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all duration-300 resize-none"
                      placeholder="Your message..."
                      required
                      whileFocus={{ scale: 1.02 }}
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed"
                        : submitStatus === "success"
                        ? "bg-gradient-to-r from-green-500 to-green-600"
                        : submitStatus === "error"
                        ? "bg-gradient-to-r from-red-500 to-red-600"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    } text-white`}
                    whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Send size={20} />
                    <span>
                      {isSubmitting
                        ? "Sending..."
                        : submitStatus === "success"
                        ? "Message Sent! ✓"
                        : submitStatus === "error"
                        ? "Failed to Send ✗"
                        : "Send Message"}
                    </span>
                  </motion.button>

                  {submitStatus === "error" && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm text-center mt-2"
                    >
                      Failed to send message. Please try again or email directly.
                    </motion.p>
                  )}
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </SectionAnimations>
  )
}
