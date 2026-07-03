import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SurfaceProps<T extends ElementType = 'div'> = {
  as?: T
  interactive?: boolean
  className?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>

/**
 * Superficie elevada (card) no padrao V-STACK: borda, raio e sombra por token.
 * `interactive` adiciona hover de elevacao. Polimorfico via `as`.
 * Requer os tokens CSS da V-STACK (`--radius-card`, `--border`, `--bg-card`,
 * `--shadow-sm`, `--shadow`, `--border-hover`) — ver DESIGN.md.
 */
export function Surface<T extends ElementType = 'div'>({
  as,
  interactive = false,
  className,
  ...props
}: SurfaceProps<T>) {
  const Component: ElementType = as ?? 'div'

  return (
    <Component
      className={cn(
        'rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-sm)]',
        interactive &&
          'transition duration-300 hover:-translate-y-1 hover:border-[var(--border-hover)] hover:shadow-[var(--shadow)]',
        className
      )}
      {...props}
    />
  )
}
