"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export default function CatProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const targetProgress = useRef(0)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    const animate = () => {
      setScrollProgress(prev => {
        const diff = targetProgress.current - prev
        if (Math.abs(diff) < 0.01) {
          return targetProgress.current
        }
        return prev + diff * 0.05 // smoother easing
      })
      rafId.current = requestAnimationFrame(animate)
    }

    rafId.current = requestAnimationFrame(animate)

    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      targetProgress.current = Math.min(progress, 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-20 left-0 right-0 z-40 pointer-events-none">
      {/* Thin progress line */}
      <div className="h-1 bg-transparent dark:bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-red-400 to-pink-500"
          style={{
            width: `${scrollProgress}%`,
            willChange: "width",
          }}
        />
      </div>

      {/* Hanging cat positioned at the end of progress line */}
      <div className="relative h-0">
        <div
          className="absolute top-0 -translate-y-1/2 pointer-events-none"
          style={{
            left: `calc(${scrollProgress}% - 30px)`,
            maxWidth: "calc(100% - 60px)",
            willChange: "transform, left",
          }}
        >
          <div className="relative">
            <Image
              src="/cat2.png"
              alt="Hanging cat"
              width={80}
              height={110}
              className={`transition-transform duration-300 ${
                scrollProgress > 0 ? "animate-pulse" : ""
              }`}
              style={{
                transform: scrollProgress > 50 ? "scaleX(-1)" : "scaleX(1)",
                willChange: "transform",
              }}
            />

            {/* Subtle paw prints */}
            {scrollProgress > 5 && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="flex space-x-1">
                  <div className="w-0.5 h-0.5 bg-red-300 rounded-full opacity-60" />
                  <div className="w-0.5 h-0.5 bg-red-300 rounded-full opacity-40" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
