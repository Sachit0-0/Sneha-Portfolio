"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Image from "next/image"


const FONT_CLASS = "font-playfair-display" 
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
      // Set scrolled state based on position
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
            // Check if section is in the middle third of the viewport
            if (rect.top <= window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.4) {
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

  // Determine dynamic size classes
  const logoSizeClass = scrolled || !isHomePage ? "w-36 h-32" : "w-44 h-44" 
  const textSizeClass = scrolled || !isHomePage ? "text-xl font-light" : "text-2xl font-normal" 

  const shouldShowToggle = scrolled || !isHomePage

  return (
    <motion.header
      className={`fixed top-0 w-full z-40 transition-all duration-500 ${
        scrolled || !isHomePage ? "bg-gray-50 dark:bg-[#11151c] backdrop-blur-md " : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >

      <div className="container mx-auto px-4 flex h-20 items-center justify-between ">
        <Link href="/" className={`${FONT_CLASS} text-2xl font-light -ml-4`}> 
          <motion.span
            className="text-red-400 dark:text-white transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* DYNAMIC LOGO SIZE */}
            <Image 
              src="/logo.png" 
              alt="Sneha" 
              width={150} 
              height={50} 
              className={`object-contain transition-all duration-300 ${logoSizeClass}`} 
            />
          </motion.span>
        </Link>

        {/* Desktop nav */}
        {/* ➡️ FONT CHANGE: Applied custom font class to nav items */}
        <nav className={`hidden md:flex items-center gap-10 ${FONT_CLASS}`}>
          {currentNavItems.map((item, index) => (
            <motion.div
              key={item.name}
              variants={navItemVariants}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.7 + index * 0.08, ease: "easeInOut" }}
            >
              <Link
                href={item.href}
                className={`relative group transition-all duration-300 ${
                  scrolled || !isHomePage
                    ? "text-black dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    : "text-white hover:text-gray-200"
                } ${
                  // DYNAMIC TEXT SIZE
                  textSizeClass
                } ${
                  isActive(item.href) ? " text-gray-900 dark:text-white" : ""
                }`}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
                {/* Handstroke underline SVG */}
                <span className="absolute left-0 -bottom-1 w-full h-1 pointer-events-none">
                  <svg
                    viewBox="0 0 100 4"
                    preserveAspectRatio="none"
                    className={`w-full h-full transition-all duration-700 ease-[cubic-bezier(.77,0,.18,1)] ${
                      isActive(item.href)
                        ? "opacity-100 scale-x-100"
                        : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100"
                    }`}
                    style={{ transformOrigin: "left" }}
                  >
                    <path
                      d="M5,2 Q30,4 50,2 Q70,0 95,2"
                      stroke="#d034ff81"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}


          <motion.div
            key="mode-toggle-desktop-container"
            initial={false}
            animate={shouldShowToggle ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, width: 'auto', transition: { duration: 0.3 } },
              hidden: { opacity: 0, width: 0, transition: { duration: 0.3 } },
            }}
            // Ensure the ModeToggle is never clickable when hidden
            className={shouldShowToggle ? "" : "pointer-events-none"}
          >
            <ModeToggle />
          </motion.div>
        </nav>

        {/* Mobile menu toggle */}
        <div className="md:hidden flex items-center gap-4">
         
          <motion.div
            key="mode-toggle-mobile-container"
            initial={false}
            animate={shouldShowToggle ? "visible" : "hidden"}
            variants={{
              visible: { opacity: 1, width: 'auto', marginRight: '16px', transition: { duration: 0.3 } },
              hidden: { opacity: 0, width: 0, marginRight: '0px', transition: { duration: 0.3 } },
            }}
            className={shouldShowToggle ? "flex items-center" : "pointer-events-none"}
          >
            <ModeToggle />
          </motion.div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu 
              className={`h-6 w-6 transition-colors duration-300 ${
                scrolled || !isHomePage ? "text-gray-900 dark:text-white" : "text-white"
              }`}
            />
          </Button>
        </div>
      </div>

      {/* Mobile menu (Remains unchanged) */}
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
            <nav className="flex flex-col items-center bg-white/100 dark:bg-gray-950/100 justify-center h-[calc(100vh-0.5px)] gap-8 relative z-10">
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
                    className={`text-4xl ${FONT_CLASS} font-light text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors ${
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