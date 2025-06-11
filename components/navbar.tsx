"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import logo from "@/public/logo.png"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Artist", href: "#artist" },
  { name: "Gallery", href: "#gallery" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Scroll position and section highlight
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      if (isHomePage) {
        let current = ""
        navItems
          .filter((item) => item.href.startsWith("#"))
          .forEach((item) => {
            const id = item.href.replace("#", "")
            const el = document.getElementById(id)
            if (!el) return
            const rect = el.getBoundingClientRect()
            if (rect.top <= window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
              current = id
            }
          })
        setActiveSection(current)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isHomePage])

  const isActive = (href: string) => {
    // Home is only active on exact "/"
    if (href === "/") return pathname === "/" && !activeSection
    // Section links are only active on homepage and when that section is active
    if (href.startsWith("#") && isHomePage) {
      return activeSection === href.replace("#", "")
    }
    // Never active for section links on non-homepage
    return pathname === href
  }

  const currentNavItems = navItems.map((item) =>
    !isHomePage && item.href.startsWith("#") ? { ...item, href: `/#${item.href.replace("#", "")}` } : item,
  )

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
  }

  const mobileNavItemVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled || !isHomePage ? "bg-white/90 dark:bg-gray-950/90 backdrop-blur-md " : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="font-serif text-2xl font-light">
          <motion.span
            className="text-red-400 dark:text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Image src={logo || "/placeholder.svg"} alt="Sneha" width={110} height={40} className="object-contain" />
          </motion.span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {currentNavItems.map((item, index) => (
            <motion.div
              key={item.name}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              <Link
                href={item.href}
                className={`relative group transition-all duration-500 font-light ${
                  scrolled || !isHomePage
                    ? "text-lg text-red-400 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    : "text-2xl text-white hover:text-gray-200"
                } ${isActive(item.href) ? "font-semibold text-gray-900 dark:text-white" : ""}`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                <span
                  className={`block absolute -bottom-1 left-0 h-[3px] rounded-full bg-red-400 transition-all duration-500 ease-in-out
                    ${
                      isActive(item.href)
                        ? "w-full scale-x-100"
                        : "w-0 scale-x-0 group-hover:scale-x-100 group-hover:w-full"
                    }
                  `}
                  style={{
                    transitionProperty: "width,transform",
                    transformOrigin: "left",
                    boxShadow: isActive(item.href) ? "0 1px 0 0 #f87171, 0 2px 8px 0 #f8717155" : undefined,
                    filter: isActive(item.href) ? "blur(0.2px)" : undefined,
                  }}
                />
              </Link>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 1.0 }}
          >
            <ModeToggle />
          </motion.div>

        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            className="text-gray-900 dark:text-white"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white/100 dark:bg-gray-950/100 backdrop-blur-sm z-50 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-white dark:bg-gray-950" />
            <div className="flex justify-end p-6 relative z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-gray-900 dark:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center h-[calc(100vh-100px)] gap-8 relative z-10">
              {currentNavItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={mobileNavItemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={`text-4xl font-serif font-light text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
                      isActive(item.href) ? "underline" : ""
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
