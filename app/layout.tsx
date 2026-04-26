import type { Metadata, Viewport } from 'next'
import { Orbitron, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageProvider } from '@/lib/language-context'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Pedro Rodriguez | Licenciado en Informática - Full Stack Developer & AI Specialist',
  description: 'Portafolio profesional del Lic. Pedro Rodriguez - Desarrollador Full Stack especializado en Inteligencia Artificial, desarrollo web moderno y soluciones tecnológicas innovadoras.',
  keywords: ['Pedro Rodriguez', 'Desarrollador Full Stack', 'Inteligencia Artificial', 'React', 'Next.js', 'TypeScript', 'Python', 'Machine Learning'],
  authors: [{ name: 'Pedro Rodriguez' }],
  creator: 'Pedro Rodriguez',
  generator: 'Next.js',
  openGraph: {
    title: 'Pedro Rodriguez | Licenciado en Informática',
    description: 'Full Stack Developer & AI Specialist',
    url: 'https://pedrorodriguez.dev',
    siteName: 'Pedro Rodriguez Portfolio',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pedro Rodriguez | Full Stack Developer & AI Specialist',
    description: 'Portafolio profesional del Lic. Pedro Rodriguez',
    creator: '@pedrorodriguez',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#00dcff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${orbitron.variable} ${inter.variable} ${jetbrainsMono.variable} bg-background`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
