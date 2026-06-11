'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, Globe, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

interface Project {
  id: number
  title: string
  description: {
    es: string
    en: string
    pt: string
  }
  image: string
  url: string
  github?: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: 'VENUSA',
    description: {
      es: 'VENUSA, Sales Online for Amazon',
      en: 'E-commerce',
      pt: 'VENUSA, Sales Online for Amazon',
    },
    image: 'venusasite.png',
    url: 'https://venusa.site',
    github: 'https://github.com',
    tags: ['Php', 'Html', 'CSS', 'MySql', 'Java Script'],
  },
  {
    id: 2,
    title: 'BYISLANDER',
    description: {
      es: 'Tienda Online, Ropa y Fotos',
      en: 'Real-time analytics dashboard with interactive visualizations',
      pt: 'Painel de análise em tempo real com visualizações interativas',
    },
    image: '/projects/project-2.jpg',
    url: 'https://byislander.shop',
    tags: ['React', 'Typescript', 'Node.js', 'Vite'],
  },
  {
    id: 3,
    title: 'ONNOMI',
    description: {
      es: 'Sistema de Nomina Para Venzuela',
      en: 'Aplicacion Completa de Sistema de Nomina',
      pt: 'Aplicativo bancário móvel com segurança biométrica',
    },
    image: '/projects/project-3.jpg',
    url: 'https://onnomi.online',
    tags: ['React', 'Node,js', 'Vite', 'TypeScript', ],
  },
  {
    id: 4,
    title: 'VALHALLA',
    description: {
      es: 'Sistema de Web de Minimarket',
      en: 'Pedidos en Linea',
      pt: 'Sistema de chatbot com processamento de linguagem natural',
    },
    image: '/projects/project-4.jpg',
    url: 'https://valhalla-candicandishop.pages.dev',
    github: 'https://github.com',
    tags: ['Vite', 'TypeScript', 'Node,js', 'Java Script', 'React'],
  },
  {
    id: 5,
    title: 'Smart Kiosk · Cloud',
    description: {
      es: 'Sistema de Kiosko Para Restaurntes',
      en: 'Pedidos en Linea',
      pt: 'Sistema automatizado',
    },
    image: '/projects/project-5.jpg',
    url: 'https://foodie-point-shop.pages.dev',
    tags: ['Vite', 'TypeScript', 'Node,js', 'Java Script', 'React'],
  },
  {
    id: 6,
    title: 'Healthcare Portal',
    description: {
      es: 'Portal de salud con telemedicina y gestión de citas',
      en: 'Healthcare portal with telemedicine and appointment management',
      pt: 'Portal de saúde com telemedicina e gestão de consultas',
    },
    image: '/projects/project-6.jpg',
    url: 'https://example.com/project6',
    github: 'https://github.com',
    tags: ['Next.js', 'PostgreSQL', 'WebRTC'],
  },
  {
    id: 7,
    title: 'Inventory Management',
    description: {
      es: 'Sistema de gestión de inventario con predicción de demanda',
      en: 'Inventory management system with demand prediction',
      pt: 'Sistema de gestão de inventário com previsão de demanda',
    },
    image: '/projects/project-7.jpg',
    url: 'https://example.com/project7',
    tags: ['React', 'Python', 'Machine Learning'],
  },
  {
    id: 8,
    title: 'Social Media Platform',
    description: {
      es: 'Red social con algoritmos de recomendación personalizados',
      en: 'Social network with personalized recommendation algorithms',
      pt: 'Rede social com algoritmos de recomendação personalizados',
    },
    image: '/projects/project-8.jpg',
    url: 'https://example.com/project8',
    tags: ['Next.js', 'GraphQL', 'Redis', 'AWS'],
  },
]

const ITEMS_PER_PAGE = 4

export function Portfolio() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [currentPage, setCurrentPage] = useState(0)
  
  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const visibleProjects = projects.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const goToNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
  }

  const goToPrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
  }

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary glow-text-cyan">{t.portfolio.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.portfolio.subtitle}</p>
        </motion.div>

        {/* Navigation Arrows - Top */}
        <div className="flex items-center justify-between mb-8">
          <motion.button
            onClick={goToPrev}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass border-glow hover:glow-cyan-sm transition-all group"
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-primary group-hover:animate-pulse" />
            <span className="text-foreground hidden sm:inline">Anterior</span>
          </motion.button>

          {/* Page Indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentPage 
                    ? 'bg-primary glow-cyan-sm w-8' 
                    : 'bg-muted-foreground/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={goToNext}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass border-glow hover:glow-cyan-sm transition-all group"
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-foreground hidden sm:inline">Siguiente</span>
            <ChevronRight className="w-6 h-6 text-primary group-hover:animate-pulse" />
          </motion.button>
        </div>

        {/* Projects Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass border-glow rounded-2xl overflow-hidden hover:glow-cyan-sm transition-all duration-300 h-full flex flex-col">
                  {/* Image Preview */}
                  <div className="relative h-40 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                      <Globe className="w-12 h-12 text-primary/50" />
                    </div>
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <motion.a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full glass border-glow hover:glow-cyan-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-5 h-5 text-primary" />
                      </motion.a>
                      {project.github && (
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full glass border-glow hover:glow-cyan-sm"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Github className="w-5 h-5 text-primary" />
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1 line-clamp-2">
                      {project.description[language]}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-xs glass border border-primary/30 text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-0.5 text-xs text-muted-foreground">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Page Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <span className="text-muted-foreground">
            {language === 'es' ? 'Página' : language === 'en' ? 'Page' : 'Página'}{' '}
            <span className="text-primary font-bold">{currentPage + 1}</span>{' '}
            {language === 'es' ? 'de' : language === 'en' ? 'of' : 'de'}{' '}
            <span className="text-primary font-bold">{totalPages}</span>
          </span>
        </motion.div>
      </div>
    </section>
  )
}
