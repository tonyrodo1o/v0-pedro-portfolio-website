'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CreditCard, Landmark, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

export function Payments() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const paymentMethods = [
    {
      id: 'stripe',
      icon: CreditCard,
      name: t.payments.stripe,
      brands: ['Visa', 'Mastercard', 'Amex'],
    },
    {
      id: 'paypal',
      icon: () => (
        <svg viewBox="0 0 24 24" className="w-8 h-8" fill="currentColor">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.779.779 0 0 1 .771-.655h7.394c2.424 0 4.176.64 5.138 1.876.916 1.178 1.132 2.718.64 4.575-.012.046-.024.093-.036.14-.49 2.065-1.398 3.688-2.7 4.831-1.318 1.155-3.002 1.74-5.012 1.74H8.664a.779.779 0 0 0-.77.656l-.818 4.454zm9.07-15.8c-.372 1.523-1.108 2.666-2.234 3.482-1.127.817-2.587 1.229-4.38 1.229h-1.03l-.993 5.406h2.155c1.43 0 2.58-.41 3.448-1.23.869-.82 1.44-1.963 1.714-3.428l.098-.54c.205-1.21.003-2.13-.778-2.919z" />
        </svg>
      ),
      name: t.payments.paypal,
      brands: ['PayPal'],
    },
    {
      id: 'transfer',
      icon: Landmark,
      name: t.payments.transfer,
      brands: ['Zelle', 'Wire', 'Banco nacional', 'Banco Virtual'],
    },
  ]

  return (
    <section id="payments" className="py-20 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-card/50 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-primary glow-text-cyan">{t.payments.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg">{t.payments.subtitle}</p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {paymentMethods.map((method, index) => (
            <motion.div
              key={method.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass border-glow rounded-2xl p-6 text-center hover:glow-cyan-sm transition-all"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-cyber flex items-center justify-center">
                {typeof method.icon === 'function' ? (
                  <method.icon />
                ) : (
                  <method.icon className="w-8 h-8 text-primary-foreground" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">{method.name}</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {method.brands.map((brand) => (
                  <span
                    key={brand}
                    className="px-3 py-1 rounded-full text-xs glass border border-primary/30 text-muted-foreground"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Security Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-2 mt-12 text-muted-foreground"
        >
          <Shield className="w-5 h-5 text-green-500" />
          <span className="text-sm">Pagos seguros y encriptados</span>
        </motion.div>
      </div>
    </section>
  )
}
