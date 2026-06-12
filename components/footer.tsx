'use client'

import { motion } from 'framer-motion'
import { Heart, Linkedin, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const socialLinks = [
  { id: 'linkedin', icon: Linkedin, url: 'https://linkedin.com/in/antonio-acosta-degree-in-computer-science-b88148220' },
  { id: 'twitter', icon: Twitter, url: 'https://twitter.com/pedrorodriguez' },
  { id: 'instagram', icon: Instagram, url: 'https://instagram.com/pedrorodriguez' },
  { id: 'whatsapp', icon: MessageCircle, url: 'https://wa.me/1234567890' },
  { id: 'youtube', icon: Youtube, url: 'https://youtube.com/@pedrorodriguez' },
]

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg gradient-cyber flex items-center justify-center glow-cyan-sm">
                <span className="text-primary-foreground font-bold text-lg">PR</span>
              </div>
              <span className="text-lg font-bold text-primary glow-text-cyan">
                Pedro Rodriguez
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Licenciado en Informática
              <br />
              Full Stack Developer & AI Specialist
            </p>
          </motion.div>

          {/* Social Links - Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-lg glass border-glow flex items-center justify-center group hover:glow-cyan-sm transition-all"
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-right"
          >
            <p className="text-muted-foreground text-sm mb-2">
              &copy; {currentYear} Pedro Rodriguez. {t.footer.rights}.
            </p>
            <p className="text-muted-foreground text-sm flex items-center justify-center md:justify-end gap-1">
              {t.footer.madeWith}{' '}
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />{' '}
              {t.footer.by} Pedro Rodriguez
            </p>
          </motion.div>
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>
    </footer>
  )
}
