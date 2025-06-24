"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import bg from "../public/1.jpg"

export default function ArtistBanner() {
  const [isLoaded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.3 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Text animation variants
  const textContainer = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        duration: 0.5,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
        duration: 0.5,
      },
    },
  }

  const textItem = {
    hidden: { y: 20, opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
  }

  return (
    <div ref={ref} className="relative w-full min-h-screen overflow-hidden flex items-center">
      {/* Full-width background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg}
          alt="Artist background"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

      {/* Text content - positioned on the left */}
      <div className="relative z-20 flex items-center w-full h-full">
        <div className="container mx-auto px-4 sm:px-6 flex justify-start items-center h-full">
          <div className="max-w-2xl w-full">
            <motion.div
              variants={textContainer}
              initial="hidden"
              animate={controls}
              className="space-y-10"
            >
              <motion.h2
                variants={textItem}
                className="text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.3em] text-rose-400 uppercase"
              >
                Visual Artist
              </motion.h2>

              <motion.h1
                variants={textItem}
                className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl font-extrabold text-white drop-shadow-lg"
              >
                SNEHA RAI
              </motion.h1>

              <motion.div variants={textItem} className="h-2 w-24 sm:w-40 bg-rose-500 rounded-full" />

              <motion.p
                variants={textItem}
                className="text-xl sm:text-2xl md:text-3xl text-purple-200 max-w-2xl font-light"
              >
                Creating bold, expressive works that challenge perception and evoke emotion
              </motion.p>

              <Link href="/gallery" passHref>
                <motion.button
                  variants={textItem}
                  className="px-8 py-3 mt-12 sm:px-10 sm:py-4 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition-colors text-lg sm:text-xl font-semibold shadow-lg"
                  whileHover={{ scale: 1.07 }}
                  whileTap={{ scale: 0.97 }}
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
