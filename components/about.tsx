'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, Briefcase, Users, Layers } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const stats = [
  { icon: Calendar, value: '8+', key: 'experience' },
  { icon: Briefcase, value: '50+', key: 'projects' },
  { icon: Users, value: '30+', key: 'clients' },
  { icon: Layers, value: '20+', key: 'technologies' },
]

const technologies = [
  'React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'TensorFlow',
  'AWS', 'Docker', 'PostgreSQL', 'MongoDB', 'GraphQL', 'Tailwind CSS',
]

export function About() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary glow-text-cyan">{t.about.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.p variants={item} className="text-lg text-muted-foreground leading-relaxed mb-8">
              {t.about.description}
            </motion.p>

            {/* Stats Grid */}
            <motion.div variants={item} className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.key}
                  className="glass border-glow rounded-xl p-4 text-center hover:glow-cyan-sm transition-all"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {t.about[stat.key as keyof typeof t.about]}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Technologies */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={item} className="text-xl font-semibold mb-6 text-foreground">
              {t.about.technologies}
            </motion.h3>
            <motion.div variants={item} className="flex flex-wrap gap-3">
              {technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-full glass border-glow text-sm text-foreground hover:text-primary hover:border-primary transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>

            {/* Code Animation */}
            <motion.div
              variants={item}
              className="mt-8 p-4 rounded-xl glass border-glow font-mono text-sm scanline"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-muted-foreground">
                <span className="text-accent">const</span>{' '}
                <span className="text-primary">developer</span> = {'{'}
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-foreground">name</span>:{' '}
                <span className="text-green-400">&quot;Pedro Rodriguez&quot;</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-foreground">title</span>:{' '}
                <span className="text-green-400">&quot;Lic. Informática&quot;</span>,
              </div>
              <div className="pl-4 text-muted-foreground">
                <span className="text-foreground">passion</span>:{' '}
                <span className="text-green-400">&quot;Building the future&quot;</span>
              </div>
              <div className="text-muted-foreground">{'}'}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
