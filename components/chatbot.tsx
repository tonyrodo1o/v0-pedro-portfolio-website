'use client'

import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const chatLabels = {
  es: {
    title: 'Asistente IA',
    subtitle: 'Pregúntame sobre Pedro',
    placeholder: 'Escribe tu mensaje...',
    greeting: '¡Hola! Soy el asistente virtual de Pedro Rodriguez. Puedo ayudarte con información sobre sus proyectos, habilidades, experiencia y servicios. ¿En qué puedo ayudarte?',
    error: 'Lo siento, hubo un error. Por favor intenta de nuevo.',
  },
  en: {
    title: 'AI Assistant',
    subtitle: 'Ask me about Pedro',
    placeholder: 'Type your message...',
    greeting: "Hi! I'm Pedro Rodriguez's virtual assistant. I can help you with information about his projects, skills, experience, and services. How can I help you?",
    error: 'Sorry, there was an error. Please try again.',
  },
  pt: {
    title: 'Assistente IA',
    subtitle: 'Pergunte-me sobre Pedro',
    placeholder: 'Digite sua mensagem...',
    greeting: 'Olá! Sou o assistente virtual de Pedro Rodriguez. Posso ajudá-lo com informações sobre seus projetos, habilidades, experiência e serviços. Como posso ajudá-lo?',
    error: 'Desculpe, ocorreu um erro. Por favor, tente novamente.',
  },
}

function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ''
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text' && typeof p.text === 'string')
    .map((p) => p.text)
    .join('')
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const labels = chatLabels[language]
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status, input, setInput } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input }, { body: { language } })
    setInput('')
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 flex items-center justify-center group ${isOpen ? 'hidden' : ''}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <Bot className="w-8 h-8 text-white" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
        <motion.div
          className="absolute inset-0 rounded-full bg-cyan-400/50"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] h-[550px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-6rem)] rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20 border border-cyan-500/30 bg-background/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-b border-cyan-500/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground flex items-center gap-2">
                    {labels.title}
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </h3>
                  <p className="text-xs text-muted-foreground">{labels.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent">
              {/* Greeting Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-cyan-500/10">
                  <p className="text-sm text-foreground">{labels.greeting}</p>
                </div>
              </motion.div>

              {/* Chat Messages */}
              {messages.map((message, index) => {
                const text = getMessageText(message)
                if (!text) return null
                
                return (
                  <motion.div
                    key={message.id || index}
                    initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600' 
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 max-w-[85%] border ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border-cyan-500/30 rounded-tr-sm'
                        : 'bg-muted/50 border-cyan-500/10 rounded-tl-sm'
                    }`}>
                      <p className="text-sm text-foreground whitespace-pre-wrap">{text}</p>
                    </div>
                  </motion.div>
                )
              })}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-3 border border-cyan-500/10">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-cyan-500/20 bg-muted/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={labels.placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-background/80 border border-cyan-500/30 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition-all disabled:opacity-50"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Send className="w-5 h-5 text-white" />
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
