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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SocialLinks />
      <Hero />
      <About />
      <AboutMe />
      <Specialties />
      <Portfolio />
      <Contact />
      <Payments />
      <Footer />
      <Chatbot />
    </main>
  )
}
