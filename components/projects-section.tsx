"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ProjectCard from "@/components/project-card"

const projects = [
  {
    title: "E-commerce Revolution",
    category: "Web Development",
    description: "A complete e-commerce platform with advanced features and seamless user experience.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    title: "Brand Identity System",
    category: "Brand Design",
    description: "Comprehensive brand identity for a tech startup including logo, guidelines, and assets.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Branding", "Logo Design", "Guidelines", "Assets"],
  },
  {
    title: "Mobile Banking App",
    category: "Mobile Development",
    description: "Secure and intuitive mobile banking application with biometric authentication.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Security", "UX/UI", "Fintech"],
  },
  {
    title: "SaaS Dashboard",
    category: "Web Development",
    description: "Analytics dashboard for SaaS companies with real-time data visualization.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Dashboard", "Analytics", "Real-time", "Charts"],
  },
]

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="projects" ref={containerRef} className="py-32 bg-gray-950 relative overflow-hidden">
      <div className="container">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Featured Work
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore our latest projects and see how we've helped businesses transform their digital presence.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
