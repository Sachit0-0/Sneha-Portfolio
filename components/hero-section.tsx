"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import bg from "../public/1.jpg"


export default function ArtistBanner() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Text animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const textItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  return (
    <div className="relative w-full h-[600px] md:h-[900px] overflow-hidden flex items-center">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Artist background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Text content - positioned on the left */}
      <div className="relative z-20 flex items-center w-full h-full">
        <div className="container mx-auto px-4 sm:px-6 flex justify-start items-center h-full">
          <div className="max-w-md w-full">
            <motion.div
              variants={textContainer}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              className="space-y-6"
            >
              <motion.h2
                variants={textItem}
                className="text-xs sm:text-sm font-medium tracking-widest text-rose-400 uppercase"
              >
                Visual Artist
              </motion.h2>

              <motion.h1
                variants={textItem}
                className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold text-white"
              >
                SNEHA RAI
              </motion.h1>

              <motion.div variants={textItem} className="h-1 w-16 sm:w-24 bg-rose-500" />

              <motion.p
                variants={textItem}
                className="text-base sm:text-lg text-purple-400 max-w-xs sm:max-w-sm"
              >
                Creating bold, expressive works that challenge perception and evoke emotion
              </motion.p>

              <Link href="/gallery" passHref>
                <motion.button
                  variants={textItem}
                  className="px-6 py-2 mt-12 sm:px-8 sm:py-3 bg-rose-500 text-white rounded-md hover:bg-rose-600 transition-colors text-sm sm:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Gallery
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
