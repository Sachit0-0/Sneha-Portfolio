"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Palette, Code, Smartphone, Zap } from "lucide-react"
import ServiceCard from "@/components/service-card"

const services = [
  {
    icon: Palette,
    title: "Brand Design",
    description: "Creating memorable brand identities that resonate with your audience and stand out in the market.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Building fast, responsive, and scalable websites with modern technologies and best practices.",
    features: ["React/Next.js", "Custom CMS", "E-commerce", "Performance Optimization"],
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Developing native and cross-platform mobile applications with exceptional user experiences.",
    features: ["iOS & Android", "React Native", "UI/UX Design", "App Store Optimization"],
  },
  {
    icon: Zap,
    title: "Digital Strategy",
    description: "Comprehensive digital strategies to help your business grow and succeed in the digital landscape.",
    features: ["Market Research", "User Analytics", "Growth Hacking", "Conversion Optimization"],
  },
]

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])

  return (
    <section id="services" ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Background elements */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        style={{ y }}
      />

      <div className="container relative z-10">
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
            Our Services
          </motion.h2>
          <motion.p
            className="text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We offer a comprehensive range of digital services to help your business thrive in the modern world.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
