"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function AboutPage() {
  return (
    <div className="container py-12 md:py-16 lg:py-24">
      <motion.h1
        className="mb-8 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About the Artist
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Image
            src="/placeholder.svg?height=600&width=500"
            alt="Artist portrait"
            width={500}
            height={600}
            className="rounded-lg object-cover w-full h-auto shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-serif font-bold">Jane Doe</h2>
          <p className="text-lg text-muted-foreground">
            Contemporary artist based in New York, exploring the boundaries between traditional and digital mediums.
          </p>
          <div className="space-y-4">
            <p>
              With over 15 years of experience in the art world, Jane has developed a unique style that combines
              classical techniques with modern themes. Her work has been exhibited in galleries across Europe and North
              America.
            </p>
            <p>
              Jane's artistic journey began at the Royal Academy of Arts, where she studied classical painting before
              expanding into experimental mediums. Her work often explores themes of nature, technology, and human
              connection.
            </p>
            <p>
              When not in her studio, Jane teaches workshops and mentors emerging artists, sharing her passion for
              creative expression and technical innovation.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Education</h3>
          <ul className="space-y-2">
            <li>MFA, Royal Academy of Arts</li>
            <li>BFA, New York University</li>
            <li>Digital Arts Certificate, Media Lab</li>
          </ul>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Exhibitions</h3>
          <ul className="space-y-2">
            <li>MoMA, New York (2023)</li>
            <li>Tate Modern, London (2021)</li>
            <li>Centre Pompidou, Paris (2019)</li>
          </ul>
        </div>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">Awards</h3>
          <ul className="space-y-2">
            <li>National Arts Prize (2022)</li>
            <li>Digital Innovation Award (2020)</li>
            <li>Young Artist Fellowship (2018)</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
