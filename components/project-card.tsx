"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    category: string
    description: string
    image: string
    tags: string[]
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, category, description, image, tags } = project

  return (
    <motion.div
      className="group relative bg-white/5 rounded-3xl overflow-hidden backdrop-blur-sm border border-white/10"
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden">
        <motion.div className="aspect-video" whileHover={{ scale: 1.1 }} transition={{ duration: 0.6 }}>
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </motion.div>

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          <div className="absolute bottom-4 right-4">
            <motion.div
              className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.3)" }}
            >
              <ExternalLink className="h-5 w-5 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="p-8">
        <div className="text-purple-400 text-sm font-medium mb-2">{category}</div>
        <h3 className="text-2xl font-heading font-bold text-white mb-3">{title}</h3>
        <p className="text-white/70 mb-6">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-3 py-1 bg-white/10 text-white/80 text-sm rounded-full"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
