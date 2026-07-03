import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type SectionTone = 'default' | 'muted' | 'deep'
type SectionSpacing = 'md' | 'lg' | 'xl'

const sectionTones: Record<SectionTone, string> = {
  default: 'bg-[var(--bg)]',
  muted: 'bg-[var(--bg-card)]',
  deep: 'bg-[var(--bg-deep)]',
}

const sectionSpacing: Record<SectionSpacing, string> = {
  md: 'py-16 sm:py-20',
  lg: 'py-20 sm:py-24',
  xl: 'py-24 sm:py-32',
}

interface SectionProps extends ComponentPropsWithoutRef<'section'> {
  tone?: SectionTone
  spacing?: SectionSpacing
}

/**
 * Secao de pagina com tom de fundo e ritmo vertical padronizados.
 * Requer os tokens CSS da V-STACK (`--bg`, `--bg-card`, `--bg-deep`) — ver DESIGN.md.
 */
export function Section({ tone = 'default', spacing = 'lg', className, ...props }: SectionProps) {
  return <section className={cn(sectionTones[tone], sectionSpacing[spacing], className)} {...props} />
}
