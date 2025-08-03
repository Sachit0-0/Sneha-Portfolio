"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { Palette, Lightbulb, Layers, Sparkles, Heart, Coffee } from "lucide-react"
import type { LucideIcon } from "lucide-react"

const processSteps = [
  {
    icon: Lightbulb,
    title: "Inspiration",
    description:
      "It all starts with a spark—sometimes a walk in nature, a fleeting emotion, or a memory. I let these moments guide my imagination and fuel my creativity.",
    color: "#FF6B6B",
    bgGradient: "from-red-400/20 to-orange-400/20",
    details:
      "I find inspiration everywhere: in morning light, old photographs, conversations, and quiet moments of reflection.",
  },
  {
    icon: Palette,
    title: "Exploration",
    description:
      "I play with colors, textures, and techniques, letting curiosity lead the way. This is where ideas begin to take shape and possibilities unfold.",
    color: "#4ECDC4",
    bgGradient: "from-teal-400/20 to-cyan-400/20",
    details:
      "Experimentation is key—mixing mediums, trying new approaches, and embracing the unexpected discoveries along the way.",
  },
  {
    icon: Layers,
    title: "Creation",
    description:
      "Layer by layer, I build the piece, adding depth and meaning. Each stroke and detail is a step closer to the story I want to tell.",
    color: "#FFE66D",
    bgGradient: "from-yellow-400/20 to-amber-400/20",
    details:
      "This is where patience meets passion—carefully building up the artwork while staying open to how it wants to evolve.",
  },
  {
    icon: Sparkles,
    title: "Refinement",
    description:
      "The final touches matter most. I spend time perfecting details, adjusting balance, and making sure the artwork feels complete before sharing it.",
    color: "#B794F6",
    bgGradient: "from-purple-400/20 to-pink-400/20",
    details:
      "These finishing moments are magical—when everything comes together and the piece finally says what I intended it to say.",
  },
]

interface ProcessStepProps {
  step: {
    icon: LucideIcon
    title: string
    description: string
    color: string
    bgGradient: string
    details: string
  }
  index: number
  isHovered: boolean
}

function ProcessStep({ step, index, isHovered }: ProcessStepProps) {
  const Icon = step.icon

  return (
    <motion.div
      className="relative p-8 rounded-3xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden"
      whileHover={{ y: -5 }}
      layout
    >
      {/* Background gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Step number */}
      <motion.div
        className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-white to-slate-100 dark:from-slate-700 dark:to-slate-600 shadow-lg flex items-center justify-center border-4 border-white dark:border-slate-800"
        animate={{ rotate: isHovered ? 360 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-2xl font-bold text-slate-700 dark:text-white">{index}</span>
      </motion.div>

      {/* Icon */}
      <motion.div
        className="relative z-10 mb-6"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg"
          style={{ backgroundColor: step.color }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
          {step.title}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
          {step.description}
        </p>

        {/* Details that appear on hover */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-slate-200 dark:border-slate-600">
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">{step.details}</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-4 right-4 w-2 h-2 rounded-full opacity-20"
        style={{ backgroundColor: step.color }}
        animate={{
          scale: isHovered ? [1, 1.5, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
        }}
      />
      <motion.div
        className="absolute bottom-6 right-8 w-1 h-1 rounded-full opacity-30"
        style={{ backgroundColor: step.color }}
        animate={{
          scale: isHovered ? [1, 2, 1] : 1,
        }}
        transition={{
          duration: 2,
          delay: 0.5,
          repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
        }}
      />
    </motion.div>
  )
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-50px" })
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 })
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      mouseX.set((e.clientX - rect.left - rect.width / 2) / 20)
      mouseY.set((e.clientY - rect.top - rect.height / 2) / 20)
    }
  }

  return (
    <main
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="py-20 relative overflow-hidden"
    >
      {/* Dynamic background elements */}
      <div className="absolute  inset-0 overflow-hidden">
 
      
        <motion.div
          className="absolute bottom-0  rounded-full "
          animate={{
            x: [50, -50, 50],
            y: [20, -20, 20],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
     

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-shadow-md">
            <span className="bg-clip-text ">
              How I Create
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every artwork I create is a little adventure. I love exploring new ideas and letting my feelings guide my
            hands. Here's how I turn inspiration into something you can see and feel.
          </p>
        </motion.div>

        {/* Process Steps */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              className="relative"
            >
              <ProcessStep step={step} index={index + 1} isHovered={hoveredStep === index} />
            </motion.div>
          ))}
        </motion.div>
      </div>

     
    </main>
  )
}
