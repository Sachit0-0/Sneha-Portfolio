"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Palette, Lightbulb, Layers, Sparkles } from "lucide-react"
import ProcessStep from "@/components/process-step"

const processSteps = [
  {
    icon: Lightbulb,
    title: "Inspiration",
    description: "Every piece begins with a spark of inspiration, whether from nature, emotions, or experiences.",
    color: "#FF5757", // Red
  },
  {
    icon: Palette,
    title: "Exploration",
    description: "Experimenting with colors, textures, and techniques to find the perfect expression.",
    color: "#00BFFF", // Deep Sky Blue
  },
  {
    icon: Layers,
    title: "Creation",
    description: "Building layers of depth and meaning through careful application of artistic elements.",
    color: "#FFD700", // Yellow
  },
  {
    icon: Sparkles,
    title: "Refinement",
    description: "Polishing and perfecting the final details to bring the vision to life.",
    color: "#8A2BE2", // Blue Violet
  },
]

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="process" ref={containerRef} className="py-24 md:py-32 theme-bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-pink-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-purple-500/10 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-serif font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent mb-6">
              My Creative Process
            </h2>
            <p className="text-xl theme-text-secondary mb-12">
              Art is a journey of discovery. Here's how I bring imagination to life through a thoughtful creative
              process.
            </p>

            <div className="space-y-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                >
                  <ProcessStep step={step} index={index + 1} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative h-[600px] w-full">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-3xl transform rotate-3" />
              <div className="absolute top-5 left-5 w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl transform -rotate-3" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-4/5 h-4/5 overflow-hidden rounded-2xl">
                  <Image
                    src="https://picsum.photos/600/800?grayscale&random=7"
                    alt="Creative process"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-xl"
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-xl"
                animate={{
                  y: [0, 20, 0],
                  rotate: [360, 180, 0],
                  scale: [1, 0.9, 1],
                }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
