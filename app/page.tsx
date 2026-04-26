'use client'

import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { AboutMe } from '@/components/about-me'
import { Specialties } from '@/components/specialties'
import { Portfolio } from '@/components/portfolio'
import { Contact } from '@/components/contact'
import { Payments } from '@/components/payments'
import { SocialLinks } from '@/components/social-links'
import { Footer } from '@/components/footer'
import { Chatbot } from '@/components/chatbot'
import { AudioManager } from '@/components/audio-manager'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <AudioManager />
      <Navbar />
      <SocialLinks />
      
      {/* Contenedor principal con ancho máximo de 900px */}
      <div className="mx-auto w-full max-w-[900px] px-4">
        <Hero />
        <About />
        <AboutMe />
        <Specialties />
        <Portfolio />
        <Contact />
        <Payments />
      </div>
      
      <Footer />
      <Chatbot />
    </main>
  )
}
