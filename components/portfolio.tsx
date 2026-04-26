'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ExternalLink, Github, Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import Image from 'next/image'

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
    title: 'E-Commerce Platform',
    description: {
      es: 'Plataforma de comercio electrónico con IA para recomendaciones personalizadas',
      en: 'E-commerce platform with AI for personalized recommendations',
      pt: 'Plataforma de e-commerce com IA para recomendações personalizadas',
    },
    image: '/projects/project-1.jpg',
    url: 'https://example.com/project1',
    github: 'https://github.com',
    tags: ['Next.js', 'TypeScript', 'AI', 'Stripe'],
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: {
      es: 'Panel de análisis en tiempo real con visualizaciones interactivas',
      en: 'Real-time analytics dashboard with interactive visualizations',
      pt: 'Painel de análise em tempo real com visualizações interativas',
    },
    image: '/projects/project-2.jpg',
    url: 'https://example.com/project2',
    tags: ['React', 'D3.js', 'Node.js', 'MongoDB'],
  },
  {
    id: 3,
    title: 'Mobile Banking App',
    description: {
      es: 'Aplicación bancaria móvil con seguridad biométrica',
      en: 'Mobile banking app with biometric security',
      pt: 'Aplicativo bancário móvel com segurança biométrica',
    },
    image: '/projects/project-3.jpg',
    url: 'https://example.com/project3',
    tags: ['React Native', 'Firebase', 'Biometrics'],
  },
  {
    id: 4,
    title: 'AI Chatbot System',
    description: {
      es: 'Sistema de chatbot con procesamiento de lenguaje natural',
      en: 'Chatbot system with natural language processing',
      pt: 'Sistema de chatbot com processamento de linguagem natural',
    },
    image: '/projects/project-4.jpg',
    url: 'https://example.com/project4',
    github: 'https://github.com',
    tags: ['Python', 'TensorFlow', 'NLP', 'FastAPI'],
  },
]

export function Portfolio() {
  const { t, language } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

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

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div className="glass border-glow rounded-2xl overflow-hidden hover:glow-cyan-sm transition-all duration-300">
                {/* Image Preview */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <Globe className="w-16 h-16 text-primary/50" />
                  </div>
                  <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    <motion.a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full glass border-glow hover:glow-cyan-sm"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ExternalLink className="w-6 h-6 text-primary" />
                    </motion.a>
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full glass border-glow hover:glow-cyan-sm"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Github className="w-6 h-6 text-primary" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description[language]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs glass border border-primary/30 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-sm text-muted-foreground mt-8 text-center"
        >
          * Actualiza los proyectos en el archivo portfolio.tsx con tus URLs e imágenes reales
        </motion.p>
      </div>
    </section>
  )
}
