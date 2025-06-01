"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ProcessStepProps {
  step: {
    icon: LucideIcon
    title: string
    description: string
    color: string
  }
  index: number
}

export default function ProcessStep({ step, index }: ProcessStepProps) {
  const { icon: Icon, title, description, color } = step

  return (
    <motion.div className="flex items-start gap-6 group" whileHover={{ x: 10 }} transition={{ duration: 0.3 }}>
      {/* Step number and icon */}
      <div className="flex-shrink-0">
        <motion.div
          className="relative w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
          whileHover={{ scale: 1.1, backgroundColor: `${color}30` }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="h-8 w-8" style={{ color }} />

          {/* Step number */}
          <motion.div
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {index}
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-2xl font-serif font-bold theme-text-primary mb-2 group-hover:text-opacity-80 transition-colors">
          {title}
        </h4>
        <p className="theme-text-secondary group-hover:opacity-90 transition-colors">{description}</p>
      </div>
    </motion.div>
  )
}
