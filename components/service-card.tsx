"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  service: {
    icon: LucideIcon
    title: string
    description: string
    features: string[]
  }
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { icon: Icon, title, description, features } = service

  return (
    <motion.div
      className="group relative p-8 bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 overflow-hidden"
      whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scale: 0 }}
        whileHover={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10">
        <motion.div
          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="h-8 w-8 text-white" />
        </motion.div>

        <h3 className="text-2xl font-heading font-bold text-white mb-4">{title}</h3>
        <p className="text-white/70 mb-6">{description}</p>

        <ul className="space-y-2">
          {features.map((feature, index) => (
            <motion.li
              key={feature}
              className="text-white/60 flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
              {feature}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}
