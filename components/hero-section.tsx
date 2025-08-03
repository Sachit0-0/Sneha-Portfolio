"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { motion, useAnimation, useInView, type Variants } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import bg from "../public/1.jpg"

interface ArtistBannerProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  backgroundImage?: string | any
}

export default function ArtistBanner({
  title = "SNEHA RAI",
  subtitle = "Visual Artist",
  description = "Creating bold, expressive works that challenge perception and evoke emotion",
  ctaText = "Explore Gallery",
  ctaHref = "/gallery",
  backgroundImage = bg,
}: ArtistBannerProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { amount: 0.3, once: true })
  const controls = useAnimation()

  const handleImageLoad = useCallback(() => setImageLoaded(true), [])
  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true)
  }, [])

  useEffect(() => {
    if (isInView) controls.start("visible")
  }, [isInView, controls])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1, duration: 0.5, ease: "easeOut" },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 24, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const buttonVariants: Variants = {
    hidden: { y: 24, opacity: 0, scale: 0.96 },
    visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.1 } },
  }

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      aria-label="Artist introduction banner"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        {!imageError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="w-full h-full"
          >
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt="Artistic background"
              fill
              className="object-cover"
              priority
              quality={80}
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="100vw"
            />
          </motion.div>
        )}
        {imageError && <div className="w-full h-full bg-gradient-to-br from-purple-900 via-rose-800 to-orange-700" />}
        {!imageLoaded && !imageError && <div className="w-full h-full bg-gray-900 animate-pulse" />}
      </div>

      {/* Single Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="space-y-6 sm:space-y-8 md:space-y-10"
            >
              <motion.p
                variants={itemVariants}
                className=" sm:text-lg md:text-xxl text-4xl tracking-[0.18em] text-orange-400 uppercase"
                role="doc-subtitle"
              >
                {subtitle}
              </motion.p>
              <motion.h1
                variants={itemVariants}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[0.95] tracking-tight"
              >
                <span>{title}</span>
              </motion.h1>
              <motion.div
                variants={itemVariants}
                className="h-1 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full"
                role="presentation"
              />
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl text-purple-100 max-w-2xl font-light leading-relaxed"
              >
                {description}
              </motion.p>
              <motion.div variants={buttonVariants} className="pt-4 sm:pt-6">
                <Link
                  href={ctaHref}
                  className="inline-block group focus:outline-none focus:ring-4 focus:ring-rose-500/50 rounded-xl"
                >
                  <motion.div
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl transition-all duration-300 group-hover:shadow-orange-500/25"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{ctaText}</span>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-8 border-2 border-white/40 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
