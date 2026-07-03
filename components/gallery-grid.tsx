"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
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

const artworksData = [
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

// how many thumbnails to render on each side of the selected one
const THUMB_WINDOW = 4

export default function GalleryGrid() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const artworks = useMemo(() => artworksData, [])

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % artworks.length))
  }, [artworks.length])

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev === null ? null : prev === 0 ? artworks.length - 1 : prev - 1))
  }, [artworks.length])

  useEffect(() => {
    if (selectedIndex === null) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setSelectedIndex(null)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedIndex, nextImage, prevImage])

  // Only render thumbnails near the current selection instead of all 13 every open
  const visibleThumbIndices = useMemo(() => {
    if (selectedIndex === null) return []
    const indices: number[] = []
    for (let i = -THUMB_WINDOW; i <= THUMB_WINDOW; i++) {
      const idx = (selectedIndex + i + artworks.length) % artworks.length
      if (!indices.includes(idx)) indices.push(idx)
    }
    return indices
  }, [selectedIndex, artworks.length])

  return (
    <>
      {/* Modern Grid Gallery */}
      <div className="min-h-screen p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {artworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              style={{ contentVisibility: "auto", containIntrinsicSize: "0 500px" }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ duration: 0.4, delay: Math.min(index, 6) * 0.05 }}
              className="group relative aspect-[3/4] cursor-pointer"
              onClick={() => setSelectedIndex(index)}
            >
              <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 ring-1 ring-black/5 group-hover:ring-black/10">
                <Image
                  src={artwork.image}
                  alt={`Artwork ${artwork.id}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  quality={70}
                  className="object-cover"
                  placeholder="blur"
                  loading={index < 4 ? "eager" : "lazy"}
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 z-10 text-white text-xs font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0">
                  View
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            style={{ width: "100vw", height: "100vh" }}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-6 right-6 z-30 p-3 rounded-full bg-black/50 hover:bg-black/70 transition-colors text-white backdrop-blur-sm"
              aria-label="Close fullscreen preview"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute top-6 left-6 z-30 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
              {selectedIndex + 1} / {artworks.length}
            </div>

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

            {/* Main Image — fill inside a bounded box instead of fixed width/height,
                so it can't fight with object-contain or force the wrong srcset */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="relative w-[90vw] h-[90vh]"
            >
              <Image
                src={artworks[selectedIndex].image}
                alt={`Artwork ${artworks[selectedIndex].id}`}
                fill
                className="object-contain rounded-lg shadow-2xl"
                sizes="90vw"
                quality={85}
                placeholder="blur"
                priority
              />
            </motion.div>

            {/* Thumbnail Strip — only render a window around the current image,
                not all 13, so opening the modal doesn't fire 13 extra loads */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
              <div className="flex gap-2 p-3 bg-black/50 backdrop-blur-sm rounded-full max-w-[80vw] overflow-x-auto">
                {visibleThumbIndices.map((index) => {
                  const artwork = artworks[index]
                  return (
                    <button
                      key={artwork.id}
                      onClick={() => setSelectedIndex(index)}
                      className={`relative w-10 h-10 shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                        index === selectedIndex ? "ring-2 ring-white scale-110" : "opacity-60 hover:opacity-100"
                      }`}
                      aria-label={`View artwork ${artwork.id}`}
                    >
                      <Image
                        src={artwork.image}
                        alt={`Thumbnail ${artwork.id}`}
                        fill
                        sizes="40px"
                        quality={40}
                        className="object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}