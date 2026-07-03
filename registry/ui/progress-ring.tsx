import * as React from 'react'
import { cn } from '@/lib/utils'

export interface ProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Valor de 0 a 100. */
  value: number
  /** Diametro em pixels. */
  size?: number
  /** Espessura do traco em pixels. */
  strokeWidth?: number
  /** Exibe o valor numerico no centro. */
  showValue?: boolean
}

/**
 * ProgressRing — anel de progresso/score em SVG (0–100), sem dependencias.
 * A cor muda por faixa (>=90 emerald, >=75 sky, >=55 amber, senao red).
 * A trilha usa `border` neutro; o texto central usa `foreground`.
 */
export function ProgressRing({
  value,
  size = 64,
  strokeWidth = 4,
  showValue = true,
  className,
  ...props
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (clamped / 100) * circumference

  const ringColor =
    clamped >= 90
      ? 'text-emerald-500'
      : clamped >= 75
        ? 'text-sky-500'
        : clamped >= 55
          ? 'text-amber-500'
          : 'text-red-500'

  const ringBgColor =
    clamped >= 90
      ? 'bg-emerald-500/10'
      : clamped >= 75
        ? 'bg-sky-500/10'
        : clamped >= 55
          ? 'bg-amber-500/10'
          : 'bg-red-500/10'

  return (
    <div
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('relative flex flex-shrink-0 items-center justify-center', className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg className="h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-border"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn('transition-all duration-700 ease-out', ringColor)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {showValue && (
        <div
          className={cn(
            'absolute inset-0 flex items-center justify-center rounded-full text-sm font-bold text-foreground',
            ringBgColor,
          )}
        >
          {Math.round(clamped)}
        </div>
      )}
    </div>
  )
}
