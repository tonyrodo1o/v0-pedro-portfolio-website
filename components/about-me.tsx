'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Heart, Target, Lightbulb, X } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'

const galleryImages = [
  { id: 1, src: '/gallery/photo-1.jpg', alt: 'Professional photo 1' },
  { id: 2, src: '/gallery/photo-2.jpg', alt: 'Professional photo 2' },
  { id: 3, src: '/gallery/photo-3.jpg', alt: 'Professional photo 3' },
  { id: 4, src: '/gallery/photo-4.jpg', alt: 'Professional photo 4' },
  { id: 5, src: '/gallery/photo-5.jpg', alt: 'Professional photo 5' },
  { id: 6, src: '/gallery/photo-6.jpg', alt: 'Professional photo 6' },
]

export function AboutMe() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const values = [
    { icon: Heart, label: 'Pasión', labelEn: 'Passion', labelPt: 'Paixão' },
    { icon: Target, label: 'Excelencia', labelEn: 'Excellence', labelPt: 'Excelência' },
    { icon: Lightbulb, label: 'Innovación', labelEn: 'Innovation', labelPt: 'Inovação' },
  ]

  return (
    <section id="about-me" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary glow-text-cyan">{t.aboutMe.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.aboutMe.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass border-glow rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {t.aboutMe.bio}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {t.aboutMe.values}
              </p>

              {/* Values */}
              <div className="flex flex-wrap gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass border-glow"
                  >
                    <value.icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{value.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gallery Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold mb-6 text-foreground">{t.aboutMe.gallery}</h3>
            <div className="grid grid-cols-3 gap-3">
              {galleryImages.map((image, index) => (
                <motion.button
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedImage(image.src)}
                  className="relative aspect-square rounded-xl overflow-hidden border-glow group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary/30">{image.id}</span>
                  </div>
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-foreground text-sm transition-opacity">
                      Ver
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-4 text-center">
              * Añade tus fotos en /public/gallery/
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-3xl w-full aspect-video rounded-2xl overflow-hidden glass border-glow"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/30">Foto</span>
            </div>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full glass border-glow"
            >
              <X className="w-6 h-6 text-foreground" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
