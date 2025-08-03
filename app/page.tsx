import HeroSection from "@/components/hero-section"
import ArtistSection from "@/components/artist-section"
import ProcessSection from "@/components/process-section"
import ContactSection from "@/components/contact-section"
import AnimatedGallery from "@/components/animatedGallery"

export default function Home() {
  return (
    <>
      <main className="relative">
        {/* Fixed Hero Section */}
        <section id="hero" className="sticky top-0 h-screen z-10">
          <HeroSection />
        </section>

        {/* Scrolling Content Sections */}
        <div className="relative z-20">
          <section id="artist" className="min-h-screen bg-white dark:bg-gray-950">
            <ArtistSection />
          </section>
          <section id="gallery" className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <AnimatedGallery/>
          </section>
          <section id="process" className=" bg-gray-50 dark:bg-gray-900">
            <ProcessSection />
          </section>
          <section id="contact" className="bg-gray-50 dark:bg-gray-900">
            <ContactSection />
          </section>
        </div>
      </main>
    </>
  )
}
