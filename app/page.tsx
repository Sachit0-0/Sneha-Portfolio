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
        <section id="hero" className="hero-section bg-gray-50 dark:bg-[#11151c]">
          <HeroSection />
        </section>

        {/* Scrolling Content Sections */}
        <div className="relative z-20">
          <section id="artist" className="min-h-screen bg-gray-50 dark:bg-[#11151c]">
            <ArtistSection />
          </section>
          <section id="gallery" className="min-h-screen bg-gray-50 dark:bg-[#11151c]">
            <AnimatedGallery/>
          </section>
          <section id="process" className=" pt-28 bg-gray-50 dark:bg-[#11151c]">
            <ProcessSection />
          </section>

          <section id="contact" className="bg-gray-50 dark:bg-[#11151c]">
            <ContactSection />
          </section>
        </div>
      </main>
    </>
  )
}
