"use client"

import type React from "react"

import { motion } from "framer-motion"

interface BrushStrokeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function BrushStroke({ children, color = "#FF5757", className = "" }: BrushStrokeProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* SVG brush stroke background */}
      <motion.svg
        className="absolute inset-0 w-full h-full -z-10"
        viewBox="0 0 200 50"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.8 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <motion.path
          d="M10,25 Q50,10 100,25 T190,25"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </motion.svg>

      {/* Content */}
      <div className="relative z-10 px-4 py-2">{children}</div>
    </div>
  )
}
