"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, Phone, Instagram } from "lucide-react"
import BrushStroke from "@/components/brush-stroke"

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-100px" })

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // You can add your form submission logic here
    console.log(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" ref={containerRef} className=" md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 right-0 w-1/3 h-1/3  to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <BrushStroke color="#FF5757">
            <h2 className="text-2xl theme-text-primary mb-4 font-medium">Contact Sneha Rai</h2>
          </BrushStroke>

          <h3 className="text-5xl md:text-6xl font-serif font-bold theme-text-primary mb-6">
            Let's Create Something{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Beautiful
            </span>
          </h3>

          <p className="text-xl theme-text-secondary max-w-2xl mx-auto">
            Experienced art teacher and passionate artist based in Kathmandu, Nepal. Interested in commissioning a piece,
            purchasing existing work, or just want to say hello? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-serif font-bold theme-text-primary mb-8">Say Hello</h3>

            <div className="space-y-6 mb-8">
              <motion.a
                href="mailto:esneharaii@gmail.com"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 group"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                  <Mail className="h-5 w-5 " />
                </div>
                <div>
                  <div className="theme-text-muted text-sm">Email</div>
                  <div className="theme-text-primary group-hover:text-pink-300 transition-colors">
                    esneharaii@gmail.com
                  </div>
                </div>
              </motion.a>

              <motion.a
                href="tel:9823037742"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 group"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
                  <Phone className="h-5 w-5 " />
                </div>
                <div>
                  <div className="theme-text-muted text-sm">Phone</div>
                  <div className="theme-text-primary group-hover:text-purple-300 transition-colors">9823037742</div>
                </div>
              </motion.a>

              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 group"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center">
                  <Instagram className="h-5 w-5 " />
                </div>
                <div>
                  <div className="theme-text-muted text-sm">Instagram</div>
                  <div className="theme-text-primary group-hover:text-orange-300 transition-colors">@artistportfolio</div>
                </div>
              </motion.a>

              <div className="mt-8 text-gray-500 dark:text-gray-400 text-sm">
                <div><span className="font-semibold">Address:</span> Kathmandu, Nepal</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20  placeholder:/50 h-14 rounded-xl"
                  required
                />
              </div>

              <div>
                <Input
                  name="email"
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20  placeholder:/50 h-14 rounded-xl"
                  required
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  className="bg-white/5 border-white/20  placeholder:/50 min-h-[150px] rounded-xl"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700  h-14 rounded-xl font-medium group"
              >
                Send Message
                <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
