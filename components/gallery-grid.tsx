"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Lens } from "./magicui/lens"
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
import therteen from "../public/Art/asd.jpg"

// Sample artwork data
const artworks = [
  { id: 1, title: "Ethereal Dreams", category: "Paintingss", year: 2023, image: one, description: "Oil on canvas exploring themes of consciousness and dreams." },
  { id: 2, title: "Urban Fragments", category: "Digital", year: 2022, image: two, description: "Digital collage representing urban life and its complexities." },
  { id: 3, title: "Harmony in Bronze", category: "Sculptures", year: 2023, image: three, description: "Bronze sculpture exploring balance and harmony in form." },
  { id: 4, title: "Reflections", category: "Paintings", year: 2021, image: four, description: "Acrylic on canvas depicting reflections on water surfaces." },
  { id: 5, title: "Digital Dystopia", category: "Digital", year: 2022, image: five, description: "Digital art exploring themes of technology and society." },
  { id: 6, title: "Spatial Concept", category: "Installations", year: 2023, image: six, description: "Mixed media installation examining space and perception." },
  { id: 7, title: "Chromatic Fusion", category: "Paintings", year: 2021, image: seven, description: "Oil on canvas exploring color theory and emotional response." },
  { id: 8, title: "Geometric Harmony", category: "Sculptures", year: 2022, image: eight, description: "Marble sculpture focusing on geometric patterns and forms." },
  { id: 9, title: "Virtual Landscapes", category: "Digital", year: 2023, image: nine, description: "Digital artwork creating imaginary landscapes and environments." },
  { id: 10, title: "Temporal Shift", category: "Installations", year: 2021, image: ten, description: "Interactive installation exploring concepts of time and change." },
  { id: 11, title: "Abstract Emotions", category: "Paintings", year: 2022, image: eleven, description: "Abstract expressionist painting capturing raw emotional states." },
  { id: 12, title: "Digital Metamorphosis", category: "Digital", year: 2023, image: twelve, description: "Digital artwork exploring transformation and evolution." },
  { id: 13, title: "Untitled", category: "Mixed Media", year: 2024, image: therteen, description: "A mysterious piece with an experimental approach." },
]

interface GalleryGridProps {
  category?: string
  limit?: number
}

export default function GalleryGrid({ category = "All", limit }: GalleryGridProps) {
  const [selectedArtwork, setSelectedArtwork] = useState<(typeof artworks)[0] | null>(null)

  const filteredArtworks = category === "All" ? artworks : artworks.filter((artwork) => artwork.category === category)
  const displayedArtworks = limit ? filteredArtworks.slice(0, limit) : filteredArtworks

  return (
    <>
      {/* Masonry-style gallery */}
      <motion.div
        className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4 px-2 md:px-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {displayedArtworks.map((artwork, index) => (
          <motion.div
            key={artwork.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className="mb-4 break-inside-avoid cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-900"
            onClick={() => setSelectedArtwork(artwork)}
          >
            <Lens zoomFactor={1.4}>
              <Image
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                placeholder="blur"
              />
            </Lens>
          </motion.div>
        ))}
      </motion.div>

      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          {selectedArtwork && (
            <>
              <DialogHeader className="px-8 pt-8">
                <DialogTitle className="text-3xl">{selectedArtwork.title}</DialogTitle>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative aspect-[4/5] bg-gray-100 dark:bg-gray-800">
                  <Image
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col">
                  <p className="text-muted-foreground mb-4 text-lg">
                    {selectedArtwork.category}, {selectedArtwork.year}
                  </p>
                  <p className="mb-6 text-base">{selectedArtwork.description}</p>
                  <div className="mt-auto">
                    <p className="text-sm text-muted-foreground">
                      Interested in this piece?{" "}
                      <a href="/contact" className="text-primary hover:underline">
                        Contact for pricing
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}