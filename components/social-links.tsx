'use client'

import { motion } from 'framer-motion'
import { Linkedin, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const socialLinks = [
  { id: 'linkedin', icon: Linkedin, url: 'https://linkedin.com/in/pedrorodriguez', label: 'LinkedIn' },
  { id: 'twitter', icon: Twitter, url: 'https://twitter.com/pedrorodriguez', label: 'Twitter/X' },
  { id: 'instagram', icon: Instagram, url: 'https://instagram.com/pedrorodriguez', label: 'Instagram' },
  { id: 'whatsapp', icon: MessageCircle, url: 'https://wa.me/1234567890', label: 'WhatsApp' },
  { id: 'youtube', icon: Youtube, url: 'https://youtube.com/@pedrorodriguez', label: 'YouTube' },
]

export function SocialLinks() {
  const { t } = useLanguage()

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
          whileHover={{ scale: 1.2, x: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-lg glass border-glow flex items-center justify-center group hover:glow-cyan-sm transition-all"
          aria-label={social.label}
        >
          <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </motion.a>
      ))}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="w-px h-20 bg-gradient-to-b from-primary/50 to-transparent mx-auto mt-2"
      />
    </div>
  )
}
