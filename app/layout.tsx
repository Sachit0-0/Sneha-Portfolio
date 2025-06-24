import type React from "react"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Montserrat, Playfair_Display } from "next/font/google"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CatProgressBar from "@/components/cat-progress-bar"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Artistic Portfolio | Creative Showcase",
  description: "A vibrant showcase of artistic works and creative projects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", montserrat.variable, playfair.variable)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
                <CatProgressBar />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
