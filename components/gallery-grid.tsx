"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import one from "../public/Art/1000013360.jpg"
import two from "../public/Art/20240822_080116.jpg"
import three from "../public/Art/20240822_080254.jpg"
import four from "../public/Art/20240822_081113.jpg"
import five from "../public/Art/CamScanner 06-22-2024 00.46_1.jpg"
import six from "../public/Art/CamScanner 08-19-2024 19.46_4.jpg"
import seven from "../public/Art/CamScanner 08-19-2024 19.46_6.jpg"
import eight from "../public/Art/IMG-20c8848391c731712123683533765a77-V.jpg"
import nine from "../public/Art/IMG_20210213_171555_240.jpg"
import ten from "../public/Art/IMG_20210420_133301_982.jpg"
import eleven from "../public/Art/RUID52c7e29134504ea5a0353c78824c5658.jpg"
import twelve from "../public/Art/RUID7f5cbf30e4054ab4a287bc654b4010fa.jpg"
import thirteen from "../public/Art/asd.jpg"

const artworks = [
  { id: 1, image: one },
  { id: 2, image: two },
  { id: 3, image: three },
  { id: 4, image: four },
  { id: 5, image: five },
  { id: 6, image: six },
  { id: 7, image: seven },
  { id: 8, image: eight },
  { id: 9, image: nine },
  { id: 10, image: ten },
  { id: 11, image: eleven },
  { id: 12, image: twelve },
  { id: 13, image: thirteen },
]

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % artworks.length)
    }
  }

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? artworks.length - 1 : selectedIndex - 1)
    }
  }

  // Close modal on Escape key
  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex])

  return (
    <>
      {/* Modern Grid Gallery */}
      <div className="min-h-screen p-4 md:p-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative aspect-[3/4] cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-2xl" />
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Image
                  src={artwork.image || "/placeholder.svg"}
                  alt={`Artwork ${artwork.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  placeholder="blur"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-lg px-3 py-2">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Artwork {artwork.id}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lowkey Coming Soon Section */}
      <div className="flex justify-center items-center mt-8 mb-16">
        <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-sm shadow-sm">
          More coming soon...
        </span>
      </div>

      {/* Custom Fullscreen Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            style={{ width: "100vw", height: "100vh" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white backdrop-blur-sm"
              aria-label="Close fullscreen preview"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-6 left-6 z-30 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
              {selectedIndex + 1} / {artworks.length}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white backdrop-blur-sm"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white backdrop-blur-sm"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center w-full h-full"
            >
              <Image
                src={artworks[selectedIndex].image || "/placeholder.svg"}
                alt={`Artwork ${artworks[selectedIndex].id}`}
                className="object-contain rounded-lg shadow-2xl max-h-[90vh] max-w-[90vw] w-auto h-auto"
                width={1200}
                height={1600}
                priority
              />
            </motion.div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
              <div className="flex gap-2 p-3 bg-black/50 backdrop-blur-sm rounded-full max-w-[80vw] overflow-x-auto">
                {artworks.map((artwork, index) => (
                  <button
                    key={artwork.id}
                    onClick={() => setSelectedIndex(index)}
                    className={`relative w-12 h-12 rounded-lg overflow-hidden transition-all duration-200 ${
                      index === selectedIndex ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                    }`}
                    aria-label={`View artwork ${artwork.id}`}
                  >
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={`Thumbnail ${artwork.id}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
