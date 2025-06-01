"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { Lens } from "@/components/magicui/lens" // 👈 Make sure this import exists

interface ArtworkCardProps {
  artwork: {
    id: number
    title: string
    category: string
    image: string
    color: string
  }
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        className="group relative cursor-pointer"
        onClick={() => setIsOpen(true)}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
          <div className="aspect-square overflow-hidden">
      <Lens zoomFactor	={1.5} >
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: "easeOut" }}>
    <Image
      src={artwork.image || "/placeholder.svg"}
      alt={artwork.title}
      width={600}
      height={600}
      className="object-cover w-full h-full"
    />
  </motion.div>
</Lens>

          </div>

          {/* Subtle overlay */}
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex flex-col justify-end p-6"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              <div className="text-sm font-light opacity-80 mb-1">{artwork.category}</div>
              <h3 className="text-xl font-serif font-medium">{artwork.title}</h3>
            </motion.div>
          </motion.div>

          {/* Colored accent line */}
          <motion.div
            className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
            style={{ backgroundColor: artwork.color }}
          />
        </div>
      </motion.div>

      {/* Modal for full artwork view */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl p-0 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/80 rounded-full text-gray-900 dark:text-white hover:bg-white dark:hover:bg-black transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="aspect-square">
              
              <Image
                src={artwork.image || "/placeholder.svg"}
                alt={artwork.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="p-8">
              <div className="text-sm font-light text-gray-600 dark:text-gray-400 mb-2">{artwork.category}</div>
              <h3 className="text-3xl font-serif font-medium text-gray-900 dark:text-white">{artwork.title}</h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
