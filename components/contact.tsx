'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, Mail, MapPin, Phone, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Contact() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      alert("¡Mensaje enviado con éxito!");
      form.reset();
    } else {
      alert("Error al enviar el mensaje.");
    }
  } catch (error) {
    alert("Hubo un problema con la conexión.");
  }
};

  const contactInfo = [
    { icon: Mail, label: 'pedrorodriguez@email.com', href: 'mailto:pedrorodriguez@email.com' },
    { icon: Phone, label: '+1 234 567 890', href: 'tel:+1234567890' },
    { icon: MapPin, label: 'Ciudad, País', href: '#' },
  ]

  return (
    <section id="contact" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary glow-text-cyan">{t.contact.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl glass border-glow hover:glow-cyan-sm transition-all group"
              >
                <div className="w-12 h-12 rounded-lg gradient-cyber flex items-center justify-center">
                  <info.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-foreground group-hover:text-primary transition-colors">
                  {info.label}
                </span>
              </motion.a>
            ))}

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="mt-8 p-6 rounded-2xl glass border-glow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm text-muted-foreground">Disponible para proyectos</span>
              </div>
              <p className="text-foreground text-sm leading-relaxed">
                Estoy abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme para discutir tu próximo proyecto.
              </p>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder={t.contact.namePlaceholder}
                  className="w-full px-4 py-3 rounded-xl glass border-glow bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="name"
                  required
                  placeholder={t.contact.emailPlaceholder}
                  className="w-full px-4 py-3 rounded-xl glass border-glow bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  {t.contact.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full px-4 py-3 rounded-xl glass border-glow bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full py-4 rounded-xl gradient-cyber text-primary-foreground font-semibold flex items-center justify-center gap-2 glow-cyan hover:brightness-110 transition-all disabled:opacity-70"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    {t.contact.success}
                  </>
                ) : isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    {t.contact.sending}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t.contact.send}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
