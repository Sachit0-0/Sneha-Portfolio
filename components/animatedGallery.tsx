'use client'

import styles from './styles.module.scss'
import one from '../public/Art/1000013360.jpg'
import three from '../public/Art/20240822_080254.jpg'
import four from '../public/Art/20240822_081113.jpg'
import five from '../public/Art/CamScanner 06-22-2024 00.46_1.jpg'
import six from '../public/Art/CamScanner 08-19-2024 19.46_4.jpg'
import seven from '../public/Art/CamScanner 08-19-2024 19.46_6.jpg'
import Image from 'next/image'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

export default function AnimatedGallery() {
    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4])
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5])
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6])
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8])
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9])

    const pictures = [
        { src: one, scale: scale4 },
        { src: three, scale: scale5 },
        { src: four, scale: scale6 },
        { src: five, scale: scale5 },
        { src: six, scale: scale6 },
        { src: seven, scale: scale8 }
    ]

    return (
        <>
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {pictures.map(({ src, scale }, index) => (
                    <motion.div key={index} style={{ scale }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image
                                src={src}
                                fill
                                alt="image"
                                placeholder="blur"
                            />
                        </div>
                    </motion.div>
                ))}
            </div>

            	
				
				
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2rem' }}>
            <Link href="/gallery">
                <Button
                    size="lg"
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 rounded-full p-8 m-8 font-medium group"
                >
                    View All Work
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
            </Link>
        </div>
        </>
    )
}