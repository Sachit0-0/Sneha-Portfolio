import HeroSection from "@/components/hero-section"
import GallerySection from "@/components/gallery-section"
import ArtistSection from "@/components/artist-section"
import ProcessSection from "@/components/process-section"
import ContactSection from "@/components/contact-section"


export default function Home() {
  return (
    <>
      <main className="overflow-hidden">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="artist">
          <ArtistSection />
        </section>
        <section id="gallery">
          <GallerySection />
        </section>
        <section id="process">
          <ProcessSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>
    </>
  )
}
