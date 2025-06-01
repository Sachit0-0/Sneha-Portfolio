"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Award, Star, Heart, Zap } from "lucide-react"
import BrushStroke from "@/components/brush-stroke"

const achievements = [
  { icon: Award, label: "Award-Winning Artist", color: "#FF5757" },
  { icon: Star, label: "Featured in Galleries", color: "#FFD700" },
  { icon: Heart, label: "10+ Years Experience", color: "#FF1493" },
  { icon: Zap, label: "Digital Art Pioneer", color: "#00BFFF" },
]

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={containerRef} className="py-24 md:py-32 theme-bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Artist image with colorful border */}
              <div className="relative h-[500px] w-full">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl transform rotate-3" />
                <div className="absolute inset-2 bg-black rounded-2xl overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=800&width=600"
                    alt="Artist portrait"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Floating paint splatter */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32"
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M50,10 C70,15 85,35 80,55 C75,75 55,85 35,80 C15,75 5,55 10,35 C15,15 35,5 50,10 Z"
                    fill="#FF1493"
                    opacity="0.6"
                  />
                </svg>
              </motion.div>

              {/* Another paint splatter */}
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40"
                animate={{
                  rotate: [0, -10, 0, 10, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M60,20 C80,30 90,50 80,70 C70,90 50,95 30,85 C10,75 5,55 15,35 C25,15 45,10 60,20 Z"
                    fill="#00BFFF"
                    opacity="0.6"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <BrushStroke color="#FF5757">
              <h2 className="text-2xl theme-text-primary mb-4 font-medium">About the Artist</h2>
            </BrushStroke>

            <h3 className="text-5xl md:text-6xl font-serif font-bold theme-text-primary mb-8">
              Creating Art with{" "}
              <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Passion
              </span>
            </h3>

            <div className="space-y-6 theme-text-secondary">
              <p className="text-xl">
                I'm a visual artist and illustrator with a passion for creating vibrant, emotion-filled artwork that
                connects with people on a deeper level.
              </p>
              <p>
                My journey began over a decade ago when I discovered the power of color and form to express what words
                cannot. Since then, I've been on a constant exploration of different mediums and techniques, from
                traditional painting to digital art.
              </p>
              <p>
                My work has been featured in galleries across the country and has found homes in private collections
                worldwide. I draw inspiration from nature, human emotions, and the beautiful chaos of everyday life.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <achievement.icon style={{ color: achievement.color }} className="h-6 w-6" />
                  <span className="text-white font-medium">{achievement.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
