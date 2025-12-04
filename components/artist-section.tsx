"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import artist from "../public/2.jpg";

const achievements = [
	{
		year: "2024",
		title: "Winter Art Camp Organizer",
		venue: "Kopila Cottage Preschool, Kathmandu",
	},
	{
		year: "2023",
		title: "Art Teacher",
		venue: "Kopila Cottage Preschool, Kathmandu",
	},
	{
		year: "2022",
		title: "Fine Arts Graduate",
		venue: "Lalitkala Fine Arts, Kathmandu",
	},
];

const credentials = [
	"Fine Arts, Lalitkala Fine Arts – Bhotahity, Kathmandu",
	"Business Management, The Insight Vision College – Dhumbarahi, Kathmandu",
	"Currently teaching at Kopila Cottage Preschool (2.5 years), Baluwatar, Kathmandu",
];

export default function ArtistSection() {
	const [imageLoaded, setImageLoaded] = useState(false);

	return (
		<section
			id="artist"
			className="py-20 md:py-32 relative overflow-hidden min-h-screen"
			aria-labelledby="artist-heading"
		>

			<div className="container relative z-10 px-4 sm:px-6 lg:px-8">
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
				>
					{/* Left side - Image and badge */}
					<div className="relative flex flex-col">
						<div className="relative w-full max-w-xs sm:max-w-md mx-auto lg:mx-0">
							{/* Main artist image */}
							<div className="relative w-full aspect-[5/6] sm:aspect-auto sm:h-[600px]">
								<div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-2xl">
									{!imageLoaded && (
										<div className="absolute inset-0 flex items-center justify-center bg-white/40 dark:bg-black/40 z-10">
											<div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
										</div>
									)}
									<Image
										src={artist}
										alt="Sneha Rai, artist portrait"
										fill
										className={`object-cover rounded-2xl transition-opacity duration-500 ${
											imageLoaded ? "opacity-100" : "opacity-0"
										}`}
										onLoad={() => setImageLoaded(true)}
										priority
										sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
									/>
								</div>
								<div className="absolute -inset-4 bg-gradient-to-br from-pink-500/20 to-blue-500/20 rounded-3xl -z-10 blur-xl" />
							</div>
							{/* Floating badge */}
							<div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10 shadow-xl">
								<div className="text-center">
									<div className="text-xs opacity-90">Fine Arts</div>
									<div className="text-lg font-bold">Graduate</div>
								</div>
							</div>
							{/* Experience badge */}
							<div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs z-10 shadow-xl">
								<div className="text-center">
									<div className="text-[10px] opacity-90">2.5</div>
									<div className="text-xs font-bold">YRS TEACHING</div>
								</div>
							</div>
						</div>
						{/* Signature and socials */}
						<div className="mt-12 space-y-6 max-w-md mx-auto lg:mx-0">
							<div className="flex justify-center">
								<svg
									className="h-16 w-auto text-pink-500 dark:text-pink-400"
									viewBox="0 0 200 50"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M10,25 C30,5 50,45 70,25 C90,5 110,45 130,25 C150,5 170,45 190,25"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									/>
								</svg>
							</div>
							{/* Contact Info */}
							<div className="pt-4 text-center text-gray-600 dark:text-gray-400 text-sm space-y-1">
								<div>
									<span className="font-semibold">Address:</span> Kathmandu,
									Nepal
								</div>
								<div>
									<span className="font-semibold">Phone:</span> 9823037742
								</div>
								<div>
									<span className="font-semibold">Email:</span>{" "}
									esneharaii@gmail.com
								</div>
							</div>

							{/* View Portfolio Button */}
							<div className="pt-8 flex justify-center">
								<button>
									<span></span>
									<span></span>
									<span></span>
									<span></span> Get in Touch
								</button>
							</div>
						</div>
					</div>
					{/* Right side - Content */}
					<div className="space-y-8 lg:space-y-12">
						{/* Header */}
						<header>
							<div className="text-sm font-light text-gray-500 dark:text-gray-400 mb-4 tracking-wider uppercase">
								The Artist
							</div>
							<h2
								id="artist-heading"
								className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-gray-900 dark:text-white mb-6 tracking-tight leading-tight"
							>
								Sneha
								<span className="block italic text-gray-500 dark:text-gray-400 text-3xl sm:text-4xl lg:text-5xl">
									Rai
								</span>
							</h2>
						</header>
						{/* Summary */}
						<div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-gray-600 dark:text-gray-400 font-light leading-relaxed">
							<p>
								Sneha Rai is an visual artist based in Kathmandu, Nepal. She likes
								to work across a wide range of mediums, including acrylics, pen &
								ink, and oils. She loves experimenting with the expressive palette
								knife technique to create texture, depth and movement within her
								pieces. Rather than confining herself to one artistic identity, she
								thrives on the concept of constant exploration, challenging herself
								to discover new ways of expression and always infusing her work
								with a sense of personal uniqueness.
							</p>
						</div>
						{/* Credentials */}
						<div>
							<h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-6">
								Education & Training
							</h3>
							<div className="grid grid-cols-1 gap-3">
								{credentials.map((credential, index) => (
									<div
										key={index}
										className="flex items-center gap-3 text-gray-600 dark:text-gray-400 group cursor-default"
									>
										<div className="w-1.5 h-1.5 bg-pink-500 rounded-full flex-shrink-0 group-hover:bg-pink-600 transition-colors" />
										<span className="font-light group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
											{credential}
										</span>
									</div>
								))}
							</div>
						</div>
				
						{/* Achievements */}
						<div>
							<h3 className="text-xl font-serif font-medium text-gray-900 dark:text-white mb-6">
								Recent Experience & Recognition
							</h3>
							<div className="space-y-4">
								{achievements.map((achievement, index) => (
									<div
										key={index}
										className="flex items-start gap-4 lg:gap-6 pb-4 border-b border-gray-200 dark:border-gray-800 last:border-b-0 group cursor-default hover:bg-gray-50/50 dark:hover:bg-gray-800/50 -mx-4 px-4 rounded-lg transition-all duration-200"
									>
										<div className="text-sm font-medium text-gray-500 dark:text-gray-400 w-12 flex-shrink-0 pt-1 group-hover:text-pink-500 transition-colors">
											{achievement.year}
										</div>
										<div className="flex-1">
											<div className="font-medium text-gray-900 dark:text-white mb-1 group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
												{achievement.title}
											</div>
											<div className="text-sm text-gray-600 dark:text-gray-400 font-light">
												{achievement.venue}
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
