"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Palette, Lightbulb, Layers, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

// (Keep processSteps array the same)
const processSteps = [
  {
    icon: Lightbulb,
    title: "Inspiration",
    description: "It all starts with a spark sometimes a walk in nature, a fleeting emotion, or a memory. I let these moments guide my imagination and fuel my creativity.",
    color: "#FF6B6B",
    details: "I find inspiration everywhere: in morning light, old photographs, conversations, and quiet moments of reflection.",
  },
  {
    icon: Palette,
    title: "Exploration",
    description: "I play with colors, textures, and techniques, letting curiosity lead the way. This is where ideas begin to take shape and possibilities unfold.",
    color: "#4ECDC4",
    details: "Experimentation is key mixing mediums, trying new approaches, and embracing the unexpected discoveries along the way.",
  },
  {
    icon: Layers,
    title: "Creation",
    description: "Layer by layer, I build the piece, adding depth and meaning. Each stroke and detail is a step closer to the story I want to tell.",
    color: "#FFE66D",
    details: "This is where patience meets passion carefully building up the artwork while staying open to how it wants to evolve.",
  },
  {
    icon: Sparkles,
    title: "Refinement",
    description: "The final touches matter most. I spend time perfecting details, adjusting balance, and making sure the artwork feels complete before sharing it.",
    color: "#B794F6",
    details: "These finishing moments are magical when everything comes together and the piece finally says what I intended it to say.",
  },
]

interface TimelineStepProps {
  step: typeof processSteps[number]
  index: number
  isInView: boolean
}

function TimelineStep({ step, index, isInView }: TimelineStepProps) {
  const Icon = step.icon
  const isLast = index === processSteps.length - 1

  return (
    <motion.div
      className="flex relative"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      {/* Timeline Line and Dot */}
      <div className="flex flex-col items-center mr-6">
        <div 
          className="w-10 h-10 rounded-full flex items-center justify-center relative shrink-0"
          style={{ backgroundColor: step.color }}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        {!isLast && (
          <div className="w-px flex-grow my-2" />
        )}
      </div>

      {/* Content Card */}
      <div className="pb-12 pt-1 ">
        <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          {index + 1}. {step.title}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
          {step.description}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 italic border-l-4 pl-3" style={{ borderColor: step.color }}>
          {step.details}
        </p>
      </div>
    </motion.div>
  )
}


export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  return (
    <main
      ref={containerRef}
      className="py-20  overflow-hidden"
    >
      <div className=" mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-slate-900 dark:text-white">
            How I Create
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Every artwork I create is a little adventure. I love exploring new ideas and letting my feelings guide my hands. Here's how I turn inspiration into something you can see and feel.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="flex justify-center">
            <div className="w-full max-w-2xl">
                {processSteps.map((step, index) => (
                    <TimelineStep 
                        key={step.title} 
                        step={step} 
                        index={index} 
                        isInView={isInView} 
                    />
                ))}
            </div>
        </div>
      </div>
    </main>
  )
}