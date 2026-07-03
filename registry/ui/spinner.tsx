import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Spinner — indicador de carregamento circular (border-spin), sem dependencias.
 * O aro usa a cor `primary`; a trilha usa `slate` neutro (light/dark). Tamanhos sm/md/lg.
 */
export function Spinner({ size = 'md', className, ...props }: SpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-10 h-10 border-[3px]',
  }

  return (
    <div
      role="status"
      aria-label="Carregando"
      className={cn(
        'inline-block animate-spin rounded-full border-primary border-t-transparent',
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  )
}
