"use client"

import React, { useEffect, useRef, useState } from "react"
import { Palette, Lightbulb, Layers, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"



const DISPLAY_FONT = "var(--font-display, 'Fraunces', ui-serif, Georgia, serif)"

const processSteps: Step[] = [
  {
    icon: Lightbulb,
    title: "Inspiration",
    description:
      "It all starts with a spark sometimes a walk in nature, a fleeting emotion, or a memory. I let these moments guide my imagination and fuel my creativity.",
    details:
      "I find inspiration everywhere: in morning light, old photographs, conversations, and quiet moments of reflection.",
    color: "#FF6B6B",
    blob: "63% 37% 54% 46% / 43% 37% 63% 57%",
  },
  {
    icon: Palette,
    title: "Exploration",
    description:
      "I play with colors, textures, and techniques, letting curiosity lead the way. This is where ideas begin to take shape and possibilities unfold.",
    details:
      "Experimentation is key mixing mediums, trying new approaches, and embracing the unexpected discoveries along the way.",
    color: "#4ECDC4",
    blob: "42% 58% 61% 39% / 47% 45% 55% 53%",
  },
  {
    icon: Layers,
    title: "Creation",
    description:
      "Layer by layer, I build the piece, adding depth and meaning. Each stroke and detail is a step closer to the story I want to tell.",
    details:
      "This is where patience meets passion carefully building up the artwork while staying open to how it wants to evolve.",
    color: "#FFE66D",
    blob: "55% 45% 38% 62% / 60% 40% 58% 42%",
  },
  {
    icon: Sparkles,
    title: "Refinement",
    description:
      "The final touches matter most. I spend time perfecting details, adjusting balance, and making sure the artwork feels complete before sharing it.",
    details:
      "These finishing moments are magical when everything comes together and the piece finally says what I intended it to say.",
    color: "#B794F6",
    blob: "48% 52% 65% 35% / 40% 62% 38% 60%",
  },
]

interface Step {
  icon: LucideIcon
  title: string
  description: string
  details: string
  color: string
  blob: string
}

function useContainerScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    let ticking = false

    const compute = () => {
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.88 // progress = 0 when the top of the timeline reaches here
      const end = vh * 0.35 // progress = 1 when the bottom of the timeline reaches here
      const total = rect.height + (start - end)
      const raw = (start - rect.top) / total
      setProgress(Math.min(1, Math.max(0, raw)))
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    compute()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return { ref, progress }
}


function useRailPoints(
  railRef: React.RefObject<HTMLDivElement>,
  iconRefs: React.RefObject<HTMLDivElement>[],
) {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([])
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const measure = () => {
      const rail = railRef.current
      if (!rail) return
      const railBox = rail.getBoundingClientRect()
      const next = iconRefs.map((r) => {
        const el = r.current
        if (!el) return null
        const box = el.getBoundingClientRect()
        return {
          x: box.left - railBox.left + box.width / 2,
          y: box.top - railBox.top + box.height / 2,
        }
      })
      if (next.every((p): p is { x: number; y: number } => p !== null)) {
        setPoints(next)
      }
      setHeight(railBox.height)
    }

    measure()
    const ro = new ResizeObserver(measure)
    if (railRef.current) ro.observe(railRef.current)
    window.addEventListener("resize", measure)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { points, height }
}


function buildWavePath(points: { x: number; y: number }[]) {
  if (points.length < 2) return ""
  let d = `M${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i]
    const p1 = points[i + 1]
    const midY = (p0.y + p1.y) / 2
    const bow = i % 2 === 0 ? 14 : -14
    d += ` C${p0.x + bow},${midY} ${p1.x + bow},${midY} ${p1.x},${p1.y}`
  }
  return d
}


function RailLine({
  progress,
  points,
  height,
}: {
  progress: number
  points: { x: number; y: number }[]
  height: number
}) {
  if (points.length < 2 || height === 0) return null

  const d = buildWavePath(points)
  const stops = processSteps.map((step, i) => (
    <stop
      key={step.title}
      offset={`${(i / (processSteps.length - 1)) * 100}%`}
      stopColor={step.color}
    />
  ))

  return (
    <svg
      viewBox={`0 0 56 ${height}`}
      className="absolute left-0 top-0 w-14"
      style={{ height }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rail-gradient" x1="0" y1="0" x2="0" y2="1">
          {stops}
        </linearGradient>
      </defs>
      {/* resting path, always faintly visible */}
      <path d={d} stroke="#d9ddeb2a" strokeWidth="6" strokeLinecap="round" fill="none" />
      {/* colored path fills in top-to-bottom as progress climbs */}
      <path
        d={d}
        pathLength={1}
        stroke="url(#rail-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: 1,
          strokeDashoffset: 1 - progress,
        }}
      />
    </svg>
  )
}

function TimelineStep({
  step,
  index,
  isLast,
  iconRef,
}: {
  step: Step
  index: number
  isLast: boolean
  iconRef: React.RefObject<HTMLDivElement>
}) {
  const Icon = step.icon
  const rotate = index % 2 === 0 ? -4 : 4

  return (
    <div className="flex gap-6">
      {/* rail: icon sits above the shared line, which is drawn separately */}
      <div className="flex flex-col items-center shrink-0 w-14">
        <div
          ref={iconRef}
          className="relative z-10 w-14 h-14 flex items-center justify-center shrink-0 shadow-lg"
          style={{
            background: step.color,
            borderRadius: step.blob,
            transform: `rotate(${rotate}deg)`,
            boxShadow: `0 12px 28px -12px ${step.color}aa`,
          }}
        >
          <Icon className="w-6 h-6 text-white" strokeWidth={2.25} />
        </div>
      </div>

      {/* content */}
      <div className={`max-w-2xl text-left ${isLast ? "pt-1" : "pt-1 pb-10"}`}>
        <span
          className="block text-xs font-bold tracking-[0.18em] uppercase mb-1"
          style={{ color: step.color }}
        >
          Step {String(index + 1).padStart(2, "0")}
        </span>
        <h3
          className="italic text-2xl sm:text-3xl font-medium mb-2"
          style={{ fontFamily: DISPLAY_FONT }}
        >
          {step.title}
        </h3>
        <p className="text-stone-500 leading-relaxed mb-3">{step.description}</p>
        <p className="text-sm italic text-stone-500 leading-relaxed">{step.details}</p>
      </div>
    </div>
  )
}

export default function ProcessTimeline() {
  const { ref: railRef, progress } = useContainerScrollProgress<HTMLDivElement>()
  const iconRefs = useRef(processSteps.map(() => React.createRef<HTMLDivElement>())).current
  const { points, height } = useRailPoints(railRef, iconRefs)

  return (
    <main className="">
      <div className="max-w-3xl mx-auto">
        <div className="pb-24">
      <h3 className="text-5xl md:text-6xl font-serif font-bold  theme-text-primary mb-6">
           How I {" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Work
            </span>
          </h3>
             <p className="text-xl theme-text-secondary max-w-3xl mx-auto">
          Every artwork I create is a little adventure. I love exploring new ideas and letting my feelings guide my hands.
          </p>
</div>
        <div ref={railRef} className="relative flex flex-col">
          <RailLine progress={progress} points={points} height={height} />
          {processSteps.map((step, index) => (
            <TimelineStep
              key={step.title}
              step={step}
              index={index}
              isLast={index === processSteps.length - 1}
              iconRef={iconRefs[index]}
            />
          ))}
        </div>
      </div>
    </main>
  )
}