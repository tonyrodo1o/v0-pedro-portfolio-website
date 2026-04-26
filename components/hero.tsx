'use client'

import { motion } from 'framer-motion'
import { ArrowDown, Code2, Brain, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { ParticlesBackground } from './particles-background'

export function Hero() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticlesBackground />
      
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-primary/20 to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/20 to-transparent blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-glow mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
              <span className="text-sm text-muted-foreground">{t.hero.greeting}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4"
            >
              <span className="text-foreground">{t.hero.name.split(' ')[0]}</span>
              <br />
              <span className="text-primary glow-text-cyan">{t.hero.name.split(' ')[1]}</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-2"
            >
              {t.hero.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-primary/80 mb-8"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.a
                href="#portfolio"
                className="px-8 py-3 rounded-lg gradient-cyber text-primary-foreground font-semibold glow-cyan hover:brightness-110 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero.cta}
              </motion.a>
              <motion.a
                href="#contact"
                className="px-8 py-3 rounded-lg glass border-glow font-semibold text-foreground hover:bg-primary/10 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t.hero.contact}
              </motion.a>
            </motion.div>
          </motion.div>

          {/* 3D/Animated Element */}
          <motion.div 
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Circle */}
              <motion.div
                className="w-64 h-64 sm:w-80 sm:h-80 rounded-full gradient-cyber glow-cyan flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-4 rounded-full bg-background flex items-center justify-center">
                  <Brain className="w-24 h-24 sm:w-32 sm:h-32 text-primary animate-pulse-glow" />
                </div>
              </motion.div>

              {/* Floating Icons */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-xl glass glow-cyan-sm flex items-center justify-center"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Code2 className="w-8 h-8 text-primary" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 rounded-xl glass glow-purple flex items-center justify-center"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-7 h-7 text-accent" />
              </motion.div>

              {/* Orbit Ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/30"
                style={{ transform: 'scale(1.3)' }}
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary glow-cyan-sm" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <span className="text-sm">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
