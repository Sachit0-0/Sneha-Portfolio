"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import GalleryGrid from "@/components/gallery-grid"

const categories = ["All", "Paintings", "Sculptures", "Digital", "Installations"]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <motion.h1
        className="mb-8 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Gallery
      </motion.h1>


      <GalleryGrid />
    </div>
  )
}
