'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useCallback } from 'react'
import { Heart, Target, Lightbulb, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const galleryImages = [
  { id: 1, src: '/gallery/photo-1.jpg', alt: 'Professional photo 1' }, 
  { id: 2, src: '/gallery/photo-2.jpg', alt: 'Professional photo 2' },
  { id: 3, src: '/gallery/photo-3.jpg', alt: 'Professional photo 3' },
  { id: 4, src: '/gallery/photo-4.jpg', alt: 'Professional photo 4' },
  { id: 5, src: '/gallery/photo-5.jpg', alt: 'Professional photo 5' },
  { id: 6, src: '/gallery/photo-6.jpg', alt: 'Professional photo 6' },
  { id: 7, src: '/gallery/photo-7.jpg', alt: 'Professional photo 7' },
  { id: 8, src: '/gallery/photo-8.jpg', alt: 'Professional photo 8' },
]

export function AboutMe() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [galleryPage, setGalleryPage] = useState(0)

  const IMAGES_PER_PAGE = 6
  const totalGalleryPages = Math.ceil(galleryImages.length / IMAGES_PER_PAGE)
  const visibleImages = galleryImages.slice(
    galleryPage * IMAGES_PER_PAGE,
    (galleryPage + 1) * IMAGES_PER_PAGE
  )

  const values = [
    { icon: Heart, label: 'Pasión', labelEn: 'Passion', labelPt: 'Paixão' },
    { icon: Target, label: 'Excelencia', labelEn: 'Excellence', labelPt: 'Excelência' },
    { icon: Lightbulb, label: 'Innovación', labelEn: 'Innovation', labelPt: 'Inovação' },
  ]

  const openLightbox = (globalIndex: number) => {
    setSelectedImageIndex(globalIndex)
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
  }

  const goToNextImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev !== null ? (prev + 1) % galleryImages.length : 0
      )
    }
  }, [selectedImageIndex])

  const goToPrevImage = useCallback(() => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((prev) => 
        prev !== null ? (prev - 1 + galleryImages.length) % galleryImages.length : 0
      )
    }
  }, [selectedImageIndex])

  const goToNextGalleryPage = () => {
    setGalleryPage((prev) => (prev + 1) % totalGalleryPages)
  }

  const goToPrevGalleryPage = () => {
    setGalleryPage((prev) => (prev - 1 + totalGalleryPages) % totalGalleryPages)
  }

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
                    <span className="text-foreground">
                      {language === 'en' ? value.labelEn : language === 'pt' ? value.labelPt : value.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Gallery Section with Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">{t.aboutMe.gallery}</h3>
              
              {/* Gallery Navigation */}
              {totalGalleryPages > 1 && (
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={goToPrevGalleryPage}
                    className="p-2 rounded-full glass border-glow hover:glow-cyan-sm transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </motion.button>
                  <span className="text-sm text-muted-foreground">
                    {galleryPage + 1}/{totalGalleryPages}
                  </span>
                  <motion.button
                    onClick={goToNextGalleryPage}
                    className="p-2 rounded-full glass border-glow hover:glow-cyan-sm transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </motion.button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={galleryPage}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-3 gap-3"
              >
                {visibleImages.map((image, index) => {
                  const globalIndex = galleryPage * IMAGES_PER_PAGE + index
                  return (
                    <motion.button
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={() => openLightbox(globalIndex)}
                      className="relative aspect-square rounded-xl overflow-hidden border-glow group"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                        <span className="text-4xl font-bold text-primary/30">{image.id}</span>
                      </div>
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 text-foreground text-sm transition-opacity">
                          {language === 'es' ? 'Ver' : language === 'en' ? 'View' : 'Ver'}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
              </motion.div>
            </AnimatePresence>

            <p className="text-sm text-muted-foreground mt-4 text-center">
              * {language === 'es' ? 'Añade tus fotos en /public/gallery/' : 
                 language === 'en' ? 'Add your photos to /public/gallery/' : 
                 'Adicione suas fotos em /public/gallery/'}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Lightbox with Navigation */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
            onClick={closeLightbox}
          >
            {/* Previous Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevImage()
              }}
              className="absolute left-4 sm:left-8 p-3 rounded-full glass border-glow hover:glow-cyan-sm z-10"
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-8 h-8 text-primary" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[80vh] aspect-video rounded-2xl overflow-hidden glass border-glow"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                <div className="text-center">
                  <span className="text-8xl font-bold text-primary/30">
                    {galleryImages[selectedImageIndex].id}
                  </span>
                  <p className="text-muted-foreground mt-4">
                    {language === 'es' ? 'Foto' : language === 'en' ? 'Photo' : 'Foto'} {selectedImageIndex + 1} / {galleryImages.length}
                  </p>
                </div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 rounded-full glass border-glow hover:glow-cyan-sm transition-all"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </motion.div>

            {/* Next Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation()
                goToNextImage()
              }}
              className="absolute right-4 sm:right-8 p-3 rounded-full glass border-glow hover:glow-cyan-sm z-10"
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-8 h-8 text-primary" />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {galleryImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageIndex(idx)
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === selectedImageIndex 
                      ? 'bg-primary glow-cyan-sm w-6' 
                      : 'bg-muted-foreground/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
