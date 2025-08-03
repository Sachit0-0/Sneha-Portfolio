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
  const isInView = useInView(ref, {
    amount: 0.3,
    once: true, // Only trigger once for better performance
  })
  const controls = useAnimation()

  // Handle image load events
  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {
    setImageError(true)
    setImageLoaded(true) // Still show content even if image fails
  }, [])

  // Trigger animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  // Optimized animation variants
  const containerVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const itemVariants: Variants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      },
    },
  }

  const buttonVariants: Variants = {
    hidden: {
      y: 30,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1,
      },
    },
  }

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen overflow-hidden flex items-center"
      aria-label="Artist introduction banner"
    >
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        {!imageError && (
          <Image
            src={backgroundImage || "/placeholder.svg"}
            alt="Abstract artistic background showcasing creative work"
            fill
            className={`object-cover transition-opacity duration-700 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            priority
            quality={90}
            onLoad={handleImageLoad}
            onError={handleImageError}
            sizes="100vw"
          />
        )}

        {/* Fallback background */}
        {imageError && <div className="w-full h-full bg-gradient-to-br from-purple-900 via-rose-800 to-orange-700" />}

        {/* Loading placeholder */}
        {!imageLoaded && !imageError && <div className="w-full h-full bg-gray-900 animate-pulse" />}
      </div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />

      {/* Content Container */}
      <div className="relative z-20 w-full h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="space-y-6 sm:space-y-8 md:space-y-10"
            >
              {/* Subtitle */}
              <motion.p
                variants={itemVariants}
                className="text-sm xs:text-base sm:text-lg md:text-xl font-medium tracking-[0.25em] text-rose-400 uppercase"
                role="doc-subtitle"
              >
                {subtitle}
              </motion.p>

              {/* Main Title */}
              <motion.h1
                variants={itemVariants}
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tight"
              >
                <span className="block drop-shadow-2xl">{title}</span>
              </motion.h1>

              {/* Decorative Line */}
              <motion.div
                variants={itemVariants}
                className="h-1 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-rose-500 to-purple-500 rounded-full shadow-lg"
                role="presentation"
              />

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-purple-100 max-w-3xl font-light leading-relaxed"
              >
                {description}
              </motion.p>

              {/* CTA Button */}
              <motion.div variants={buttonVariants} className="pt-4 sm:pt-6">
                <Link
                  href={ctaHref}
                  className="inline-block group focus:outline-none focus:ring-4 focus:ring-rose-500/50 rounded-xl"
                >
                  <motion.div
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-semibold text-base sm:text-lg shadow-xl transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-rose-500/25"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(244, 63, 94, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <span className="relative z-10">{ctaText}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
