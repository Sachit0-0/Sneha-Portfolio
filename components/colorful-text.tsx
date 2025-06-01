"use client"

import { motion } from "framer-motion"

interface ColorfulTextProps {
  text: string
  className?: string
  delay?: number
}

export default function ColorfulText({ text, className = "", delay = 0 }: ColorfulTextProps) {
  const words = text.split(" ")
  const colors = ["#FF5757", "#FF8C00", "#FFD700", "#32CD32", "#00BFFF", "#8A2BE2", "#FF1493"]

  return (
    <div className={`overflow-hidden ${className}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-4"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + index * 0.1,
            ease: [0.76, 0, 0.24, 1],
          }}
          whileHover={{
            color: colors[index % colors.length],
            scale: 1.05,
          }}
          style={{
            background: `linear-gradient(45deg, ${colors[index % colors.length]}, ${colors[(index + 1) % colors.length]})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}
