'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code2, Brain, Smartphone, Cloud, Database, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const specialtiesData = [
  { icon: Code2, key: 'webDev', descKey: 'webDevDesc', color: 'from-cyan-500 to-blue-500' },
  { icon: Brain, key: 'ai', descKey: 'aiDesc', color: 'from-purple-500 to-pink-500' },
  { icon: Smartphone, key: 'mobile', descKey: 'mobileDesc', color: 'from-green-500 to-teal-500' },
  { icon: Cloud, key: 'cloud', descKey: 'cloudDesc', color: 'from-blue-500 to-indigo-500' },
  { icon: Database, key: 'database', descKey: 'databaseDesc', color: 'from-orange-500 to-red-500' },
  { icon: Shield, key: 'security', descKey: 'securityDesc', color: 'from-red-500 to-pink-500' },
]

export function Specialties() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="specialties" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary glow-text-cyan">{t.specialties.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.specialties.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialtiesData.map((specialty, index) => (
            <motion.div
              key={specialty.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="h-full glass border-glow rounded-2xl p-6 hover:glow-cyan-sm transition-all duration-300">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${specialty.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <specialty.icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {t.specialties[specialty.key as keyof typeof t.specialties]}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t.specialties[specialty.descKey as keyof typeof t.specialties]}
                </p>

                {/* Decorative Line */}
                <div className="mt-4 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
