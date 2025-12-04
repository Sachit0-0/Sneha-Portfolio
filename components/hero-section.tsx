"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

import bg from "../public/1.jpg"

interface ArtistBannerProps {
  title?: string
  subtitle?: string
  description?: string
  ctaText?: string
  ctaHref?: string
  backgroundImage?: string | null
}

export default function ArtistBanner({
  title = "SNEHA RAI",
  subtitle = "Visual Artist",
  description = "Creating bold, expressive works that challenge perception and evoke emotion",
  ctaText = "Explore Gallery",
  ctaHref = "/gallery",
  backgroundImage = bg.src,
}: ArtistBannerProps) {
  const [scrollY, setScrollY] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY)
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Calculate effects based on scroll - slower transitions
  const opacity = Math.max(0, 1 - scrollY / 1000)
  const translateY = scrollY * 0.3
  const scale = 1 + scrollY * 0.0001

  // Function to handle CTA click for navigation
  const handleCtaClick = () => {
    if (ctaHref) {
      // Use window.location.href for simple client-side navigation
      // or a router function like router.push(ctaHref) if using Next.js App Router/Pages Router
      window.location.href = ctaHref
    }
  }

  return (
    <>
      <section 
        ref={sectionRef} 
        className="relative w-full min-h-screen overflow-hidden bg-black" 
        aria-label="Artist introduction banner"
        style={{ opacity }}
      >

        {/* Background Image with Optimized Effects */}
<div 
  className="absolute inset-0 z-0"
  style={{ 
    transform: `translateY(${translateY}px) scale(${scale})`,
    willChange: scrollY > 0 ? 'transform' : 'auto'
  }}
>
  <motion.div
    className="w-full h-full overflow-hidden" 
    initial={{ opacity: 0, scale: 1.0 }} 
    animate={{ opacity: 1, scale: 1.2 }}
    transition={{ duration: 5, ease: "easeOut" }} 
  >
    <img
      src={backgroundImage || "/placeholder.svg"}
      alt="Artistic background"
      className="w-full h-full object-cover"
      style={{ filter: 'brightness(0.6) contrast(1.1)' }}
    />
  </motion.div>
</div>


        <div className="relative z-20 w-full min-h-screen flex flex-col  justify-between py-12 px-6 sm:px-12 lg:px-20">
          {/* Top Section - Description with Bounce Animation */}
          <motion.div 
            className="sm:mt-20"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2, 
              ease: [0.34, 1.56, 0.64, 1],
              type: "spring",
              stiffness: 100
            }}
          >
        
            
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-orange-300/80 via-pink-300/70 to-purple-300 max-w-4xl leading-relaxed font-light py-20">
              {description}
            </p>
              
            
          </motion.div>

          {/* Bottom Section - Name and Title with Improved Layout */}
          <div className="space-y-8">
            {/* Artist Name */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.9, 
                delay: 0.5, 
                ease: [0.34, 1.56, 0.64, 1],
                type: "spring",
                stiffness: 80
              }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[200px] font-black leading-none tracking-tighter">
                {/* REFINED: Using white/pink/purple gradient with transparency */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-pink-300/40 to-purple-300/95 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                  {title}
                </span>
              </h1>
            </motion.div>

            {/* Subtitle and CTA Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.7,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold tracking-[0.15em] uppercase">
                  {/* REFINED: Using white/pink gradient with high transparency */}
                  <span className="ml-28 text-transparent bg-clip-text bg-gradient-to-r from-white/60 to-pink-400/70">
                    {subtitle}
                  </span>
                </p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.9,
                  type: "spring",
                  stiffness: 150
                }}
              >
                {/* *** FIX APPLIED HERE: Replaced onClick={ctaHref} with onClick={handleCtaClick} *** This ensures a valid function is passed to the onClick handler.
                */}
                <button 
                  onClick={handleCtaClick} 
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-400/60 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600/60 to-purple-600/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <span className="relative flex items-center gap-2 text-white font-bold text-lg">
                    {ctaText}

                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-white/60 uppercase tracking-widest">Scroll</span>
            <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

    </>
  )
}