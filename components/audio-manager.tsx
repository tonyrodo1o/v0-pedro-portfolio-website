'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function AudioManager() {
  const { language } = useLanguage()
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const welcomeSpoken = useRef(false)

  const welcomeMessages = {
    es: 'Hola, bienvenido. Soy el Licenciado en Informática Pedro Rodríguez.',
    en: 'Hello, welcome. I am Pedro Rodríguez, Bachelor in Computer Science.',
    pt: 'Olá, bem-vindo. Sou o Licenciado em Informática Pedro Rodríguez.',
  }

  const speakWelcome = useCallback(() => {
    if (welcomeSpoken.current || typeof window === 'undefined') return
    
    const message = welcomeMessages[language]
    
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(message)
      utterance.lang = language === 'es' ? 'es-ES' : language === 'en' ? 'en-US' : 'pt-BR'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      
      // Get voices and try to find a good one
      const voices = window.speechSynthesis.getVoices()
      const langVoices = voices.filter(v => v.lang.startsWith(language === 'es' ? 'es' : language === 'en' ? 'en' : 'pt'))
      if (langVoices.length > 0) {
        utterance.voice = langVoices[0]
      }
      
      window.speechSynthesis.speak(utterance)
      welcomeSpoken.current = true
      setShowWelcome(true)
      
      utterance.onend = () => {
        setTimeout(() => setShowWelcome(false), 2000)
      }
    }
  }, [language])

  const handleFirstInteraction = useCallback(() => {
    if (hasInteracted) return
    
    setHasInteracted(true)
    setShowControls(true)
    
    // Wait a moment then speak welcome
    setTimeout(() => {
      speakWelcome()
    }, 500)
    
    // Start background music after welcome
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.15
        audioRef.current.play().catch(() => {})
        setIsMusicPlaying(true)
      }
    }, 4000)
  }, [hasInteracted, speakWelcome])

  useEffect(() => {
    // Load voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices()
    }
    
    const handleClick = () => handleFirstInteraction()
    const handleKeyDown = () => handleFirstInteraction()
    const handleScroll = () => handleFirstInteraction()
    
    window.addEventListener('click', handleClick, { once: true })
    window.addEventListener('keydown', handleKeyDown, { once: true })
    window.addEventListener('scroll', handleScroll, { once: true })
    
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [handleFirstInteraction])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(() => {})
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      {/* Background Music - Using Web Audio API for ambient synth music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />

      {/* Welcome Toast */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
          >
            <div className="glass border-glow rounded-2xl p-6 glow-cyan-sm">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                  <Volume2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">
                    {language === 'es' ? 'Bienvenido' : language === 'en' ? 'Welcome' : 'Bem-vindo'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lic. Pedro Rodríguez
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audio Controls - Fixed at bottom left */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="fixed bottom-6 left-6 z-40 flex flex-col gap-2"
          >
            {/* Music Toggle */}
            <motion.button
              onClick={toggleMusic}
              className="p-3 rounded-full glass border-glow hover:glow-cyan-sm transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isMusicPlaying ? 'Pausar música' : 'Reproducir música'}
            >
              {isMusicPlaying ? (
                <Pause className="w-5 h-5 text-primary" />
              ) : (
                <Play className="w-5 h-5 text-primary" />
              )}
            </motion.button>

            {/* Mute Toggle */}
            <motion.button
              onClick={toggleMute}
              className="p-3 rounded-full glass border-glow hover:glow-cyan-sm transition-all group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Volume2 className="w-5 h-5 text-primary" />
              )}
            </motion.button>

            {/* Music Indicator */}
            {isMusicPlaying && !isMuted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center gap-0.5 mt-1"
              >
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-1 bg-primary rounded-full"
                    animate={{
                      height: [4, 16, 8, 12, 4],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Initial Prompt - Shows before interaction */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm cursor-pointer"
            onClick={handleFirstInteraction}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="text-center p-8"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 20px rgba(0, 245, 255, 0.3)',
                    '0 0 40px rgba(0, 245, 255, 0.5)',
                    '0 0 20px rgba(0, 245, 255, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 mx-auto mb-6 rounded-full glass border-glow flex items-center justify-center"
              >
                <Music className="w-12 h-12 text-primary" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === 'es' ? 'Haz clic para comenzar' : 
                 language === 'en' ? 'Click to start' : 
                 'Clique para começar'}
              </h2>
              <p className="text-muted-foreground">
                {language === 'es' ? 'Activa el audio para una experiencia completa' : 
                 language === 'en' ? 'Enable audio for the full experience' : 
                 'Ative o áudio para uma experiência completa'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
