"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "next-themes"

export default function ColorfulCursor() {
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [cursorColor, setCursorColor] = useState("#FF5757")
  const [cursorVariant, setCursorVariant] = useState("default")
  const { theme } = useTheme()

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  const colors = ["#FF5757", "#FF8C00", "#FFD700", "#32CD32", "#00BFFF", "#8A2BE2", "#FF1493"]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || window.innerWidth < 768) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      setIsVisible(true)
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      setIsHovering(true)
      if (target.matches('button, [role="button"]')) {
        setCursorVariant("button")
      } else if (target.matches("a")) {
        setCursorVariant("link")
      } else if (target.matches("input, textarea")) {
        setCursorVariant("input")
      } else {
        setCursorVariant("text")
      }
      target.classList.add("hovered-by-cursor")
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      setIsHovering(false)
      setCursorVariant("default")
      target.classList.remove("hovered-by-cursor")
    }

    const colorInterval = setInterval(() => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      setCursorColor(randomColor)
    }, 3000)

    const interactiveElements = document.querySelectorAll(
      'button, a, [role="button"], input, textarea, p, span, h1, h2, h3, h4, h5, h6, [data-radix-collection-item]',
    )

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseenter", () => setIsVisible(true))
    window.addEventListener("mouseleave", () => setIsVisible(false))

    return () => {
      clearInterval(colorInterval)
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseenter", () => setIsVisible(true))
      window.removeEventListener("mouseleave", () => setIsVisible(false))
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [mounted, cursorX, cursorY, colors])

  if (!mounted || typeof window === "undefined" || window.innerWidth < 768) {
    return null
  }

  const getCursorScale = () => {
    switch (cursorVariant) {
      case "button":
        return 2
      case "link":
        return 1.8
      case "input":
        return 1.5
      case "text":
        return 1.3
      default:
        return isHovering ? 1.5 : 1
    }
  }

  return (
    <>
      {/* Main colorful blob - Higher z-index to appear above dialogs */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          backgroundColor: cursorColor,
          zIndex: 9999,
        }}
        animate={{
          scale: getCursorScale(),
          opacity: isVisible ? 0.8 : 0,
        }}
        transition={{
          scale: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.2 },
        }}
      />

      {/* Inner dot - Higher z-index */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          backgroundColor: theme === "dark" ? "white" : "black",
          zIndex: 9999,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{
          opacity: { duration: 0.2 },
          scale: { duration: 0.3 },
        }}
      />

      {/* Trailing particles */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: `radial-gradient(circle, ${cursorColor}20 0%, transparent 70%)`,
          zIndex: 9998,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 0.6 : 0,
        }}
        transition={{
          scale: { duration: 0.4, ease: "easeOut" },
          opacity: { duration: 0.3 },
        }}
      />
    </>
  )
}
