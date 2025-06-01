"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Lens } from "@/components/magicui/lens"
import one from "../public/Art/1000013360.jpg"
import two from "../public/Art/20240822_080116.jpg"
import three from "../public/Art/20240822_080254.jpg"
import four from "../public/Art/20240822_081113.jpg"
import five from "../public/Art/CamScanner 06-22-2024 00.46_1.jpg"
import six from "../public/Art/CamScanner 08-19-2024 19.46_4.jpg"
import seven from "../public/Art/CamScanner 08-19-2024 19.46_6.jpg"
import eight from "../public/Art/IMG-20c8848391c731712123683533765a77-V.jpg"
import nine from "../public/Art/IMG_20210213_171555_240.jpg"
import ten from "../public/Art/IMG_20210420_133301_982.jpg"
import eleven from "../public/Art/RUID52c7e29134504ea5a0353c78824c5658.jpg"
import twelve from "../public/Art/RUID7f5cbf30e4054ab4a287bc654b4010fa.jpg"
import therteen from "../public/Art/asd.jpg"

// All artworks
const allArtworks = [
	{ id: 1, title: "Ethereal Dreams", category: "Painting", year: 2023, image: one, color: "#FF1493", description: "Oil on canvas exploring themes of consciousness and dreams." },
	{ id: 2, title: "Urban Fragments", category: "Digital", year: 2022, image: two, color: "#00BFFF", description: "Digital collage representing urban life and its complexities." },
	{ id: 3, title: "Harmony in Bronze", category: "Sculptures", year: 2023, image: three, color: "#32CD32", description: "Bronze sculpture exploring balance and harmony in form." },
	{ id: 4, title: "Reflections", category: "Painting", year: 2021, image: four, color: "#FFD700", description: "Acrylic on canvas depicting reflections on water surfaces." },
	{ id: 5, title: "Digital Dystopia", category: "Digital", year: 2022, image: five, color: "#8A2BE2", description: "Digital art exploring themes of technology and society." },
	{ id: 6, title: "Spatial Concept", category: "Installations", year: 2023, image: six, color: "#FF5757", description: "Mixed media installation examining space and perception." },
	{ id: 7, title: "Chromatic Fusion", category: "Painting", year: 2021, image: seven, color: "#FF8C00", description: "Oil on canvas exploring color theory and emotional response." },
	{ id: 8, title: "Geometric Harmony", category: "Sculptures", year: 2022, image: eight, color: "#20B2AA", description: "Marble sculpture focusing on geometric patterns and forms." },
	{ id: 9, title: "Virtual Landscapes", category: "Digital", year: 2023, image: nine, color: "#C71585", description: "Digital artwork creating imaginary landscapes and environments." },
	{ id: 10, title: "Temporal Shift", category: "Installations", year: 2021, image: ten, color: "#4682B4", description: "Interactive installation exploring concepts of time and change." },
	{ id: 11, title: "Abstract Emotions", category: "Painting", year: 2022, image: eleven, color: "#B22222", description: "Abstract expressionist painting capturing raw emotional states." },
	{ id: 12, title: "Digital Metamorphosis", category: "Digital", year: 2023, image: twelve, color: "#228B22", description: "Digital artwork exploring transformation and evolution." },
	{ id: 13, title: "Untitled", category: "Mixed Media", year: 2024, image: therteen, color: "#9370DB", description: "A mysterious piece with an experimental approach." },
]

// Utility to get 6 random artworks (no repeats)
function getRandomArtworks(arr: typeof allArtworks, n: number) {
	const shuffled = [...arr].sort(() => 0.5 - Math.random())
	return shuffled.slice(0, n)
}

export default function GallerySection() {
	const containerRef = useRef<HTMLDivElement>(null)
	const isInView = useInView(containerRef, { once: true, margin: "-100px" })

	// Only pick random images after hydration
	const [artworks, setArtworks] = useState<typeof allArtworks>([])

	useEffect(() => {
		setArtworks(getRandomArtworks(allArtworks, 7))
	}, [])

	return (
		<section
			id="gallery"
			ref={containerRef}
			className="py-32 bg-white dark:bg-gray-950 relative overflow-hidden"
			aria-labelledby="gallery-section-title"
		>
			<h2 id="gallery-section-title" className="sr-only">
				Gallery Section: A Few of My random Works
			</h2>

			{/* Animated background elements */}
			<motion.div
				className="absolute top-20 right-20 w-32 h-32 bg-pink-500/5 rounded-full blur-3xl"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.6, 0.3],
				}}
				transition={{
					duration: 4,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-20 left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl"
				animate={{
					scale: [1.2, 1, 1.2],
					opacity: [0.6, 0.3, 0.6],
				}}
				transition={{
					duration: 5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
					delay: 1,
				}}
			/>

			<div className="container relative z-10">
				<motion.div
					className="text-center mb-20"
					initial={{ opacity: 0, y: 50 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
					transition={{ duration: 0.8 }}
				>
					<motion.h2
						className="text-6xl md:text-7xl font-serif font-light text-gray-900 dark:text-white mb-6 tracking-tight"
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
							Gallery Section: 
						<motion.span
							className="block italic text-gray-500 dark:text-gray-400"
							initial={{ opacity: 0, x: -20 }}
							animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
							transition={{ duration: 0.8, delay: 0.4 }}
						>
						Few of My Works
						</motion.span>
					</motion.h2>
					<motion.p
						className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-light"
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						A selection of notable artworks, thoughtfully created to inspire and captivate.
					</motion.p>
				</motion.div>

				{/* Masonry-style gallery for images of different sizes */}
				<motion.div
					className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.6 }}
				>
					{artworks.length === 0 ? (
						<div className="text-center text-gray-400 py-12">Loading...</div>
					) : (
						artworks.map((artwork, index) => (
							<motion.div
								key={artwork.id}
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								className="mb-4 break-inside-avoid cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-900"
							>
								<Lens zoomFactor={1.4}>
									<Image
										src={artwork.image}
										alt={artwork.title}
										className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
										placeholder="blur"
									/>
								</Lens>
							</motion.div>
						))
					)}
				</motion.div>

				<motion.div
					className="mt-20 text-center"
					initial={{ opacity: 0, y: 30 }}
					animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.8, delay: 1.4 }}
				>
					<Link href="/gallery">
						<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
							<Button
								size="lg"
								className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full px-8 py-4 font-medium group"
							>
								View All Work
								<ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
							</Button>
						</motion.div>
					</Link>
				</motion.div>
			</div>
		</section>
	)
}
