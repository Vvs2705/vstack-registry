import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

/**
 * Cabecalho de secao no padrao V-STACK: eyebrow + titulo + descricao.
 * Requer os tokens CSS da V-STACK (`--text-1`, `--text-2`) e as utilities
 * `.eyebrow` e `font-display` — ver DESIGN.md.
 */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn(align === 'center' && 'mx-auto text-center', 'max-w-2xl', className)}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="font-display text-balance text-3xl font-bold leading-tight tracking-[-0.01em] text-[var(--text-1)] sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-[15px] leading-7 text-[var(--text-2)]">
          {description}
        </p>
      )}
    </div>
  )
}
