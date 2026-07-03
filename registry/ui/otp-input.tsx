'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface OtpInputProps {
  /** Valor atual (string de digitos). */
  value: string
  /** Chamado quando o codigo muda. */
  onChange: (value: string) => void
  /** Quantidade de caixas. */
  length?: number
  disabled?: boolean
  className?: string
}

/**
 * OtpInput — caixas de codigo OTP (default 6), sem dependencias.
 * Auto-foco entre caixas, backspace inteligente e colar (paste) suportados.
 * Aceita apenas digitos. Borda/foco usam tokens `border`/`primary`.
 */
export function OtpInput({ value, onChange, length = 6, disabled, className }: OtpInputProps) {
  const inputs = React.useRef<(HTMLInputElement | null)[]>([])
  const pad = ' '.repeat(length)
  const digits = (value + pad).slice(0, length).split('')

  const handleKey = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      const next = digits.map((d, i) => (i === idx ? ' ' : d)).join('').trimEnd()
      onChange(next.trim())
      if (idx > 0) inputs.current[idx - 1]?.focus()
    }
  }

  const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const ch = e.target.value.replace(/\D/g, '').slice(-1)
    if (!ch) return
    const next = digits.map((d, i) => (i === idx ? ch : d)).join('').replace(/ /g, '')
    onChange(next.padEnd(length, ' ').trim())
    if (idx < length - 1) inputs.current[idx + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (text.length > 0) {
      onChange(text)
      inputs.current[Math.min(text.length, length - 1)]?.focus()
    }
    e.preventDefault()
  }

  return (
    <div className={cn('flex justify-center gap-2', className)} onPaste={handlePaste}>
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            inputs.current[idx] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[idx]?.trim() ?? ''}
          onChange={(e) => handleChange(idx, e)}
          onKeyDown={(e) => handleKey(idx, e)}
          disabled={disabled}
          className={cn(
            'h-14 w-12 rounded-xl border-2 bg-background text-center text-xl font-bold text-foreground outline-none transition-all duration-150',
            'border-border focus:border-primary focus:ring-2 focus:ring-primary/20',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          autoComplete="one-time-code"
          aria-label={`Digito ${idx + 1} do codigo`}
        />
      ))}
    </div>
  )
}
