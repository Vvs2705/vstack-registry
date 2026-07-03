'use client'

import { useEffect, useState, useCallback } from 'react'
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export type ToastType = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  type: ToastType
}

// Global event bus for toasts — avoids React context overhead for simple notifications
const listeners = new Set<(toast: ToastItem) => void>()

export function toast(message: string, type: ToastType = 'success') {
  const item: ToastItem = { id: Math.random().toString(36).slice(2), message, type }
  listeners.forEach((fn) => fn(item))
}

const ICONS: Record<ToastType, typeof CheckCircle2> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
}

const COLORS: Record<ToastType, string> = {
  success: 'text-success',
  error: 'text-danger',
  info: 'text-info',
}

export function ToastContainer() {
  const [items, setItems] = useState<ToastItem[]>([])

  const add = useCallback((item: ToastItem) => {
    setItems((prev) => [...prev, item])
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== item.id))
    }, 4000)
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  useEffect(() => {
    listeners.add(add)
    return () => { listeners.delete(add) }
  }, [add])

  return (
    <div
      aria-live="polite"
      aria-label="Notificações"
      className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2"
    >
      <AnimatePresence mode="popLayout">
        {items.map((item) => {
          const Icon = ICONS[item.type]
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex max-w-sm items-start gap-3 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-card)] px-4 py-3.5 shadow-[var(--shadow)]"
              role="alert"
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${COLORS[item.type]}`} aria-hidden="true" />
              <p className="flex-1 text-[13px] font-medium text-[var(--text-1)]">{item.message}</p>
              <button
                onClick={() => remove(item.id)}
                className="ml-1 text-[var(--text-3)] transition-colors hover:text-[var(--text-1)]"
                aria-label="Fechar notificação"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
