import Link from "next/link"
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="theme-bg-primary py-16 relative overflow-hidden border-t border-gray-200 dark:border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/10 dark:from-purple-900/20 to-transparent" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <Link href="/" className="font-serif text-3xl font-bold mb-6 md:mb-0">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              ARTFOLIO
            </span>
          </Link>

          <div className="flex space-x-6">
            <Link href="#" className="theme-text-secondary hover:text-pink-400 transition-colors">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="theme-text-secondary hover:text-cyan-400 transition-colors">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="theme-text-secondary hover:text-blue-400 transition-colors">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="theme-text-secondary hover:text-red-400 transition-colors">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">Youtube</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="theme-text-primary font-medium mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="#process" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Process
                </Link>
              </li>
              <li>
                <Link href="#about" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#contact" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="theme-text-primary font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Commissions
                </Link>
              </li>
              <li>
                <Link href="#" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="#" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="#" className="theme-text-secondary hover:text-pink-400 transition-colors">
                  Collaborations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="theme-text-primary font-medium mb-4">Newsletter</h3>
            <p className="theme-text-secondary mb-4">
              Subscribe to receive updates on new artwork, exhibitions, and events.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex h-10 w-full rounded-l-md border border-white/20 bg-white/5 px-3 py-2 text-sm theme-text-primary placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                type="submit"
                className="rounded-r-md bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-pink-600 hover:to-purple-700"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/10 pt-8 text-center theme-text-muted text-sm">
          <p>&copy; {new Date().getFullYear()} ARTFOLIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
